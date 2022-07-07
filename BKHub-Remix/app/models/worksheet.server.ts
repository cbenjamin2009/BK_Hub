import type { User, Worksheet } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Worksheet } from "@prisma/client";

export function getMyWorksheet({
  id,
  userId,
}: Pick<Worksheet, "id"> & {
  userId: User["id"];
}) {
  return prisma.worksheet.findFirst({
    where: { id, userId },
  });
}

//getWorksheet no userId needed
export function getWorksheet({
  id,
}: Pick<Worksheet, "id">) {
  return prisma.worksheet.findFirst({
    where: { id },
  });
}

export function getWorksheetListItems({ userId }: { userId: User["id"] } ) {
  return prisma.worksheet.findMany({
    where: { userId },
    select: { id: true, title: true }, 
    orderBy: { updatedAt: "desc" },
  });
}

// get all WorksheetListItems
export function getWorksheetListItemsAll() {
  return prisma.worksheet.findMany({
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createWorksheet({
  body,
  title,
  javascript_code,
  template_code,
  images,
  userId,
}: Pick<Worksheet, "body" | "title"> & {
  userId: User["id"];
}) {
  return prisma.worksheet.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
      javascript_code,
      template_code,
      images,
    },
  });
}

export function deleteWorksheet({
  id,
  userId,
}: Pick<Worksheet, "id"> & { userId: User["id"] }) {
  return prisma.worksheet.deleteMany({
    where: { id, userId },
  });
}