import { TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory, SyntaxKind } from "typescript";

@ZodToTypescript.autoInstance
export class ZodAnyTypescriptTransformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodAny;
	}

	public makeTypeNode(): TypeNode {
		return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
	}
}
