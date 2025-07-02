import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const builder = new SchemaBuilder({
    plugins: [PrismaPlugin],
    prisma: {
        client: prisma
    }
})