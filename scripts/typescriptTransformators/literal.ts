import { ZodTypescriptTransformator } from "@scripts/zodTypescriptTransformator";
import { factory, SyntaxKind, type TypeNode } from "typescript";
import { type Primitive, type ZodLiteral } from "zod";

@ZodTypescriptTransformator.autoInstance
export class ZodLiteralTypescriptTransformator extends ZodTypescriptTransformator {
	public get support() {
		return ZodTypescriptTransformator.zod.ZodLiteral;
	}

	public makeTypeNode(zodSchema: ZodLiteral<Primitive>): TypeNode {
		const value = zodSchema._def.value;
		const valueType = typeof value;

		if (valueType in ZodLiteralTypescriptTransformator.litteralMapper) {
			return ZodLiteralTypescriptTransformator.litteralMapper[valueType](value as never);
		}

		return ZodLiteralTypescriptTransformator.litteralMapper.function();
	}

	public static litteralMapper = {
		string: (value: string) => factory.createLiteralTypeNode(factory.createStringLiteral(value)),
		number: (value: number) => factory.createLiteralTypeNode(factory.createNumericLiteral(value)),
		boolean: (value: boolean) => value
			? factory.createLiteralTypeNode(factory.createTrue())
			: factory.createLiteralTypeNode(factory.createFalse()),
		bigint: (value: bigint) => factory.createLiteralTypeNode(factory.createBigIntLiteral(value.toString())),
		symbol: (value: symbol) => factory.createLiteralTypeNode(factory.createStringLiteral(value.toString())),
		object: () => factory.createLiteralTypeNode(factory.createNull()),
		undefined: () => factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword),
		function: () => factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword),
	};
}
