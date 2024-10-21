import { ZodToTypescript } from "@scripts/ZodToTypescript";
import type { ZodLazy, ZodType } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodLazy;
	},
	makeTypeNode(zodSchema: ZodLazy<ZodType>, { findTypescriptTransformator }) {
		return findTypescriptTransformator(
			zodSchema._def.getter(),
		);
	},
});
