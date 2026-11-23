// Validare pe server: datele de la client nu sunt niciodată de încredere.
// Valorile trebuie să fie identice cu cele din frontend/src/constants.js.
export const PLATFORME = ["pc", "playstation", "xbox"];
const PLATFORMA_IMPLICITA = "pc";
const TITLU_MAX = 100;
const DEZVOLTATOR_MAX = 100;
const AN_MIN = 1950;
const AN_MAX = 2100;

// partial = true pentru PATCH (se verifică doar câmpurile trimise)
export function valideazaJoc(body, { partial = false } = {}) {
  const erori = [];
  const date = {};

  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return { erori: ["corpul cererii trebuie să fie un obiect JSON"], date };
  }

  // titlu: obligatoriu la POST, maximum 100 de caractere
  if (!partial || body.titlu !== undefined) {
    if (typeof body.titlu !== "string" || body.titlu.trim() === "") {
      erori.push("titlu este obligatoriu");
    } else if (body.titlu.trim().length > TITLU_MAX) {
      erori.push(`titlu are maximum ${TITLU_MAX} de caractere`);
    } else {
      date.titlu = body.titlu.trim();
    }
  }

  // platforma: una din valorile fixe, implicit "pc"
  if (!partial || body.platforma !== undefined) {
    const p = body.platforma ?? PLATFORMA_IMPLICITA;
    if (!PLATFORME.includes(p)) {
      erori.push(`platforma trebuie să fie una din: ${PLATFORME.join(", ")}`);
    } else {
      date.platforma = p;
    }
  }

  // completed: boolean, implicit false
  if (body.completed !== undefined) {
    if (typeof body.completed !== "boolean") {
      erori.push("completed trebuie să fie true sau false");
    } else {
      date.completed = body.completed;
    }
  } else if (!partial) {
    date.completed = false;
  }

  // dezvoltator: opțional, text nevid de maximum 100 de caractere
  if (body.dezvoltator !== undefined) {
    if (typeof body.dezvoltator !== "string" || body.dezvoltator.trim() === "") {
      erori.push("dezvoltator trebuie să fie un text nevid");
    } else if (body.dezvoltator.trim().length > DEZVOLTATOR_MAX) {
      erori.push(`dezvoltator are maximum ${DEZVOLTATOR_MAX} de caractere`);
    } else {
      date.dezvoltator = body.dezvoltator.trim();
    }
  }

  // an: opțional, număr întreg într-un interval rezonabil
  if (body.an !== undefined) {
    if (!Number.isInteger(body.an) || body.an < AN_MIN || body.an > AN_MAX) {
      erori.push(`an trebuie să fie un număr întreg între ${AN_MIN} și ${AN_MAX}`);
    } else {
      date.an = body.an;
    }
  }

  return { erori, date };
}

// Id-urile din adresă vin ca text; se acceptă doar numere întregi pozitive
export function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}
