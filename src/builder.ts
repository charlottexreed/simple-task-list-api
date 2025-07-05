import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { PrismaClient } from "@prisma/client";
import { GraphQLDateTime } from "graphql-scalars";
import type PrismaTypes from '@pothos/plugin-prisma/generated';

export const prisma = new PrismaClient();

export const builder = new SchemaBuilder<{
    PrismaTypes: PrismaTypes;
    Scalars: {
        DateTime: { Input: Date; Output: Date };
    };
}>({
    plugins: [PrismaPlugin],
    prisma: {
        client: prisma
    }
})

builder.addScalarType("DateTime", GraphQLDateTime, {});