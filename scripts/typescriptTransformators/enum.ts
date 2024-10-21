import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory } from "typescript";
import { type ZodEnum } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodEnum;
	},
	makeTypeNode(zodSchema: ZodEnum<[string]>) {
		return factory.createUnionTypeNode(
			zodSchema._def.values.map(
				(value: string) => factory.createLiteralTypeNode(
					factory.createStringLiteral(value),
				),
			),
		);
	},
});
