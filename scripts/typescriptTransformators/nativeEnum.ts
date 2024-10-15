import { ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory } from "typescript";
import type { EnumLike, ZodNativeEnum } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodNativeEnumTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodNativeEnum;
	}

	public makeTypeNode(zodSchema: ZodNativeEnum<EnumLike>): TypeNode {
		return factory.createUnionTypeNode(
			Object.values(zodSchema._def.values).map((value) => typeof value === "number"
				? factory.createLiteralTypeNode(factory.createNumericLiteral(value))
				: factory.createLiteralTypeNode(factory.createStringLiteral(value))),
		);
	}
}
