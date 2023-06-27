export function getAgeSuffix(age) {
  if (age % 10 === 1 && age % 100 !== 11) {
    return "год";
  } else if (
    [2, 3, 4].includes(age % 10) &&
    ![12, 13, 14].includes(age % 100)
  ) {
    return "года";
  } else {
    return "лет";
  }
}

export function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function calculateAge(birthdate) {
  const today = new Date();
  const birthYear = birthdate.getFullYear();
  const birthMonth = birthdate.getMonth();
  const birthDay = birthdate.getDate();
  let age = today.getFullYear() - birthYear;
  if (
    today.getMonth() < birthMonth ||
    (today.getMonth() === birthMonth && today.getDate() < birthDay)
  ) {
    age--;
  }
  return age;
}
