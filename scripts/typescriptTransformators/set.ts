import { type MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory } from "typescript";
import type { ZodSet, ZodType } from "zod";

@ZodToTypescript.autoInstance
export class ZodSetTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodSet;
	}

	public makeTypeNode(zodSchema: ZodSet<ZodType>, context: MapContext): TypeNode {
		return factory.createTypeReferenceNode(
			factory.createIdentifier("Set"),
			[ZodToTypescript.findTypescriptTransformator(zodSchema._def.valueType, context)],
		);
	}
}
