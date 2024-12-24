import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "@/components/ui/provider.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { OnboardingPage } from "./components/pages/OnboardingPage.tsx";
import { DiagnosisPage } from "./components/pages/DiagnosisPage.tsx";
import ReportPage from "./components/pages/ReportPage.tsx";

// strict mode for check error
const isTEST = true;

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Provider>
                <Routes>
                    <Route
                        index
                        element={isTEST ? <ReportPage /> : <OnboardingPage />}
                    />
                    <Route path="diagnosis" element={<DiagnosisPage />} />
                    <Route path="report" element={<ReportPage />} />
                </Routes>
            </Provider>
        </BrowserRouter>
    </StrictMode>
);
