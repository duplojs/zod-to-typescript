import { ZodTypescriptTransformator, type MapContext } from "@scripts/index";
import type { TypeNode } from "typescript";
import { z as zod } from "zod";

describe("zodTypescriptTransformator", () => {
	it("with identifier", () => {
		const commentSchema = zod.object({
			user: zod.lazy<any>(() => userSchema),
			content: zod.string(),
		}).identifier("Comment");

		const postSchema = zod.object({
			title: zod.string(),
			content: zod.string(),
			date: zod.coerce.date(),
			comments: commentSchema.array(),
		});

		const userSchema = zod.object({
			userId: zod.number(),
			firstname: zod.string(),
			lastname: zod.string(),
			posts: postSchema.array(),
		});

		const result = ZodTypescriptTransformator
			.convert(
				userSchema,
				{
					name: "User",
					indentifiers: [
						{
							name: "Post",
							zodSchema: postSchema,
						},
					],
					export: false,
				},
			);

		expect(result).toMatchSnapshot();
	});

	it("inject zod", () => {
		class TestTransformator extends ZodTypescriptTransformator {
			public get support(): new (...args: any[]) => zod.ZodType {
				throw new Error("...");
			}

			public makeTypeNode(zodSchema: zod.ZodType, context: MapContext): TypeNode {
				throw new Error("...");
			}

			public static getZodInstace() {
				return this.zod;
			}
		}

		TestTransformator.injectZod(zod);

		expect(TestTransformator.getZodInstace()).toBe(zod);
	});

	it("with identifier as zod schema", () => {
		const schema = zod.string();

		const result = ZodTypescriptTransformator.convert(
			schema,
			{
				indentifiers: [schema],
			},
		);

		expect(result).toMatchSnapshot();
	});

	it("export type", () => {
		const result = ZodTypescriptTransformator.convert(zod.string(), { export: true });

		expect(result).toMatchSnapshot();
	});

	it("something that is not a schema", () => {
		const func = (val: string) => val;
		const result = ZodTypescriptTransformator.convert(func as never);

		expect(result).toMatchSnapshot();
	});

	it("comment type", () => {
		const zodSchema = zod.number().describe("@deprected");

		const result = ZodTypescriptTransformator.convert(zodSchema);
		expect(result).toMatchSnapshot();
	});

	it("comment props object", () => {
		const zodSchema = zod.object({
			prop1: zod.string(),
			prop2: zod.number().describe("@deprected"),
		});

		const result = ZodTypescriptTransformator.convert(zodSchema);
		expect(result).toMatchSnapshot();
	});
});
