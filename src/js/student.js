export default class Student {
    constructor(surname, name, patronymic, birthDate, yearOfUniversityStarts, faculty) {
        this.surname = surname
        this.name = name
        this.patronymic = patronymic
        this.birthDate = birthDate
        this.yearOfUniversityStarts = yearOfUniversityStarts
        this.faculty = faculty
    }

    get StudentFullName() {
        return this.surname + ' ' + this.name + ' ' + this.patronymic
    }

    getBirthDate() {
        let year = this.birthDate.getFullYear()
        let month = this.birthDate.getMonth() + 1
        let day = this.birthDate.getDate()
        if (day < 10) day = '0' + day
        if (month < 10) month = '0' + month
        return day + '/' + month + '/' + year
    }

    getAge() {
        const today = new Date()
        let age = today.getFullYear() - this.birthDate.getFullYear()
        let month = today.getMonth() - this.birthDate.getMonth()
        if (month < 0 || (month === 0 && today.getDate() < this.birthDate.getDate())) {
            age--
        }
        return age
    }

    getYearOfUniversityEnds() {
        return this.yearOfUniversityStarts + 5
    }

    getYearOgUniversity() {
        const today = new Date()
        return today.getFullYear() - this.yearOfUniversityStarts
    }
}
