import { ZodToTypescript, type MapContext } from "@scripts/index";
import type { TypeNode } from "typescript";
import { z as zod } from "zod";

describe("zodTypescriptTransformator", () => {
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

	it("with identifier", () => {
		const result = ZodToTypescript
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
		ZodToTypescript.injectZod(zod);

		expect(ZodToTypescript.zod).toBe(zod);
	});

	it("with identifier as zod schema", () => {
		const schema = zod.string();

		const result = ZodToTypescript.convert(
			schema,
			{
				indentifiers: [schema],
			},
		);

		expect(result).toMatchSnapshot();
	});

	it("export type", () => {
		const result = ZodToTypescript.convert(zod.string(), { export: true });

		expect(result).toMatchSnapshot();
	});

	it("something that is not a schema", () => {
		const func = (val: string) => val;
		const result = ZodToTypescript.convert(func as never);

		expect(result).toMatchSnapshot();
	});

	it("comment type", () => {
		const zodSchema = zod.number().describe("@deprected");

		const result = ZodToTypescript.convert(zodSchema);
		expect(result).toMatchSnapshot();
	});

	it("comment props object", () => {
		const zodSchema = zod.object({
			prop1: zod.string(),
			prop2: zod.number().describe("@deprected"),
		});

		const result = ZodToTypescript.convert(zodSchema);
		expect(result).toMatchSnapshot();
	});

	it("new ZodToTypescript", () => {
		const ztt = new ZodToTypescript();

		ztt.append(commentSchema);
		ztt.append(userSchema, "User");
		ztt.append(postSchema, "Post");

		expect(ztt.toString()).toMatchSnapshot();
	});
});