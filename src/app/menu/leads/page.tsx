"use client";

import LeadsTable from "@/components/LeadsTable";
import { Lead } from "@/types";
import { useEffect, useState } from "react";

// export const tmpLeads: Lead[] = [
//   {
//     id: "id1",
//     firstName: "Alice",
//     lastName: "Johnson",
//     email: "alice.johnson@example.com",
//     linkedin: "https://www.linkedin.com/in/alicejohnson",
//     visaCategories: ["H-1B", "O-1"],
//     resume: null,
//     helpText: "Looking for sponsorship for H-1B transfer.",
//     status: Status.PENDING,
//   },
//   {
//     id: "id2",
//     firstName: "Brian",
//     lastName: "Lee",
//     email: "brian.lee@example.com",
//     linkedin: "https://www.linkedin.com/in/brianlee",
//     visaCategories: ["Green Card"],
//     resume: null,
//     helpText: "Interested in employment-based green card process.",
//     status: Status.PENDING,
//   },
//   {
//     id: "id3",
//     firstName: "Carla",
//     lastName: "Martinez",
//     email: "carla.martinez@example.com",
//     linkedin: "https://www.linkedin.com/in/carlamartinez",
//     visaCategories: ["F-1", "OPT"],
//     resume: null,
//     helpText: "Graduating in May, looking for OPT opportunities.",
//     status: Status.PENDING,
//   },
// ];

// TODO: add the leads table here

export default function Leads() {
  const [leads, setLeads] = useState([] as Lead[]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const res = await fetch("/api/leads");
    const leads = await res.json();
    debugger;

    if (leads) {
      setLeads(leads);
    }
  };

  return (
    <div className="leads">
      <div className="leads__title">Leads</div>

      <LeadsTable leads={leads} setLeads={setLeads} />
    </div>
  );
}
