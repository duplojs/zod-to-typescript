import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory } from "typescript";
import type { EnumLike, ZodNativeEnum } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodNativeEnum;
	},
	makeTypeNode(zodSchema: ZodNativeEnum<EnumLike>, { context, findTypescriptTransformator }) {
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

		return findTypescriptTransformator(zodSchema);
	},
});
