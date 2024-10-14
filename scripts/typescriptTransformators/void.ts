import { ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory, SyntaxKind } from "typescript";

@ZodTypescriptTransformator.autoInstance
export class ZodVoidTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodVoid;
	}

	public makeTypeNode(): TypeNode {
		return factory.createKeywordTypeNode(SyntaxKind.VoidKeyword);
	}
}
