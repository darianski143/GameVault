import { Router } from "express";
import { parseId, valideazaJoc } from "../validation.js";

const router = Router();

// Etapa 9: datele stau în memorie și se pierd la repornire (Etapa 10 le mută în MariaDB)
let jocuri = [
  { id: 1, titlu: "Elden Ring", platforma: "pc", completed: false, dezvoltator: "FromSoftware", an: 2022 },
  { id: 2, titlu: "Resident Evil Requiem", platforma: "xbox", completed: true, dezvoltator: "Capcom", an: 2026 },
  { id: 3, titlu: "Assetto Corsa Competizione", platforma: "pc", completed: false, dezvoltator: "Kunos Simulazioni", an: 2019 },
  { id: 4, titlu: "Ghost of Yotei", platforma: "playstation", completed: false, dezvoltator: "Sucker Punch Productions", an: 2025 },
  { id: 5, titlu: "Forza Horizon 5", platforma: "xbox", completed: true, dezvoltator: "Playground Games", an: 2021 },
  { id: 6, titlu: "God of War Ragnarök", platforma: "playstation", completed: true, dezvoltator: "Santa Monica Studio", an: 2022 },
  { id: 7, titlu: "Hollow Knight: Silksong", platforma: "xbox", completed: false, dezvoltator: "Team Cherry", an: 2025 },
];
let nextId = 8;

// Validează :id și găsește elementul, sau răspunde cu 400 / 404
function gasesteIndex(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    res.status(400).json({ error: "Id invalid" });
    return -1;
  }
  const index = jocuri.findIndex((j) => j.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Jocul nu există" });
  }
  return index;
}

// GET /jocuri
router.get("/", (req, res) => {
  res.json(jocuri);
});

// GET /jocuri/:id
router.get("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  res.json(jocuri[index]);
});

// POST /jocuri
router.post("/", (req, res) => {
  const { erori, date } = valideazaJoc(req.body ?? {});
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  const joc = { id: nextId++, ...date };
  jocuri.push(joc);
  res.status(201).json(joc);
});

// PATCH /jocuri/:id (modificare parțială)
router.patch("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  const { erori, date } = valideazaJoc(req.body ?? {}, { partial: true });
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  jocuri[index] = { ...jocuri[index], ...date };
  res.json(jocuri[index]);
});

// DELETE /jocuri/:id
router.delete("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  jocuri.splice(index, 1);
  res.status(204).end();
});

export default router;
