import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import EditingButton from "@/app/components/EditingButton";

async function EditTicket(id: string) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase
    .from("Tickets")
    .select()
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }
  return data;
}
export default async function EditTicketDetails({
  params,
}: {
  params: { id: string };
}) {
  const ticket = await EditTicket(params.id);
  return (
    <form className="w-1/2">
      <label>
        <span>Title:</span>
        <input required type="text" name="title" value={ticket.title} />
      </label>
      <label>
        <span>Body:</span>
        <textarea required name="body" value={ticket.body} />
      </label>
      <label>
        <span>Priority:</span>
        <select name="priority" value={ticket.priority}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <EditingButton />
    </form>
  );
}
