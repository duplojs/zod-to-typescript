import { ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory } from "typescript";
import { type ZodEnum } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodEnumTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodEnum;
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
