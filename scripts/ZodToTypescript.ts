import { ZodType, z as zod } from "zod";
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

export interface MakeContextOptions {
	name: string;
	context?: MapContext;
}

export interface ConvertOptions {
	name?: string;
	context?: MapContext;
	indentifiers?: (ConvertIdentifier | ZodType)[];
	export?: boolean;
}

export interface FindTypescriptTransformatorOptions {
	skipDeclarationStatement?: boolean;
}

declare module "zod" {
	interface ZodType {
		_identifier?: string;

		identifier(name: string): this;
	}
}

ZodType.prototype.identifier = function(name) {
	this._identifier = name;

	return this;
};

export interface TypescriptTransformator {
	get support(): new (...args: any[]) => ZodType;

	makeTypeNode(zodSchema: ZodType, context: MapContext): TypeNode;
}

export class ZodToTypescript {
	public aliasContext: MapContext = new Map();

	public static typescriptTransformators: TypescriptTransformator[] = [];

	public static zod = zod;

	private static count = 0;

	public append(zodSchema: ZodType, name?: string) {
		const aliasName = zodSchema._identifier ?? name ?? ZodToTypescript.getIdentifier();

		this.aliasContext.set(
			zodSchema,
			createTempAlias(aliasName),
		);
	}

	public toString(exportType = false) {
		const context = new Map(this.aliasContext);

		[...this.aliasContext.entries()].forEach(
			([zodSchema, alias]) => {
				ZodToTypescript.makeContextFromZodSchema(
					zodSchema,
					{
						name: alias.name.text,
						context,
					},
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

	public static findTypescriptTransformator(
		zodSchema: ZodType,
		context: MapContext,
		options: FindTypescriptTransformatorOptions = {},
	): TypeNode {
		const { skipDeclarationStatement } = options;
		const declarationStatement = context.get(zodSchema);

		if (!skipDeclarationStatement && declarationStatement) {
			return factory.createTypeReferenceNode(
				factory.createIdentifier(declarationStatement.name.text),
			);
		}

		for (const typescriptTransformator of this.typescriptTransformators) {
			if (zodSchema instanceof typescriptTransformator.support) {
				const typeNode = typescriptTransformator.makeTypeNode(zodSchema, context);

				if (zodSchema._identifier) {
					context.set(
						zodSchema,
						createTextAlias(typeNode, zodSchema._identifier),
					);

					return ZodToTypescript
						.findTypescriptTransformator(
							zodSchema,
							context,
						);
				}

				return typeNode;
			}
		}

		return ZodToTypescript
			.findTypescriptTransformator(
				zod.unknown(),
				context,
			);
	}

	public static makeContextFromZodSchema(zodSchema: ZodType, options: MakeContextOptions): MapContext {
		const context: MapContext = options.context ?? new Map();

		context.set(
			zodSchema,
			createTempAlias(options.name),
		);

		const typeNode = this.findTypescriptTransformator(
			zodSchema,
			context,
			{ skipDeclarationStatement: true },
		);

		const declaration
			= (zodSchema._identifier && context.get(zodSchema))
			|| createTextAlias(typeNode, options.name);

		if (zodSchema.description) {
			addComment(declaration, zodSchema.description);
		}

		context.delete(zodSchema);

		context.set(
			zodSchema,
			declaration,
		);

		return context;
	}

	public static convert(zodSchema: ZodType, options: ConvertOptions = {}): string {
		const baseContext = new Map(options.context);

		const identifier = options.name ?? this.getIdentifier();

		if (options.indentifiers) {
			baseContext.set(
				zodSchema,
				createTempAlias(identifier),
			);

			options.indentifiers.forEach((indentifier) => {
				const currentZodSchema = indentifier instanceof ZodType
					? indentifier
					: indentifier.zodSchema;

				const currentName = indentifier instanceof ZodType
					? this.getIdentifier()
					: indentifier.name;

				if (currentZodSchema === zodSchema) {
					return;
				}

				this.makeContextFromZodSchema(
					currentZodSchema,
					{
						name: currentName,
						context: baseContext,
					},
				);
			});

			baseContext.delete(zodSchema);
		}

		this.makeContextFromZodSchema(
			zodSchema,
			{
				name: identifier,
				context: baseContext,
			},
		);

		return this.stringifyContext(baseContext, !!options?.export);
	}

	public static getIdentifier() {
		return `Zod2ts_${(this.count++).toString(36)}_duplojs`;
	}

	public static injectZod<
		Z extends typeof zod,
	>(zod: Z) {
		this.zod = zod;
	}

	public static autoInstance(ZodTypeTypescriptTransformator: new() => TypescriptTransformator) {
		ZodToTypescript
			.typescriptTransformators
			.push(new ZodTypeTypescriptTransformator());
	}
}
