import { MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode } from "typescript";
import type { ZodType, ZodBranded } from "zod";

@ZodToTypescript.autoInstance
export class ZodBrandedTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodBranded;
	}

	public makeTypeNode(zodSchema: ZodBranded<ZodType, "">, context: MapContext): TypeNode {
		return ZodToTypescript.findTypescriptTransformator(zodSchema._def.type, context);
	}
}
