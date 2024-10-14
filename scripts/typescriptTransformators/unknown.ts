import { ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory, SyntaxKind } from "typescript";

@ZodTypescriptTransformator.autoInstance
export class ZodUnknownTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodUnknown;
	}

	public makeTypeNode(): TypeNode {
		return factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword);
	}
}
