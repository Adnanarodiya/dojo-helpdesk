// icons & UI
import { TiEdit } from "react-icons/ti";
import Link from "next/link";

export default function EditButton({ id }: { id: string }) {
  return (
    <Link href={`/tickets/${id}/edit`}>
      <button className="btn-primary">
        <TiEdit />
        Edit Ticket
      </button>
    </Link>
  );
}
