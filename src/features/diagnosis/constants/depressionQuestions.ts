import { TFunction } from "i18next";

export const getDepressionQuestions = (t: TFunction): string[] => [
    t("depressionQuestion1"), // "Experiencing a lack of motivation or interest"
    t("depressionQuestion2"), // "Feeling down, depressed, or hopeless"
    t("depressionQuestion3"), // "Frequently sleep deprived, oversleeping, or having trouble falling asleep"
    t("depressionQuestion4"), // "Lacking energy or constantly feeling fatigued"
    t("depressionQuestion5"), // "Having poor appetite or overeating"
    t("depressionQuestion6"), // "Feeling dissatisfied with yourself, or believe that you are a failure or have let yourself or your family down"
    t("depressionQuestion7"), // "Trouble concentrating on things, such as reading the newspaper or watching television"
    t("depressionQuestion8"), // "Moving/speaking very slowly or restlessly, causing others to take notice of your behaviors"
    t("depressionQuestion9"), // "Have recently attempted or thought of self harm or committing suicide"
];

export const getDepressionOptions = (t: TFunction): string[] => [
    t("depressionOption1"), // "1. Not at all"
    t("depressionOption2"), // "2. Few days a week"
    t("depressionOption3"), // "3. About half of a week"
    t("depressionOption4"), // "4. Nearly every day"
];
