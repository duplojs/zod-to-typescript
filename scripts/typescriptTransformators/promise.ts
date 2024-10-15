import { type MapContext, ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory } from "typescript";
import type { ZodPromise, ZodType } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodPromiseTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodPromise;
	}

	public makeTypeNode(zodSchema: ZodPromise<ZodType>, context: MapContext): TypeNode {
		return factory.createTypeReferenceNode(
			factory.createIdentifier("Promise"),
			[ZodTypescriptTransformator.findTypescriptTransformator(zodSchema._def.type, context)],
		);
	}
}
