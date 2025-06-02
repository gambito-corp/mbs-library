import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound.jsx";
import DesignSystemViewer from "../docs/components/DesignSystemViewer.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DesignSystemViewer />} />
            {/* Otras rutas para átomos */}
            <Route path="/atoms" element={<DesignSystemViewer />} />
            <Route path="/molecules" element={<DesignSystemViewer />} />
            <Route path="/organisms" element={<DesignSystemViewer />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
