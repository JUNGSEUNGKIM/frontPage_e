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

export const ApiKeys = {
    lucidLicense: "a4ef524b-45cb-4c05-8688-64d8a49be60c",
};
