import { ZodToTypescript } from "@scripts/index";
import { factory } from "typescript";
import { z as zod } from "zod";

it("overrideTypeNode", () => {
	const zodSchema = zod.string().overrideTypeNode(
		factory.createTypeReferenceNode(factory.createIdentifier("RegExp")),
	);

	const result = ZodToTypescript.convert(zodSchema);

	expect(result).toMatchSnapshot();
});
