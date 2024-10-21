import { ZodToTypescript } from "@scripts/ZodToTypescript";
import type { ZodEffects, ZodType } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodEffects;
	},
	makeTypeNode(zodSchema: ZodEffects<ZodType>, { findTypescriptTransformator }) {
		return findTypescriptTransformator(zodSchema._def.schema);
	},
});
