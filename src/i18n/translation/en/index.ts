// export every en translation json
import greetings from "./greetings.json";
import labels from "./labels.json";
import tutorial from "./tutorial.json";

export default {
    ...greetings,
    ...labels,
    ...tutorial,
};
