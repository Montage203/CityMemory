const characters = [
    "Dylanos", "Reddington", "Lowest", "Eophl", "Pyrrhus", "Alocasia", "Itachi", "Pauline",
    "Astreos", "Arcazur", "Nahel", "Rush", "Alexi", "Filou", "Abysse", "Brookey",
    "Weeknd", "Lael", "Ambroise", "Russ", "Nagini", "Alien", "Kagaho", "Tykos", "Aslea",
    "Tormenta", "Seak", "ryn", "Shawdor", "Lilian", "rawZ", "Thys.", "LysV2", "boa",
    "Raiwan", "Moxir", "Weiden", "leiloup", "Volagal", "Cilna", "Galadia", "Flare", "Jimmy",
    "Svelte", "Bereboule", "Azock", "Aylhem", "Constvnce", "Smouks", "toinou", "uruwn",
    "zirtec", "Elci", "Rylai", "Marion", "balola", "tired", "Cold", "Ysera", "bebisitas",
    "Yvess5", "AxeI", "Auryanna", "Netsky", "Niko", "Salius", "Sophiane", "Alex", "Zoevsky"
  ];
  

  const gameContainer = document.querySelector(".memory-grid");
const attemptsDisplay = document.getElementById("attempts");

let attempts = 0;
let flippedCards = [];
let matchedPairs = 0;
const maxPairs = 10;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(character) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back">
          <div class="card-back-content">
            <img src="${getAvatarImageUrl(character)}" alt="${character}">
            <div class="player-name-back">${character}</div>
          </div>
        </div>
      </div>
    `;
    card.addEventListener("click", () => flipCard(card));
    return card;
  }
function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  attempts++;
  attemptsDisplay.textContent = `Tentatives: ${attempts}`;

  const backContents = flippedCards.map(card => card.querySelector(".card-back-content img").alt);

  if (backContents[0] === backContents[1]) {
    flippedCards.forEach(card => {
      card.removeEventListener("click", () => flipCard(card));
      card.classList.add("matched");
    });

    matchedPairs++;

    if (matchedPairs === maxPairs) {
      endGame();
    }
  } else {
    flippedCards.forEach(card => {
      card.classList.remove("flipped");
    });
  }

  flippedCards = [];
}

// Fonction pour obtenir l'URL de l'image d'avatar
function getAvatarImageUrl(character) {
  const apiUrl = `https://api.habbocity.me/avatar_image.php?user=${character}&headonly=0&direction=3&head_direction=3&size=n`;
  return apiUrl;
}

shuffle(characters);

// Sélectionnez les 10 premiers joueurs de la liste mélangée
const selectedCharacters = characters.slice(0, maxPairs);

// Créez des paires de cartes avec les joueurs sélectionnés
const pairedCharacters = selectedCharacters.concat(selectedCharacters);
shuffle(pairedCharacters);

// Créez et ajoutez les cartes au conteneur de jeu
pairedCharacters.forEach(character => {
  const card = createCard(character);
  gameContainer.appendChild(card);
});

function endGame() {
    gameContainer.innerHTML = "<h2>Bravo, vous avez gagné !</h2>";
    const restartButton = document.createElement("button");
    restartButton.textContent = "Recommencer";
    restartButton.addEventListener("click", restartGame);
    gameContainer.appendChild(restartButton);
  }
  
  function restartGame() {
    attempts = 0;
    attemptsDisplay.textContent = "Tentatives: 0";
    matchedPairs = 0;
    flippedCards = [];
    gameContainer.innerHTML = "";
    shuffle(characters);
    for (let i = 0; i < maxPairs * 2; i++) {
      const character = characters[i % characters.length];
      const card = createCard(character);
      gameContainer.appendChild(card);
    }
    shuffle([...gameContainer.children]);
  }
