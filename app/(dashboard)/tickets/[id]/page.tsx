import { Ticket } from "@/app/utils/types";
import { notFound } from "next/navigation";

// |> what is the use of this ?
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = params.id;
  const res = await fetch(`http://localhost:4000/tickets/${id}`);
  const ticket = await res.json();
  return {
    title: `Dojo Helpdesk |  ${ticket.title}`,
  };
}

// |> static rendering how ??
async function getStaticParams() {
  const res = await fetch("http://localhost:4000/tickets");

  const tickets = await res.json();
  return tickets.map((ticket: Ticket) => ({
    params: { id: ticket.id },
  }));
}

async function getTicket(id: string) {
  // |> imitate delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch("http://localhost:4000/tickets/" + id, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function TicketDetails({
  params,
}: {
  params: { id: string };
}) {
  const ticket: Ticket = await getTicket(params.id);
  return (
    <>
      <main>
        <nav>
          <h2>Ticket Details</h2>
        </nav>
        <div className="card">
          <h3>{ticket.title}</h3>
          <small>Created by {ticket.user_email} </small>
          <p>{ticket.body}</p>
          <div className={`pill ${ticket.priority}`}>
            {ticket.priority} priority
          </div>
        </div>
      </main>
    </>
  );
}
