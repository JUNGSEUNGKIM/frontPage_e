// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { OnboardingPage } from "./features/onboarding/pages/OnboardingPage.tsx";
import { DiagnosisPage } from "./features/diagnosis/pages/DiagnosisPage.tsx";
// import ReportPage from "./components/pages/ReportPage.tsx";
// import ReportPageV2 from "./components/pages/ReportPageV2.tsx";
import ResultPage from "./features/result/pages/ResultPage.tsx";
// import i18n
import "./i18n";
import { Provider } from "@/components/ui/provider";
import { useEffect } from "react";

// strict mode for check error
const isTEST = false;

createRoot(document.getElementById("root")!).render(
    <Provider>
        <BrowserRouter basename="/lucycare">
            <Routes>
                <Route
                    index
                    element={isTEST ? <ResultPage /> : <OnboardingPage />}
                />
                <Route path="diagnosis" element={<DiagnosisPage />} />
                <Route path="report" element={<ResultPage />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);
