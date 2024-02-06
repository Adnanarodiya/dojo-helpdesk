"use client";
import { Tables } from "@/app/db.types";
import React, { FormEvent, useState } from "react";
import { updateTicket } from "../../action";
import UpdateButton from "@/app/components/UpdateButton";

interface EditTicketProps {
  ticket: Tables<"Tickets">;
}

export default function EditTicket({ ticket }: EditTicketProps) {
  const [title, setTitle] = useState(ticket.title ?? "");
  const [body, setBody] = useState(ticket.body ?? "");
  const [priority, setPriority] = useState(ticket.priority ?? "low");

  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateTicket(ticket.id, {
      title,
      body,
      priority,
    });
  };
  return (
    <form className="w-1/2" onSubmit={handelSubmit}>
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <div className="ml-auto">
        {/* {=== ticket.user_email && <UpdateButton />} */}
        <UpdateButton />
      </div>
    </form>
  );
}
