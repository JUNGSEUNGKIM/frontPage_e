import { TFunction } from "i18next";

export const getDementiaQuestions = (t: TFunction): string[] => [
    t("dementiaQuestion1"), // "Having difficulty recalling recent past events"
    t("dementiaQuestion2"), // "Easily forget things you heard a few days ago"
    t("dementiaQuestion3"), // "Having trouble breaking and changing the pattern in repetitive daily activities"
    t("dementiaQuestion4"), // "Forgetting things that are personally important"
    t("dementiaQuestion5"), // "Repetitively doing something and then forgetting about it"
    t("dementiaQuestion6"), // "Forgetting promises you have made"
    t("dementiaQuestion7"), // "Forgetting the topic while having a conversation"
    t("dementiaQuestion8"), // "Unable to immediately think of what to say or express"
    t("dementiaQuestion9"), // "Unable to quickly recall the names of everyday objects"
    t("dementiaQuestion10"), // "Having difficulty understanding the content of television shows"
    t("dementiaQuestion11"), // "Unable to recall the places you have visited"
    t("dementiaQuestion12"), // "Having been lost or wandering"
    t("dementiaQuestion13"), // "Having difficulty solving simple math problems"
    t("dementiaQuestion14"), // "Making mistakes in managing money"
    t("dementiaQuestion15"), // "Having difficulty using equipment that you have used in the past"
];

export const getDementiaOptions = (t: TFunction): string[] => [
    t("dementiaOption1"), // "1. Not at all"
    t("dementiaOption2"), // "2. Sometimes"
    t("dementiaOption3"), // "3. Often"
];
