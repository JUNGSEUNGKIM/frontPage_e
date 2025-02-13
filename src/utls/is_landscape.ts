export default function isLandScape(): boolean {
    const { innerWidth: width, innerHeight: height } = window;
    return width > height;
}
