import LogoButton from "@/shared/components/LogoButton";
import { useNavigate } from "react-router";

export default function DiagnosisAppBar() {
    const navigate = useNavigate();

    function handleGoPreviousPage() {
        navigate(-1);
    }

    return (
        <div className="w-full flex flex-row justify-between mt-4 mr-4 mb-8">
            {/* Logo Button */}
            <LogoButton onClick={handleGoPreviousPage} />
        </div>
    );
}
