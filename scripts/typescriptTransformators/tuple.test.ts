import { ZodTypescriptTransformator } from "@scripts/index";
import { z as zod } from "zod";

it("tuple", () => {
	const result = ZodTypescriptTransformator.convert(zod.tuple([zod.string(), zod.number()]));

	expect(result).toBe("type Zod2ts_0_duplojs = [\n    string,\n    number\n];");

	const result1 = ZodTypescriptTransformator.convert(zod.tuple([zod.string(), zod.number()]).rest(zod.null()));

	expect(result1).toBe("type Zod2ts_1_duplojs = [\n    string,\n    number,\n    ...null[]\n];");
});
