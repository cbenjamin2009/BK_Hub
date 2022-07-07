import { Form, json, useLoaderData, Outlet, Link, NavLink } from "remix";
import type { LoaderFunction } from "remix";

import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { getWorksheetListItems } from "~/models/worksheet.server";
import PageHeaderComponent from "~/components/PageHeaderComponent";
import PageHeaderButtonComponent from "~/components/PageHeaderButtonComponent";

type LoaderData = {
}

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request);
    const worksheetListItems = await getWorksheetListItems({ userId });
    return json<LoaderData>({ worksheetListItems });
}

export default function WorksheetsPage(){
  //  const data = useLoaderData() as LoaderData;
    const user = useUser();

    return (
        <div className="flex h-full min-h-screen flex-col">
            <header className="flex items-center justify-between bg-slate-800 p-4 text-white">

                <PageHeaderComponent pageName="Community"/>
                <p>User: {user.email}</p>
                <p>Trustee: {user.trustee}</p>
                <PageHeaderButtonComponent />
            </header>
            <Outlet />
            </div>
        )
}
