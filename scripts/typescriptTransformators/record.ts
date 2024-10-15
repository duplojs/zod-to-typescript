import { type MapContext, ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory } from "typescript";
import type { ZodRecord, ZodType, ZodString, ZodNumber, ZodSymbol } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodRecordTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodRecord;
	}

	public makeTypeNode(
		zodSchema: ZodRecord<ZodString | ZodNumber | ZodSymbol, ZodType>,
		context: MapContext,
	): TypeNode {
		return factory.createTypeReferenceNode(
			factory.createIdentifier("Record"),
			[
				ZodTypescriptTransformator.findTypescriptTransformator(zodSchema._def.keyType, context),
				ZodTypescriptTransformator.findTypescriptTransformator(zodSchema._def.valueType, context),
			],
		);
	}
}
