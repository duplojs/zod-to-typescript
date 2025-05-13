import { ZodToTypescript } from "@scripts/index";
import { factory } from "typescript";
import { z as zod, ZodDate, ZodNumber } from "zod";

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
					identifiers: [
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
				identifiers: [schema],
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

	it("hooks date to string", () => {
		const zodSchema = zod.object({
			prop1: zod.date(),
			prop2: zod.coerce.number(),
		});

		const result = ZodToTypescript.convert(
			zodSchema,
			{
				zodSchemaHooks: [
					(zodSchema, context, output) => output(
						"next",
						zodSchema instanceof ZodNumber && zodSchema._def.coerce
							? zod.number().optional()
							: zodSchema,
					),
					(zodSchema, context, output) => output(
						"stop",
						zodSchema instanceof ZodDate ? zod.string() : zodSchema,
					),
				],
			},
		);
		expect(result).toMatchSnapshot();
	});

	it("deprecated indentifiers", () => {
		const schema = zod.string();

		const result = ZodToTypescript.convert(
			schema,
			{
				indentifiers: [schema],
			},
		);
		expect(result).toMatchSnapshot();
	});

	it("overrideTypeNode", () => {
		const zodSchema1 = zod.string().overrideTypeNode(
			factory.createTypeReferenceNode(factory.createIdentifier("RegExp")),
		);

		expect(zodSchema1._zttOverrideTypeNode)
			.toEqual(
				factory.createTypeReferenceNode(factory.createIdentifier("RegExp")),
			);

		const zodSchema2 = zod.string().overrideTypeNode(
			(ts) => ts.factory.createTypeReferenceNode(ts.factory.createIdentifier("Date")),
		);

		expect(zodSchema2._zttOverrideTypeNode)
			.toEqual(
				factory.createTypeReferenceNode(factory.createIdentifier("Date")),
			);
	});

	it("recurcive inside Schema", () => {
		const result = ZodToTypescript.convert(
			zod.object({
				user: userSchema.identifier("user"),
			}),
		);

		expect(result).toMatchSnapshot();
	});
});
