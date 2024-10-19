import { type MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory } from "typescript";
import type { ZodRecord, ZodType } from "zod";

@ZodToTypescript.autoInstance
export class ZodRecordTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodRecord;
	}

	public makeTypeNode(
		zodSchema: ZodRecord<ZodType<keyof any>, ZodType>,
		context: MapContext,
	): TypeNode {
		return factory.createTypeReferenceNode(
			factory.createIdentifier("Record"),
			[
				ZodToTypescript.findTypescriptTransformator(zodSchema._def.keyType, context),
				ZodToTypescript.findTypescriptTransformator(zodSchema._def.valueType, context),
			],
		);
	}
}
