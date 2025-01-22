export default function OnboardingButton({
    label,
    onClick,
}: {
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="w-5/6 py-8 bg-blue-500 rounded-lg flex flex-col items-center justify-center text-white text-4xl"
        >
            <h1>{label}</h1>
        </button>
    );
}
