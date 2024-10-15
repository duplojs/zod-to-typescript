import { MapContext, ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { type TypeNode, factory } from "typescript";
import type { EnumLike, ZodNativeEnum } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodNativeEnumTypescriptTrasformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodNativeEnum;
	}

	public makeTypeNode(zodSchema: ZodNativeEnum<EnumLike>, context: MapContext): TypeNode {
		const zodNativeEnumSchema = new ZodTypescriptTransformator.zod.ZodNativeEnum(
			zodSchema._def,
		);

		const enumDeclarationStatement = factory.createEnumDeclaration(
			[],
			ZodTypescriptTransformator.getIdentifier(),
			Object.entries(zodSchema.enum).map(
				([key, value]) => factory.createEnumMember(
					key,
					typeof value === "string"
						? factory.createStringLiteral(value)
						: factory.createNumericLiteral(value),
				),
			),
		);

		context.set(zodNativeEnumSchema, enumDeclarationStatement);

		return ZodTypescriptTransformator.findTypescriptTransformator(zodSchema, context);
	}
}
