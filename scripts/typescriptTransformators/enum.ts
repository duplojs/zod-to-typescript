import { TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory } from "typescript";
import { type ZodEnum } from "zod";

@ZodToTypescript.autoInstance
export class ZodEnumTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodEnum;
	}

	public makeTypeNode(zodSchema: ZodEnum<[string]>): TypeNode {
		return factory.createUnionTypeNode(
			zodSchema._def.values.map(
				(value: string) => factory.createLiteralTypeNode(
					factory.createStringLiteral(value),
				),
			),
		);
	}
}
