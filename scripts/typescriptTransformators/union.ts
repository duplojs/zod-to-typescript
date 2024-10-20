import { type MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory } from "typescript";
import type { ZodUnion, ZodType } from "zod";

@ZodToTypescript.autoInstance
export class ZodUnionTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodUnion;
	}

	public makeTypeNode(zodSchema: ZodUnion<[ZodType]>, context: MapContext): TypeNode {
		const options = zodSchema._def.options;
		return factory.createUnionTypeNode(
			options.map(
				(option) => ZodToTypescript.findTypescriptTransformator(option, context),
			),
		);
	}
}
