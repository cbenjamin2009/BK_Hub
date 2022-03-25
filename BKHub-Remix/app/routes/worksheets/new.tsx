import * as React from "react";
import { Form, json, redirect, useActionData } from "remix";
import type { ActionFunction } from "remix";

import { createWorksheet } from "~/models/worksheet.server";
import { requireUserId } from "~/session.server";

type ActionData = {
    errors?: {
        title?: string;
        body?: string;
        javascript_code?: string;
        template_code?: string;
        image?: string;
    };
}

export const action: ActionFunction = async ({ request }) => {
    const userId = await requireUserId(request);

    const formData = await request.formData();
    const title = formData.get("title");
    const body = formData.get("body");
    const javascript_code = formData.get("javascript_code");
    const template_code = formData.get("template_code");
    const images = formData.get("images");

    if (typeof title !== "string" || title.length === 0) {
        return json<ActionData>(
            { errors: { title: "Title is required" } },
            { status: 400 }
        );
    }

    if (typeof body !== "string" || body.length === 0) {
        return json<ActionData>(
            { errors: { body: "Body is required" } },
            { status: 400 }
        );
    }

    if (typeof javascript_code !== "string" || javascript_code.length === 0) {
        return json<ActionData>(
            { errors: { javascript_code: "Javascript code is required" } },
            { status: 400 }
        );
    }

    if (typeof template_code !== "string" || template_code.length === 0) {
        return json<ActionData>(
            { errors: { template_code: "Template code is required" } },
            { status: 400 }
        );
    }

    const worksheet = await createWorksheet({ title, body, javascript_code, template_code, images, userId });

    return redirect(`/worksheets/${worksheet.id}`);

}

export default function NewWorksheetPage() {
    const actionData = useActionData() as ActionData;
    const titleRef = React.useRef<HTMLInputElement>(null);
    const bodyRef = React.useRef<HTMLTextAreaElement>(null);
    const javascript_codeRef = React.useRef<HTMLTextAreaElement>(null);
    const template_codeRef = React.useRef<HTMLTextAreaElement>(null);
    const imagesRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        if (actionData?.errors?.title) {
            titleRef.current?.focus();
        } else if (actionData?.errors?.body) {
            bodyRef.current?.focus();
        } else if (actionData?.errors?.javascript_code) {
            javascript_codeRef.current?.focus();
        } else if (actionData?.errors?.template_code) {
            template_codeRef.current?.focus();
        } 
    }, [actionData]);

    return (
        <Form
            method="post"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                width: "100%",
            }}
        >
            <div>
                <label htmlFor="title">
                    <span>Title: </span>
                    <input
                     ref={titleRef}
                     name="title"
                     className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                     aria-invalid={actionData?.errors?.title ? true : undefined}
                     aria-errormessage={
                       actionData?.errors?.title ? "title-error" : undefined
                     }
                   />
                 </label>
                 {actionData?.errors?.title && (
                   <div className="pt-1 text-red-700" id="title=error">
                     {actionData.errors.title}
                   </div>
                 )}
               </div>

                <div>
                    <label htmlFor="body">
                        <span>Body: </span>
                        <textarea

                            ref={bodyRef}
                            name="body"
                            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                            aria-invalid={actionData?.errors?.body ? true : undefined}
                            aria-errormessage={
                                actionData?.errors?.body ? "body-error" : undefined
                            }
                        />
                    </label>
                    {actionData?.errors?.body && (
                        <div className="pt-1 text-red-700" id="body-error">
                            {actionData.errors.body}
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="javascript_code">
                        <span>JavaScript_Code: </span>
                        <textarea

                            ref={javascript_codeRef}
                            name="javascript_code"
                            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                            aria-invalid={actionData?.errors?.javascript_code ? true : undefined}
                            aria-errormessage={
                                actionData?.errors?.javascript_code ? "javascript_code-error" : undefined
                            }
                        />
                    </label>
                    {actionData?.errors?.javascript_code && (
                        <div className="pt-1 text-red-700" id="javascript_code-error">
                            {actionData.errors.javascript_code}
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="template_code">
                        <span>Template_Code: </span>
                        <textarea

                            ref={template_codeRef}
                            name="template_code"
                            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                            aria-invalid={actionData?.errors?.template_code ? true : undefined}
                            aria-errormessage={
                                actionData?.errors?.template_code ? "template_code-error" : undefined
                            }
                        />
                    </label>
                    {actionData?.errors?.template_code && (
                        <div className="pt-1 text-red-700" id="template_code-error">
                            {actionData.errors.template_code}
                        </div>
                    )}
                </div>

                <div>
                <label htmlFor="images">
                    <span>images: </span>
                    <input
                     ref={imagesRef}
                     name="images"
                     className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                     aria-invalid={actionData?.errors?.images ? true : undefined}
                     aria-errormessage={
                       actionData?.errors?.images ? "title-error" : undefined
                     }
                   />
                 </label>
                 {actionData?.errors?.images && (
                   <div className="pt-1 text-red-700" id="images=error">
                     {actionData.errors.images}
                   </div>
                 )}
               </div>

               <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>

    )
}