import Logo from "@/assets/logo.png";

export default function LogoButton({ onClick }: { onClick: () => void }) {
    return <img src={Logo} onClick={onClick} className="h-10 mx-4" />;
}
