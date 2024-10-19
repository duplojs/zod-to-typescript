import { TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory, SyntaxKind } from "typescript";

@ZodToTypescript.autoInstance
export class ZodSymbolTypescriptTransformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodSymbol;
	}

	public makeTypeNode(): TypeNode {
		return factory.createKeywordTypeNode(SyntaxKind.SymbolKeyword);
	}
}
