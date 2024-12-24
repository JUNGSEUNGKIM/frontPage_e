export const getSpeech = (text: string) => {
    let voices: SpeechSynthesisVoice[];

    //디바이스에 내장된 voice를 가져온다.
    const setVoiceList = () => {
        voices = window.speechSynthesis.getVoices();
    };

    setVoiceList();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        //voice list에 변경됐을때, voice를 다시 가져온다.
        window.speechSynthesis.onvoiceschanged = setVoiceList;
    }

    const speech = (txt: string) => {
        const lang = "en-US";
        const utterThis = new SpeechSynthesisUtterance(txt);

        utterThis.lang = lang;

        //utterance를 재생(speak)한다.
        window.speechSynthesis.speak(utterThis);
    };

    speech(text);
};
