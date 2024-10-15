import { type MapContext, ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode } from "typescript";
import type { ZodDefault, ZodType } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodDefaultTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodDefault;
	}

	public makeTypeNode(zodSchema: ZodDefault<ZodType>, context: MapContext): TypeNode {
		return ZodTypescriptTransformator.findTypescriptTransformator(zodSchema._def.innerType, context);
	}
}
