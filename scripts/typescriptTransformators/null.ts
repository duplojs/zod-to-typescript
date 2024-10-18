import { ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory } from "typescript";

@ZodTypescriptTransformator.autoInstance
export class ZodNullTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodNull;
	}

	public makeTypeNode(): TypeNode {
		return factory.createLiteralTypeNode(factory.createNull());
	}
}
