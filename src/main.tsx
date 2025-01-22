// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "@/components/ui/provider.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { OnboardingPage } from "./features/onboarding/pages/OnboardingPage.tsx";
import { DiagnosisPage } from "./features/diagnosis/pages/DiagnosisPage.tsx";
// import ReportPage from "./components/pages/ReportPage.tsx";
import ReportPageV2 from "./components/pages/ReportPageV2.tsx";
// import i18n
import "./i18n";

// strict mode for check error
const isTEST = false;

createRoot(document.getElementById("root")!).render(
    <BrowserRouter basename="/lucycare">
        <Provider>
            <Routes>
                <Route
                    index
                    element={isTEST ? <ReportPageV2 /> : <OnboardingPage />}
                />
                <Route path="diagnosis" element={<DiagnosisPage />} />
                <Route path="report" element={<ReportPageV2 />} />
            </Routes>
        </Provider>
    </BrowserRouter>
);
