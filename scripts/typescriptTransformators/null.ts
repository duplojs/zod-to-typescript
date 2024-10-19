import { TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory } from "typescript";

@ZodToTypescript.autoInstance
export class ZodNullTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodNull;
	}

	public makeTypeNode(): TypeNode {
		return factory.createLiteralTypeNode(factory.createNull());
	}
}
