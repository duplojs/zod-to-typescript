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
      <img src="https://img.shields.io/badge/coverage-98%25-green?style=plastic" alt="lang">
    </a>
</p>

`@duplojs/zod-to-typescript` is a library that converts Zod schemas to TypeScript types.

## Packages

- [@duplojs/zod-to-typescript](https://www.npmjs.com/package/@duplojs/zod-to-typescript)

	<img src="https://img.shields.io/badge/npm-v0.0.1-red?style=plastic&logo=npm" alt="npm">

## Download and Installation

To consume `@duplojs/zod-to-typescript`, you need to install the npm package and typescript.
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
console.log(tsType);
```

### 4. Output the TypeScript type

The `convert` method returns a string containing the TypeScript type declaration. You can output this string to a file or use it directly in your code:
```ts
// Example output:
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
// Output: export type User = { name: string; age: number; isStudent: boolean; };
```

### 6. Using Identifiers

Identifiers allow you to give a name to a schema. You can also use a schema directly as an identifier. This can be useful when you have nested schemas and want to refer to them by name.

```ts
import { ZodToTypescript, ConvertOptions } from "@duplojs/zod-to-typescript";
import { z } from "zod";

// Define your schemas
const addressSchema = z.object({
    street: z.string(),
    city: z.string(),
    zipCode: z.string(),
});

const companySchema = z.object({
    name: z.string(),
    address: addressSchema,
}).identifier("Company"); // automatically identifies the schema as "Company"

const employeeSchema = z.object({
    employeeId: z.number(),
    name: z.string(),
    position: z.string(),
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
// export type Address = {
//     street: string;
//     city: string;
//     zipCode: string;
// };
//
// export type Company = {
//     name: string;
//     address: Address;
// };
//
// export type Employee = {
//     employeeId: number;
//     name: string;
//     position: string;
//     company: Company;
// };
```

### 7. Recursive Schemas

Recursive schemas allow you to define schemas that reference themselves. This is useful for defining structures like trees or linked lists. You can use `z.lazy()` to create recursive schemas.

```ts
import { ZodToTypescript, ConvertOptions } from "@duplojs/zod-to-typescript";
import { z } from "zod";

const categorySchema = z.object({
    name: z.string(),
    subcategories: z.lazy(() => categorySchema.array()),
}).identifier("Category");

const tsType = ZodToTypescript.convert(categorySchema, { export: true });
console.log(tsType);
// Output:
// export type Category = {
//     name: string;
//     subcategories: Category[];
// };
```

### 8. Create context

You can create a context to store the identifiers and options for the conversion. This can be useful when you have multiple schemas that reference each other.

```ts
import { ZodToTypescript } from "@duplojs/zod-to-typescript";
import { z } from "zod";

const userSchema = z.object({
	userId: z.number(),
	name: z.string(),
});

const context = ZodToTypescript.makeContext(
	userSchema,
	{
		name: "User",
	},
);

const tsType = ZodToTypescript.contextToTypeInString(context, true);
console.log(tsType);
// Output:
// export type User = {
//   userId: number;
//   name: string;
// };
```

This method allows you to modify or enrich the context before converting it to a TypeScript type declaration.

`ZodToTypescript` is a powerful utility for converting Zod schemas to TypeScript type declarations. By following this guide, you can easily integrate it into your TypeScript projects and extend it to support custom Zod types.

### More Examples

For more examples, please check the unit tests for each type in the `tests` directory. The tests provide comprehensive examples of how to use each supported type with `ZodToTypescript`.

## Acknowledgements

I would like to thank [sachinraja](https://github.com/sachinraja) for creating the [zod-to-ts zod](https://github.com/sachinraja/zod-to-ts) package, which served as an inspiration for this project.
