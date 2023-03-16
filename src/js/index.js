import Student from "./student.js";
import { sortArray, filterArray } from "./utils.js";

const students = [
    new Student('Морев', 'Никита', 'Александрович', new Date(1990, 1, 26), 2011, 'бекенд'),
    new Student('Морева', 'Мария', 'Дмитриевна', new Date(1991, 5, 14), 2000, 'фронтенд'),
    new Student('Гудзенко', 'Ирина', 'Викторовна', new Date(1971, 10, 29), 2000, 'тестирование')
]

const studentsList = document.getElementById('students-list');
const titlesList = document.querySelectorAll('th');

let column = 'StudentFullName';
let direction = false;

function createStudent(student) {
    const studentItem = document.createElement('tr');
    const fullName = document.createElement('td');
    const faculty = document.createElement('td');
    const birthDate = document.createElement('td');
    const yearOfStudy = document.createElement('td');
    const deleteButton = document.createElement('button')

    fullName.textContent = student.StudentFullName;
    faculty.textContent = student.faculty;
    birthDate.textContent = `${student.getBirthDate()} (${student.getAge()} год)`;
    yearOfStudy.textContent = `${student.yearOfUniversityStarts} - ${student.YearOfUniversityEnds} (${student.getYearOfUniversity()})`;
    deleteButton.textContent = 'Удалить'
    deleteButton.classList.add('delete-button')

    studentItem.append(fullName, faculty, birthDate, yearOfStudy, deleteButton);

    return studentItem
}

function renderStudentsList() {
    const filterFullName = document.getElementById('filter-fullName').value;
    const filterFaculty = document.getElementById('filter-faculty').value;
    const filterYearOfUniversityStarts = document.getElementById('filter-yearOfUniversityStarts').value;
    const filterYearOfUniversityEnds = document.getElementById('filter-yearOfUniversityEnds').value;

    let studentsCopyArray = [...students];
    studentsList.innerHTML = '';

    if (filterFullName !== '') studentsCopyArray = filterArray(studentsCopyArray, 'StudentFullName', filterFullName)
    if (filterFaculty !== '') studentsCopyArray = filterArray(studentsCopyArray, 'faculty', filterFaculty)
    if (filterYearOfUniversityStarts !== '') studentsCopyArray = filterArray(studentsCopyArray, 'yearOfUniversityStarts', filterYearOfUniversityStarts)
    if (filterYearOfUniversityEnds !== '') studentsCopyArray = filterArray(studentsCopyArray, 'YearOfUniversityEnds', filterYearOfUniversityEnds)
    
    sortArray(studentsCopyArray, column, direction).forEach((student) => studentsList.append(createStudent(student)))
}

titlesList.forEach((element) =>
    element.addEventListener('click', function () {
        column = this.dataset.column
        direction = !direction
        renderStudentsList()
    })
)

document.getElementById('form-add').addEventListener('submit', function (evt) {
    evt.preventDefault();
    students.push(new Student(
        document.getElementById('surname').value,
        document.getElementById('name').value,
        document.getElementById('patronymic').value,
        new Date(document.getElementById('birthDate').value),
        Number(document.getElementById('yearOfUniversityStarts').value),
        document.getElementById('faculty').value
    ))
    renderStudentsList()
    evt.target.reset()
})

document.getElementById('form-filter').addEventListener('submit', function (evt) {
    evt.preventDefault();
    renderStudentsList();
    evt.target.reset();
})

renderStudentsList()
