import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory, SyntaxKind } from "typescript";
import { type ZodFunction, type ZodTuple, type ZodType } from "zod";

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodFunction;
	},
	makeTypeNode(zodSchema: ZodFunction<ZodTuple<[ZodType]>, ZodType>, { findTypescriptTransformator }) {
		const argTypes = zodSchema._def.args._def.items.map(
			(arg, index) => factory.createParameterDeclaration(
				undefined,
				undefined,
				factory.createIdentifier(`args_${index}`),
				undefined,
				findTypescriptTransformator(arg),
			),
		);

		const restArgTypes = zodSchema._def.args._def.rest
			? [
				factory.createParameterDeclaration(
					undefined,
					factory.createToken(SyntaxKind.DotDotDotToken),
					factory.createIdentifier("rest"),
					undefined,
					factory.createArrayTypeNode(
						factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword),
					),
				),
			]
			: [];

		return factory.createFunctionTypeNode(
			undefined,
			[...argTypes, ...restArgTypes],
			findTypescriptTransformator(zodSchema._def.returns),
		);
	},
});
