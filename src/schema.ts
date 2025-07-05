import { builder } from "./builder"
import { prisma } from "./builder"
import { z } from "zod";

builder.prismaObject("Task", {
    fields: (t) => ({
        id: t.exposeID("id"),
        title: t.exposeString("title"),
        completed: t.exposeBoolean("completed"),
        createdAt: t.expose("createdAt", { type: "DateTime" }),
        updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    })
});

builder.queryType({
    fields: (t) => ({
        tasks: t.prismaField({
            type: ["Task"],
            args: {
                search: t.arg.string({ required: false }),
            },
            resolve: async (query, _parent, args) => {
                const { search } = z.object({
                    search: z.string().min(1).optional(),
                }).parse(args);
                return prisma.task.findMany({
                    ...query,
                    where: search
                        ? { title: { contains: search} }
                        : {},
                });
            },
        }),
        task: t.prismaField({
            type: "Task",
            nullable: true,
            args: { id: t.arg.id({ required: true }) },
            resolve: (query, _parent, args) => {
                const { id } = z.object({ id: z.string().uuid(), }).parse(args);
                return prisma.task.findUnique({
                    ...query,
                    where: { id }
                });
            }
        }),
    }),
});

builder.mutationType({
    fields: (t) => ({
        addTask: t.prismaField({
            type: "Task",
            args: { title: t.arg.string({ required: true }) },
            resolve: (query, _parents, args) =>
                prisma.task.create({
                    ...query,
                    data: {
                        title: z.string().min(1).parse(args.title),
                    },
                }),
        }),
        toggleTask: t.prismaField({
            type: "Task",
            nullable: true,
            args: { id: t.arg.id({ required: true }) },
            resolve: async (query, _parent, args) => {
                const id = z.string().uuid().parse(args.id);
                const task = await prisma.task.findUnique({ where: { id } });
                if (!task) {
                    return null;
                }
                return prisma.task.update({
                    ...query,
                    where: { id },
                    data: { completed: !task.completed },
                });
            },
        }),
        deleteTask: t.prismaField({
            type: "Task",
            nullable: true,
            args: { id: t.arg.id({ required: true }) },
            resolve: async (query, _parent, args) => {
                const id = z.string().uuid().parse(args.id);
                try {
                    return await prisma.task.delete({
                        ...query,
                        where: { id }
                    });
                } catch {
                    return null;
                }
            },
        }),
        updateTaskTitle: t.prismaField({
            type: "Task",
            nullable: true,
            args: {
                id: t.arg.id({ required: true }),
                title: t.arg.string({ required: true }),
            },
            resolve: async (query, _parent, args)=> {
              const id = z.string().uuid().parse(args.id);
              const title = z.string().min(1).parse(args.title);

              const task = await prisma.task.findUnique({
                  ...query,
                  where: { id }
              });
              if (!task) {
                  return null;
              }
              return prisma.task.update({
                  ...query,
                  where: { id },
                  data: { title },
              })
            },
        }),
    }),
})