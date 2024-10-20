import ts, { SyntaxKind, type Node } from "typescript";

export function addComment(node: Node, text: string) {
	ts.addSyntheticLeadingComment(
		node,
		SyntaxKind.MultiLineCommentTrivia,
		`* ${text} `,
		true,
	);
}
