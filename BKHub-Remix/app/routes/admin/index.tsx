import { json, Link, LoaderFunction, useLoaderData } from "remix";
import { getAllWorksheetTypes } from "~/models/worksheettype.server";

// Load worksheetTypes using getAllWorksheetTypes and then render as map of worksheetTypes
type LoaderData = {
    worksheetTypeListItems: Awaited<ReturnType<typeof getAllWorksheetTypes>>;
}

// loader function getWorksheetType
 export const loader: LoaderFunction = async () => {
     const worksheetTypeListItems = await getAllWorksheetTypes();
     return json<LoaderData>({ worksheetTypeListItems });
 }

// export default function to return a simple Admin header
 export default function AdminHeader() {
    let worksheetTypeListItems = useLoaderData().worksheetTypeListItems;
        return (
            <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
                <h2>Admin</h2>
                {/* link to /newWorksheetType */}
                <Link to="/admin/newWorksheetType">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        New Worksheet Type
                    </button>
                </Link>
                <section id="listCurrentWorksheetTypes">
                    <h3>Current Worksheet Types</h3>
                    <ol>
                        {worksheetTypeListItems.map(worksheetType => (
                            <li key={worksheetType.id}>
                                <Link to={`/admin/${worksheetType.id}`}>
                                    {worksheetType.name}
                                </Link>
                            </li>
                        ))}
                    </ol>

                </section>
            </header>
        );
    }