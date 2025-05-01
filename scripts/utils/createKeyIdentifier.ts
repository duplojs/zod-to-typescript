import { factory } from "typescript";

export function createKeyIdentifier(name: string) {
	if (/^[a-zA-Z$_]+[a-zA-Z0-9_$]*$/.test(name)) {
		return factory.createIdentifier(name);
	} else {
		return factory.createStringLiteral(name);
	}
}
