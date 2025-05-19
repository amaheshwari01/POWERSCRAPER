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

        if (section.name === "AP Physics C: E&M" && section.teacherLastName === "Naumann") {
            // console.log("found section")
            let assignment: any;
            for (assignment in section.assignments) {
                assignment = section.assignments[assignment];
                if (assignment.title === "FRQ portfolio" && assignment.pointsPossible !== 40.5) {
                    assignment.pointsEarned *= 0.27;
                    assignment.pointsPossible *= 0.27;
                    assignment.pointsEarned = Math.round(assignment.pointsEarned * 100) / 100
                    assignment.pointsPossible = Math.round(assignment.pointsPossible * 100) / 100
                }
                if (assignment.title === "Earth's magnetic field lab" && assignment.pointsPossible !== 30) {
                    assignment.pointsEarned *= 0.75;
                    assignment.pointsPossible *= 0.75;
                    assignment.pointsEarned = Math.round(assignment.pointsEarned * 100) / 100
                    assignment.pointsPossible = Math.round(assignment.pointsPossible * 100) / 100
                }
                if (assignment.title === "Unit 10 Test (Magnetism)" && assignment.pointsPossible !== 39.2) {
                    assignment.pointsEarned *= 1.4;
                    assignment.pointsPossible *= 1.4;
                    assignment.pointsEarned = Math.round(assignment.pointsEarned * 100) / 100
                    assignment.pointsPossible = Math.round(assignment.pointsPossible * 100) / 100
                }
                if (assignment.title === "Capacitance lab" && assignment.pointsPossible !== 24) {
                    assignment.pointsEarned *= 1.5;
                    assignment.pointsPossible *= 1.5;
                    assignment.pointsEarned = Math.round(assignment.pointsEarned * 100) / 100
                    assignment.pointsPossible = Math.round(assignment.pointsPossible * 100) / 100
                }


            }
        }


        if (section.name === "Calculus (H)" && section.teacherLastName === "Lee") {
            // console.log("found section")
            let assignment: any;
            for (assignment in section.assignments) {
                assignment = section.assignments[assignment];
                if (assignment.title === "Ch2 Test" && assignment.pointsPossible !== 62.5) {
                    assignment.pointsEarned *= 2.5;
                    assignment.pointsPossible *= 2.5;
                    assignment.pointsEarned = Math.round(assignment.pointsEarned * 100) / 100
                    assignment.pointsPossible = Math.round(assignment.pointsPossible * 100) / 100
                }
                if (assignment.title === "Ch1 Test" && assignment.pointsPossible !== 46) {
                    assignment.pointsEarned *= 2;
                    assignment.pointsPossible *= 2;
                    assignment.pointsEarned = Math.round(assignment.pointsEarned * 100) / 100
                    assignment.pointsPossible = Math.round(assignment.pointsPossible * 100) / 100
                }
            }
        }
    }
    return updatedData;
}