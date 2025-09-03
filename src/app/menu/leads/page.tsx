"use client";

import LeadsTable from "@/components/LeadsTable";
import { Lead } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Leads() {
  const [leads, setLeads] = useState([] as Lead[]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      const leads = await res.json();

      if (leads) {
        setLeads(leads);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leads">
      <div className="leads__title">Leads</div>

      <LeadsTable leads={leads} setLeads={setLeads} loading={loading} />

      {/* {loading ? (
        <div className="leads__loader">Loading...</div> // simple loader
      ) : (
      )} */}
    </div>
  );
}
