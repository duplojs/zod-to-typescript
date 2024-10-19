import { type MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode } from "typescript";
import type { ZodDefault, ZodType } from "zod";

@ZodToTypescript.autoInstance
export class ZodDefaultTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodDefault;
	}

	public makeTypeNode(zodSchema: ZodDefault<ZodType>, context: MapContext): TypeNode {
		return ZodToTypescript.findTypescriptTransformator(zodSchema._def.innerType, context);
	}
}
