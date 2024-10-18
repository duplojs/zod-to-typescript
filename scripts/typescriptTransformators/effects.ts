import { type MapContext, ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode } from "typescript";
import type { ZodEffects, ZodType } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodEffectsTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodEffects;
	}

	public makeTypeNode(zodSchema: ZodEffects<ZodType>, context: MapContext): TypeNode {
		return ZodTypescriptTransformator.findTypescriptTransformator(zodSchema._def.schema, context);
	}
}
