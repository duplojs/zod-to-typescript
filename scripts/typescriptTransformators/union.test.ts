import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("union", () => {
	const result = ZodTypescriptTransformator.convert(zod.union([zod.string(), zod.number()]));

	expect(result).toBe("type Zod2ts_0_duplojs = string | number;");
});
