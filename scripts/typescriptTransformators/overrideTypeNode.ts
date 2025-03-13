import { ZodToTypescript } from "@scripts/ZodToTypescript";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return !!zodSchema._zttOverrideTypeNode;
	},
	makeTypeNode(zodSchema) {
		return zodSchema._zttOverrideTypeNode!;
	},
});
