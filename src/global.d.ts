
export interface AssignmentType {
    __typename: string;
    guid: string;
    title: string;
    category: string;
    description: string | null;
    dueDate: string;
    scoreLabel: string;
    pointsEarned: number;
    pointsPossible: number;
    teacherComment: string | null;
    attributeMissing: boolean;
    attributeLate: boolean;
    attributeCollected: boolean;
    attributeExempt: boolean;
    includedInFinalGrade: boolean;
    attributeIncomplete: boolean;
}