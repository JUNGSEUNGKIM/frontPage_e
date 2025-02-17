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
import SetUpPage from "./features/setup/SetUpPage.tsx";
import { StrictMode } from "react";
import { LSTutorialPage } from "./features/onboarding/pages/LSTutorialPage.tsx";
// import { LSOnboardingPage } from "./features/onboarding/pages/LSOnboardingPage.tsx";

// TEMP DEBUG - landscape sidebar debugging code
// import DiagnosisPage_Landscape from "./features/diagnosis/pages/DiagnosisPage_Landscape.tsx";
// const isLandscapeTest = true;

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider>
            <BrowserRouter basename="/lucycare">
                <Routes>
                    <Route index element={<SetUpPage />} />
                    <Route path="onboarding" element={<OnboardingPage />} />
                    <Route path="tutorial" element={<LSTutorialPage />} />
                    <Route path="diagnosis" element={<DiagnosisPage />} />
                    <Route path="report" element={<ResultPage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
