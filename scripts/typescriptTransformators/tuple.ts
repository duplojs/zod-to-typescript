import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory } from "typescript";
import type { ZodTuple, ZodType } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodTuple;
	},
	makeTypeNode(zodSchema: ZodTuple<[ZodType]>, { findTypescriptTransformator }) {
		const items = zodSchema.items.map(
			(schema) => findTypescriptTransformator(schema),
		);

		const typeNodeRest = zodSchema._def.rest
			? [
				factory.createRestTypeNode(
					factory.createArrayTypeNode(
						findTypescriptTransformator(zodSchema._def.rest),
					),
				),
			]
			: [];

		return factory.createTupleTypeNode([
			...items,
			...typeNodeRest,
		]);
	},
});
