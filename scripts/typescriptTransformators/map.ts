import { type MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory } from "typescript";
import type { ZodMap, ZodType } from "zod";

@ZodToTypescript.autoInstance
export class ZodMapTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodMap;
	}

	public makeTypeNode(zodSchema: ZodMap<ZodType, ZodType>, context: MapContext): TypeNode {
		return factory.createTypeReferenceNode(
			factory.createIdentifier("Map"),
			[
				ZodToTypescript.findTypescriptTransformator(zodSchema._def.keyType, context),
				ZodToTypescript.findTypescriptTransformator(zodSchema._def.valueType, context),
			],
		);
	}
}
