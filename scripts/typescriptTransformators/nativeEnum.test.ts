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

	expect(result.trim()).toBe(
		`enum Zod2ts_1_duplojs {
    A = "a",
    B = "b",
    C = "c"
}

type Zod2ts_0_duplojs = Zod2ts_0_duplojs;
`.trim(),
	);
});
