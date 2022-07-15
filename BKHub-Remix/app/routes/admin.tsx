// export default admin page with header component and header button component
// Language: typescript
// Path: BKHub-Remix\app\routes\admin.tsx

import { json, LoaderFunction, Outlet } from "remix";
import PageHeaderButtonComponent from "~/components/PageHeaderButtonComponent";
import PageHeaderComponent from "~/components/PageHeaderComponent";
import { requireUserId } from "~/session.server";

// type loaderData 
type LoaderData = {
    user: Awaited<ReturnType<typeof requireUserId>>;

}

// loader function to require userId
export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request);
    return json({ userId });
}

export default function AdminPage() {
    return (
        <div className="flex h-full min-h-screen flex-col">
        <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
            <PageHeaderComponent pageName="Admin"/>
            <PageHeaderButtonComponent />
        </header>
    
        <main className="flex h-full bg-white">
            <div className="h-full w-80 border-r bg-gray-50">
            // section for all worksheets with edit and delete buttons
            </div>
            <div>
            <hr />
            // section for all notes with edit
            <p className="p-4">No worksheets yet</p>
            </div>
    
            <div className="flex-1 p-6">
            <Outlet />
            </div>
        </main>
        </div>
    );
    }