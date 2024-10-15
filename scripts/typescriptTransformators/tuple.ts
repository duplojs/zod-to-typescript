import { type MapContext, ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory } from "typescript";
import type { ZodTuple, ZodType } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodTupleTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodTuple;
	}

	public makeTypeNode(zodSchema: ZodTuple<[ZodType]>, context: MapContext): TypeNode {
		const items = zodSchema.items.map(
			(schema) => ZodTypescriptTransformator.findTypescriptTransformator(schema, context),
		);

		const typeNodeRest = zodSchema._def.rest
			? [
				factory.createRestTypeNode(
					factory.createArrayTypeNode(
						ZodTypescriptTransformator.findTypescriptTransformator(zodSchema._def.rest, context),
					),
				),
			]
			: [];

		return factory.createTupleTypeNode([
			...items,
			...typeNodeRest,
		]);
	}
}
