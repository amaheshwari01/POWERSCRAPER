import { AssignmentType } from "~/global";
export const sumCategories = (section: any, termstart: Date, termend: Date) => {

    const current_assignments: AssignmentType[] = section.assignments.filter(
        (t: any) =>
            new Date(t.dueDate) >= termstart &&
            new Date(t.dueDate) <= termend
    );
    const cats: string[] = [
        ...new Set(current_assignments.map((a: any) => a.category)),
    ];
    let grades = {}
    cats.forEach((cat) => {
        grades[cat] = {
            total: 0,
            earned: 0,
        };
    });
    current_assignments.forEach((a: AssignmentType) => {
        if (a.pointsEarned !== null && !a.attributeExempt && a.includedInFinalGrade && !a.attributeDropped) {
            grades[a.category].total += a.pointsPossible;
            grades[a.category].earned += a.pointsEarned;

        }
    });
    return grades;

}
export const calculateNeccasaryGrade = (section: any, termstart: Date, termend: Date, curWeight: any, desiredGrade: number, category: string, pointstotal: number) => {
    if (!curWeight) {
        console.log("No weights.json found")
        return 0

    }
    const grades = sumCategories(section, termstart, termend)
    console.log(grades)
    let computed = desiredGrade / 100
    let totalweight = 0;
    let allexceptcat = 0;
    Object.keys(grades).forEach((grade) => {

        const weightedGrade = (grades[grade].earned / grades[grade].total)
        // console.log(weightedGrade)
        if (!isNaN(weightedGrade)) {
            totalweight += curWeight[grade]
            if (grade !== category) {
                allexceptcat += weightedGrade * curWeight[grade]
            }

        }
    })
    if (category === "Final Exam") {
        totalweight += curWeight[category]
        computed *= totalweight
        computed -= allexceptcat
        computed /= curWeight[category]
        computed *= pointstotal
    }
    else {
        computed *= totalweight
        computed -= allexceptcat
        computed /= curWeight[category]
        computed *= pointstotal + grades[category].total
        computed -= grades[category].earned
    }
    return computed

}

export const calculatePercent = (section: any, termstart: Date, termend: Date, curWeight: any) => {
    try {

        if (!curWeight) {
            console.log("No weights.json found")
            return 0

        }
        const grades = sumCategories(section, termstart, termend)
        // console.log(grades)
        // console.log(grades)
        let toatlweight = 0
        let curpercent = 0
        Object.keys(grades).forEach((grade) => {

            const weightedGrade = (grades[grade].earned / grades[grade].total)
            // console.log(weightedGrade)
            if (!isNaN(weightedGrade)) {
                toatlweight += curWeight[grade]

                curpercent += weightedGrade * curWeight[grade]
            }


        })
        curpercent *= (1 / toatlweight)
        return curpercent * 100
    }
    catch (err) {
        console.log(err)
        return 0
    }
}
export const updateData = (data: any, section_guid: string, category: string, new_assignments: AssignmentType[]) => {
    return {
        ...data,
        data: {
            ...data.data,
            student: {
                ...data.data.student,
                sections: data.data.student.sections.map((s: any) => {
                    if (s.guid === section_guid) {
                        return {
                            ...s,
                            assignments:
                                s.assignments.map((a: any) => {
                                    if (a.category === category) {
                                        return (new_assignments.find((c) => c.guid === a.guid))

                                    }
                                    else {
                                        return a;
                                    }
                                })
                        }
                    }
                    else {
                        return s;
                    }
                })
            }
        }
    }
}
export const drop = (numb: number, current_assignments: AssignmentType[], section_guid: string, category: string, curTerm: string) => {
    let numtodrop = numb;
    const new_assignments = current_assignments.sort((a, b) => (a.pointsEarned / a.pointsPossible) - (b.pointsEarned / b.pointsPossible)).map((a, index) => {
        if (a.pointsEarned === null || a.attributeExempt || !a.includedInFinalGrade) {
            numtodrop++;
            return {
                ...a,
                attributeDropped: false,
            }
        }
        else if (index < numtodrop) {
            return {
                ...a,
                attributeDropped: true,
            }
        }
        else {
            return {
                ...a,
                attributeDropped: false,
            }
        }
    }
    ).sort((a, b) => new Date(a.dueDate) > new Date(b.dueDate) ? -1 : 1);


    // console.log("Dropping " + numb + " assignments from " + category + " ")

    localStorage.setItem('drop:' + section_guid + '|' + category + '|' + curTerm, numb.toString());

    return new_assignments;



}
export const dropfromRefresh = (section_guid: string, category: string, data: any, numtodrop: number, term: string) => {
    try {
        let updatedData = data
        const section = data.data.student.sections.find(
            (section: any) => section.guid === section_guid
        );
        // console.log(section)
        const current_term = section.terms.filter(
            (t: any) => t.label === term
        )[0];
        const termstart = new Date(current_term.start)
        const termend = new Date(current_term.end)
        let current_assignments = section.assignments
            .filter(
                (t: any) =>
                    new Date(t.dueDate) >= termstart &&
                    new Date(t.dueDate) <= termend &&
                    t.category === category
            ).sort((a: any, b: any) =>
                new Date(a.dueDate) > new Date(b.dueDate) ? -1 : 1
            )
        current_assignments = drop(numtodrop, current_assignments, section_guid, category, term)
        updatedData = updateData(data, section_guid, category, current_assignments)

        return updatedData
    }
    catch (err) {
        console.log(err)
        return data
    }
}