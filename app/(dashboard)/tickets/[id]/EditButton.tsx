"use client";

import Link from "next/link";
// icons & UI
import { TiEdit } from "react-icons/ti";
import { updateTicket } from "../action";

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
