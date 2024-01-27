export default function dirtyFix(data: any) {
    let updatedData = data;
    // console.log(updatedData.data.student.sections)
    let section: any;
    for (section in updatedData.data.student.sections) {
        console.log(section)
        section = updatedData.data.student.sections[section];
        if (section.name === "AP Physics 1" && section.teacherLastName === "Naumann") {
            console.log("found section")
            let assignment: any;
            for (assignment in section.assignments) {
                assignment = section.assignments[assignment];
                if (assignment.title === "Momentum extra practice" && assignment.pointsPossible !== 10.8) {
                    assignment.pointsEarned *= 0.3;
                    assignment.pointsPossible *= 0.3;
                    assignment.pointsEarned = Math.round(assignment.pointsEarned * 100) / 100
                    assignment.pointsPossible = Math.round(assignment.pointsPossible * 100) / 100
                }
            }
        }
    }
    return updatedData;
}