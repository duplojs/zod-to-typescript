import { MapContext, ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode } from "typescript";
import { ZodLazy, ZodType } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodLazyTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodLazy;
	}

	public makeTypeNode(zodSchema: ZodLazy<ZodType>, context: MapContext): TypeNode {
		return ZodTypescriptTransformator
			.findTypescriptTransformator(
				zodSchema._def.getter(),
				context,
			);
	}
}
