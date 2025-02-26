import Logo from "@/assets/logo.png";
import WhiteLogo from "@/assets/logo_white.png";

export default function LogoButton({ 
    onClick,
    isWhite = false,
 }: { 
    onClick: () => void,
    isWhite?: boolean,
 }) {
    return <img src={isWhite ? WhiteLogo : Logo} onClick={onClick} className="h-10 mx-4"/>;
}
