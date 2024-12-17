import { Button } from "@/components/ui/button";
import palettes from "@/constants/colors";
import { Text } from "@chakra-ui/react";

interface AnswerButtonProps {
    isSelected: boolean;
    handleTap: () => void;
}

export function AnswerButton({ isSelected, handleTap }: AnswerButtonProps) {
    return (
        <Button
            bg={isSelected ? palettes.primary : "white"}
            w="100%"
            p="40px"
            borderWidth="2px"
            variant="solid"
            borderColor={isSelected ? palettes.primary : palettes.grey}
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
                일주일 이상 영향을 받았다
            </Text>
        </Button>
    );
}
