import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory } from "typescript";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodNull;
	},
	makeTypeNode() {
		return factory.createLiteralTypeNode(factory.createNull());
	},
});
