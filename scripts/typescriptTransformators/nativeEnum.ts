import { MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory } from "typescript";
import type { EnumLike, ZodNativeEnum } from "zod";

@ZodToTypescript.autoInstance
export class ZodNativeEnumTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodNativeEnum;
	}

	public makeTypeNode(zodSchema: ZodNativeEnum<EnumLike>, context: MapContext): TypeNode {
		const zodNativeEnumSchema = new ZodToTypescript.zod.ZodNativeEnum(
			zodSchema._def,
		);

		const enumDeclarationStatement = factory.createEnumDeclaration(
			[],
			zodSchema._identifier ?? ZodToTypescript.getIdentifier(),
			Object.entries(zodSchema.enum).map(
				([key, value]) => factory.createEnumMember(
					key,
					typeof value === "string"
						? factory.createStringLiteral(value)
						: factory.createNumericLiteral(value),
				),
			),
		);

		context.set(
			zodNativeEnumSchema,
			enumDeclarationStatement,
		);

		return ZodToTypescript.findTypescriptTransformator(zodSchema, context);
	}
}
