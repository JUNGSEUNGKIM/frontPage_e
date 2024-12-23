import palettes from "@/constants/colors";
import { Button } from "./ui/button";

export function ReportBottomButton({
    label,
    outline,
    onClick,
}: {
    label: string;
    outline: boolean;
    onClick: () => void;
}) {
    if (outline) {
        return (
            <Button
                w="49%"
                h="4vh"
                bg="white"
                color={palettes.black}
                borderRadius={12}
                borderWidth={2}
                borderColor={palettes.grey}
                fontSize="4xl"
                onClick={onClick}
            >
                {label}
            </Button>
        );
    }

    return (
        <Button
            w="49%"
            h="4vh"
            bg={palettes.primary}
            color="white"
            borderColor={palettes.primary}
            borderRadius={12}
            borderWidth={2}
            fontSize="4xl"
            onClick={onClick}
        >
            {label}
        </Button>
    );
}
