import { ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory } from "typescript";
import { type ZodSchema } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodEnumTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodEnum;
	}

	public makeTypeNode(zodSchema: ZodSchema): TypeNode {
		const types = this.getElementsType(zodSchema);

		if (!types) {
			// return factory.createArrayTypeNode(factory.createKeywordTypeNode(SyntaxKind.AnyKeyword));
			throw new Error("Invalid ZodEnum schema");
		}

		return factory.createUnionTypeNode(types);
	}

	private getElementsType(zodSchema: ZodSchema): TypeNode[] | null {
		if (zodSchema instanceof ZodTypescriptTransformator.zod.ZodEnum) {
			const values: string[] = zodSchema._def.values;
			return values.map(
				(value: string) => factory.createLiteralTypeNode(factory.createStringLiteral(value)),
			);
		}
		return null;
	}
}
