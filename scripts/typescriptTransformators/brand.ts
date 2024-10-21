import { ZodToTypescript } from "@scripts/ZodToTypescript";
import type { ZodType, ZodBranded } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodBranded;
	},
	makeTypeNode(zodSchema: ZodBranded<ZodType, "">, { findTypescriptTransformator }) {
		return findTypescriptTransformator(zodSchema._def.type);
	},
});
