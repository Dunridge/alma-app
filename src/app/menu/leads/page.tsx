"use client";

import LeadsTable from "@/components/LeadsTable";
import { Lead } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Leads() {
  const [leads, setLeads] = useState([] as Lead[]);
  const router = useRouter();

  useEffect(() => {
    fetchLeads();

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) router.push("/login");
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
