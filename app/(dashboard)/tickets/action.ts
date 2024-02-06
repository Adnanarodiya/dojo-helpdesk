"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Database, TablesUpdate } from "@/app/db.types";

export async function addTicket(
  formData: Iterable<readonly [PropertyKey, any]>
) {
  const ticket = Object.fromEntries(formData);

  const supabase = createServerActionClient({ cookies });

  // get current user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // insert the data
  const { error } = await supabase.from("Tickets").insert({
    ...ticket,
    user_email: session?.user.email,
  });

  if (error) {
    throw new Error("Could not add the new ticket.");
  }

  revalidatePath("/tickets");
  redirect("/tickets");
}

export async function deleteTicket(id: any) {
  const supabase = createServerActionClient({ cookies });

  const { error } = await supabase.from("Tickets").delete().eq("id", id);

  if (error) {
    throw new Error("Could not delete the ticket.");
  }

  revalidatePath("/tickets");
  redirect("/tickets");
}

export async function updateTicket(
  id: number,
  ticket: TablesUpdate<"Tickets">
) {
  const supabase = createServerActionClient<Database>({ cookies });

  const { error } = await supabase.from("Tickets").update(ticket).eq("id", id);
  console.log(id);

  if (error) {
    throw new Error("Could not update the ticket.");
  }
  revalidatePath(`/tickets/${id}`);
  redirect(`/tickets/${id}`);
  // revalidatePath("/tickets");
  // redirect("/tickets");
}
