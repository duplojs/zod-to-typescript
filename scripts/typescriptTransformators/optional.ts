import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory, SyntaxKind } from "typescript";
import type { ZodOptional, ZodType } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodOptional;
	},
	makeTypeNode(zodSchema: ZodOptional<ZodType>, { findTypescriptTransformator }) {
		return factory.createUnionTypeNode([
			findTypescriptTransformator(
				zodSchema._def.innerType,
			),
			factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword),
		]);
	},
});
