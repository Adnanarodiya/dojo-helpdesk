"use client";

import { useFormStatus as useFormStatus } from "react-dom";
import { updateTicket } from "../(dashboard)/tickets/action";
export default function EditingButton() {
  const { pending } = useFormStatus();

  return (
    <button onClick={updateTicket} disabled={pending} className="btn-primary">
      {pending && <span>Editting...</span>}
      {!pending && <span>Edited</span>}
    </button>
  );
}
