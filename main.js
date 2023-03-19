

const studentGrades = [];

const addStudentGrade = (name, grade) => {
  studentGrades.push({ name, grade });
};

const resetStudentGrades = () => {
  studentGrades.length = 0;
};

const updateStudentGradesOnUI = () => {
  const gradesSection = document.getElementById("grades");

  while (gradesSection.firstChild) {
    gradesSection.removeChild(gradesSection.firstChild);
  }

  const gradesHeader = document.createElement("H2");
  gradesHeader.textContent = "Student Grades:";
  gradesSection.appendChild(gradesHeader);

  if (studentGrades.length === 0) {
    document.getElementById("noGrades").classList.add("show");
    document.getElementById("grades").classList.remove("show");
  } else {
    document.getElementById("noGrades").classList.remove("show");
    document.getElementById("grades").classList.add("show");

    studentGrades.forEach((studentGrade) => {
      const newGrade = document.createElement("LI");
      newGrade.textContent = `${studentGrade.name}: ${studentGrade.grade}`;
      gradesSection.appendChild(newGrade);
    });
  }
};

const updateGradeStatsOnUI = () => {
  const statsSection = document.getElementById("stats");

  while (statsSection.firstChild) {
    statsSection.removeChild(statsSection.firstChild);
  }

  if (studentGrades.length === 0) {
    document.getElementById("stats").classList.remove("show");
  } else {
    document.getElementById("stats").classList.add("show");

    let total = 0;
    studentGrades.forEach((studentGrade) => {
      total += studentGrade.grade;
    });

    const average = total / studentGrades.length;

    const sortedGrades = [...studentGrades];
    sortedGrades.sort((a, b) => b.grade - a.grade);
    const topGrade = sortedGrades[0].grade;
    const topStudent = sortedGrades[0].name;

    const averageStat = document.createElement("LI");
    averageStat.textContent = `Average Grade: ${average.toFixed(2)}`;
    if (!document.getElementById("showAverageGrade").checked) {
      averageStat.style.display = "none";
    }
    statsSection.appendChild(averageStat);

    const topGradeStat = document.createElement("LI");

    topGradeStat.textContent = `Top Grade: ${topStudent} ${topGrade}`;

    if (!document.getElementById("showTopGrade").checked) {
      topGradeStat.style.display = "none";
    }

    statsSection.appendChild(topGradeStat);
  }
};

const resetForm = () => {
  document.getElementById("name").value = "";
  document.getElementById("grade").value = "";
};

document.getElementById("addGrade").addEventListener("click", (event) => {
  event.preventDefault();
  addGrade.innerHTML = "Student Grades:";

  const name = document.getElementById("name").value;
  if (!name) {
    alert("Please enter the student's name");
    return;
  }

  const rawGrade = document.getElementById("grade").value;

  const grade = parseFloat(rawGrade);
  if (isNaN(grade) || grade < 0 || grade > 100) {
    alert("Please enter a valid grade (0-100)");
    return;
  }

  addStudentGrade(name, grade);
  resetForm();
  updateStudentGradesOnUI();
  updateGradeStatsOnUI();
});

document.getElementById("resetGrades").addEventListener("click", (event) => {
  event.preventDefault();
  resetStudentGrades();
  updateStudentGradesOnUI();
  updateGradeStatsOnUI();
});

document
  .getElementById("showAverageGrade")
  .addEventListener("change", (event) => {
    updateGradeStatsOnUI();
  });

document.getElementById("showTopGrade").addEventListener("change", (event) => {
  updateGradeStatsOnUI();
});

document.getElementById("toggleStats").addEventListener("click", (event) => {
  const statsSection = document.getElementById("stats");
  const toggleStatsButton = document.getElementById("toggleStats");

  if (statsSection.classList.contains("show")) {
    statsSection.classList.remove("show");
    toggleStatsButton.textContent = "Show Stats";
  } else {
    statsSection.classList.add("show");
    toggleStatsButton.textContent = "Hide Stats";
  }
});
