import { isUnionTypeNode, SyntaxKind, type TypeNode } from "typescript";

export function includesUndefinedTypeNode(typeNode: TypeNode): boolean {
	if (typeNode.kind === SyntaxKind.UndefinedKeyword) {
		return true;
	}

	if (isUnionTypeNode(typeNode)) {
		return typeNode.types.some(
			(subTypeNode) => includesUndefinedTypeNode(subTypeNode),
		);
	}

	return false;
}
