// interface for api endpoints
interface Api {
    lucid: string;
    lucidToken: string;
    lucidStatus: string;
}

export const Api = {
    lucid: "https://emma.vibemusic.ai/?experience=",
    lucidToken: "https://proxy.core.thelucidproject.ca/experiences",
    lucidStatus: "https://proxy.core.thelucidproject.ca/experiences/",
};
