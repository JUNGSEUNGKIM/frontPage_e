import { Image } from "@chakra-ui/react";

export function CustomImage({ src, alt }: { src: string; alt: string }) {
    return <Image src={src} w="50px" h="50px" alt={alt} />;
}
