import { type MapContext, ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory, SyntaxKind } from "typescript";
import type { ZodOptional, ZodType } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodOptionalTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodOptional;
	}

	public makeTypeNode(zodSchema: ZodOptional<ZodType>, context: MapContext): TypeNode {
		return factory.createUnionTypeNode([
			ZodTypescriptTransformator.findTypescriptTransformator(
				zodSchema._def.innerType,
				context,
			),
			factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword),
		]);
	}
}
