import { type MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory } from "typescript";
import type { ZodNullable, ZodType } from "zod";

@ZodToTypescript.autoInstance
export class ZodNullableTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodNullable;
	}

	public makeTypeNode(zodSchema: ZodNullable<ZodType>, context: MapContext): TypeNode {
		return factory.createUnionTypeNode([
			ZodToTypescript.findTypescriptTransformator(
				zodSchema._def.innerType,
				context,
			),
			factory.createLiteralTypeNode(factory.createNull()),
		]);
	}
}
