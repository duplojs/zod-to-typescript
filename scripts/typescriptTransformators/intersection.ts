import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory } from "typescript";
import type { ZodIntersection, ZodType } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodIntersection;
	},
	makeTypeNode(zodSchema: ZodIntersection<ZodType, ZodType>, { findTypescriptTransformator }) {
		return factory.createIntersectionTypeNode([
			findTypescriptTransformator(zodSchema._def.left),
			findTypescriptTransformator(zodSchema._def.right),
		]);
	},
});
