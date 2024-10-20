import { TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory, SyntaxKind } from "typescript";

@ZodToTypescript.autoInstance
export class ZodUnknownTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodUnknown;
	}

	public makeTypeNode(): TypeNode {
		return factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword);
	}
}
