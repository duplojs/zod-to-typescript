import { type MapContext, ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory } from "typescript";
import type { ZodSet, ZodType } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodSetTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodSet;
	}

	public makeTypeNode(zodSchema: ZodSet<ZodType>, context: MapContext): TypeNode {
		return factory.createTypeReferenceNode(
			factory.createIdentifier("Set"),
			[ZodTypescriptTransformator.findTypescriptTransformator(zodSchema._def.valueType, context)],
		);
	}
}
