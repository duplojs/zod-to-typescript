import { type MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory } from "typescript";
import type { ZodTuple, ZodType } from "zod";

@ZodToTypescript.autoInstance
export class ZodTupleTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodTuple;
	}

	public makeTypeNode(zodSchema: ZodTuple<[ZodType]>, context: MapContext): TypeNode {
		const items = zodSchema.items.map(
			(schema) => ZodToTypescript.findTypescriptTransformator(schema, context),
		);

		const typeNodeRest = zodSchema._def.rest
			? [
				factory.createRestTypeNode(
					factory.createArrayTypeNode(
						ZodToTypescript.findTypescriptTransformator(zodSchema._def.rest, context),
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
