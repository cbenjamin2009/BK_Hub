import { Link } from "remix";

export default function WorksheetIndexPage() {
    return (
        <p>
            No worksheet selected. Select a worksheet on the left, or{" "}
            <Link to="new" className="text-blue-500 underline">
                create a new worksheet.
            </Link>
        </p>
    );
}