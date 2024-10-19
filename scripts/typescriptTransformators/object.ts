import { addComment } from "@scripts/utils/addComment";
import { type MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory, SyntaxKind, isUnionTypeNode } from "typescript";
import type { ZodObject, ZodRawShape, ZodType } from "zod";

@ZodToTypescript.autoInstance
export class ZodObjectTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodObject;
	}

	public makeTypeNode(zodSchema: ZodObject<ZodRawShape>, context: MapContext): TypeNode {
		const properties = Object.entries(zodSchema.shape);

		return factory.createTypeLiteralNode(
			properties.map(([name, subZodSchema]: [string, ZodType]) => {
				const subTypeNode = ZodToTypescript.findTypescriptTransformator(subZodSchema, context);

				const propertyTypeNode = factory.createPropertySignature(
					undefined,
					name,
					ZodObjectTypescriptTrasformator.isUndefinedTypeNode(subTypeNode)
						? factory.createToken(SyntaxKind.QuestionToken)
						: undefined,
					subTypeNode,
				);

				if (subZodSchema.description) {
					addComment(propertyTypeNode, subZodSchema.description);
				}
				return propertyTypeNode;
			}),
		);
	}

	private static isUndefinedTypeNode(typeNode: TypeNode): boolean {
		if (typeNode.kind === SyntaxKind.UndefinedKeyword) {
			return true;
		}

		if (isUnionTypeNode(typeNode)) {
			return typeNode.types.some((subTypeNode) => this.isUndefinedTypeNode(subTypeNode));
		}

		return false;
	}
}
