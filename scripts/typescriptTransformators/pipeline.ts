import { MapContext, ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode } from "typescript";
import { ZodPipeline, ZodType } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodPipelineTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodPipeline;
	}

	public makeTypeNode(zodSchema: ZodPipeline<ZodType, ZodType>, context: MapContext): TypeNode {
		return ZodTypescriptTransformator
			.findTypescriptTransformator(
				zodSchema._def.in,
				context,
			);
	}
}
