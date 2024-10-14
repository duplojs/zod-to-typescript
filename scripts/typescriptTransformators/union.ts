import { type MapContext, ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory } from "typescript";
import type { ZodUnion, ZodType } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodUnionTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodUnion;
	}

	public makeTypeNode(zodSchema: ZodUnion<[ZodType]>, context: MapContext): TypeNode {
		const options = zodSchema._def.options;
		return factory.createUnionTypeNode(
			options.map(
				(option) => ZodTypescriptTransformator.findTypescriptTransformator(option, context),
			),
		);
	}
}
