// prisma server client to get WorksheetType
// Language: typescript
// import prisma 

import { prisma } from "~/db.server";

export type { WorksheetType } from "@prisma/client";

 export function getWorksheetType({ id }: { id: string }) {
    return prisma.WorksheetType.findOne({
        where: { id },
    });
}

