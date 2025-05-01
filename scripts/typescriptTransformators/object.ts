import { addComment } from "@scripts/utils/addComment";
import { createKeyIdentifier } from "@scripts/utils/createKeyIdentifier";
import { includesUndefinedTypeNode } from "@scripts/utils/includesUndefinedTypeNode";
import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory, SyntaxKind } from "typescript";
import type { ZodObject, ZodRawShape, ZodType } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodObject;
	},
	makeTypeNode(zodSchema: ZodObject<ZodRawShape>, { findTypescriptTransformator }) {
		const properties = Object.entries(zodSchema.shape);
		const catchAllSchema: ZodType = zodSchema._def.unknownKeys === "passthrough"
			? ZodToTypescript.zod.unknown()
			: zodSchema._def.catchall;

		const objectPropertiesTypeNode = factory.createTypeLiteralNode(
			properties.map(([name, subZodSchema]: [string, ZodType]) => {
				const subTypeNode = findTypescriptTransformator(subZodSchema);

				const propertyTypeNode = factory.createPropertySignature(
					undefined,
					createKeyIdentifier(name),
					includesUndefinedTypeNode(subTypeNode)
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

		if (catchAllSchema instanceof ZodToTypescript.zod.ZodNever) {
			return objectPropertiesTypeNode;
		} else {
			return factory.createIntersectionTypeNode([
				objectPropertiesTypeNode,
				factory.createTypeLiteralNode([
					factory.createIndexSignature(
						undefined,
						[
							factory.createParameterDeclaration(
								undefined,
								undefined,
								"key",
								undefined,
								factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
							),
						],
						findTypescriptTransformator(catchAllSchema),
					),
				]),
			]);
		}
	},
});
