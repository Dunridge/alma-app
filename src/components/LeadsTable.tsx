"use client";

import { Lead, Status } from "@/types";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import search from "@/assets/svg/search.svg";
import Image from "next/image";

type Props = {
  leads: Lead[];
  setLeads: Dispatch<SetStateAction<Lead[]>>;
};

export default function LeadsTable({ leads, setLeads }: Props) {
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

  const onUpdateLeadsStatus = ({ lead }: { lead: Lead }) => {
    setLeads((prevLeads: Lead[]) => {
      const updatedLeads = prevLeads.map((currLead) => {
        if (currLead.id === lead.id) {
          return {
            ...lead,
            status:
              currLead.status === Status.PENDING
                ? Status.REACHED_OUT
                : Status.PENDING,
          };
        } else {
          return currLead;
        }
      });

      return updatedLeads;
    });
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
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>LinkedIn</th>
            <th>Visa Categories</th>
            <th>Help Text</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO: add a component for the row */}
          {filteredLeads.map((lead, index) => (
            <tr className="leads-table__row" key={index}>
              <td>{lead.firstName}</td>
              <td>{lead.lastName}</td>
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
      </table>
    </div>
  );
}
