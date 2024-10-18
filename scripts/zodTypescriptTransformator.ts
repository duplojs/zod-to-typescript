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
	context: MapContext;
}

export interface ConvertOptions {
	name?: string;
	context?: MapContext;
	indentifiers?: (ConvertIdentifier | ZodType)[];
	export?: boolean;
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

export abstract class ZodTypescriptTransformator {
	public abstract get support(): new (...args: any[]) => ZodType;

	public abstract makeTypeNode(zodSchema: ZodType, context: MapContext): TypeNode;

	public static typescriptTransformators: ZodTypescriptTransformator[] = [];

	protected static zod = zod;

	private static count = 0;

	public static contextToTypeInString(context: MapContext, exportType = false): string {
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
		skipDeclarationStatement = false,
	): TypeNode {
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

					return ZodTypescriptTransformator
						.findTypescriptTransformator(
							zodSchema,
							context,
						);
				}

				return typeNode;
			}
		}

		return ZodTypescriptTransformator
			.findTypescriptTransformator(
				zod.unknown(),
				context,
			);
	}

	public static makeContext(zodSchema: ZodType, options: MakeContextOptions): MapContext {
		const context = new Map(options.context);

		context.set(
			zodSchema,
			createTempAlias(options.name),
		);

		const typeNode = this.findTypescriptTransformator(zodSchema, context, true);

		const declaration = createTextAlias(typeNode, options.name);

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
		let baseContext = new Map(options.context);

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

				const localContext = this.makeContext(
					currentZodSchema,
					{
						name: currentName,
						context: baseContext,
					},
				);

				baseContext = new Map([...baseContext, ...localContext]);
			});

			baseContext.delete(zodSchema);
		}

		const context = this.makeContext(
			zodSchema,
			{
				name: identifier,
				context: baseContext,
			},
		);

		return this.contextToTypeInString(context, !!options?.export);
	}

	public static getIdentifier() {
		return `Zod2ts_${(this.count++).toString(36)}_duplojs`;
	}

	public static injectZod<
		Z extends typeof zod,
	>(zod: Z) {
		this.zod = zod;
	}

	public static autoInstance(ZodTypeTypescriptTransformator: new() => ZodTypescriptTransformator) {
		ZodTypescriptTransformator
			.typescriptTransformators
			.push(new ZodTypeTypescriptTransformator());
	}
}
