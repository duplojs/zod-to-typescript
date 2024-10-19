import { type MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory } from "typescript";
import type { ZodArray, ZodType } from "zod";

@ZodToTypescript.autoInstance
export class ZodArrayTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodArray;
	}

	public makeTypeNode(zodSchema: ZodArray<ZodType>, context: MapContext): TypeNode {
		return factory.createArrayTypeNode(
			ZodToTypescript.findTypescriptTransformator(
				zodSchema._def.type,
				context,
			),
		);
	}
}
