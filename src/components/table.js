import { getAgeSuffix, formatDate, calculateAge } from "./utils.js";
import { filteredStudents } from "./filter.js";

const tableBody = document.getElementById("tableBody");

export function renderTable() {
  tableBody.innerHTML = "";

  filteredStudents.forEach((student) => {
    const row = document.createElement("tr");

    const fullNameCell = document.createElement("td");
    const fullName = `${student.surname} ${student.name} ${student.patronymic}`;
    fullNameCell.textContent = fullName;
    row.appendChild(fullNameCell);

    const facultyCell = document.createElement("td");
    facultyCell.textContent = student.faculty;
    row.appendChild(facultyCell);

    const birthdateCell = document.createElement("td");
    const birthdate = formatDate(student.birthdate);
    const age = calculateAge(student.birthdate);
    birthdateCell.textContent = `${birthdate} (${age} ${getAgeSuffix(age)})`;

    row.appendChild(birthdateCell);

    const studyStartCell = document.createElement("td");
    const studyStart = student.studyStart;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const studyEnd = studyStart + 4;
    let course;

    if (
      currentYear > studyEnd ||
      (currentYear === studyEnd && currentMonth >= 9)
    ) {
      course = "закончил(а)"; // Закончил обучение
    } else if (currentYear === studyStart && currentMonth < 9) {
      course = "поступил(а)"; // Еще не начался новый учебный год
    } else {
      const nextCourse = currentYear - studyStart + (currentMonth >= 9 ? 1 : 0);
      course = `${nextCourse} курс`;
    }

    studyStartCell.textContent = `${studyStart}-${studyEnd} (${course})`;
    row.appendChild(studyStartCell);

    tableBody.appendChild(row);
  });
}
