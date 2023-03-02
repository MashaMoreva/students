import Student from "./student.js";
import { sortArray } from "./utils.js";

const students = [
    new Student('Мискова', 'Мария', 'Дмитриевна', new Date(1991, 5, 14), 2022, 'фронтенд'),
    new Student('Морев', 'Никита', 'Александрович', new Date(1990, 1, 26), 2020, 'бекенд'),
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

    fullName.textContent = student.StudentFullName;
    faculty.textContent = student.faculty;
    birthDate.textContent = `${student.getBirthDate()} (${student.getAge()} год)`;
    yearOfStudy.textContent = `${student.yearOfUniversityStarts} - ${student.getYearOfUniversityEnds()} (${student.getYearOgUniversity()} курс)`;

    studentItem.append(fullName, faculty, birthDate, yearOfStudy);

    return studentItem
}

function renderStudentsList() {
    let studentsCopyArray = [...students];
    studentsList.innerHTML = '';
    sortArray(studentsCopyArray, column, direction).forEach((student) => studentsList.append(createStudent(student)))

}

titlesList.forEach((element) =>
    element.addEventListener('click', function () {
        column = this.dataset.column
        direction = !direction
        renderStudentsList()
    })
)

document.getElementById('form-student').addEventListener('submit', function (evt) {
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

renderStudentsList()