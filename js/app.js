	 const deck = document.querySelector('.deck');
	 const cards = Array.from(document.querySelectorAll('.card'));

	//generating new shuffled cards usong "generateShuffledCards" below
	function generateShuffledCards() {
		console.log("before shuffle: "+cards);
		const shuffledCards = shuffle(cards);
		for (let card1 of shuffledCards){
			deck.appendChild(card1);
		}
	}
	generateShuffledCards();

	// Shuffle function from http://stackoverflow.com/a/2450976
	function shuffle(array) {
	    var currentIndex = array.length, temporaryValue, randomIndex;

	    while (currentIndex !== 0) {
	        randomIndex = Math.floor(Math.random() * currentIndex);
	        currentIndex -= 1;
	        temporaryValue = array[currentIndex];
	        array[currentIndex] = array[randomIndex];
	        array[randomIndex] = temporaryValue;
	    }

	    return array;
	}

	//add opened cards to a list using "addOpenedCards" method below
	let openedCards = [];
	function addOPenedCards(clickTarget){
		openedCards.push(clickTarget);
		console.log("my opened cards are: "+ openedCards);
		
	}
	let matchedPairs = 0;
	//check cards matching using "checkMatch" method below
	function checkMatch(){
		if (openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className){
			console.log("match !");
			matchedPairs++;
			console.log("matchedPairs array: "+matchedPairs);
			
			for(let value of openedCards){
				value.classList.add('match');
			}
			openedCards = [];
			console.log("openedCards after match "+ openedCards.length);
		}
		else{
			console.log("don't match");
			let firstCard = openedCards[0];
			let secondCard = openedCards[1];
			
			//flip over again
			setTimeout(() => {
			displayCardSymbol(firstCard);
			displayCardSymbol(secondCard);
			openedCards = [];
			console.log("openedCards after match "+ openedCards.length);
			},1000);

		}
	}
	//checking for winning the game if all cards have matched using "checkWin" method below
	function checkWin(){
		//let popupMessage = document.getElementsByClassName("modal-message");
		if (matchedPairs === 8) {
			console.log("we have a winner!");
					stopTimer();
			modal.style.display = "block";
	/*		for(let msg of popupMessage){
				msg[1].style.display = "none";
			}*/
		}
		else{
			console.log("still no winner");
		}
	}



	//display card's symbol using "displayCardSymbol" method below
	function displayCardSymbol(clickTarget){
	        clickTarget.classList.toggle('show');
	        clickTarget.classList.toggle('open');
	    }

	 //counting moves for player using nMoves
	let nMoves = 0;
	const moves= document.querySelectorAll('.moves');
	//updating moves then star rating using "updateMoves" method below
	function updateMoves(clickTarget){
		//loop over .moves nodeList and update span and modal with nMoves
		for(let move of moves){
			move.innerHTML = nMoves + " Moves";
		}
		//nMoves += 1;
		 if(nMoves > 40){
			displayRating(1);
		}else if(nMoves > 30){
			displayRating(2);
		}else{
			displayRating(3);
		}
	}

	let stars = document.querySelectorAll('.stars');
	//displaying star rating using "displayRating" method below
	function displayRating(rate){

		for(var j = 0; j < stars.length; j++){
			for(var i = 0; i < stars[j].children.length; i++){
				if( i < rate){
					display_style = 'inline-block';
				}else{
					display_style = 'none';
				}
				stars[j].children[i].style.display = display_style;
				//stars.innerHTML ="Rating" + stars[j].children[i].style.display;
			}
		}
		return rate;
	}

	//restarting game using resetBtn 
	let resetBtn = document.querySelector('.restart');
	let cardsNodeList = document.querySelectorAll('.card');
	resetBtn.addEventListener('click', resetGame);

	//"resetGame" method to clear timer,rating and flip over opened cards
	function resetGame(){
		console.log("clicked reset");
		for (let  card of cardsNodeList){
				if (card.classList.contains('open')) {
					card.classList.remove('open','show','match');
				}
			}
			matchedPairs = 0;
			nMoves = 0;
			updateMoves();
			stopTimer();
			timeRun = 0;
					console.log("timer after reset now: "+timeRun);

			console.log("after remove: "+cardsNodeList);
	} 

	var timeRun = 0;
	//timerIntervalFunction should be assigned to undefined for the fisrt time games starts and re-assigned later
	var timerIntervalFunction = undefined;
	//starting timer using "startTimer" method below
	function startTimer(){
		if( timerIntervalFunction == undefined){
			timerIntervalFunction = setInterval(function(){
				timeRun +=1;
				console.log("timer now: "+timeRun);
			},1000);
		}
	}

	//stopping timer using "stopTimer" method below
	function stopTimer(){
		if(timerIntervalFunction != undefined){
			clearInterval(timerIntervalFunction);
			timerIntervalFunction = undefined;	
		}
		
		updateModalTime(timeRun);
		console.log("time passed: "+timeRun);
	}


	//event listener for a card
	deck.addEventListener('click',function(event){
		const clickTarget = event.target;
		if (openedCards.length <2 && 
			clickTarget.classList.contains('card') && 
			!clickTarget.classList.contains('match') && 
			!openedCards.includes(clickTarget)) {
			nMoves += 1;
			startTimer();
			updateMoves(clickTarget);
			displayCardSymbol(clickTarget);
			addOPenedCards(clickTarget);
			if (openedCards.length ===2) {
				checkMatch();
			}
			checkWin();
			//updatePopupMessage();
		}
	});

	/********Modal stuff******************/
	// Get the modal {{after checking loose and win conditions}}
	let modal = document.getElementById('myModal');
	/*//replay button reset everything
	let replayBtn = document.getElementsByClassName("modal-button");
	replayBtn.onclick = function() {
		//call reset
	}*/
	// Get the <span> element that closes the modal
	let span = document.getElementsByClassName("close")[0];
	//"openModal"
	//"closeModal" method used to hide modal
	function closeModal(){
		modal.style.display = "none";
	}
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	  closeModal();
	}
	// wherever the user clicks, keep the modal opened!
	window.onclick = function(event) {
	  if (event.target == modal) {
	    modal.style.display = "block";
	  }
	}
	function updateModalTime(endTime){
		var timeDuration = document.getElementsByClassName("time")[0];
		timeDuration.innerHTML ="Time Duration: " + endTime + " seconds" ;//+" seconds";
	}
	playAgainBtn = document.getElementsByClassName("modal-button")[0];
	playAgainBtn.onclick = function(){
		playAgain();
	};

	//"playAgain" method to restart the game once more
	function playAgain(){
		resetGame();
		closeModal();
	}


