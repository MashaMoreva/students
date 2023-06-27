import { filteredStudents } from "./filter.js";
import { renderTable } from "./table.js";

let columnSortOrder = {};

const sortIndicators = {
  fullName: document.getElementById("fullNameSortIndicator"),
  faculty: document.getElementById("facultySortIndicator"),
  birthdate: document.getElementById("birthdateSortIndicator"),
  studyStart: document.getElementById("studyStartSortIndicator"),
};

function updateSortIndicators(column) {
  for (const indicator of Object.values(sortIndicators)) {
    indicator.classList.remove("active", "asc", "desc");
  }

  const sortOrder = columnSortOrder[column];
  if (sortOrder) {
    sortIndicators[column].classList.add("active", sortOrder);
  }
}

function getValueByColumn(student, column) {
  if (column === "fullName") {
    return `${student.surname} ${student.name} ${student.patronymic}`;
  } else {
    return student[column];
  }
}

export function sortTable(column) {
  const sortOrder = columnSortOrder[column] === "asc" ? "desc" : "asc";
  columnSortOrder = { [column]: sortOrder };

  updateSortIndicators(column);

  filteredStudents.sort((a, b) => {
    const valueA = getValueByColumn(a, column);
    const valueB = getValueByColumn(b, column);

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    }
  });

  renderTable();
}

export function handleTableHeaderClick(th) {
  const column = th.getAttribute("data-column");
  sortTable(column);
}
