import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "@/components/ui/provider.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { OnboardingPage } from "./components/pages/OnboardingPage.tsx";
import { DiagnosisPage } from "./components/pages/DiagnosisPage.tsx";

// strict mode for check error

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Provider>
                <Routes>
                    <Route index element={<OnboardingPage />} />
                    <Route path="diagnosis" element={<DiagnosisPage />} />
                </Routes>
            </Provider>
        </BrowserRouter>
    </StrictMode>
);
