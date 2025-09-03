import { Lead } from "@/types";

type Props = {
  leads: Lead[];
};

export default function LeadsTable({ leads }: Props) {
  // TODO: add a search input here
  // TODO: style
  // TODO: add a button to change the state of a lead from PENDING to REACHED_OUT.

  return (
    <div className="leads-table">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>LinkedIn</th>
            <th>Visa Categories</th>
            <th>Help Text</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={index}>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
