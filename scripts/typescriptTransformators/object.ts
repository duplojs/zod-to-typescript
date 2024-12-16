import { addComment } from "@scripts/utils/addComment";
import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory, SyntaxKind, isUnionTypeNode } from "typescript";
import type { ZodObject, ZodRawShape, ZodType } from "zod";

function isUndefinedTypeNode(typeNode: TypeNode): boolean {
	if (typeNode.kind === SyntaxKind.UndefinedKeyword) {
		return true;
	}

	if (isUnionTypeNode(typeNode)) {
		return typeNode.types.some((subTypeNode) => isUndefinedTypeNode(subTypeNode));
	}

	return false;
}

function createKeyIdentifier(name: string) {
	if (/^[a-zA-Z$]+[a-zA-Z0-9_$]*$/.test(name)) {
		return factory.createIdentifier(name);
	} else {
		return factory.createStringLiteral(name);
	}
}

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodObject;
	},
	makeTypeNode(zodSchema: ZodObject<ZodRawShape>, { findTypescriptTransformator }) {
		const properties = Object.entries(zodSchema.shape);

		return factory.createTypeLiteralNode(
			properties.map(([name, subZodSchema]: [string, ZodType]) => {
				const subTypeNode = findTypescriptTransformator(subZodSchema);

				const propertyTypeNode = factory.createPropertySignature(
					undefined,
					createKeyIdentifier(name),
					isUndefinedTypeNode(subTypeNode)
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
	},
});
