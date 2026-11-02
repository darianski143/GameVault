// Toate cererile HTTP stau aici; componentele nu apelează fetch direct.
// Adresa serverului vine din variabila de mediu VITE_API_URL (vezi .env.example).
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function fetchJocuri() {
  const res = await fetch(`${API_URL}/jocuri`);
  if (!res.ok) {
    throw new Error(`Eroare server: ${res.status}`);
  }
  return res.json();
}
