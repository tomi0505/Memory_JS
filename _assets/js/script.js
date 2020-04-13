const logos = ["android", "apple", "beats", "hitachi", "hp", "huawei", "ibm", "jvc", "lg", "xiaomi",
				"android", "apple", "beats", "hitachi", "hp", "huawei", "ibm", "jvc", "lg", "xiaomi"];

let bodyEl = document.querySelector(".squares");
let divs = document.querySelectorAll(".squares div");
let counterEl = document.querySelectorAll(".counter");

// CONVERT DIV_NODE_LIST TO REAL_ARRAY: 
// divs instanceof Array => TRUE.
divs = [...divs];
counterEl = [...counterEl];


let clickedSquare = "";
const pairSquares = [];

const pairSum = logos.length/2;
let winCounter = 0;


// INIT
function init() {

	divs.forEach(div => {

		let rand = Math.floor(Math.random() * logos.length);

		div.classList.add(logos[rand]);

		logos.splice(rand, 1);

	});

	setTimeout(()=> {
		divs.forEach(div => {
			div.classList.add("hidden");
			const startTimeEl = document.querySelector(".startTime");
			startTimeEl.innerHTML = fullTime().fullTime;
			counterStart();
			div.addEventListener("click", clickSquare);
		});
	}, 2000);

	m();
	startBtn.removeEventListener("click", init, false);

};


// DOM_CONTENT_LOADED
document.addEventListener("DOMContentLoaded", ()=> {

	const startBtn = document.getElementById("startBtn");
	const slideBtn = document.getElementById("slideBtn");
	const retryBtn = document.getElementById("retryBtn");
	const cancelBtn = document.getElementById("cancelBtn");

	startBtn.addEventListener("click", init, false);
	slideBtn.addEventListener("click", m, false);

	// CLICK_M_KEY
	document.addEventListener("keyup", (e) => {
		if (e.keyCode === 77) {
			m();
		}
	}, false);

	retryBtn.addEventListener("click", ()=> {
		window.location.reload();
	}, false);

	cancelBtn.addEventListener("click", () => {
    window.location.reload();
	}, false);

	// COONFIDENT_HEIGHT_SQUARES_IS_100VH
	bodyEl.style.height = `${window.innerHeight}px`;

}, false);


// COONFIDENT_HEIGHT_SQUARES_IS_100VH
window.addEventListener("resize", ()=> {
	bodyEl.style.height = `${window.innerHeight}px`;
}, false);



// CLICK_M_KEY
function m() {
	const panel = document.querySelector(".header");
	
	// COMPUTED_STYLE
	const panelStyle = getComputedStyle(panel, null);
	const heightPanel = panelStyle.getPropertyValue("height");
	let topPanel = panelStyle.getPropertyValue("top");
	
	// TOGGLE_SHOW_HIDE_PANEL
	if(topPanel.indexOf("-")) {
		panel.style.top = `-${heightPanel}`;
		topPanel = panelStyle.getPropertyValue("top");
	} else {
		panel.style.top = 0;
	}

}


// CLICK_SQUARE
function clickSquare() {

	clickedSquare = this;
	clickedSquare.classList.remove("hidden");

	const winCounterEl = document.querySelector(".winCounter");
	const resultEl = document.querySelector(".result");
	
	
	if(pairSquares.length === 0) {
		pairSquares[0] = clickedSquare;
	} else {
		divs.forEach(div => div.removeEventListener("click", clickSquare));
		pairSquares[1] = clickedSquare;

		setTimeout(()=> {
			if (pairSquares[0].className === pairSquares[1].className
				&& pairSquares[0] !== pairSquares[1]) {

				pairSquares.forEach(div => div.classList.add("win"));

				winCounter++;

				winCounterEl.innerHTML = winCounter;

				if(pairSum === winCounter) {
					resultEl.classList.add("block");
				}

				clickedSquare = "";
				pairSquares.length = 0;

			} else if (pairSquares[0].className !== pairSquares[1].className) {

				pairSquares.forEach(div => div.classList.add("hidden"));

				clickedSquare = "";
				pairSquares.length = 0;

			}

			let hiddenDiv = document.getElementsByClassName("hidden");
			hiddenDiv = [...hiddenDiv];
			hiddenDiv.forEach(hidden => hidden.addEventListener("click", clickSquare));

		}, 500);
	}
	
}


// TIME_METHODS
function fullTime() {

	const time = new Date();

	let hour = time.getHours();
	let minute = time.getMinutes();
	let second = time.getSeconds();

	if(hour < 10) {
		hour = "0" + hour;
	} else if (minute < 10) {
		minute = "0" + minute;
	} else if (second < 10) {
		second = "0" + second;
	}

	const fullTime = `${hour}:${minute}:${second}`;

	return {
		fullTime: fullTime,
		time: time.getTime()
	};

}


// COUNTER_START
function counterStart() {

	let timer = 0;
	let minute = 0;

	if (minute < 10) {
		minute = "0" + minute;
	}

	const expireTime = setInterval(() => {
		timer++;
		if (timer < 10) {
			timer = "0" + timer;
		}
		if(timer > 59) {
			minute++;
			if (minute < 10) {
				minute = "0" + minute;
			}
			timer = 0;
		}
		counterEl.forEach(counter => counter.innerHTML = `${minute}:${(timer) ? timer : "0" + timer}`);
		if (pairSum === winCounter || timer === 59 && minute === 59) {
			clearInterval(expireTime);
		}
	}, 1000);

}