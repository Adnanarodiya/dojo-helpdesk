"use client";
import { useTransition } from "react";

// icons & UI
import { TiDelete } from "react-icons/ti";
import { deleteTicket } from "../action";

export default function DeleteIcon({ id }: { id: string }) {
  let [isPending, startTransition] = useTransition();

  return (
    <button
      className="btn-primary"
      onClick={() => startTransition(() => deleteTicket(id))}
      disabled={isPending}
    >
      {isPending && (
        <>
          <TiDelete />
          Deleting....
        </>
      )}
      {!isPending && (
        <>
          <TiDelete />
          Delete Ticket
        </>
      )}
    </button>
  );
}
