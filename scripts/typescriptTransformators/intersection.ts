import { type MapContext, ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory } from "typescript";
import type { ZodIntersection, ZodType } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodIntersectionTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodIntersection;
	}

	public makeTypeNode(zodSchema: ZodIntersection<ZodType, ZodType>, context: MapContext): TypeNode {
		return factory.createIntersectionTypeNode([
			ZodTypescriptTransformator.findTypescriptTransformator(zodSchema._def.left, context),
			ZodTypescriptTransformator.findTypescriptTransformator(zodSchema._def.right, context),
		]);
	}
}
