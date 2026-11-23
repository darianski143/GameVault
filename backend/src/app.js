import express from "express";
import cors from "cors";
import jocuriRouter from "./routes/jocuri.js";

const app = express();

// CORS: browserul blochează cererile de pe :5173 către :3001
// dacă serverul nu spune explicit că le permite
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));

// Transformă corpul JSON al cererii în req.body
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/jocuri", jocuriRouter);

// Rută necunoscută
app.use((req, res) => {
  res.status(404).json({ error: "Ruta nu există" });
});

// Tratare centralizată a erorilor (Express 5 trimite aici și erorile async).
// JSON invalid în corp vine de la express.json() cu status 400.
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ error: status === 500 ? "Eroare internă" : err.message });
});

export default app;
