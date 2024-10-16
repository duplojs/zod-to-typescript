import { type MapContext, ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory, SyntaxKind, isUnionTypeNode } from "typescript";
import type { ZodObject, ZodRawShape, ZodType } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodObjectTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodObject;
	}

	public makeTypeNode(zodSchema: ZodObject<ZodRawShape>, context: MapContext): TypeNode {
		const properties = Object.entries(zodSchema.shape);

		return factory.createTypeLiteralNode(
			properties.map(([name, schema]: [string, ZodType]) => {
				const keyType = ZodTypescriptTransformator.findTypescriptTransformator(schema, context);

				return factory.createPropertySignature(
					undefined,
					name,
					ZodObjectTypescriptTrasformator.isUndefinedTypeNode(keyType)
						? factory.createToken(SyntaxKind.QuestionToken)
						: undefined,
					keyType,
				);
			}),
		);
	}

	private static isUndefinedTypeNode(typeNode: TypeNode): boolean {
		if (typeNode.kind === SyntaxKind.UndefinedKeyword) {
			return true;
		}

		if (isUnionTypeNode(typeNode)) {
			return typeNode.types.some((key) => key.kind === SyntaxKind.UndefinedKeyword);
		}

		return false;
	}
}
