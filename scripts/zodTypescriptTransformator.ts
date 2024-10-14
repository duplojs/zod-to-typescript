import { type ZodType, z as zod } from "zod";
import ts, { type TypeNode, type TypeAliasDeclaration, factory } from "typescript";

export type MapContext = Map<ZodType, TypeAliasDeclaration>;

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
	indentifiers?: ConvertIdentifier[];
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
			.reduce(
				(pv, cv) => pv + cv,
				"",
			);
	}

	public static findTypescriptTransformator(
		zodSchema: ZodType,
		context: MapContext,
	): TypeNode {
		const nodeAlias = context.get(zodSchema);

		if (nodeAlias) {
			return factory.createTypeReferenceNode(
				factory.createIdentifier(nodeAlias.name.text),
			);
		}

		for (const typescriptTransformator of this.typescriptTransformators) {
			if (zodSchema instanceof typescriptTransformator.support) {
				return typescriptTransformator.makeTypeNode(zodSchema, context);
			}
		}

		throw new Error("ehh mais zebi");
	}

	public static makeContext(zodSchema: ZodType, options: MakeContextOptions): MapContext {
		const context = new Map(options.context);

		const nodeType = this.findTypescriptTransformator(zodSchema, context);

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
				if (indentifier.zodSchema === zodSchema) {
					return;
				}

				const localContext = this.makeContext(
					indentifier.zodSchema,
					{
						name: indentifier.name,
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
		this.count++;
		return `Zod2ts_${this.count.toString(36)}_duplojs`;
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
