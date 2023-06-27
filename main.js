import { filterStudents } from "./src/components/filter.js";
import { renderTable } from "./src/components/table.js";
import { handleTableHeaderClick } from "./src/components/sort.js";
import { handleAddStudent } from "./src/components/add.js";

const studentForm = document.getElementById("studentForm");
const filterButton = document.getElementById("filterButton");

studentForm.addEventListener("submit", handleAddStudent);
filterButton.addEventListener("click", filterStudents);

document.addEventListener("DOMContentLoaded", renderTable);

document.querySelectorAll("th").forEach((th) => {
  th.addEventListener("click", () => {
    handleTableHeaderClick(th);
  });
});
