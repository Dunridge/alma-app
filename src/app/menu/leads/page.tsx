import LeadsTable from "@/components/LeadsTable";
import { Lead } from "@/types";

export const tmpLeads: Lead[] = [
  {
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    linkedin: "https://www.linkedin.com/in/alicejohnson",
    visaCategories: ["H-1B", "O-1"],
    resume: null,
    helpText: "Looking for sponsorship for H-1B transfer.",
  },
  {
    firstName: "Brian",
    lastName: "Lee",
    email: "brian.lee@example.com",
    linkedin: "https://www.linkedin.com/in/brianlee",
    visaCategories: ["Green Card"],
    resume: null,
    helpText: "Interested in employment-based green card process.",
  },
  {
    firstName: "Carla",
    lastName: "Martinez",
    email: "carla.martinez@example.com",
    linkedin: "https://www.linkedin.com/in/carlamartinez",
    visaCategories: ["F-1", "OPT"],
    resume: null,
    helpText: "Graduating in May, looking for OPT opportunities.",
  },
];

// TODO: add the leads table here
export default function Leads() {
  return (
    <div>
      <div>Leads</div>

      <LeadsTable leads={tmpLeads} />
    </div>
  );
}
