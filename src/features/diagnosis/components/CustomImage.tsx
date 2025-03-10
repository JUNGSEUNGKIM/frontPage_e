export function CustomImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} className="w-12 h-12" alt={alt} />;
}
