import LogoButton from "@/shared/components/LogoButton";
import { useNavigate } from "react-router";
import { LogoutButton } from "./LogoutButton";

export default function DiagnosisAppBar() {
    const navigate = useNavigate();

    function handleGoPreviousPage() {
        navigate(-1);
    }

    return (
        <div className="w-full h-16 flex flex-row items-center justify-between mr-4 mb-8 py-4">
            {/* Logo Button */}
            <LogoButton onClick={handleGoPreviousPage} isWhite={true} />

            {/* Logout Button */}
            <LogoutButton onClick={() => navigate("/onboarding")} />
        </div>
    );
}
