import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const STATUS = ["all", "Active", "Invited", "Suspended"];

const seedUsers = [
  {
    id: "u_1001",
    name: "Ava Martinez",
    email: "ava.martinez@clientco.com",
    company: "ClientCo",
    plan: "Pro",
    status: "Active",
    lastActive: "2026-03-21",
  },
  {
    id: "u_1002",
    name: "Noah Johnson",
    email: "noah.johnson@northwind.io",
    company: "Northwind",
    plan: "Business",
    status: "Active",
    lastActive: "2026-03-20",
  },
  {
    id: "u_1003",
    name: "Sophia Chen",
    email: "sophia.chen@bluepeak.education",
    company: "BluePeak",
    plan: "Pro",
    status: "Invited",
    lastActive: "-",
  },
  {
    id: "u_1004",
    name: "Liam Patel",
    email: "liam.patel@quantumacademy.org",
    company: "Quantum Academy",
    plan: "Enterprise",
    status: "Active",
    lastActive: "2026-03-18",
  },
  {
    id: "u_1005",
    name: "Mia Thompson",
    email: "mia.thompson@orchidlearn.com",
    company: "OrchidLearn",
    plan: "Business",
    status: "Suspended",
    lastActive: "2026-02-28",
  },
  {
    id: "u_1006",
    name: "Ethan Brown",
    email: "ethan.brown@riverstone.edu",
    company: "Riverstone",
    plan: "Pro",
    status: "Active",
    lastActive: "2026-03-22",
  },
];

function formatDate(value) {
  if (!value || value === "-") return "-";
  // Simple formatting that still works without external libs.
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function statusBadge(status) {
  switch (status) {
    case "Active":
      return "border-green-200 bg-green-50 text-green-700";
    case "Invited":
      return "border-indigo-200 bg-indigo-50 text-indigo-700";
    case "Suspended":
      return "border-rose-200 bg-rose-50 text-rose-700";
    default:
      return "border-gray-200 bg-gray-50 text-gray-700";
  }
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    return seedUsers.filter((u) => {
      const matchesQuery =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.company.toLowerCase().includes(q);

      const matchesStatus = status === "all" ? true : u.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  const stats = useMemo(() => {
    const total = seedUsers.length;
    const active = seedUsers.filter((u) => u.status === "Active").length;
    const invited = seedUsers.filter((u) => u.status === "Invited").length;
    const suspended = seedUsers.filter((u) => u.status === "Suspended").length;
    return { total, active, invited, suspended };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex">
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200">
          <div className="p-6">
            <div className="text-lg font-semibold tracking-tight">Admin Panel</div>
            <div className="text-sm text-gray-500 mt-1">Dashboard & Client List</div>
          </div>

          <nav className="px-4 pb-6">
            <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-3">
              <div className="text-sm font-semibold text-indigo-700">Dashboard</div>
              <div className="text-xs text-indigo-600 mt-1">Overview & clients</div>
            </div>

            <div className="mt-3 text-xs text-gray-500 px-1">Management</div>
            <div className="mt-2 space-y-1">
              <button className="w-full text-left rounded-lg px-3 py-2 text-sm bg-white hover:bg-gray-50 border border-transparent">
                Client List
              </button>
            </div>
          </nav>
        </aside>

        <main className="flex-1">
          <header className="bg-white border-b border-gray-200">
            <div className="px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm text-gray-500">Welcome back</div>
                <div className="text-xl font-semibold tracking-tight">Client Dashboard</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden md:block">
                  <label className="sr-only" htmlFor="search">
                    Search clients
                  </label>
                  <input
                    id="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search clients..."
                    className="w-[280px] border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm font-medium rounded-lg px-4 py-2 bg-gray-900 text-white hover:bg-gray-800"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>

          <section className="p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <div className="text-xs text-gray-500">Total Users</div>
                <div className="mt-2 text-2xl font-semibold">{stats.total}</div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <div className="text-xs text-gray-500">Active</div>
                <div className="mt-2 text-2xl font-semibold text-green-700">{stats.active}</div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <div className="text-xs text-gray-500">Invited</div>
                <div className="mt-2 text-2xl font-semibold text-indigo-700">{stats.invited}</div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <div className="text-xs text-gray-500">Suspended</div>
                <div className="mt-2 text-2xl font-semibold text-rose-700">{stats.suspended}</div>
              </div>
            </div>

            <div className="mt-6 bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="text-base font-semibold">Client List</div>
                  <div className="text-sm text-gray-500">All registered users (demo data)</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="md:hidden">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search clients..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {STATUS.map((s) => (
                        <option key={s} value={s}>
                          {s === "all" ? "All statuses" : s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-10 text-center text-sm text-gray-500">
                          No clients found.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div className="font-semibold">{u.name}</div>
                            <div className="text-sm text-gray-500">{u.email}</div>
                            <div className="text-xs text-gray-400">{u.company}</div>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-gray-700">
                              {u.plan}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusBadge(u.status)}`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700">{formatDate(u.lastActive)}</td>
                          <td className="px-4 py-4 text-right">
                            <button className="text-sm font-medium rounded-lg px-3 py-2 bg-indigo-600 text-white hover:bg-indigo-700">
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

