import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    return questions.reduce(
        (work: Question[], current: Question): Question[] => {
            if (current.published) {
                work.push(current);
            }
            return work;
        },
        []
    );
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    const rets: Question[] = [];
    for (let i = 0; i < questions.length; i++) {
        const quest = questions[i];
        if (
            !(
                quest.body == "" &&
                quest.expected == "" &&
                quest.options.length == 0
            )
        ) {
            rets.push(quest);
        }
    }
    return rets;
    //return questions;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    for (let i = 0; i < questions.length; i++) {
        const quest: Question = questions[i];
        if (quest.id == id) {
            return quest;
        }
    }
    return null;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    const index: number = findQuestionIndex(questions, id);
    const ret: Question[] = [...questions];
    if (index != -1) {
        ret.splice(index, 1);
    }
    return ret;
    //return { ...questions }.splice(0, index);
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    return questions.reduce((work: string[], current: Question): string[] => {
        work.push(current.name);
        return work;
    }, []);
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    return questions.reduce((sum: number, current: Question): number => {
        return sum + current.points;
    }, 0);
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    return questions.reduce((sum: number, current: Question): number => {
        if (current.published) {
            return sum + current.points;
        }
        return sum;
    }, 0);
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    return questions.reduce((work: string, current: Question): string => {
        work += "\n";
        work += current.id + ",";
        work += current.name + ",";
        work += current.options.length + ",";
        work += current.points + ",";
        work += current.published;
        return work;
    }, "id,name,options,points,published");
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    return questions.reduce((work: Answer[], current: Question): Answer[] => {
        const newAns: Answer = {
            questionId: current.id,
            text: "",
            submitted: false,
            correct: false
        };
        work.push(newAns);
        return work;
    }, []);
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    return questions.reduce(
        (pubs: Question[], current: Question): Question[] => {
            pubs.push({ ...current, published: true });
            return pubs;
        },
        []
    );
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    if (questions.length == 0) {
        return true;
    }
    const type: string = questions[0].type;
    return questions.every((qes: Question): boolean => type == qes.type);
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    return [...questions, makeBlankQuestion(id, name, type)];
}

function findQuestionIndex(questions: Question[], targetId: number): number {
    const qesInd: number = questions.findIndex(
        (ques: Question): boolean => ques.id == targetId
    );
    return qesInd;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    const qesInd: number = findQuestionIndex(questions, targetId);
    if (qesInd == -1) {
        return questions;
    }
    const qes: Question = { ...questions[qesInd], name: newName };
    const newQuestionArray = [...questions];
    newQuestionArray[qesInd] = qes;
    return newQuestionArray;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType
): Question[] {
    const qesInd: number = findQuestionIndex(questions, targetId);
    if (qesInd == -1) {
        return questions;
    }
    const qes: Question = { ...questions[qesInd], type: newQuestionType };
    if (newQuestionType == "short_answer_question") {
        qes.options = [];
    }
    const newQuestionArray = [...questions];
    newQuestionArray[qesInd] = qes;
    return newQuestionArray;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
): Question[] {
    const qesInd: number = findQuestionIndex(questions, targetId);
    if (qesInd == -1) {
        return questions;
    }
    const newQuestionArray: Question[] = [...questions];
    const quesClone: Question = {
        ...newQuestionArray[qesInd],
        options: [...newQuestionArray[qesInd].options]
    };
    if (
        targetOptionIndex == -1 ||
        targetOptionIndex >= quesClone.options.length
    ) {
        quesClone.options.push(newOption);
    } else {
        quesClone.options[targetOptionIndex] = newOption;
    }
    newQuestionArray[qesInd] = quesClone;
    return newQuestionArray;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number
): Question[] {
    // I am going to instead use my find index function to
    // avoid a double traverse through the array
    //const oldQuestion = findQuestion(questions, targetId);
    const oldInd = findQuestionIndex(questions, targetId);
    const oldQuestion = questions[oldInd];
    if (oldQuestion == null) {
        return questions;
    }
    const quesClone: Question = duplicateQuestion(newId, oldQuestion);
    const newQuestionArray: Question[] = [...questions];
    newQuestionArray.splice(oldInd + 1, 0, quesClone);
    return newQuestionArray;
}
