import { Form, json, useLoaderData, Outlet, Link, NavLink } from "remix";
import type { LoaderFunction } from "remix";

import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { getWorksheetListItems } from "~/models/worksheet.server";

type LoaderData = {
    worksheetListItems: Awaited<ReturnType<typeof getWorksheetListItems>>;
}

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request);
    const worksheetListItems = await getWorksheetListItems({ userId });
    return json<LoaderData>({ worksheetListItems });
}

export default function WorksheetsPage(){
    const data = useLoaderData() as LoaderData;
    const user = useUser();

    return (
        <div className="flex h-full min-h-screen flex-col">
            <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
                <h1 className="text-3xl font-bold">
                    <Link to=".">Worksheets</Link>
                </h1>
                <p>User: {user.email}</p>
                <p>Trustee: {user.trustee}</p>
                <Form action="/logout" method="post">
                    <button

                        type="submit"
                        className="rounded bg-slate-400 py-2 px-4 text-blue-200 hover:bg-blue-500 active:bg-blue-600"
                    >
                        Logout
                    </button>
                </Form>
            </header>

            <main className="flex h-full bg-white">
                <div className="h-full w-80 border-r bg-gray-50">
                    <Link to="new" className="block p-4 text-xl text-blue-500">
                        ➕ New Worksheet
                    </Link>
                    
                    <hr />

                    {data.worksheetListItems.length === 0 ? (
                        <p className="p-4">No worksheets yet</p>
                    ) : (
                        <ol>
                            {data.worksheetListItems.map((worksheet) => (
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
        </div>
                                        <div className="flex-1 p-6">
                                            <Outlet />

                                        </div>
                                        </main>
                                    </div>

    )
}