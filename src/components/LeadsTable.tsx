"use client";

import { Lead, Status } from "@/types";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import search from "@/assets/svg/search.svg";
import Image from "next/image";
import Spinner from "./Spinner";

type Props = {
  leads: Lead[];
  setLeads: Dispatch<SetStateAction<Lead[]>>;
  loading: boolean;
};

export default function LeadsTable({ leads, setLeads, loading }: Props) {
  // TODO: add pagination
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLeads = useMemo(() => {
    if (!searchQuery) return leads;
    return leads.filter(
      (lead) =>
        lead.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.linkedin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.visas.some((v) =>
          v.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        lead?.message?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [leads, searchQuery]);

  const onUpdateLeadsStatus = async ({ lead }: { lead: Lead }) => {
    const newStatus =
      lead.status === Status.PENDING ? Status.REACHED_OUT : Status.PENDING;

    try {
      const res = await fetch(`/api/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        console.error("Failed to update lead status");
        return;
      }

      const updatedLead: Lead = await res.json();
      setLeads((prevLeads: Lead[]) =>
        prevLeads.map((currLead) =>
          currLead.id === updatedLead.id ? updatedLead : currLead
        )
      );
    } catch (err) {
      console.error("Error updating lead status:", err);
    }
  };

  return (
    <div className="leads-table">
      <div className="leads-table__search">
        <Image
          className="leads-table__search-icon"
          src={search}
          alt="Seach"
          width={20}
          height={20}
        />
        <input
          type="text"
          placeholder="Search leads..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="leads-table__search-input"
        />
      </div>

      <table className="leads-table__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>LinkedIn</th>
            <th>Visa Categories</th>
            <th>Help Text</th>
            <th>Status</th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td colSpan={7}>
                <Spinner />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {/* TODO: add a component for the row */}
            {filteredLeads.map((lead, index) => (
              <tr className="leads-table__row" key={index}>
                <td>
                  {lead.firstName} {lead.lastName}
                </td>
                <td>{lead.email}</td>
                <td>
                  <a
                    href={lead.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {lead.linkedin}
                  </a>
                </td>
                <td>{lead?.visas?.join(", ")}</td>
                <td className="leads-table__row__message">{lead.message}</td>
                <td className="leads-table__row__status">
                  <button onClick={() => onUpdateLeadsStatus({ lead })}>
                    {lead.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
