import { ZodToTypescript } from "@scripts/index";
import { z as zod } from "zod";

it("nativeEnum", () => {
	enum MyEnum {
		A = "a",
		B = "b",
		C = "c",
	}

	const result = ZodToTypescript.convert(
		zod.nativeEnum(MyEnum),
	);

	expect(result).toMatchSnapshot();
});
