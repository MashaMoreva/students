import Student from "./student.js";
import { sortArray, filterArray } from "./utils.js";

const studentsList = document.getElementById('students-list');
const titlesList = document.querySelectorAll('th');

let column = 'StudentFullName';
let direction = false;

const birthDateInput = document.getElementById('birthDate');
birthDateInput.setAttribute('max', new Date().toISOString().split('T')[0]);

const yearOfUniversityStartsInput = document.getElementById('yearOfUniversityStarts');
yearOfUniversityStartsInput.setAttribute('max', new Date().getFullYear());

function createStudent(student, { onDelete }) {

    let newStudent = new Student(student)

    const studentItem = document.createElement('tr');
    const fullName = document.createElement('td');
    const faculty = document.createElement('td');
    const birthDate = document.createElement('td');
    const yearOfStudy = document.createElement('td');
    const buttonGroup = document.createElement('div');
    const editButton = document.createElement('button')
    const editButtonIcon = document.createElement('i')
    const deleteButton = document.createElement('button')
    const deleteButtonIcon = document.createElement('i')

    fullName.textContent = newStudent.StudentFullName;
    faculty.textContent = student.faculty;
    birthDate.textContent = `${newStudent.getBirthDate()} (${newStudent.getAge()} год)`;
    yearOfStudy.textContent = `${newStudent.yearOfUniversityStarts} - ${newStudent.YearOfUniversityEnds} (${newStudent.getYearOfUniversity()})`;

    buttonGroup.classList.add('button-group');
    editButton.classList.add('button', 'edit-button')
    deleteButton.classList.add('button', 'delete-button')
    editButtonIcon.classList.add('icon', 'fa-regular', 'fa-pen-to-square')
    deleteButtonIcon.classList.add('icon', 'fa-regular', 'fa-trash-can')

    editButton.append(editButtonIcon)
    deleteButton.append(deleteButtonIcon)
    buttonGroup.append(editButton, deleteButton)
    studentItem.append(fullName, faculty, birthDate, yearOfStudy, buttonGroup);


    deleteButton.addEventListener('click', function () {
        onDelete({ student, element: studentItem });
    });


    return studentItem
}

async function renderStudentsList() {
    const filterFullName = document.getElementById('filter-fullName').value;
    const filterFaculty = document.getElementById('filter-faculty').value;
    const filterYearOfUniversityStarts = document.getElementById('filter-yearOfUniversityStarts').value;;
    const filterYearOfUniversityEnds = document.getElementById('filter-yearOfUniversityEnds').value;

    const response = await fetch('http://localhost:3000/api/students');
    const students = await response.json();

    const handlers = {
        // onDone({ student }) {
        //     todoItem.done = !todoItem.done;
        //     fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
        //         method: 'PATCH',
        //         body: JSON.stringify({ done: todoItem.done }),
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //     });
        // },
        onDelete({ student, element }) {
            if (confirm('Вы уверены?')) {
                element.remove();
                fetch(`http://localhost:3000/api/students/${student.id}`, {
                    method: 'DELETE',
                });
                if (response.status === 404)
                    console.log('Не удалось удалить данные студента, так как их не существует');
            }
        }
    }

    let studentsCopyArray = [...students];
    localStorage.setItem('students', JSON.stringify(studentsCopyArray));
    studentsList.innerHTML = '';

    if (filterFullName !== '') studentsCopyArray = filterArray(studentsCopyArray, 'StudentFullName', filterFullName)
    if (filterFaculty !== '') studentsCopyArray = filterArray(studentsCopyArray, 'faculty', filterFaculty)
    if (filterYearOfUniversityStarts !== '') studentsCopyArray = filterArray(studentsCopyArray, 'yearOfUniversityStarts', filterYearOfUniversityStarts)
    if (filterYearOfUniversityEnds !== '') studentsCopyArray = filterArray(studentsCopyArray, 'YearOfUniversityEnds', filterYearOfUniversityEnds)

    sortArray(studentsCopyArray, column, direction).forEach((student) => studentsList.append(createStudent(student, handlers)))
}

titlesList.forEach((element) =>
    element.addEventListener('click', function () {
        column = this.dataset.column
        direction = !direction
        renderStudentsList()
    })
)

document.getElementById('form-add').addEventListener('submit', async function (evt) {
    evt.preventDefault();

    await fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.getElementById('name').value.trim(),
            surname: document.getElementById('patronymic').value.trim(),
            lastname: document.getElementById('surname').value.trim(),
            birthday: new Date(document.getElementById('birthDate').value),
            studyStart: String(document.getElementById('yearOfUniversityStarts').value),
            faculty: document.getElementById('faculty').value.trim(),
        })
    })
    // const studentItem = await response.json();

    // students.push(new Student(
    //     studentItem.surname,
    //     studentItem.name,
    //     studentItem.lastname,
    //     new Date(studentItem.birthday),
    //     Number(studentItem.studyStart),
    //     studentItem.faculty
    //     // document.getElementById('surname').value,
    //     // document.getElementById('name').value,
    //     // document.getElementById('patronymic').value,
    //     // new Date(document.getElementById('birthDate').value),
    //     // Number(document.getElementById('yearOfUniversityStarts').value),
    //     // document.getElementById('faculty').value
    // ))
    renderStudentsList()
    evt.target.reset()
})

document.getElementById('form-filter').addEventListener('submit', function (evt) {
    evt.preventDefault();
    renderStudentsList();
    evt.target.reset();
})

document.querySelector('.btn-link').addEventListener('click', function () {
    location.reload();
});


renderStudentsList()
