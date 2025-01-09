// export every ko translation json
import labels from "./labels.json";
import tutorial from "./tutorial.json";
import descriptions from "./descriptions.json";
import qna from "./qna.json";

export default {
    ...labels,
    ...tutorial,
    ...descriptions,
    ...qna,
};
