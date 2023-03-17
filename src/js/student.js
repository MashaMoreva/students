export default class Student {
    constructor({ name, surname, lastname, birthday, studyStart, faculty }) {
        this.name = name
        this.patronymic = surname
        this.lastname = lastname
        this.birthDate = new Date(birthday.split('T', 1)[0])
        this.yearOfUniversityStarts = studyStart
        this.faculty = faculty
    }

    get StudentFullName() {
        return `${this.lastname} ${this.name} ${this.patronymic} `
    }

    getBirthDate() {
        let year = this.birthDate.getFullYear()
        let month = this.birthDate.getMonth() + 1
        let day = this.birthDate.getDate()
        if (day < 10) day = '0' + day
        if (month < 10) month = '0' + month
        return `${day}.${month}.${year}`
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

    get YearOfUniversityEnds() {
        return Number(this.yearOfUniversityStarts) + 5
    }

    getYearOfUniversity() {
        if (new Date().getFullYear() > this.YearOfUniversityEnds) {
            return `закончил/закончила`
        } else {
            return `${new Date().getFullYear() - this.yearOfUniversityStarts} курс`
        }
    }
}
