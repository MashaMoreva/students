import { students } from "./data.js";
import { filteredStudents } from "./filter.js";
import {
  validateForm,
  clearInfoMessages,
  displayErrorMessages,
} from "./validation.js";
import { renderTable } from "./table.js";

export function handleAddStudent(evt) {
  evt.preventDefault();

  const surnameInput = document.getElementById("surname");
  const nameInput = document.getElementById("name");
  const patronymicInput = document.getElementById("patronymic");
  const birthdateInput = document.getElementById("birthdate");
  const studyStartInput = document.getElementById("studyStart");
  const facultyInput = document.getElementById("faculty");
  const successContainer = document.getElementById("successContainer");

  clearInfoMessages();

  const surname = surnameInput.value.trim();
  const name = nameInput.value.trim();
  const patronymic = patronymicInput.value.trim();
  const birthdate = new Date(birthdateInput.value);
  const studyStart = parseInt(studyStartInput.value);
  const faculty = facultyInput.value.trim();

  const errors = validateForm(
    surname,
    name,
    patronymic,
    birthdate,
    studyStart,
    faculty
  );

  if (errors.length === 0) {
    const newStudent = {
      surname: surname,
      name: name,
      patronymic: patronymic,
      birthdate: birthdate,
      studyStart: studyStart,
      faculty: faculty,
    };

    students.push(newStudent);
    filteredStudents.push(newStudent);

    renderTable();
    studentForm.reset();

    const successMessage = document.createElement("p");
    successMessage.textContent = "Студент успешно добавлен";
    successMessage.classList.add("success-message");
    successContainer.appendChild(successMessage);
  } else {
    displayErrorMessages(errors);
  }
}
