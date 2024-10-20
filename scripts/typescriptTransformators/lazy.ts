import { MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode } from "typescript";
import { ZodLazy, ZodType } from "zod";

@ZodToTypescript.autoInstance
export class ZodLazyTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodLazy;
	}

	public makeTypeNode(zodSchema: ZodLazy<ZodType>, context: MapContext): TypeNode {
		return ZodToTypescript
			.findTypescriptTransformator(
				zodSchema._def.getter(),
				context,
			);
	}
}
