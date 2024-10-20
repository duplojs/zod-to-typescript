import { TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory, SyntaxKind } from "typescript";

@ZodToTypescript.autoInstance
export class ZodNanTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodNaN;
	}

	public makeTypeNode(): TypeNode {
		return factory.createKeywordTypeNode(SyntaxKind.NumberKeyword);
	}
}
