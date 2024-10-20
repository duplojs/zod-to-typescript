import { type MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory } from "typescript";
import type { ZodPromise, ZodType } from "zod";

@ZodToTypescript.autoInstance
export class ZodPromiseTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodPromise;
	}

	public makeTypeNode(zodSchema: ZodPromise<ZodType>, context: MapContext): TypeNode {
		return factory.createTypeReferenceNode(
			factory.createIdentifier("Promise"),
			[ZodToTypescript.findTypescriptTransformator(zodSchema._def.type, context)],
		);
	}
}
