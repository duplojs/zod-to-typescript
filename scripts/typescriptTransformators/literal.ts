import { ZodToTypescript } from "@scripts/ZodToTypescript";
import { factory, SyntaxKind } from "typescript";
import { type Primitive, type ZodLiteral } from "zod";

const litteralMapper = {
	string: (value: string) => factory.createLiteralTypeNode(factory.createStringLiteral(value)),
	number: (value: number) => factory.createLiteralTypeNode(factory.createNumericLiteral(value)),
	boolean: (value: boolean) => value
		? factory.createLiteralTypeNode(factory.createTrue())
		: factory.createLiteralTypeNode(factory.createFalse()),
	bigint: (value: bigint) => factory.createLiteralTypeNode(factory.createBigIntLiteral(value.toString())),
	symbol: (value: symbol) => factory.createLiteralTypeNode(factory.createStringLiteral(value.toString())),
	object: () => factory.createLiteralTypeNode(factory.createNull()),
	undefined: () => factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword),
	function: () => factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword),
};

ZodToTypescript.typescriptTransformators.push({
	support(zodSchema) {
		return zodSchema instanceof ZodToTypescript.zod.ZodLiteral;
	},
	makeTypeNode(zodSchema: ZodLiteral<Primitive>) {
		const value = zodSchema._def.value;
		const valueType = typeof value;

		return litteralMapper[valueType](value as never);
	},
});
