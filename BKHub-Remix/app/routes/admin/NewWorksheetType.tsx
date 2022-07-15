// Create a form that allows the user to create a new worksheet type using createWorksheetType
import { createWorksheetType } from "~/models/worksheettype.server";

type ActionData = {
    errors?: {
        name?: string;
    };
}

  export const action: ActionFunction = async ({ request }) => {
        const formData = await request.formData();
        //log formData
        console.log(formData);
        const name = formData.get("name");
    // log name
    console.log(name);
        if (typeof name !== "string" || name.length === 0) {
            return json<ActionData>(
                { errors: { name: "Name is required" } },
                { status: 400 }
            );
        }

        const worksheetType = await createWorksheetType({ name });

        return redirect(`/admin/`);
    }
    export default function NewWorksheetTypePage() {
        const actionData = useActionData() as ActionData;
    return (
        <Form
            method="post"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
            }}
        >
            <label htmlFor="name">Name</label>
            <input

                id="name"
                name="name"
                type="text"
                placeholder="Name"
                required
            />
            <button type="submit">Create</button>
        </Form>
    );

}