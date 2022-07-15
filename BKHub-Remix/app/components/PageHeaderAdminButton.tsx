import { Link, Form } from "remix";

export default function PageHeaderAdminButton() {
  return (
    <>
      <h3 className="text-xl font-bold">
        <Link
          to="../admin"
          className="rounded bg-red-400 py-2 px-4 text-white hover:bg-red-500 active:bg-red-600"
        >
          Admin
        </Link>
      </h3>
    </>
  );
}
