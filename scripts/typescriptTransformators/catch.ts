import { ZodToTypescript } from "@scripts/ZodToTypescript";
import type { ZodType, ZodCatch } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodCatch;
	},
	makeTypeNode(zodSchema: ZodCatch<ZodType>, { findTypescriptTransformator }) {
		return findTypescriptTransformator(zodSchema._def.innerType);
	},
});

