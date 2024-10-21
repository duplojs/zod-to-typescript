import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory } from "typescript";
import type { ZodUnion, ZodType } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodUnion;
	},
	makeTypeNode(zodSchema: ZodUnion<[ZodType]>, { findTypescriptTransformator }) {
		const options = zodSchema._def.options;
		return factory.createUnionTypeNode(
			options.map(
				(option) => findTypescriptTransformator(option),
			),
		);
	},
});
