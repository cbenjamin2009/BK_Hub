// export default communityIndex function with title of "Community"
// Language: typescript
// Path: BKHub-Remix\app\routes\community\index.tsx

import { json, Link, LoaderFunction, NavLink, useLoaderData } from "remix";
import { getWorksheetListItemsAll } from "~/models/worksheet.server";
import { requireUserId } from "~/session.server";

// LoaderData type
type LoaderData = {
    worksheetListItemsAll: Awaited<ReturnType<typeof getWorksheetListItemsAll>>;
}

// async loader function to pull data from getWorksheetListItemsAll()
export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request);
    const worksheetListItemsAll = await getWorksheetListItemsAll();
    return json<LoaderData>({ worksheetListItemsAll });
}

export default function CommunityIndexPage() {
    const data = useLoaderData() as LoaderData;
    return (
        <>
        <section>
            <header>Community Page</header>
        </section>
        <section>
            <p>
                Here you will see a collection of content from the community
            </p>
        </section>
        <main className="flex h-full bg-white">
            <h3>Worksheets</h3>
        {data.worksheetListItemsAll.length === 0 ? (
                        <p className="p-4">No worksheets yet</p>
                    ) : (
                        <ol>
                            {data.worksheetListItemsAll.map((worksheet) => (
                                <li key={worksheet.id}>
                                    <NavLink
                                        className={({ isActive }) =>
                                            `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                                        }
                                        to={worksheet.id}
                                    >
                                        📝 {worksheet.title}
                                    </NavLink>
                                </li>
                            ))}
                        </ol>
                    )}
        </main>
        </>
    )
}