import { ReactNode } from "react";
import { Button } from "./ui/button";

export function CustomButton({
    bg,
    color,
    w,
    h,
    children,
}: {
    bg: string | number;
    color: string;
    w: string | number;
    h: string | number;
    children: ReactNode;
}) {
    return (
        <Button w={w} h={h} color={color} bg={bg} borderRadius={10}>
            {children}
        </Button>
    );
}
