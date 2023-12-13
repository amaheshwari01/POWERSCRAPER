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


            const weightedGrade = (grades[grade].earned / grades[grade].total) * curWeight[grade]
            console.log(weightedGrade)
            if (!isNaN(weightedGrade)) {
                toatlweight += curWeight[grade]

                curpercent += weightedGrade
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