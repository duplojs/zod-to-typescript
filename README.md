<a name="top"></a>

<p align="center">
  <img src="./docs/assets/logo.png" alt="logo" />
</p>
<p align="center">
  <span style="font-size: 24px; font-weight: bold;">Zod To Typescript</span>
</p>
<p align="center">
  <a href='#'>
    <img src='https://img.shields.io/badge/types-TypeScript-blue?logo=typescript&style=plastic' alt='coverage' />
  </a>
  <a href="#">
	<img src="https://img.shields.io/badge/coverage-100%25-green?style=plastic" alt="lang">
  </a>
  <a href="https://www.npmjs.com/package/@duplojs/zod-to-typescript">
	<img src="https://img.shields.io/npm/v/@duplojs/zod-to-typescript" alt="lang">
  </a>
</p>

`@duplojs/zod-to-typescript` is a library that converts Zod schemas to TypeScript types.

## Installation

To consume `@duplojs/zod-to-typescript`, you need to install the npm package, zod and typescript.
```bash
npm install @duplojs/zod-to-typescript typescript zod
```

## Usage

### 1. Import necessary modules

```ts
import { z as zod } from 'zod';
import { ZodToTypescript } from '@duplojs/zod-to-typescript';
```

### 2. Define Zod schema

Create a Zod schema that you want to convert to TypeScript:
```ts
const schema = zod.object({
  name: zod.string(),
  age: zod.number(),
  isStudent: zod.boolean(),
});
```

### 3. Convert Zod schema to TypeScript type

Use the `convert` method of `ZodToTypescript` to convert the Zod schema to a TypeScript type declaration:
```ts
const options: ConvertOptions = {
    name: "User", // Optional: Specify a name for the TypeScript type
    export: true, // Optional: Export the TypeScript type
};

const tsType = ZodToTypescript.convert(userSchema, options);
```

### 4. Output the TypeScript type

The `convert` method returns a string containing the TypeScript type declaration. You can output this string to a file or use it directly in your code:
```ts
console.log(tsType);
// output:
export type User = {
  name: string;
  age: number;
  isStudent: boolean;
};
```

### 5. Full Example

```ts
import { z as zod } from 'zod';
import { ZodToTypescript } from '@duplojs/zod-to-typescript';

const schema = zod.object({
  name: zod.string(),
  age: zod.number(),
  isStudent: zod.boolean(),
});

const options: ConvertOptions = {
	name: "User",
	export: true,
};

const tsType = ZodToTypescript.convert(schema, options);

console.log(tsType);
// Output: 
export type User = { 
	name: string; 
	age: number; 
	isStudent: boolean; 
};
```

### 6. Using Identifiers

Identifiers allow you to give a name to a schema. You can also use a schema directly as an identifier. This can be useful when you have nested schemas and want to refer to them by name.

```ts
import { ZodToTypescript, ConvertOptions } from "@duplojs/zod-to-typescript";
import { z as zod } from "zod";

// Define your schemas
const addressSchema = zod.object({
    street: zod.string(),
    city: zod.string(),
    zipCode: zod.string(),
});

const companySchema = zod.object({
    name: zod.string(),
    address: addressSchema,
}).identifier("Company"); // automatically identifies the schema as "Company"

const employeeSchema = zod.object({
    employeeId: zod.number(),
    name: zod.string(),
    position: zod.string(),
    company: companySchema,
})

// Convert the Employee schema to TypeScript
const options: ConvertOptions = {
    name: "Employee",
    indentifiers: [
        {
            name: "Address", // define manually
            zodSchema: addressSchema,
        },
    ],
    export: true,
};

const tsType = ZodToTypescript.convert(employeeSchema, options);

console.log(tsType);
// Output:
export type Address = {
    street: string;
    city: string;
    zipCode: string;
};

export type Company = {
    name: string;
    address: Address;
};

export type Employee = {
    employeeId: number;
    name: string;
    position: string;
    company: Company;
};
```

### 7. Recursive Schemas

Recursive schemas allow you to define schemas that reference themselves. This is useful for defining structures like trees or linked lists. You can use `zod.lazy()` to create recursive schemas.

```ts
import { ZodToTypescript, ConvertOptions } from "@duplojs/zod-to-typescript";
import { z as zod } from "zod";

const categorySchema = zod.object({
    name: zod.string(),
    subcategories: zod.lazy(() => categorySchema.array()),
}).identifier("Category");

const tsType = ZodToTypescript.convert(categorySchema, { export: true });

console.log(tsType);
// Output:
export type Category = {
    name: string;
    subcategories: Category[];
};
```

### 8. Create context

You can create a context to store the identifiers and options for the conversion. This can be useful when you have multiple schemas that reference each other.

```ts
import { ZodToTypescript } from "@duplojs/zod-to-typescript";
import { z as zod } from "zod";

const userSchema = zod.object({
	userId: zod.number(),
	name: zod.string(),
});

const context = ZodToTypescript.makeContextFromZodSchema(
	userSchema,
	{
		name: "User",
	},
);

const postSchema = zod.object({
	author: userSchema,
	title: zod.string(),
});

const tsType = ZodToTypescript.convert(postSchema, { name: "Post", context });

console.log(tsType);
// Output:
type User = {
    userId: number;
    name: string;
};

type Post = {
    author: User;
    title: string;
};
```

This method allows you to modify or enrich the context before converting it to a TypeScript type declaration.

`ZodToTypescript` is a powerful utility for converting Zod schemas to TypeScript type declarations. By following this guide, you can easily integrate it into your TypeScript projects and extend it to support custom Zod types.


### 9. New instance
You can create instance of `ZodToTypescript` to make an environment types.

```ts
import { ZodToTypescript } from "@duplojs/zod-to-typescript";
import { z as zod } from "zod";

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

const ztt = new ZodToTypescript();

ztt.append(commentSchema);
ztt.append(userSchema, "User");
ztt.append(postSchema, "Post");

const tsType = ztt.toString()

console.log(tsType);
// Output:
type Comment = {
    user: User;
    content: string;
};

type User = {
    userId: number;
    firstname: string;
    lastname: string;
    posts: Post[];
};

type Post = {
    title: string;
    content: string;
    date: Date;
    comments: Comment[];
};
```

### More Examples

For more examples, please check the unit tests for each type in the `tests` directory. The tests provide comprehensive examples of how to use each supported type with `ZodToTypescript`.

## Acknowledgements

I would like to thank [sachinraja](https://github.com/sachinraja) for creating the [zod-to-ts zod](https://github.com/sachinraja/zod-to-ts) package, which served as an inspiration for this project.
