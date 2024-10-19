import { type MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory } from "typescript";
import type { ZodDiscriminatedUnion } from "zod";

@ZodToTypescript.autoInstance
export class ZodDiscriminatedUnionTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodDiscriminatedUnion;
	}

	public makeTypeNode(zodSchema: ZodDiscriminatedUnion<string, []>, context: MapContext): TypeNode {
		const options = [...zodSchema._def.options.values()];
		return factory.createUnionTypeNode(
			options.map(
				(option) => ZodToTypescript.findTypescriptTransformator(option, context),
			),
		);
	}
}
