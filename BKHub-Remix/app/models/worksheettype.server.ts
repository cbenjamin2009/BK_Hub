// prisma server client to get WorksheetType
// Language: typescript
// import prisma 

import type { WorksheetType } from "@prisma/client";

import { prisma } from "~/db.server";

export type { WorksheetType } from "@prisma/client";

export function getAllWorksheetTypes() {
  return prisma.worksheetType.findMany();
}

// get worksheet type by id
export function getWorksheetType({ id }: Pick<WorksheetType, "id">) {
    return prisma.worksheetType.findFirst({
        where: { id },
    });
}


// createWorksheetType with id and name 
export function createWorksheetType({
    name,
}: Pick<WorksheetType, "name">) {
    return prisma.worksheetType.create({
        data: {
            name,
        },
    });
}
