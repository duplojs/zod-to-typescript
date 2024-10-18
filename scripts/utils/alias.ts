import { factory, type TypeNode } from "typescript";

export function createTextAlias(typeNode: TypeNode, alias: string) {
	return factory.createTypeAliasDeclaration(
		undefined,
		factory.createIdentifier(alias),
		undefined,
		typeNode,
	);
}

export function createTempAlias(alias: string) {
	return createTextAlias(
		factory.createLiteralTypeNode(factory.createNull()),
		alias,
	);
}
