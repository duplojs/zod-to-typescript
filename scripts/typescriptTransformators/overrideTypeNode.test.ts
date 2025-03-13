import { ZodToTypescript } from "@scripts/index";
import { factory } from "typescript";
import { z as zod } from "zod";

it("overrideTypeNode", () => {
	const zodSchema = zod.string()
		.overrideTypeNode(
			factory.createTypeReferenceNode(factory.createIdentifier("RegExp")),
		)
		.identifier("myType");

	const result = ZodToTypescript.convert(zodSchema);

	expect(result).toMatchSnapshot();
});
