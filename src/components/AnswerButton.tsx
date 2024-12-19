import { Button } from "@/components/ui/button";
import palettes from "@/constants/colors";
import { Text } from "@chakra-ui/react";

interface AnswerButtonProps {
    label: string;
    isSelected: boolean;
    handleTap: () => void;
}

export function AnswerButton({
    label,
    isSelected,
    handleTap,
}: AnswerButtonProps) {
    return (
        <Button
            bg={isSelected ? palettes.primary : "white"}
            w="100%"
            p="40px"
            borderWidth="2px"
            variant="solid"
            borderColor={isSelected ? palettes.primary : palettes.grey}
            borderRadius={12}
            onClick={handleTap}
            mt="16px"
            _hover={{
                borderColor: palettes.grey,
            }}
        >
            <Text
                fontSize="xl"
                fontWeight="bold"
                color={isSelected ? "white" : "black"}
            >
                {label}
            </Text>
        </Button>
    );
}
