import { ZodType, z as zod } from "zod";
import ts, { type TypeNode, type TypeAliasDeclaration, factory, SyntaxKind, type EnumDeclaration } from "typescript";

export type MapContext = Map<ZodType, TypeAliasDeclaration | EnumDeclaration>;

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
}

export abstract class ZodTypescriptTransformator {
	public abstract get support(): new (...args: any[]) => ZodType;

	public abstract makeTypeNode(zodSchema: ZodType, context: MapContext): TypeNode;

	public static typescriptTransformators: ZodTypescriptTransformator[] = [];

	protected static zod = zod;

	private static count = 0;

	public static contextToTypeInString(context: MapContext): string {
		const sourceFile = ts.createSourceFile("print.ts", "", ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
		const printer = ts.createPrinter();

		return [...context.values()]
			.map((nodeAlias) => printer.printNode(ts.EmitHint.Unspecified, nodeAlias, sourceFile))
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

				if (zodSchema.description) {
					ts.addSyntheticLeadingComment(
						typeNode,
						SyntaxKind.MultiLineCommentTrivia,
						`* ${zodSchema.description}`,
						true,
					);
				}

				return typeNode;
			}
		}

		throw new Error("ehh mais zebi");
	}

	public static makeContext(zodSchema: ZodType, options: MakeContextOptions): MapContext {
		const context = new Map(options.context);

		context.set(
			zodSchema,
			factory.createTypeAliasDeclaration(
				undefined,
				factory.createIdentifier(options.name),
				undefined,
				factory.createLiteralTypeNode(factory.createNull()),
			),
		);

		const nodeType = this.findTypescriptTransformator(zodSchema, context, true);

		context.delete(zodSchema);

		context.set(
			zodSchema,
			factory.createTypeAliasDeclaration(
				undefined,
				factory.createIdentifier(options.name),
				undefined,
				nodeType,
			),
		);

		return context;
	}

	public static convert(zodSchema: ZodType, options: ConvertOptions = {}): string {
		let baseContext = new Map(options.context);

		if (options.indentifiers) {
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
		}

		const context = this.makeContext(
			zodSchema,
			{
				name: options.name ?? this.getIdentifier(),
				context: baseContext,
			},
		);

		return this.contextToTypeInString(context);
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
