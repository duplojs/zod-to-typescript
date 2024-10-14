import { type MapContext, ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory } from "typescript";
import type { ZodArray, ZodType } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodArrayTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodArray;
	}

	public makeTypeNode(zodSchema: ZodArray<ZodType>, context: MapContext): TypeNode {
		return factory.createArrayTypeNode(
			ZodTypescriptTransformator.findTypescriptTransformator(
				zodSchema._def.type,
				context,
			),
		);
	}
}
