import { MapContext, ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode } from "typescript";
import type { ZodType, ZodBranded } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodBrandedTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodBranded;
	}

	public makeTypeNode(zodSchema: ZodBranded<ZodType, "">, context: MapContext): TypeNode {
		return ZodTypescriptTransformator.findTypescriptTransformator(zodSchema._def.type, context);
	}
}
