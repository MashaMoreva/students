import { students } from "./data.js";
import { renderTable } from "./table.js";

export let filteredStudents = [...students];

const resetButton = document.getElementById("resetButton");
const filterNameInput = document.getElementById("filterName");
const filterFacultyInput = document.getElementById("filterFaculty");
const filterStudyStartInput = document.getElementById("filterStudyStart");
const filterStudyEndInput = document.getElementById("filterStudyEnd");

export function filterStudents() {
  const filterNameValue = filterNameInput.value.toLowerCase().trim();
  const filterFacultyValue = filterFacultyInput.value.toLowerCase().trim();
  const filterStudyStartValue = parseInt(filterStudyStartInput.value);
  const filterStudyEndValue = parseInt(filterStudyEndInput.value);

  filteredStudents = students.filter((student) => {
    const fullName =
      `${student.surname} ${student.name} ${student.patronymic}`.toLowerCase();
    const faculty = student.faculty.toLowerCase();
    const studyStart = student.studyStart;
    const studyEnd = studyStart + 4;

    return (
      fullName.includes(filterNameValue) &&
      faculty.includes(filterFacultyValue) &&
      (!filterStudyStartValue || studyStart === filterStudyStartValue) &&
      (!filterStudyEndValue || studyEnd === filterStudyEndValue)
    );
  });

  renderTable();
}

resetButton.addEventListener("click", () => {
  filterNameInput.value = "";
  filterFacultyInput.value = "";
  filterStudyStartInput.value = "";
  filterStudyEndInput.value = "";

  filterStudents();
});
