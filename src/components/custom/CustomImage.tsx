import { Image } from "@chakra-ui/react";

export function CustomImage({ src, alt }: { src: string; alt: string }) {
    return <div className="w-1/2 flex justify-end">
        <Image src={src} w="50px" h="50px" alt={alt} />
        </div>;
}
