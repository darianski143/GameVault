// Toate cererile HTTP stau aici; componentele nu apelează fetch direct.
// Adresa serverului vine din variabila de mediu VITE_API_URL (vezi .env.example).
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Funcție comună: trimite JSON și aruncă eroare dacă răspunsul nu este 2xx
async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) {
    throw new Error(`Eroare server: ${res.status}`);
  }
  // 204 No Content nu are corp
  return res.status === 204 ? null : res.json();
}

export function fetchJocuri() {
  return request("/jocuri");
}

export function fetchJoc(id) {
  return request(`/jocuri/${id}`);
}

export function createJoc(joc) {
  return request("/jocuri", { method: "POST", body: JSON.stringify(joc) });
}

export function updateJoc(id, changes) {
  return request(`/jocuri/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

export function deleteJoc(id) {
  return request(`/jocuri/${id}`, { method: "DELETE" });
}
