import { includesUndefinedTypeNode } from "@scripts/utils/includesUndefinedTypeNode";
import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory } from "typescript";
import type { ZodRecord, ZodType } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodRecord;
	},
	makeTypeNode(zodSchema: ZodRecord<ZodType<keyof any>, ZodType>, { findTypescriptTransformator }) {
		const recordValue = findTypescriptTransformator(zodSchema._def.valueType);
		const record = factory.createTypeReferenceNode(
			factory.createIdentifier("Record"),
			[
				findTypescriptTransformator(zodSchema._def.keyType),
				recordValue,
			],
		);

		return includesUndefinedTypeNode(recordValue)
			? factory.createTypeReferenceNode(
				factory.createIdentifier("Partial"),
				[record],
			)
			: record;
	},
});
