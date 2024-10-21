import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory } from "typescript";
import type { ZodArray, ZodType } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodArray;
	},
	makeTypeNode(zodSchema: ZodArray<ZodType>, { findTypescriptTransformator }) {
		return factory.createArrayTypeNode(
			findTypescriptTransformator(
				zodSchema._def.type,
			),
		);
	},
});
