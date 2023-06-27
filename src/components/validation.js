export function validateForm(
  surname,
  name,
  patronymic,
  birthdate,
  studyStart,
  faculty
) {
  const errors = [];

  if (surname === "" || name === "" || patronymic === "") {
    errors.push("Введите фамилию, имя и отчество");
  }

  if (!birthdate || birthdate.toString() === "Invalid Date") {
    errors.push("Введите дату рождения");
  } else {
    const currentDate = new Date();
    const minDate = new Date(1900, 0, 1);

    if (birthdate > currentDate || birthdate < minDate) {
      errors.push(
        `Дата рождения должна быть в диапазоне от 01.01.1900 до ${formatDate(
          currentDate
        )}`
      );
    }
  }

  const currentYear = new Date().getFullYear();

  if (!studyStart || studyStart < 2000 || studyStart > currentYear) {
    errors.push(
      `Год начала обучения должен быть в диапазоне от 2000 до ${currentYear}`
    );
  }

  if (faculty === "") {
    errors.push("Поле факультет должно быть заполнено");
  }

  return errors;
}

export function clearInfoMessages() {
  const errorContainer = document.getElementById("errorContainer");
  const successContainer = document.getElementById("successContainer");

  if (errorContainer) {
    errorContainer.innerHTML = "";
  }

  if (successContainer) {
    successContainer.innerHTML = "";
  }
}

export function displayErrorMessages(errors) {
  const errorContainer = document.getElementById("errorContainer");

  errors.forEach((error) => {
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = error;
    errorContainer.appendChild(errorMessage);
  });
}
