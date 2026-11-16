import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProiectePage from "./pages/ProiectePage.jsx";
import ProiectDetaliuPage from "./pages/ProiectDetaliuPage.jsx";
import DesprePage from "./pages/DesprePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Harta rutelor. Layout înconjoară fiecare pagină.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProiectePage />} />
        <Route path="/proiecte/:id" element={<ProiectDetaliuPage />} />
        <Route path="/tasks/:id" element={<ProiectDetaliuPage />} />
        <Route path="/despre" element={<DesprePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
