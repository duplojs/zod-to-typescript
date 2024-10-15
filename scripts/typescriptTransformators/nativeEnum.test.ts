import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("nativeEnum", () => {
	enum MyEnum {
		A = "a",
		B = "b",
		C = "c",
	}

	const result = ZodTypescriptTransformator.convert(
		zod.nativeEnum(MyEnum),
	);

	expect(result).toBe("type Zod2ts_0_duplojs = \"a\" | \"b\" | \"c\";");
});
