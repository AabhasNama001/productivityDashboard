function weatherFunctionality() {
  var apiKey = "f7ae0b427ef44575bc152825251105";
  var city = "Jaipur";
  var header1Time = document.querySelector(".header1 h1");
  var header1Date = document.querySelector(".header1 h2");
  var temperature = document.querySelector(".header2 h2");
  var condition = document.querySelector(".header2 h4");
  var heatIndex = document.querySelector(".header2 .heatIndex");
  var humidity = document.querySelector(".header2 .humidity");
  var wind = document.querySelector(".header2 .wind");

  var dataa = null;

  async function weatherAPI() {
    var resp = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );
    dataa = await resp.json();

    // console.log(dataa);

    temperature.innerHTML = `${dataa.current.temp_c} °C`;
    condition.innerHTML = `${dataa.current.condition.text}`;
    heatIndex.innerHTML = `Heat Index : ${dataa.current.heatindex_c} %`;
    humidity.innerHTML = `Humidity : ${dataa.current.humidity} %`;
    wind.innerHTML = `Wind : ${dataa.current.wind_kph} km/h`;
  }
  weatherAPI();

  var date = null;
  function timeDate() {
    date = new Date();
    const totalDaysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const totalMonthsOfYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var daysOfWeek = totalDaysOfWeek[date.getDay()];
    var hours = date.getHours();
    var minat = date.getMinutes();
    var secand = date.getSeconds();
    var taareekh = date.getDate();
    var month = totalMonthsOfYear[date.getMonth()];
    var year = date.getFullYear();
    var header = document.querySelector(".allElems header");

    header1Date.innerHTML = `${String(taareekh).padStart(
      2,
      "0"
    )} ${month} ${year}`;

    if (hours > 12) {
      header.style.backgroundImage = "url(./images/nightsky.jpg)";
      header.style.backgroundPosition = "center";

      header1Time.innerHTML = `${daysOfWeek}, ${String(hours - 12).padStart(
        2,
        "0"
      )}:${String(minat).padStart(2, "0")}:${String(secand).padStart(
        2,
        "0"
      )} PM`;
    } else {
      header1Time.innerHTML = `${daysOfWeek}, ${String(hours).padStart(
        2,
        "0"
      )}:${String(minat).padStart(2, "0")}:${String(secand).padStart(
        2,
        "0"
      )} AM`;
    }
  }

  setInterval(() => {
    timeDate();
  }, 1000);
}
weatherFunctionality();

function openCardFeatures() {
  var allElems = document.querySelectorAll(".elem");
  var fullElemPage = document.querySelectorAll(".fullElem");
  var fullElemPageBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      fullElemPage[btn.id].style.display = "none";
    });
  });
}
openCardFeatures();

function toDoList() {
  // Starting me khali arrray hai
  var currentTask = [];
  // localStorage me agar currentTask hai to use parse karke currentTask me daal do
  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
    // nahi to console me "Task list is empty" print karo
  } else {
    console.log("Task list is empty");
  }

  function renderTasks() {
    // localStorage me currentTask ko set karo
    // kyuki humne currentTask ko localStorage me set kiya hai

    let allTasks = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach(function (elem, idx) {
      sum += `   <div class="task">
    <h5>${elem.task}<span id=${elem.check}>imp</span></h5>
    <button id=${idx}>Mark as Completed</button>
    </div>`;
    });

    allTasks.innerHTML = sum;

    // currentTask ki value localStorage me as a object save ho rhi hai
    // isliye humne JSON.stringify(currentTask) ka use kiya hai.
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    var markAsCompletedBtn = document.querySelectorAll(".task button");

    markAsCompletedBtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        // currentTask array me se task ko remove karo
        // kyuki humne task ko mark as completed kiya hai
        currentTask.splice(btn.id, 1);
        // currentTask array ko render karo
        renderTasks();
      });
    });
  }

  // rendered tasks ko render karne ka function
  // ye function currentTask array ko loop karke har task ko render karega
  renderTasks();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckBox = document.querySelector(".addTask form #check");

  // form ko submit hone par ye function chalega
  // ye function taskInput, taskDetailsInput aur taskCheckBox
  // ki value ko currentTask array me push karega
  form.addEventListener("submit", function (e) {
    // reload hone se roko
    // kyuki humne form ko submit hone se roka hai
    e.preventDefault();
    // currentTask array me taskInput, taskDetailsInput aur taskCheckBox
    // ki value ko push karo
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      check: taskCheckBox.checked,
    });

    // form submit hone par currentTask array ko render karo
    renderTasks();

    // form submit hone par taskInput, taskDetailsInput aur taskCheckBox
    // ki value ko khali karo
    taskInput.value = "";
    taskDetailsInput.value = "";
    taskCheckBox.checked = false;
  });
}
toDoList();

function dailyPlanner() {
  var dayPlanner = document.querySelector(".day-planner");

  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  var hours = Array.from(
    { length: 18 },
    (khali, idx) => `${6 + idx}:00 - ${7 + idx}:00`
  );

  var wholeDaySum = "";

  hours.forEach(function (elem, idx) {
    var savedData = dayPlanData[idx] || "";

    wholeDaySum += ` <div class="day-planner-time">
  <p>${elem}</p>
  <input id=${idx} type="text" placeholder="..." value=${savedData}>
  </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();

function motivationalQuotes() {
  var motivationQuote = document.querySelector(".motivation-2 h1");
  var motivationQuoteAuthor = document.querySelector(".motivation-3 h2");

  async function fetchQuote() {
    let response = await fetch(
      "https://681e4822c1c291fa6633a7f1.mockapi.io/api/v1/quotes"
    );
    let data = await response.json();

    motivationQuote.innerHTML = data[Math.floor(Math.random() * 35)].quote;
    motivationQuoteAuthor.innerHTML =
      "- " + data[Math.floor(Math.random() * 35)].author;
    // console.log(data);
  }
  fetchQuote();
}
motivationalQuotes();

function pomodoroTimer() {
  var timer = document.querySelector(".pomo-timer h1");
  var startBtn = document.querySelector(".pomo-timer .start-timer");
  var pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  var resetBtn = document.querySelector(".pomo-timer .reset-timer");
  var session = document.querySelector(".session");
  var isWorkSession = true;

  var timerInterval = null;
  // 25 minutes converted in seconds
  var totalSeconds = 25 * 60;

  function updateTimer() {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;

    // padStart(2, "0") ka matlab hai ki agar minutes ya seconds 1 digit hai to uske aage 0 laga do
    // jaise ki 1 ko 01 bana do
    timer.innerHTML = `  
  ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}
                    `;
  }

  function startTimer() {
    // clear the previous interval to avoid multiple intervals running at the same time
    clearInterval(timerInterval);

    if (isWorkSession) {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          clearInterval(timerInterval);
          alert("Time's up!");
          isWorkSession = false;
          timer.innerHTML = "05:00";
          session.innerHTML = "Break Time";
          session.style.backgroundColor = "var(--ter2)";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "rgb(76, 107, 76)";
          totalSeconds = 25 * 60;
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    totalSeconds = 25 * 60;
    clearInterval(timerInterval);
    updateTimer();
    timer.innerHTML = "25:00";
    session.innerHTML = "Work Session";
    session.style.backgroundColor = "rgb(76, 107, 76)";
    isWorkSession = true;
    timerInterval = null;
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}
pomodoroTimer();

function changeTheme() {
  var theme = document.querySelector(".theme");
  var rootElement = document.documentElement;

  var flag = 0;
  theme.addEventListener("click", function () {
    if (flag == 0) {
      rootElement.style.setProperty("--pri", "#eeeeee");
      rootElement.style.setProperty("--sec", "#222962");
      rootElement.style.setProperty("--ter1", "#00ADB5");
      rootElement.style.setProperty("--ter2", "#393E46");
      rootElement.style.setProperty("--ter3", "#00ADB5");
      rootElement.style.setProperty("--ter4", "#82C8E5");
      theme.style.backgroundColor = "black";
      rootElement.style.filter = "sepia(20%)";
      flag = 1;
    } else if (flag == 1) {
      rootElement.style.setProperty("--pri", "#222831");
      rootElement.style.setProperty("--sec", "#EEEEEE");
      rootElement.style.setProperty("--ter1", "#393E46");
      rootElement.style.setProperty("--ter2", "#00ADB5");
      rootElement.style.setProperty("--ter3", "#004556");
      rootElement.style.setProperty("--ter4", "#ffdcdc");
      theme.style.backgroundColor = "white";
      rootElement.style.filter = "none";
      flag = 0;
    }
  });
}
changeTheme();
