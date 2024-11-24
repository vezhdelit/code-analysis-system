import {
	OpenApiGeneratorV3,
	OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { HTTP_STATUS_MESSAGES } from "@/enums/server";

type ZodSchema =
	| z.ZodUnion<[z.ZodTypeAny, z.ZodTypeAny]>
	| z.AnyZodObject
	| z.ZodArray<z.AnyZodObject>;

export const jsonContent = <T extends ZodSchema>(
	schema: T,
	description: string
) => {
	return {
		content: {
			"application/json": {
				schema,
			},
		},
		description,
	};
};

export const jsonContentRequired = <T extends ZodSchema>(
	schema: T,
	description: string
) => {
	return {
		...jsonContent(schema, description),
		required: true,
	};
};

export const createErrorSchema = <T extends ZodSchema>(schema: T) => {
	const { error } = schema.safeParse(
		schema._def.typeName === z.ZodFirstPartyTypeKind.ZodArray ? [] : {}
	);
	return z.object({
		success: z.boolean().openapi({
			example: false,
		}),
		error: z
			.object({
				issues: z.array(
					z.object({
						code: z.string(),
						path: z.array(z.union([z.string(), z.number()])),
						message: z.string().optional(),
					})
				),
				name: z.string(),
			})
			.openapi({
				example: error,
			}),
	});
};

export const notFoundSchema = z.object({
	message: z.string().openapi({
		example: HTTP_STATUS_MESSAGES.NOT_FOUND,
	}),
});

export const AuthHeaderSchema = z.object({
	authorization: z.string().openapi({
		example: "Bearer <token>",
		param: {
			name: "Authorization",
			in: "header",
			required: true,
			description: "JSON Web Token of the user",
		}
	}),
});

export const IdParamsSchema = z.object({
	id: z.coerce.number().openapi({
		param: {
			name: "id",
			in: "path",
		},
		required: ["id"],
		example: 42,
	}),
});

const oneOf = <T extends ZodSchema>(schemas: T[]) => {
	const registry = new OpenAPIRegistry();

	schemas.forEach((schema, index) => {
		registry.register(index.toString(), schema);
	});

	const generator = new OpenApiGeneratorV3(registry.definitions);
	const components = generator.generateComponents();

	return components.components?.schemas
		? Object.values(components.components!.schemas!)
		: [];
};

export const jsonContentOneOf = <T extends ZodSchema>(
	schemas: T[],
	description: string
) => {
	return {
		content: {
			"application/json": {
				schema: {
					oneOf: oneOf(schemas),
				},
			},
		},
		description,
	};
};
