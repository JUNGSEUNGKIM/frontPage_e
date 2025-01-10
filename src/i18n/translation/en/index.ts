// export every en translation json
import greetings from "./greetings.json";
import labels from "./labels.json";
import tutorial from "./tutorial.json";
import descriptions from "./descriptions.json";
import qna from "./qna.json";

export default {
    ...greetings,
    ...labels,
    ...tutorial,
    ...descriptions,
    ...qna,
};
