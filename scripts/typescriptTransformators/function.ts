import { type MapContext, TypescriptTransformator, ZodToTypescript } from "@scripts/ZodToTypescript";
import { type TypeNode, factory, SyntaxKind } from "typescript";
import { type ZodFunction, type ZodTuple, type ZodType } from "zod";

@ZodToTypescript.autoInstance
export class ZodFunctionTypescriptTrasformator implements TypescriptTransformator {
	public get support() {
		return ZodToTypescript.zod.ZodFunction;
	}

	public makeTypeNode(zodSchema: ZodFunction<ZodTuple<[ZodType]>, ZodType>, context: MapContext): TypeNode {
		const argTypes = zodSchema._def.args._def.items.map(
			(arg, index) => factory.createParameterDeclaration(
				undefined,
				undefined,
				factory.createIdentifier(`args_${index}`),
				undefined,
				ZodToTypescript.findTypescriptTransformator(arg, context),
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
			ZodToTypescript.findTypescriptTransformator(zodSchema._def.returns, context),
		);
	}
}
