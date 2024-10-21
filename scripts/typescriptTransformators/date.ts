import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory } from "typescript";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodDate;
	},
	makeTypeNode() {
		return factory.createTypeReferenceNode(factory.createIdentifier("Date"));
	},
});

