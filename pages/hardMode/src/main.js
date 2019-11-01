// DOM Objects
// Screens
let welcomeScreen = document.querySelector('.welcomeScreen');

// Small and large range
let largeRange = document.querySelector('.largeNumberRange');
let smallRange = document.querySelector('.smallNumberRange');

// Small and large range output
let largeRangeValueOutput = document.querySelector('.largeNumbersOutput');
let smallRangeValueOutput = document.querySelector('.smallNumbersOutput');

// Output for final number array
let numbersList = document.querySelector('.numbersList');

// Target number output
let targetNumberOutput = document.querySelector('.targetNumber');

// Buttons
let proceedWelcomeBTN = document.querySelector('.proceed_BTN');
let showTargetBTN = document.querySelector('.showTargetNumber_BTN');
let reloadBTN = document.querySelector('.reload_BTN');

// Javascript variables
const largeNumArray = [25, 50, 75, 100];
const smallNumArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let amountOfLarge;
let amountOfSmall;

let finalArray = [];

let maxSum = 999;
let minSum = 100;

let largeSliderChange = () => {
	smallRange.value = 6 - largeRange.value;
	largeRangeValueOutput.textContent = largeRange.value;
	smallRangeValueOutput.textContent = smallRange.value;
};

let smallSliderChange = () => {
	largeRange.value = 6 - smallRange.value;
	smallRangeValueOutput.textContent = smallRange.value;
	largeRangeValueOutput.textContent = largeRange.value;
};

largeRange.addEventListener('input', largeSliderChange);
smallRange.addEventListener('input', smallSliderChange);

let combineArrays = () => {
	for (let i = 0; i < amountOfSmall; i++) {
		finalArray.push(
			smallNumArray[Math.floor(Math.random() * smallNumArray.length)]
		);
	}

	for (let i = 0; i < amountOfLarge; i++) {
		finalArray.push(
			largeNumArray[Math.floor(Math.random() * largeNumArray.length)]
		);
	}

	return finalArray;
};

let shuffle = array => {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

let outputFinalArray = array => {
	for (let i = 0; i < array.length; i++) {
		let item = document.createElement('div');
		let itemProp = document.createAttribute('class');

		itemProp.value = 'listItem';
		item.setAttributeNode(itemProp);

		item.appendChild(document.createTextNode(array[i]));
		numbersList.appendChild(item);
	}

	return numbersList;
};

let resetNumberArrayOutput = () => {
	const resetList = document.querySelectorAll('.numbersList div');
	for (let i = 0; i < resetList.length; i++) {
		resetList[i].parentNode.removeChild(resetList[i]);
	}
};

let randomTargetNumber = () => {
	let randomNumber = Math.floor(Math.random() * (minSum - maxSum) + maxSum);
	targetNumberOutput.textContent = randomNumber;
};

let createList = () => {
	amountOfLarge = Number(largeRange.value);
	amountOfSmall = Number(smallRange.value);
	combineArrays();
	finalArray = shuffle(finalArray);
	outputFinalArray(finalArray);
};

proceedWelcomeBTN.addEventListener('click', () => {
	// For debugging
	resetNumberArrayOutput();
	finalArray = [];
	welcomeScreen.style.display = 'none';
	createList();
});

reloadBTN.addEventListener('click', () => {
	resetNumberArrayOutput();
	welcomeScreen.style.display = 'block';
	targetNumberOutput.style.display = 'none';
	showTargetBTN.style.display = 'block';
	finalArray = [];
});

showTargetBTN.addEventListener('click', () => {
	randomTargetNumber();
	showTargetBTN.style.display = 'none';
	targetNumberOutput.style.display = 'block';
});
