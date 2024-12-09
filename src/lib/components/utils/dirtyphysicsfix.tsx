export default function dirtyFix(data: any) {
    let updatedData = data;
    // console.log(updatedData.data.student.sections)
    let section: any;
    for (section in updatedData.data.student.sections) {
        // console.log(section)
        section = updatedData.data.student.sections[section];
        if (section.name === "AP Physics C: Mechanics" && section.teacherLastName === "Naumann") {
            // console.log("found section")
            let assignment: any;
            for (assignment in section.assignments) {
                assignment = section.assignments[assignment];
                if (assignment.title === "Unit 4 test" && assignment.pointsPossible !== 40.5) {
                    assignment.pointsEarned *= 0.9;
                    assignment.pointsPossible *= 0.9;
                    assignment.pointsEarned = Math.round(assignment.pointsEarned * 100) / 100
                    assignment.pointsPossible = Math.round(assignment.pointsPossible * 100) / 100
                }
                if (assignment.title === "Conservation of momentum lab" && assignment.pointsPossible !== 18) {
                    assignment.pointsEarned *= 1.5;
                    assignment.pointsPossible *= 1.5;
                    assignment.pointsEarned = Math.round(assignment.pointsEarned * 100) / 100
                    assignment.pointsPossible = Math.round(assignment.pointsPossible * 100) / 100
                }
                if (assignment.title === "Unit 3 test" && assignment.pointsPossible !== 40.5) {
                    assignment.pointsEarned *= 0.9;
                    assignment.pointsPossible *= 0.9;
                    assignment.pointsEarned = Math.round(assignment.pointsEarned * 100) / 100
                    assignment.pointsPossible = Math.round(assignment.pointsPossible * 100) / 100
                }
                if (assignment.title === "Coffee Filter lab" && assignment.pointsPossible !== 70) {
                    assignment.pointsEarned *= 1.4;
                    assignment.pointsPossible *= 1.4;
                    assignment.pointsEarned = Math.round(assignment.pointsEarned * 100) / 100
                    assignment.pointsPossible = Math.round(assignment.pointsPossible * 100) / 100
                }
            }
        }
    }
    return updatedData;
}