import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound.jsx";
import DesignSystemViewer from "../components/DesignSystemViewer.jsx";
import Alert from "../components/atoms/Alert.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DesignSystemViewer />} />
            <Route path="/atoms/alert" element={<Alert type="info" message="Vista de ejemplo del Alert" />} />
            {/* Otras rutas para átomos */}
            <Route path="/atoms" element={<DesignSystemViewer />} />
            <Route path="/molecules" element={<DesignSystemViewer />} />
            <Route path="/organisms" element={<DesignSystemViewer />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
