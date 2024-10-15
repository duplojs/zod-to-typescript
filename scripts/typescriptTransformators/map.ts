import { type MapContext, ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory } from "typescript";
import type { ZodMap, ZodType } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodMapTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodMap;
	}

	public makeTypeNode(zodSchema: ZodMap<ZodType, ZodType>, context: MapContext): TypeNode {
		return factory.createTypeReferenceNode(factory.createIdentifier("Map"), [
			ZodTypescriptTransformator.findTypescriptTransformator(zodSchema._def.keyType, context),
			ZodTypescriptTransformator.findTypescriptTransformator(zodSchema._def.valueType, context),
		]);
	}
}
