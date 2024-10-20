import { MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode } from "typescript";
import type { ZodType, ZodCatch } from "zod";

@ZodToTypescript.autoInstance
export class ZodCatchTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodCatch;
	}

	public makeTypeNode(zodSchema: ZodCatch<ZodType>, context: MapContext): TypeNode {
		return ZodToTypescript.findTypescriptTransformator(zodSchema._def.innerType, context);
	}
}
