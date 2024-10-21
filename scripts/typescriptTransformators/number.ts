import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory, SyntaxKind } from "typescript";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodNumber;
	},
	makeTypeNode() {
		return factory.createKeywordTypeNode(SyntaxKind.NumberKeyword);
	},
});
