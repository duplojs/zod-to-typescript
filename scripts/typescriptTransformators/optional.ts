import { type MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory, SyntaxKind } from "typescript";
import type { ZodOptional, ZodType } from "zod";

@ZodToTypescript.autoInstance
export class ZodOptionalTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodOptional;
	}

	public makeTypeNode(zodSchema: ZodOptional<ZodType>, context: MapContext): TypeNode {
		return factory.createUnionTypeNode([
			ZodToTypescript.findTypescriptTransformator(
				zodSchema._def.innerType,
				context,
			),
			factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword),
		]);
	}
}
