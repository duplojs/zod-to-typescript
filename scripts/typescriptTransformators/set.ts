import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory } from "typescript";
import type { ZodSet, ZodType } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodSet;
	},
	makeTypeNode(zodSchema: ZodSet<ZodType>, { findTypescriptTransformator }) {
		return factory.createTypeReferenceNode(
			factory.createIdentifier("Set"),
			[findTypescriptTransformator(zodSchema._def.valueType)],
		);
	},
});
