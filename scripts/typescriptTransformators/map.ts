import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory } from "typescript";
import type { ZodMap, ZodType } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodMap;
	},
	makeTypeNode(zodSchema: ZodMap<ZodType, ZodType>, { findTypescriptTransformator }) {
		return factory.createTypeReferenceNode(
			factory.createIdentifier("Map"),
			[
				findTypescriptTransformator(zodSchema._def.keyType),
				findTypescriptTransformator(zodSchema._def.valueType),
			],
		);
	},
});
