import type { LoaderFunction, ActionFunction } from "remix";
import { redirect } from "remix";
import { json, useLoaderData, useCatch, Form } from "remix";
import invariant from "tiny-invariant";
import type { Worksheet } from "~/models/worksheet.server";
import { deleteWorksheet } from "~/models/worksheet.server";
import { getWorksheet } from "~/models/worksheet.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
    worksheet: Worksheet;
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const userId = await requireUserId(request);
    invariant(params.worksheetId, "worksheetId not found");

    const worksheet = await getWorksheet({ id: params.worksheetId });
    if (!worksheet) {
        return redirect("/");
    }
    return json<LoaderData>({ worksheet })
};

export const action: ActionFunction = () => {
   
    return redirect("/community");
}

export default function WorksheetDetailsPage() {
    const data = useLoaderData() as LoaderData;

    return (
        <div>
            <h3 className="text-2xl font-bold">Worksheet Title: {data.worksheet.title}</h3>
            <h3 className="text-large font-bold py-6">Body Content:</h3>
            <p className="border-2 border-blue-500 p-4 m-auto w-90">{data.worksheet.body}</p>
            <h3 className="text-large font-bold py-6">Javascript Code:</h3>
            <p className="border-2 border-blue-500 p-4 m-auto w-90">{data.worksheet.javascript_code}</p>
            <h3 className="text-large font-bold py-6">Template Code: </h3>
            <p className="border-2 border-blue-500 p-4 m-auto w-90">{data.worksheet.template_code}</p>
            <h3 className="text-large font-bold py-6">Images: </h3>
            <p className="border-2 border-blue-500 p-4 m-auto w-90">{data.worksheet.images}</p>
            <hr className="my-4" />
            <Form method="post">
                <button
                    type="submit"
                    className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
                >
                    Back
                </button>
            </Form>
        </div>
    );
}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);

    return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
    const caught = useCatch();

    if (caught.status === 404) {
        return <div>Worksheet not found</div>;
    }

    throw new Error(`Unexpected caught response with status: ${caught.status}`);
}