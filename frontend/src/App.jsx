import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import JocuriPage from "./pages/JocuriPage.jsx";
import JocDetaliuPage from "./pages/JocDetaliuPage.jsx";
import DesprePage from "./pages/DesprePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Harta rutelor. Layout înconjoară fiecare pagină.
// Ruta de detaliu folosește resursa din tw.json: /jocuri/:id
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<JocuriPage />} />
        <Route path="/jocuri/:id" element={<JocDetaliuPage />} />
        <Route path="/despre" element={<DesprePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
