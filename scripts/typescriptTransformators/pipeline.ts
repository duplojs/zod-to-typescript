import { MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode } from "typescript";
import { ZodPipeline, ZodType } from "zod";

@ZodToTypescript.autoInstance
export class ZodPipelineTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodPipeline;
	}

	public makeTypeNode(zodSchema: ZodPipeline<ZodType, ZodType>, context: MapContext): TypeNode {
		return ZodToTypescript
			.findTypescriptTransformator(
				zodSchema._def.in,
				context,
			);
	}
}
