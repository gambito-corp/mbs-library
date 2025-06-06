import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound.jsx";
import DesignSystemViewer from "../docs/components/DesignSystemViewer.jsx";
import Alert from "../components/molecules/Alert/Alert.jsx"; // ✅ AGREGAR .jsx

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DesignSystemViewer />} />
            <Route path="/atoms" element={<DesignSystemViewer />} />
            <Route path="/molecules" element={<DesignSystemViewer />} />
            <Route path="/organisms" element={<DesignSystemViewer />} />
            <Route path="/templates" element={<DesignSystemViewer />} />
            <Route path="/pages" element={<DesignSystemViewer />} />
            <Route path="/show/molecules/alert" element={<Alert />} /> {/* ✅ AGREGAR / al inicio */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
