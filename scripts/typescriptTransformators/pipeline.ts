import { ZodToTypescript } from "@scripts/ZodToTypescript";
import type { ZodPipeline, ZodType } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodPipeline;
	},
	makeTypeNode(zodSchema: ZodPipeline<ZodType, ZodType>, { findTypescriptTransformator }) {
		return findTypescriptTransformator(
			zodSchema._def.in,
		);
	},
});
