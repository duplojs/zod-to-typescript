import { type MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory } from "typescript";
import type { ZodIntersection, ZodType } from "zod";

@ZodToTypescript.autoInstance
export class ZodIntersectionTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodIntersection;
	}

	public makeTypeNode(zodSchema: ZodIntersection<ZodType, ZodType>, context: MapContext): TypeNode {
		return factory.createIntersectionTypeNode([
			ZodToTypescript.findTypescriptTransformator(zodSchema._def.left, context),
			ZodToTypescript.findTypescriptTransformator(zodSchema._def.right, context),
		]);
	}
}
