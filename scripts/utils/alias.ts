import { factory, SyntaxKind, type TypeNode } from "typescript";

export function createTextAlias(typeNode: TypeNode, text: string, exported?: boolean) {
	return factory.createTypeAliasDeclaration(
		exported ? [factory.createModifier(SyntaxKind.ExportKeyword)] : undefined,
		factory.createIdentifier(text),
		undefined,
		typeNode,
	);
}

export function createTempAlias(text: string) {
	return createTextAlias(
		factory.createLiteralTypeNode(factory.createNull()),
		text,
	);
}
