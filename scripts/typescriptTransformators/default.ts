import { ZodToTypescript } from "@scripts/ZodToTypescript";
import type { ZodDefault, ZodType } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodDefault;
	},
	makeTypeNode(zodSchema: ZodDefault<ZodType>, { findTypescriptTransformator }) {
		return findTypescriptTransformator(zodSchema._def.innerType);
	},
});

