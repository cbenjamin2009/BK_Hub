import * as React from "react";
import { Link, Form } from "remix";

export default function PageHeaderButtonComponent() {
  return (
    <>
      <h3 className="text-xl font-bold">
        <Link
          to="/"
          className="rounded bg-slate-400 py-2 px-4 text-blue-200 hover:bg-blue-500 active:bg-blue-600"
        >
          Home
        </Link>
      </h3>
      <Form action="/logout" method="post">
        <button
          type="submit"
          className="rounded bg-slate-400 py-2 px-4 text-blue-200 hover:bg-blue-500 active:bg-blue-600"
        >
          Logout
        </button>
      </Form>
    </>
  );
}
