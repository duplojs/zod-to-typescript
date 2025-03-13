import { ZodToTypescript } from "@scripts/ZodToTypescript";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return !!zodSchema._overrideTypeNode;
	},
	makeTypeNode(zodSchema) {
		return zodSchema._overrideTypeNode!;
	},
});
