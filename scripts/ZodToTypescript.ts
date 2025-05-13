import { ZodType, type ZodTypeDef, z as zod } from "zod";
import ts, { type TypeNode, factory, type JSDocContainer, type Declaration, type Identifier } from "typescript";
import { addComment } from "@utils/addComment";
import { createTempAlias, createTextAlias } from "./utils/alias";

export interface NamedDeclaration extends Declaration, JSDocContainer {
	readonly name: Identifier;
}

export type MapContext = Map<ZodType, NamedDeclaration>;

export interface ConvertIdentifier {
	zodSchema: ZodType;
	name: string;
}

export interface ConvertOptions {
	name?: string;
	context?: MapContext;

	/**
	 * @deprecated careless mistake in the name - use `identifiers` instead
	 */
	indentifiers?: (ConvertIdentifier | ZodType)[];
	identifiers?: (ConvertIdentifier | ZodType)[];
	export?: boolean;
	zodSchemaHooks?: ZodSchemaHook[];
}

export interface FindTypescriptTransformatorOptions {
	skipNextDeclarationStatement?: boolean;
	skipNextZodSchemaHooks?: boolean;
}

declare module "zod" {
	interface ZodType<
		Output = any,
		Def extends zod.ZodTypeDef = zod.ZodTypeDef,
		Input = Output,
	> {
		_zttIdentifier?: string;
		_zttOverrideTypeNode?: TypeNode;
		identifier(name: string): ZodType<Output, Def, Input>;
		overrideTypeNode(
			typeNode: TypeNode | ((typescript: typeof ts) => TypeNode)
		): ZodType<Output, Def, Input>;
	}
}

ZodType.prototype.identifier = function(name) {
	const ZodTypeConstructor = this.constructor as new(arg: ZodTypeDef) => ZodType;
	const definition = this._def as ZodTypeDef;

	const cloneSchema = new ZodTypeConstructor({
		...definition,
	});

	cloneSchema._zttIdentifier = name;
	cloneSchema._zttOverrideTypeNode = this._zttOverrideTypeNode;

	return cloneSchema;
};

ZodType.prototype.overrideTypeNode = function(typeNode) {
	const ZodTypeConstructor = this.constructor as new(arg: ZodTypeDef) => ZodType;
	const definition = this._def as ZodTypeDef;

	const cloneSchema = new ZodTypeConstructor({
		...definition,
	});

	cloneSchema._zttIdentifier = this._zttIdentifier;
	cloneSchema._zttOverrideTypeNode
		= typeof typeNode === "function"
			? typeNode(ts)
			: typeNode;

	return cloneSchema;
};

export interface TypescriptTransformatorTools {
	context: MapContext;
	findTypescriptTransformator(zodSchema: ZodType): TypeNode;
}

export interface TypescriptTransformator {
	support(zodSchema: ZodType): boolean;

	makeTypeNode(zodSchema: ZodType, tools: TypescriptTransformatorTools): TypeNode;
}

export type ZodSchemaHookAction = "stop" | "next";

export interface ZodSchemaHookOutput {
	zodSchema: ZodType;
	action: ZodSchemaHookAction;
}

export type ZodSchemaHook = (
	zodSchema: ZodType,
	context: MapContext,
	output: (action: ZodSchemaHookAction, zodSchema: ZodType) => ZodSchemaHookOutput
) => ZodSchemaHookOutput;

export class ZodToTypescript {
	public aliasContext: MapContext = new Map();

	public zodSchemaHooks: ZodSchemaHook[] = [];

	public typescriptTransformators: TypescriptTransformator[];

	public static typescriptTransformators: TypescriptTransformator[] = [];

	public static zod = zod;

	private static count = 0;

	public constructor(typescriptTransformators: TypescriptTransformator[] = []) {
		this.typescriptTransformators = [
			...typescriptTransformators,
			...ZodToTypescript.typescriptTransformators,
		];
	}

	private findTypescriptTransformator(
		zodSchema: ZodType,
		context: MapContext,
		options: FindTypescriptTransformatorOptions = {},
	): TypeNode {
		const { skipNextDeclarationStatement, skipNextZodSchemaHooks, ...currentOptions } = options;

		let currentZodSchema = zodSchema;

		if (!skipNextZodSchemaHooks && this.zodSchemaHooks.length) {
			for (const zodSchemaHook of this.zodSchemaHooks) {
				const result = zodSchemaHook(
					currentZodSchema,
					context,
					(action, zodSchema) => ({
						action,
						zodSchema,
					}),
				);

				currentZodSchema = result.zodSchema;

				if (result.action === "stop") {
					break;
				}
			}
		}

		const declarationStatement = context.get(currentZodSchema);

		if (!skipNextDeclarationStatement && declarationStatement) {
			return factory.createTypeReferenceNode(
				factory.createIdentifier(declarationStatement.name.text),
			);
		}

		for (const typescriptTransformator of this.typescriptTransformators) {
			if (typescriptTransformator.support(currentZodSchema)) {
				if (currentZodSchema._zttIdentifier) {
					context.set(
						currentZodSchema,
						createTempAlias(currentZodSchema._zttIdentifier),
					);
				}

				const typeNode = typescriptTransformator.makeTypeNode(
					currentZodSchema,
					{
						context,
						findTypescriptTransformator: (zodSchema) => this.findTypescriptTransformator(
							zodSchema,
							context,
							currentOptions,
						),
					},
				);

				if (currentZodSchema._zttIdentifier) {
					context.set(
						currentZodSchema,
						createTextAlias(typeNode, currentZodSchema._zttIdentifier),
					);

					return this.findTypescriptTransformator(
						currentZodSchema,
						context,
						currentOptions,
					);
				}

				return typeNode;
			}
		}

		return this.findTypescriptTransformator(
			zod.unknown(),
			context,
		);
	}

	public append(zodSchema: ZodType, name?: string) {
		const aliasName = zodSchema._zttIdentifier ?? name ?? ZodToTypescript.getIdentifier();

		this.aliasContext.set(
			zodSchema,
			createTempAlias(aliasName),
		);
	}

	public toString(exportType = false) {
		const context = new Map(this.aliasContext);

		[...this.aliasContext.entries()].forEach(
			([zodSchema, alias]) => {
				const typeNode = this.findTypescriptTransformator(
					zodSchema,
					context,
					{ skipNextDeclarationStatement: true },
				);

				const declaration
					= (zodSchema._zttIdentifier && context.get(zodSchema))
					|| createTextAlias(typeNode, alias.name.text);

				if (zodSchema.description) {
					addComment(declaration, zodSchema.description);
				}

				context.delete(zodSchema);

				context.set(
					zodSchema,
					declaration,
				);
			},
		);

		return ZodToTypescript.stringifyContext(
			context,
			exportType,
		);
	}

	public static stringifyContext(context: MapContext, exportType = false): string {
		const sourceFile = ts.createSourceFile("print.ts", "", ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
		const printer = ts.createPrinter();

		return [...context.values()]
			.flatMap(
				(namedDeclaration) => [
					printer.printNode(
						ts.EmitHint.Unspecified,
						namedDeclaration,
						sourceFile,
					),
					exportType
						? printer.printNode(
							ts.EmitHint.Unspecified,
							factory.createExportDeclaration(
								undefined,
								false,
								factory.createNamedExports([
									factory.createExportSpecifier(
										false,
										undefined,
										namedDeclaration.name,
									),
								]),
							),
							sourceFile,
						)
						: undefined,
				],
			)
			.filter(Boolean)
			.join("\n\n")
			.trim();
	}

	public static convert(zodSchema: ZodType, options: ConvertOptions = {}): string {
		if (options.indentifiers && !options.identifiers) {
			console.warn("ZodToTypescript: indentifiers is deprecated, use identifiers instead");
			options.identifiers = options.indentifiers;
		}

		const ztt = new ZodToTypescript();
		ztt.zodSchemaHooks = options.zodSchemaHooks ?? [];

		const identifier = options.name ?? this.getIdentifier();

		if (options.identifiers) {
			ztt.aliasContext.set(zodSchema, createTempAlias(identifier));

			options.identifiers.forEach((indentifier) => {
				const currentZodSchema = indentifier instanceof ZodType
					? indentifier
					: indentifier.zodSchema;

				const currentName = indentifier instanceof ZodType
					? this.getIdentifier()
					: indentifier.name;

				if (currentZodSchema === zodSchema) {
					return;
				}

				ztt.append(currentZodSchema, currentName);
			});

			ztt.aliasContext.delete(zodSchema);
		}

		ztt.append(zodSchema, identifier);

		return ztt.toString(options.export);
	}

	public static getIdentifier() {
		return `Zod2ts_${(this.count++).toString(36)}_duplojs`;
	}

	public static injectZod<
		Z extends typeof zod,
	>(zod: Z) {
		this.zod = zod;
	}
}
