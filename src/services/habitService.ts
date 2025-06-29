const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/habits";

export const habitService = {
  getAll: async () => (await fetch(API_BASE)).json(),
  get: async (id: number) => (await fetch(`${API_BASE}/${id}`)).json(),
  create: async (data: any) =>
    (
      await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    ).json(),
  update: async (id: number, data: any) =>
    (
      await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    ).json(),
  delete: async (id: number) =>
    fetch(`${API_BASE}/${id}`, { method: "DELETE" }),
  completeDay: async (id: number, date: string) =>
    (
      await fetch(`${API_BASE}/${id}/complete?date=${date}`, { method: "POST" })
    ).json(),
  uncompleteDay: async (id: number, date: string) =>
    (
      await fetch(`${API_BASE}/${id}/complete?date=${date}`, {
        method: "DELETE",
      })
    ).json(),
};
