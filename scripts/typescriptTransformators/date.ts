import { TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory } from "typescript";

@ZodToTypescript.autoInstance
export class ZodDateTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodDate;
	}

	public makeTypeNode(): TypeNode {
		return factory.createTypeReferenceNode(factory.createIdentifier("Date"));
	}
}
