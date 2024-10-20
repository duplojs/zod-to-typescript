import { type MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory, type TypeNode } from "typescript";
import type { ZodReadonly, ZodType } from "zod";

@ZodToTypescript.autoInstance
export class ZodReadonlyTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodReadonly;
	}

	public makeTypeNode(zodSchema: ZodReadonly<ZodType>, context: MapContext): TypeNode {
		return factory.createTypeReferenceNode(
			factory.createIdentifier("Readonly"),
			[ZodToTypescript.findTypescriptTransformator(zodSchema._def.innerType, context)],
		);
	}
}
