import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory, SyntaxKind } from "typescript";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodString;
	},
	makeTypeNode() {
		return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
	},
});
