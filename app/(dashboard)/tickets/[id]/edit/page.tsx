import UpdateButton from "@/app/components/UpdateButton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import EditTicket from "./EditTicket";
import { Database } from "@/app/db.types";

interface PageProps {
  params: {
    id: string;
  };
}

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  const id = params.id;
  const { data: ticket } = await supabase
    .from("Tickets")
    .select()
    .eq("id", id)
    .single();

  return {
    title: `Dojo Helpdesk | ${ticket?.title || "Ticket not Found"}`,
  };
}

async function getTicketDetails(id: string) {
  const supabase = createServerComponentClient<Database>({ cookies });

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
export default async function Page({ params }: PageProps) {
  const ticket = await getTicketDetails(params.id);

  return <EditTicket ticket={ticket} />;
}
