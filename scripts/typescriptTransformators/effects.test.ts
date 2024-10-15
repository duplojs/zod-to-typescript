import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("effects", () => {
	const result = ZodTypescriptTransformator.convert(zod.string().email());

	expect(result).toBe("type Zod2ts_0_duplojs = string;");
});
