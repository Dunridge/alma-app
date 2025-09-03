"use client";

import { Lead, Status } from "@/types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  leads: Lead[];
  setLeads: Dispatch<SetStateAction<Lead[]>>;
};

export default function LeadsTable({ leads, setLeads }: Props) {
  // TODO: add pagination
  // TODO: add a search input here

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
          {leads.map((lead, index) => (
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
              <td>{lead.visaCategories.join(", ")}</td>
              <td>{lead.helpText}</td>
              {/* TODO: add a button to switch this between states: style={{ width: 138 }} */}
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
