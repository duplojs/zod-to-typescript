import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory } from "typescript";
import type { ZodDiscriminatedUnion } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodDiscriminatedUnion;
	},
	makeTypeNode(zodSchema: ZodDiscriminatedUnion<string, []>, { findTypescriptTransformator }) {
		const options = [...zodSchema._def.options.values()];
		return factory.createUnionTypeNode(
			options.map(
				(option) => findTypescriptTransformator(option),
			),
		);
	},
});
