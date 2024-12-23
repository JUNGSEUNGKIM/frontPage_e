export type SurveyStatus = "init" | "onProgress" | "done";

export interface SurveyQuestions {
    // survey questions
    questions: string[];
    // options might be 3 or 4
    options: string[];
}

export interface SurveyState {
    status: SurveyStatus;
    currentIndex: number;
    responses: number[];
    surveyQuestions: SurveyQuestions;
}

// interface Parent {
//     foo: number;
// }

// interface ChildA extends Parent {
//     a: string;
// }

// interface ChildB extends Parent {
//     b: string;
// }

// type TypeUsage = {
//     t: Parent;
// };

// interface InterfaceUsage {
//     i: Parent;
// }

// type TypeA = TypeUsage & {
//     t: ChildA;
// };

// type TypeAStrange = TypeUsage & {
//     t: string;
// };

// interface InterfaceB extends InterfaceUsage {
//     i: ChildB;
// }

// interface InterfaceBStrange extends InterfaceUsage {
//     i: string;
// }

// type foo = Readonly<T>;

// type Kind = "a" | "b";

// type Entity = AEntity | BEntity;

// type AEntity = {
//     type: "a";
//     foo: string;
// };

// type BEntity = {
//     type: "b";
//     bar: string;
// };

// function user(e:Entity){
// switch(e.type){
//     case 'a':
//         e.foo
// }
// }
