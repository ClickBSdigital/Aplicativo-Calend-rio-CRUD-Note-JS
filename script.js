const currentDayDOM = document.getElementById("cur-day"),
	currentMonthDOM = document.getElementById("cur-month"),
	calenderMonthDOM = document.getElementById("cal-month"),
	currentDateDOM = document.getElementById("cur-date"),
	calenderYearDOM = document.getElementById("cal-year"),
	currentYearDOM = document.getElementById("current-year"),
	noteDateInPopup = document.getElementById("noteDate"),
	saveBtnInPopup = document.getElementById("add-post-it"),
	deleteBtnInPopup = document.getElementById("delete-button"),
	noteContentInput = document.querySelector(".note-content"),
	noteTitleInput = document.querySelector(".note-title"),
	verb = document.querySelector(".verb"),
	modal = document.querySelector(".modal"),
	colorModal = document.getElementById("fav-color"),
	popup = document.querySelector(".popup"),
	noteModal = document.getElementById("make-note");

document.querySelector(".fa-caret-left").addEventListener("click", nextMonth);
document.querySelector(".fa-caret-right").addEventListener("click", prevMonth);

const now = new Date();
//for testing purposes use 'let' instead of 'const'
const todayDay = now.getDay(),
	todayDate = now.getDate(),
	todayMonth = now.getMonth(),
	todayYear = now.getFullYear();

const state = {
	todayDay,
	todayDate,
	todayMonth,
	todayYear
};
const daysStr = {
	0: "Dom",
	1: "Seg",
	2: "Ter",
	3: "Qua",
	4: "Qui",
	5: "Sex",
	6: "Sab"
};
const daysIndex = {
	Dom: 0,
	Seg: 1,
	Ter: 2,
	Qua: 3,
	Qui: 4,
	Sex: 5,
	Sab: 6
};
const monthsStr = {
	0: "Jan",
	1: "Fev",
	2: "Mar",
	3: "Abr",
	4: "Mai",
	5: "Jun",
	6: "Jul",
	7: "Ago",
	8: "Set",
	9: "Out",
	10: "Nov",
	11: "Dez"
};
const monthsIndex = {
	Jan: 0,
	Fev: 1,
	Mar: 2,
	Abr: 3,
	Mai: 4,
	Jun: 5,
	Jul: 6,
	Ago: 7,
	Sep: 8,
	Out: 9,
	Nov: 10,
	Dez: 11
};
const color_data = [
	{
		id: 0,
		name: "blue",
		value: "#1B19CD"
	},
	{
		id: 1,
		name: "red",
		value: "#D01212"
	},
	{
		id: 2,
		name: "purple",
		value: "#721D89"
	},
	{
		id: 3,
		name: "green",
		value: "#158348"
	},
	{
		id: 4,
		name: "orange",
		value: "#EE742D"
	},
	{
		id: 5,
		name: "deep-orange",
		value: "#F13C26"
	},
	{
		id: 6,
		name: "baby-blue",
		value: "#31B2FC"
	},
	{
		id: 7,
		name: "cerise",
		value: "#EA3D69"
	},
	{
		id: 8,
		name: "lime",
		value: "#2ACC32"
	},
	{
		id: 9,
		name: "teal",
		value: "#2FCCB9"
	},
	{
		id: 10,
		name: "pink",
		value: "#F50D7A"
	},
	{
		id: 11,
		name: "black",
		value: "#212524"
	}
];

var currentColor;

let staticCurrentColor = {
	id: 0,
	name: color_data[0].name,
	value: color_data[0].value
};

var notes;
let staticNotes = [
	{
		id: 235684345,
		title: "running marathon",
		desc:
			"blah lbah lorem ipsum sodem qwerty oiuy lorem ipsum sodem qwerty oiuy",
		date: "2019 10 31"
	},
	{
		id: 784534534,
		title: "The Burger Chief opening event",
		desc: "lorem ipsum sodem qwerty oiuy lorem ipsum sodem qwerty oiuy",
		date: "2019 10 2"
	},
	{
		id: 345463516,
		title: "Jamal's Birthday",
		desc: "lorem ipsum sodem qwerty oiuy lorem ipsum sodem qwerty oiuy",
		date: "2019 11 22"
	}
];

let notesFound = localStorage.getItem("notes");
let colorsFound = localStorage.getItem("theme");

if (!notesFound) {
	console.log("notes not Found");
	localStorage.setItem("notes", JSON.stringify(staticNotes));
	notes = staticNotes;
} else {
	notes = JSON.parse(notesFound);
}

if (!colorsFound) {
	console.log("colors not Found:");
	localStorage.setItem("theme", JSON.stringify(staticCurrentColor));
	currentColor = staticCurrentColor;
} else {
	currentColor = JSON.parse(colorsFound);
	applyTheme();
}

//update local storage
function updateLocalStorage() {
	let currentNotes = notes;
	localStorage.setItem("notes", JSON.stringify(currentNotes));
	localStorage.setItem("theme", JSON.stringify(currentColor));
	applyTheme();
}

function applyTheme() {
	document.querySelector(
		"table"
	).style.boxShadow = `0px 0px 149px -28px ${currentColor.value}`;

	document.querySelector(
		".color"
	).style.backgroundColor = `${currentColor.value}`;

	document.querySelector(
		".border-color"
	).style.backgroundColor = `${currentColor.value}`;

	for (let i = 0; i < 7; i++) {
		document.querySelectorAll(".weekday")[
			i
		].style.backgroundColor = `${currentColor.value}`;
	}
}

currentDayDOM.innerHTML = daysStr[todayDay];
currentDateDOM.innerHTML = todayDate;
currentMonthDOM.innerHTML = monthsStr[state.todayMonth];
currentYearDOM.innerHTML = todayYear;
var currentFullYear = analyizYear(state.todayYear);
var currentFullMonth = currentFullYear.months[monthsStr[state.todayMonth]];

//run App
showCalenderInfo();

//exp: analyizYear ​​(2019) fornecerá a duração de todos os meses, primeiro dia, último dia com índices
function analyizYear(year) {
	let counter = 0;
	const currentYear = {
		year: year,
		is_leap: false,
		months: {
			Jan: 0,
            Fev: 1,
            Mar: 2,
            Abr: 3,
            Mai: 4,
            Jun: 5,
            Jul: 6,
            Ago: 7,
            Sep: 8,
            Out: 9,
            Nov: 10,
            Dez: 11
		}
	};

	while (counter < 12) {
		Object.keys(currentYear.months).forEach(month => {
			currentYear.months[month] = analyizMonth(month, year);
		});
		counter++;
	}
	if (currentYear.months["Feb"].days_length === 29) {
		currentYear.is_leap = true;
	}
	return currentYear;
}
//exp: run analyizMonth(String:'Dec',Int:2019) note:(must capitalize month like Sep,Nov)
function analyizMonth(month, year) {
	const testDays = 31;
	let counter = 0;

	const monthObj = {
		year: year,
		month: month,
		month_idx: monthsIndex[month],
		first_day: "",
		first_day_index: null,
		days_length: 0,
		last_day_index: null
	};

	while (counter < testDays) {
		counter++;
		const dateTest = `${counter} ${month} ${year}`;
		const dateArr = new Date(dateTest).toDateString().split(" ");
		if (dateArr[1] === month) {
			if (counter === 1) {
				monthObj.first_day = dateArr[0];
				monthObj.first_day_index = daysIndex[dateArr[0]];
			}
			monthObj.days_length++;
			monthObj.last_day = dateArr[0];
			monthObj.last_day_index = daysIndex[dateArr[0]];
		} else {
			return monthObj;
		}
	}
	return monthObj;
}

//get last month days in current month view
function makePrevMonthArr(firstDayIndex) {
	let prevMonthIdx;
	let prevMonthDays;
	if (state.todayMonth === 0) {
		prevMonthDays = analyizMonth("Dec", state.todayYear - 1).days_length;
	} else {
		prevMonthIdx = monthsIndex[currentFullMonth.month] - 1;
		prevMonthDays = currentFullYear.months[monthsStr[prevMonthIdx]].days_length;
	}
	let result = [];
	for (let i = 1; i <= firstDayIndex; i++) {
		const day = prevMonthDays - firstDayIndex + i;
		result.push({ day, state: "prevMonth" });
	}

	return result;
	//**** a versão anterior deste código estava retornando apenas alguns dias sem estado
	//**** como [1,2,3] em vez de dia e seu estado como [{day:1,"prevMonth"}]
	//retorna Array.from(
	// { comprimento: firstDayIndex },
	// (_, i) => prevMonthDays - firstDayIndex + i
	//);
}
// isso imprimirá um array com os dias do mês anterior e do próximo mês correspondentes à tabela do calendário
function calcMonthCalendar() {
	// Create array: [1, 2, 3, ..., 30, 31]
	const currMonth = Array.from(
		{ length: currentFullMonth.days_length },
		(_, i) => ({ day: i + 1, state: "currMonth" })
	);

	const nextMonth = Array.from(
		{ length: currentFullMonth.days_length },
		(_, i) => ({ day: i + 1, state: "nextMonth" })
	);

	// Crie uma matriz plana com zeros à esquerda e à direita na semana passada:
	// [0, 0, 0, 0, 1, 2, 3, ..., 30, 31, 1, 2, 3, 4, 5, 6, 7]
	const flatResultArr = [
		...makePrevMonthArr(currentFullMonth.first_day_index),
		...currMonth,
		...nextMonth // isso inclui números extras que serão cortados
	].slice(0, 7 * 6); // 7 dias/semana * 6 semanas

	// Divida o array plano em fatias de 7:
	const resultArr = [];
	for (let i = 0; i < 7; i++) {
		resultArr.push(flatResultArr.slice(i * 7, (i + 1) * 7));
	}
	return resultArr;
}

// imprime em cada célula o número do dia e a cor
function printMonthCalendarInDOM() {
	const monthArr = calcMonthCalendar();

	let currentMonthStarted = false;
	let currentMonthEnd = true;
	for (let i = 0; i < 6; i++) {
		let currentWeek = monthArr[i];
		//
		const week = document.querySelector("#table-body").children[i];
		for (let j = 0; j < 7; j++) {
			week.children[j].style.backgroundColor = "white";
			week.children[j].style.opacity = 1;
			// console.log(currentWeek[j].day);
			if (currentWeek[j].day === 1) {
				currentMonthStarted = true;
			}
			if (
				currentMonthEnd &&
				currentMonthStarted &&
				currentWeek[j].day === todayDate &&
				currentFullMonth.month_idx === todayMonth &&
				currentFullYear.year === todayYear
			) {
				let todayFullDate =
					state.todayYear +
					" " +
					(state.todayMonth + 1) +
					" " +
					state.todayDate;
				let isTodayHasNotes = notes.filter(note => note.date === todayFullDate);
				let viewNote = "";
				if (isTodayHasNotes.length > 0) {
					viewNote = `
							
							<br>
							<div style="width:max-content;">
							<i class="fas fa-sticky-note"></i>
							</div>
							<span class="tooltip"> ${isTodayHasNotes[0].title}</span>
						
							`;
					week.children[j].classList.add("tooltip-container");
				}
				// week.children[j].innerHTML = viewNote;
				// week.children[j].id = notesFound.id;

				week.children[
					j
				].innerHTML = `${currentWeek[j].day}<img  id="todayLogo" src='https://png2.cleanpng.com/sh/8bf4e7fd67b71cbb64dd54c37b191c92/L0KzQYm3VMIzN6JofZH0aYP2gLBuTgRifKVxkZ99b3TkiX7wk711cJYyfNNELYTkhMX2j710d59sRdd3Z3zsg7m0hPF6NWQ9RadqZHPlQITrUPU2a2E4RqgDNkC3RoeBUcUzPGU2SqYCN0C4SIm1kP5o/kisspng-tattly-today-is-the-day-tattoo-song-english-day-38-5adcb03d0e5c03.6860466815244124770588.png'  /> ${viewNote}`;
				// week.children[j].innerHTML = currentWeek[j].day;
				week.children[j].id = "current-day";
				week.children[j].classList.add("currMonth");
				week.children[j].style.backgroundColor = "#e1e1e1";
				currentMonthStarted = false;
				currentMonthEnd = false;
			} else {
				week.children[j].style.cursor = "";
				week.children[j].style.backgroundColor = "white"; //.style.backgroundColor = "white";
				week.children[j].style.color = "black";
				week.children[j].innerHTML = currentWeek[j].day;
				week.children[j].removeAttribute("id");
				if (currentWeek[j].state !== "currMonth") {
					week.children[j].style.backgroundColor = currentColor.value;
					week.children[j].style.opacity = 0.6;
					week.children[j].style.color = "rgba(255, 255, 255,0.4)";
					week.children[j].style.cursor = "default";
					week.children[j].classList.remove("currMonth");
					week.children[j].classList.remove("tooltip-container");
				}
				if (currentWeek[j].state == "currMonth") {
					//exp 2019 10 24
					week.children[j].classList.add("currMonth");
					let currentFullDate =
						currentFullMonth.year +
						" " +
						(currentFullMonth.month_idx + 1) +
						" " +
						currentWeek[j].day;
					let notesFound = notes.filter(
						note => note.date === currentFullDate
					)[0];
					if (notesFound) {
						let viewNote = `
						<td>
						<span class="day">${currentWeek[j].day}</span>
						<br>
						<div style="width:max-content;">
						<i class="fas fa-sticky-note"></i>
						</div>
						<span class="tooltip"> ${notesFound.title}</span>
					</td>
						`;
						week.children[j].innerHTML = viewNote;
						week.children[j].classList.add("tooltip-container");
						week.children[j].id = notesFound.id;
					} else {
						week.children[j].classList.remove("tooltip-container");
					}
				}
			}
			// console.log("xZx: ", currentWeek[j]);
		}
	}
}

function nextMonth() {
	state.todayMonth += 1;
	if (state.todayMonth == 12) {
		state.todayYear += 1;
		currentFullYear = analyizYear(state.todayYear);
		state.todayMonth = 0;
	}
	currentFullMonth = currentFullYear.months[monthsStr[state.todayMonth]];
	showCalenderInfo();
}

function prevMonth() {
	state.todayMonth -= 1;
	if (state.todayMonth == 0) {
		state.todayYear -= 1;
		currentFullYear = analyizYear(state.todayYear);
		state.todayMonth = 11;
	}
	currentFullMonth = currentFullYear.months[monthsStr[state.todayMonth]];
	showCalenderInfo();
}

function showCalenderInfo() {
	calenderMonthDOM.innerHTML = monthsStr[state.todayMonth];
	calenderYearDOM.innerHTML = state.todayYear;
	printMonthCalendarInDOM();
}

//para alterar o ano manualmente
calenderYearDOM.addEventListener("input", e => {
	let numberPattern = /\d+/g;
	let year = parseInt(e.target.innerHTML.match(numberPattern).join(""));
	if (
		e.target.innerHTML.match(numberPattern).join("").length > 3 &&
		typeof year === "number"
	) {
		currentFullYear = analyizYear(year);
		currentFullMonth = currentFullYear.months[monthsStr[state.todayMonth]];
		state.todayYear = year;
		showCalenderInfo();
	}
});

document
	.getElementById("theme-landscape")
	.addEventListener("click", changeColorTheme);
document
	.getElementById("theme-portrait")
	.addEventListener("click", changeColorTheme);

let newColorPrefrence;
modal.addEventListener("click", e => {
	let ele = e.target.classList;

	if (ele[0] === "modal" || ele[0] === "fade-in") {
		closeModal();
	} else if (ele[0] === "color-preview") {
		const siblings = e.target.parentElement.parentElement;
		for (let i = 0; i < siblings.children.length; i++) {
			const element = siblings.children[i].firstElementChild;
			element.classList.remove("selectedColor");
		}
		if (e.target.parentElement.classList[0] === "color-option") {
			newColorPrefrence = e.target.id;
		}
		ele.add("selectedColor");
	}
});

let isModalOpen = false;

function openModal(isNote = false) {
	isModalOpen = true;
	popup.classList.remove("fade-out");
	modal.style.display = "block";

	isNote
		? (noteModal.style.display = "flex")
		: (colorModal.style.display = "flex");
	popup.classList.add("fade-in");
}
closeModal();
function closeModal() {
	isModalOpen = false;
	popup.classList.remove("fade-in");
	popup.classList.add("fade-out");
	modal.style.display = "none";
	noteModal.style.display = "none";
	colorModal.style.display = "none";
	deleteBtnInPopup.style.display = "inline";
	noteTitleInput.value = "";
	noteContentInput.value = "";
	document.getElementById("warning").innerHTML = "";
}

function changeColorTheme() {
	openModal();
	seletectChosenColor();
}

seletectChosenColor();

function seletectChosenColor() {
	const colorsOptions = document.getElementById("color-options").children;
	for (let i = 0; i < colorsOptions.length; i++) {
		const currentChild = colorsOptions[i].firstElementChild;

		if (currentColor.name == currentChild.id) {
			currentChild.innerHTML = "<i class='fas fa-check checkmark'></i>";
		} else {
			currentChild.innerHTML = "";
		}
	}
}
document.getElementById("update-theme-button").addEventListener("click", () => {
	const chosenColor = color_data.filter(
		color => color.name === newColorPrefrence
	);
	currentColor = chosenColor[0];
	document.getElementById("theme-portrait").style.backgroundColor =
		currentColor.value;
	updateLocalStorage();
	printMonthCalendarInDOM();
	applyTheme();
	closeModal();
});

//Criar, ler, atualizar Excluir uma nota!
//esta é a delegação de eventos onde selecionamos um contêiner pai que terá novas células
document.body.addEventListener("click", e => {
	let noteDate;
	let noteId;
	let note;
	let verbWord;
	if (e.target.parentElement.parentElement.id == "table-body") {
		if (e.target.classList.contains("tooltip-container")) {
			verbWord = "Editar";
			// deleteBtnInPopup.style.display = "display";
			noteId = e.target.id;
			console.log("noteId:", noteId);
			if (noteId == "current-day") {
				noteDate =
					state.todayYear +
					" " +
					(state.todayMonth + 1) +
					" " +
					state.todayDate;
				note = notes.filter(n => n.date == noteDate);
			} else {
				note = notes.filter(n => n.id == noteId);
			}
			console.log("note:", note);
			noteDate = note[0].date;
			openModal(true);
			fillNotePopup(note[0]);
			addNote(noteDate.split(" ")[2], noteId);
		} else if (e.target.classList.contains("currMonth")) {
			noteId = e.target.id;
			noteDate = e.target.innerHTML;
			if (noteId == "current-day") {
				noteDate = state.todayDate;
			}
			console.log("Adicionar nova nota");
			verbWord = "Criar";
			//deleta dois abaixo
			//notaData =
			// atualMêsFull.ano +
			// " " +
			// atualFullMonth.mês +
			// " " +
			//e.target.innerHTML;
			console.log("zZz");

			openModal(true);
			addNote(noteDate, noteId);
			deleteBtnInPopup.style.display = "none";
		} else {
			console.log("Não aplicável para o mês anterior e seguinte");
		}
		noteDateInPopup.innerHTML = noteDate;
		verb.innerHTML = verbWord;
	} else if (e.target.classList.contains("fa-sticky-note")) {
		verbWord = "Editar";
		// deleteBtnInPopup.style.display = "display";

		console.log("edit note (sticky)");
		noteId = e.target.parentElement.parentElement.id;
		if (noteId == "current-day") {
			noteDate =
				state.todayYear + " " + (state.todayMonth + 1) + " " + state.todayDate;
			note = notes.filter(n => n.date == noteDate);
		} else {
			note = notes.filter(n => n.id == noteId);
		}
		// note = notes.filter(n => n.id == noteId);
		noteDate = note[0].date;
		console.log("note:", note);
		openModal(true);
		fillNotePopup(note[0]);
		noteDateInPopup.innerHTML = noteDate;
		verb.innerHTML = verbWord;

		console.log("xXx");
		addNote(noteDate.split(" ")[2], noteId);
	}
});

function fillNotePopup(note) {
	noteTitleInput.value = note.title;
	noteContentInput.value = note.desc;
}

var getSelectedNoteDay;
var getSelectedNoteId;

function addNote(noteDateDay, noteDateId) {
	getSelectedNoteDay = noteDateDay;
	getSelectedNoteId = noteDateId;
}

saveBtnInPopup.addEventListener("click", () => {
	const noteDate =
		currentFullMonth.year +
		" " +
		(currentFullMonth.month_idx + 1) +
		" " +
		getSelectedNoteDay;
	let oldNote = notes.filter(note => note.date == noteDate)[0];
	if (oldNote) {
		notes = notes.filter(note => oldNote.id !== note.id);
	}

	const newNote = {
		id: Math.random(),
		title: noteTitleInput.value,
		desc: noteContentInput.value,
		date: noteDate
	};

	if (
		noteTitleInput.value.trim() !== "" &&
		noteTitleInput.value.trim() !== " " &&
		(noteContentInput.value.trim() !== "" &&
			noteContentInput.value.trim() !== " ")
	) {
		console.log("newNote:", newNote);
		notes.push(newNote);
		closeModal(true);
		printMonthCalendarInDOM();
		updateLocalStorage();
	} else {
		document.getElementById("warning").innerHTML = "Por favor preencha todos os campos";
	}
});

//exclui nota
deleteBtnInPopup.addEventListener("click", () => {
	if (getSelectedNoteId == "current-day") {
		noteDate =
			state.todayYear + " " + (state.todayMonth + 1) + " " + state.todayDate;
		notes = notes.filter(note => note.date !== noteDate);
		document
			.getElementById("current-day")
			.classList.remove("tooltip-container");
	} else {
		notes = notes.filter(note => note.id !== parseFloat(getSelectedNoteId));
	}
	updateLocalStorage();
	closeModal(true);
	printMonthCalendarInDOM();
});

//mini relógio 12 e 24 cronometrando
let is24hours = true;
let intervalState;
function makeClockTikTok() {
	intervalState = setInterval(() => {
		let hours = new Date().getHours();
		const minutes = new Date().getMinutes();
		const seconds = new Date().getSeconds();
		// console.log("seconds:", seconds);
		let in12hours = 12;
		let dayState = "AM";

		if (hours > 0 && hours < 12) {
			in12hours = hours;
		} else if (hours !== 0) {
			if (hours === 12) {
				hours += 12;
			}
			in12hours = hours - 12;
			dayState = "PM";
		}

		if (is24hours) {
			hours = in12hours;
		}
		const timeTemplate = `
		<span>${hours > 9 ? hours : "0" + hours} </span>:
		<span>${minutes > 9 ? minutes : "0" + minutes} </span>:
		<span>${seconds > 9 ? seconds : "0" + seconds}</span>
		<span>${is24hours ? dayState : ""}</span>
		`;
		document.querySelector(".time").innerHTML = timeTemplate;
	}, 1000);
}
document
	.querySelector(".time")
	.addEventListener(
		"click",
		() => ((is24hours = !is24hours), makeClockTikTok())
	);

//para parar o cálculo do tempo se estiver no modo de orientação
var mql = window.matchMedia("(orientation: portrait)");
//se o usuário iniciou este aplicativo no modo retrato
if (!mql.matches) {
	makeClockTikTok();
}

//Adiciona um ouvinte de alteração de consulta de mídia
mql.addListener(function(m) {
	if (m.matches) {
		//Alterado para retrato
		console.log("portrait mode");
		clearInterval(intervalState);
	} else {
		//Alterado para paisagem
		console.log("landscape mode");
		makeClockTikTok();
	}
});

//coisas das quais me arrependo neste projeto:
//1- eu não usei um padrão de design!
//2- usei o objeto de data como uma string em vez do formato de data nas notas
//3- conforme os feauters progridem eu acabo com um código spagheti ! desculpe :(
// FATO: não seria possível sem o objeto de data integrado "new Date()" obrigado javascript!
