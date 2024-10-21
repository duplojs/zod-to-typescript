import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory } from "typescript";
import type { ZodNullable, ZodType } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodNullable;
	},
	makeTypeNode(zodSchema: ZodNullable<ZodType>, { findTypescriptTransformator }) {
		return factory.createUnionTypeNode([
			findTypescriptTransformator(
				zodSchema._def.innerType,
			),
			factory.createLiteralTypeNode(factory.createNull()),
		]);
	},
});
