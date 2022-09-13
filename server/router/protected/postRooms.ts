import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../prisma";
import { createRouter } from "../context";

const ImageSchema = z.object({
  publicId: z.string(),
  url: z.string(),
});

export const postRoomsRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .mutation("postNewRoom", {
    input: z.object({
      name: z.string(),
      address: z.string(),
      pricePerNight: z.number().optional(),
      description: z.string(),
      guestCapacity: z.number(),
      numOfBeds: z.number(),
      internet: z.boolean(),
      breakfast: z.boolean(),
      airconditioned: z.boolean(),
      petsAllowed: z.boolean(),
      roomCleaning: z.boolean(),
      ratings: z.number().optional(),
      numOfReviews: z.number().optional(),
      category: z.enum(["KING", "TWINS", "SINGLE"]),
      creatorId: z.string().optional(),
      createdAt: z.string().optional(),
      images: z.array(ImageSchema).optional(),
    }),
    resolve({ input }) {
      const images = input?.images as Prisma.RoomImageCreateManyInput[];
      let { ...data } = input as Prisma.RoomCreateInput;
      data.images = {
        createMany: {
          data: images,
          skipDuplicates: true,
        },
      };
      return prisma.room.create({
        data,
      });
    },
  })
  .mutation("putUpdateRoom", {
    input: z.object({
      id: z.number(),
      name: z.string().optional(),
      address: z.string().optional(),
      pricePerNight: z.number().optional(),
      description: z.string().optional(),
      guestCapacity: z.number().optional(),
      numOfBeds: z.number().optional(),
      internet: z.boolean().optional(),
      breakfast: z.boolean().optional(),
      airconditioned: z.boolean().optional(),
      petsAllowed: z.boolean().optional(),
      roomCleaning: z.boolean().optional(),
      ratings: z.number().optional(),
      numOfReviews: z.number().optional(),
      category: z.enum(["KING", "TWINS", "SINGLE"]).optional(),
      creatorId: z.string().optional(),
      createdAt: z.string().optional(),
      images: z.array(ImageSchema).optional(),
    }),
    resolve({ input }) {
      const images = input?.images as Prisma.RoomImageCreateManyInput[];
      let { ...data } = input as Prisma.RoomCreateInput;
      data.images = {
        createMany: {
          data: images,
          skipDuplicates: true,
        },
      };
      return prisma.room.update({
        where: {
          id: input.id,
        },
        data: {
          ...data,
        },
      });
    },
  })
  .mutation("deleteSingleRoom", {
    input: z.object({
      id: z.number(),
    }),
    resolve({ input }) {
      return prisma.room.delete({
        where: {
          id: input.id,
        },
      });
    },
  });
