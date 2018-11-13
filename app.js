/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores = [0,0];
var roundScore = 0;
var activePlayer = 0;
var lastDice = 0;
var winningScore;

init();

document.querySelector(".btn-roll").addEventListener("click", function(){
	var dice = Math.floor(Math.random() * 6) + 1;
	var diceIMG = document.querySelector(".dice");
	document.querySelector(".dice").style.display = "block";
	diceIMG.src = "dice-" + dice + ".png";
	if(dice === 6){
		if(lastDice === 6){
			roundScore = 0;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
			scores[activePlayer] = 0;
			activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
			activeToggle();
		} else {
			roundScore += dice;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
			lastDice = 6;
		};
	} else if(dice !== 1){
		roundScore += dice;
		document.querySelector("#current-" + activePlayer).textContent = roundScore;
		lastDice = 0;
	} else {
		roundScore = 0;
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		activeToggle();
		document.getElementById("current-0").textContent = "0";
		document.getElementById("current-1").textContent = "0";
	};
});

document.querySelector(".btn-hold").addEventListener("click", function(){
	scores[activePlayer] += roundScore;
	roundScore = 0;
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";
	document.getElementById("score-0").textContent = scores[0];
	document.getElementById("score-1").textContent = scores[1];
	checkWin();
	activeToggle();

});

document.querySelector(".btn-new").addEventListener("click", function(){
	init()
});

document.querySelector("input").addEventListener("keypress", function(event){
	if(event.which === 13){
		winningScore = document.querySelector("input").value;
		document.querySelector("span").textContent = "Playing to: " + winningScore;
		document.querySelector("input").value = "";
	}
});

function activeToggle () {
	document.querySelector(".player-0-panel").classList.toggle("active");
	document.querySelector(".player-1-panel").classList.toggle("active");
	lastDice = 0;
};

function checkWin(){
	if(scores[0] >= winningScore){
		document.querySelector(".player-0-panel").classList.add("winner");
		document.querySelector("#name-0").classList.add("winner");
		document.querySelector("#name-0").textContent = "WINNER!";
		document.querySelector(".btn-hold").style.display = "none";
		document.querySelector(".btn-roll").style.display = "none";
	} else if(scores[1] >= winningScore){
		document.querySelector(".player-1-panel").classList.add("winner");
		document.querySelector("#name-1").classList.add("winner");
		document.querySelector("#name-1").textContent = "WINNER!";
		document.querySelector(".btn-hold").style.display = "none";
		document.querySelector(".btn-roll").style.display = "none";
	}else{
	
	};
};

function init() {
	scores = [0,0];
	activePlayer = 0;
	document.querySelector(".dice").style.display = "none";
	document.getElementById("score-0").textContent = scores[0];
	document.getElementById("current-0").textContent = "0";
	document.getElementById("score-1").textContent = scores[1];
	document.getElementById("current-1").textContent = "0";
	document.querySelector(".player-0-panel").classList.add("active");
	document.querySelector(".player-1-panel").classList.remove("active");
}