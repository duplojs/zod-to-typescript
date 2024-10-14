import { ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory, SyntaxKind } from "typescript";

@ZodTypescriptTransformator.autoInstance
export class ZodBooleanTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodBoolean;
	}

	public makeTypeNode(): TypeNode {
		return factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword);
	}
}
