import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory } from "typescript";
import type { ZodRecord, ZodType } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodRecord;
	},
	makeTypeNode(zodSchema: ZodRecord<ZodType<keyof any>, ZodType>, { findTypescriptTransformator }) {
		return factory.createTypeReferenceNode(
			factory.createIdentifier("Record"),
			[
				findTypescriptTransformator(zodSchema._def.keyType),
				findTypescriptTransformator(zodSchema._def.valueType),
			],
		);
	},
});
