import { type MapContext, ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory } from "typescript";
import type { ZodNullable, ZodType } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodNullableTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodNullable;
	}

	public makeTypeNode(zodSchema: ZodNullable<ZodType>, context: MapContext): TypeNode {
		return factory.createUnionTypeNode([
			ZodTypescriptTransformator.findTypescriptTransformator(
				zodSchema._def.innerType,
				context,
			),
			factory.createLiteralTypeNode(factory.createNull()),
		]);
	}
}
