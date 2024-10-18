import { ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory } from "typescript";

@ZodTypescriptTransformator.autoInstance
export class ZodDateTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodDate;
	}

	public makeTypeNode(): TypeNode {
		return factory.createTypeReferenceNode(factory.createIdentifier("Date"));
	}
}
