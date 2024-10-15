import { type MapContext, ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory } from "typescript";
import type { ZodDiscriminatedUnion } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodDiscriminatedUnionTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodDiscriminatedUnion;
	}

	public makeTypeNode(zodSchema: ZodDiscriminatedUnion<string, []>, context: MapContext): TypeNode {
		const options = [...zodSchema._def.options.values()];
		return factory.createUnionTypeNode(
			options.map(
				(option) => ZodTypescriptTransformator.findTypescriptTransformator(option, context),
			),
		);
	}
}
