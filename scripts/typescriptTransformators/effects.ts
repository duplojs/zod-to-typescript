import { type MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode } from "typescript";
import type { ZodEffects, ZodType } from "zod";

@ZodToTypescript.autoInstance
export class ZodEffectsTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodEffects;
	}

	public makeTypeNode(zodSchema: ZodEffects<ZodType>, context: MapContext): TypeNode {
		return ZodToTypescript.findTypescriptTransformator(zodSchema._def.schema, context);
	}
}
