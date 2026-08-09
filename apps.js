/* =========================================================
   FAMILY FUN GAMES
   apps.js
   COMPLETE CORRECTED VERSION
   ========================================================= */

"use strict";

/* =========================================================
   PLAYER DATA
   ========================================================= */

let points = Number(localStorage.getItem("ffg_points")) || 0;
let streak = Number(localStorage.getItem("ffg_streak")) || 0;
let wins = Number(localStorage.getItem("ffg_wins")) || 0;
let correctAnswers =
  Number(localStorage.getItem("ffg_correct")) || 0;

let selectedGame = null;
let selectedDifficulty = null;

let currentQuestions = [];
let currentQuestionIndex = 0;
let currentScore = 0;
let answered = false;


/* =========================================================
   GAME DATA
   ========================================================= */

const games = {

  brain: {
    title: "Brain Teasers",
    description:
      "Tricky questions that make you stop, think and look twice.",
    type: "BRAIN CHALLENGE",

    questions: [
      {
        q: "What has keys but cannot open locks?",
        a: ["A piano", "A door", "A map", "A clock"],
        c: 0
      },
      {
        q: "What gets wetter the more it dries?",
        a: ["A towel", "A sponge", "A cloud", "A river"],
        c: 0
      },
      {
        q: "What has a head and a tail but no body?",
        a: ["A coin", "A snake", "A shirt", "A pencil"],
        c: 0
      },
      {
        q: "What can travel around the world while staying in one corner?",
        a: ["A stamp", "A plane", "A postcard", "A compass"],
        c: 0
      },
      {
        q: "What has many teeth but cannot bite?",
        a: ["A comb", "A shark", "A zipper", "A fork"],
        c: 0
      },
      {
        q: "What has one eye but cannot see?",
        a: ["A needle", "A potato", "A camera", "A button"],
        c: 0
      },
      {
        q: "What belongs to you but other people use it more than you?",
        a: ["Your name", "Your phone", "Your shoes", "Your house"],
        c: 0
      },
      {
        q: "What has hands but cannot clap?",
        a: ["A clock", "A robot", "A statue", "A tree"],
        c: 0
      },
      {
        q: "What has a neck but no head?",
        a: ["A bottle", "A shirt", "A guitar", "A chair"],
        c: 0
      },
      {
        q: "The more you take, the more you leave behind. What are they?",
        a: ["Footsteps", "Pictures", "Coins", "Words"],
        c: 0
      }
    ]
  },


  trivia: {
    title: "Trivia Rush",
    description:
      "Science, animals, history, geography, sports and surprising facts.",
    type: "TRIVIA",

    questions: [
      {
        q: "What is the largest planet in our solar system?",
        a: ["Earth", "Jupiter", "Saturn", "Neptune"],
        c: 1
      },
      {
        q: "How many continents are there?",
        a: ["5", "6", "7", "8"],
        c: 2
      },
      {
        q: "Which ocean is the largest?",
        a: ["Atlantic", "Indian", "Pacific", "Arctic"],
        c: 2
      },
      {
        q: "What is the fastest land animal?",
        a: ["Lion", "Cheetah", "Horse", "Leopard"],
        c: 1
      },
      {
        q: "How many sides does a hexagon have?",
        a: ["5", "6", "7", "8"],
        c: 1
      },
      {
        q: "Which animal is known as the largest mammal?",
        a: ["Elephant", "Blue whale", "Giraffe", "Hippo"],
        c: 1
      },
      {
        q: "What gas do humans need to breathe?",
        a: ["Carbon dioxide", "Oxygen", "Helium", "Hydrogen"],
        c: 1
      },
      {
        q: "How many days are in a leap year?",
        a: ["364", "365", "366", "367"],
        c: 2
      },
      {
        q: "Which sport uses a racket and a shuttlecock?",
        a: ["Tennis", "Badminton", "Baseball", "Golf"],
        c: 1
      },
      {
        q: "What is the capital of France?",
        a: ["Rome", "Madrid", "Paris", "Berlin"],
        c: 2
      }
    ]
  },


  decode: {
    title: "Decode It",
    description:
      "Crack secret messages, patterns, symbols and hidden words.",
    type: "SECRET CODE",

    questions: [
      {
        q: "If CAT becomes DBU, what does DOG become?",
        a: ["EPH", "EPG", "DOH", "FPH"],
        c: 0
      },
      {
        q: "If A = 1, B = 2 and C = 3, what number is D?",
        a: ["3", "4", "5", "6"],
        c: 1
      },
      {
        q: "What comes next: 2, 4, 6, 8, ___?",
        a: ["9", "10", "11", "12"],
        c: 1
      },
      {
        q: "What comes next: A, C, E, G, ___?",
        a: ["H", "I", "J", "K"],
        c: 1
      },
      {
        q: "If 1 = A, 2 = B and 3 = C, what does 3-1 spell?",
        a: ["CA", "AC", "BC", "AB"],
        c: 0
      },
      {
        q: "Which word is hidden inside 'STREET'?",
        a: ["TREE", "STAR", "TEAR", "REST"],
        c: 0
      },
      {
        q: "What comes next: 5, 10, 15, 20, ___?",
        a: ["22", "24", "25", "30"],
        c: 2
      },
      {
        q: "If every letter moves one place forward, A becomes:",
        a: ["B", "C", "Z", "AA"],
        c: 0
      },
      {
        q: "What number replaces the question mark: 3, 6, 9, 12, ?",
        a: ["13", "14", "15", "16"],
        c: 2
      },
      {
        q: "Which letter comes next: B, D, F, H, ___?",
        a: ["I", "J", "K", "L"],
        c: 1
      }
    ]
  },


  rebus: {
    title: "Rebus Puzzles",
    description:
      "Look at the clues differently and discover the hidden phrase.",
    type: "REBUS PUZZLE",

    questions: [
      {
        q: "What phrase is represented by: CYCLE CYCLE CYCLE?",
        a: ["Tricycle", "Bicycle", "Three wheels", "Cycle path"],
        c: 0
      },
      {
        q: "What phrase is represented by: MAN BOARD?",
        a: ["Man overboard", "Board man", "Man aboard", "Board meeting"],
        c: 0
      },
      {
        q: "What phrase does HEAD HEELS suggest?",
        a: ["Head over heels", "Heads up", "Heel first", "Two heads"],
        c: 0
      },
      {
        q: "What phrase does STAND written very far away suggest?",
        a: ["I understand", "Long distance", "Far away", "Stand alone"],
        c: 0
      },
      {
        q: "What phrase could be represented by: YOU JUST ME?",
        a: [
          "Just between you and me",
          "You and me",
          "Me first",
          "Just you"
        ],
        c: 0
      },
      {
        q: "What phrase could 'JOBINJOB' represent?",
        a: [
          "In between jobs",
          "Job interview",
          "Job hunt",
          "Working hard"
        ],
        c: 0
      },
      {
        q: "What phrase could '0 M.D.' represent?",
        a: [
          "No middle ground",
          "Doctor zero",
          "Zero doctor",
          "No medicine"
        ],
        c: 0
      },
      {
        q: "What phrase could 'ECNALG' represent when read backward?",
        a: ["Glance", "Change", "Clean", "Angle"],
        c: 0
      },
      {
        q: "What phrase could 'cycle cycle cycle' describe?",
        a: ["Tricycle", "Bicycle", "Motorcycle", "Recycle"],
        c: 0
      },
      {
        q: "What phrase does the word 'BROKEN' written in half suggest?",
        a: [
          "Broken in two",
          "Break a leg",
          "Half broken",
          "Broken heart"
        ],
        c: 0
      }
    ]
  },


  number: {
    title: "Number Ninja",
    description:
      "Patterns, math tricks and number challenges designed to fool you.",
    type: "NUMBER CHALLENGE",

    questions: [
      {
        q: "What is 12 × 5?",
        a: ["50", "55", "60", "65"],
        c: 2
      },
      {
        q: "What is 100 ÷ 4?",
        a: ["20", "25", "30", "40"],
        c: 1
      },
      {
        q: "What is 15 + 27?",
        a: ["40", "41", "42", "43"],
        c: 2
      },
      {
        q: "What is 81 ÷ 9?",
        a: ["7", "8", "9", "10"],
        c: 2
      },
      {
        q: "What is 7 × 8?",
        a: ["48", "54", "56", "64"],
        c: 2
      },
      {
        q: "What comes next: 2, 4, 8, 16, ___?",
        a: ["20", "24", "32", "36"],
        c: 2
      },
      {
        q: "What is 45 - 17?",
        a: ["26", "27", "28", "29"],
        c: 2
      },
      {
        q: "What is half of 90?",
        a: ["40", "45", "50", "55"],
        c: 1
      },
      {
        q: "What is 9 × 9?",
        a: ["72", "81", "89", "91"],
        c: 1
      },
      {
        q: "What comes next: 100, 90, 80, 70, ___?",
        a: ["50", "55", "60", "65"],
        c: 2
      }
    ]
  },


  word: {
    title: "Word Scramble",
    description:
      "Unscramble words and beat the challenge.",
    type: "WORD SCRAMBLE",

    questions: [
      {
        q: "Unscramble: PAELP",
        a: ["APPLE", "PEACH", "PLACE", "PAPER"],
        c: 0
      },
      {
        q: "Unscramble: NABANA",
        a: ["BANANA", "BANDANA", "CABANA", "BANANAS"],
        c: 0
      },
      {
        q: "Unscramble: ROSEH",
        a: ["HORSE", "HOUSE", "SHORE", "ROSES"],
        c: 0
      },
      {
        q: "Unscramble: RTAEW",
        a: ["WATER", "EARTH", "WEAR", "GREAT"],
        c: 0
      },
      {
        q: "Unscramble: OCHOLS",
        a: ["SCHOOL", "CHOOSE", "CHOLOS", "COOL"],
        c: 0
      },

      /* FIXED:
         RDOOG was not a valid scramble for GOOD or DOOR.
         DOOG correctly scrambles to GOOD.
      */
      {
        q: "Unscramble: DOOG",
        a: ["GOOD", "DOOR", "DOG", "GORDO"],
        c: 0
      },

      {
        q: "Unscramble: RTEWA",
        a: ["WATER", "WRITE", "TOWER", "WEAR"],
        c: 0
      },
      {
        q: "Unscramble: KBOO",
        a: ["BOOK", "BOOM", "COOK", "LOOK"],
        c: 0
      },
      {
        q: "Unscramble: ESUOH",
        a: ["HOUSE", "HORSE", "SHOE", "HOURS"],
        c: 0
      },
      {
        q: "Unscramble: RIACH",
        a: ["CHAIR", "HAIR", "RICH", "CHIRP"],
        c: 0
      }
    ]
  },


  mystery: {
    title: "Mystery Case",
    description:
      "Follow the clues and solve the case.",
    type: "MYSTERY CASE",

    questions: [
      {
        q: "A cookie disappeared from the kitchen. The crumbs lead to the couch. Who is the most likely suspect?",
        a: [
          "The person sitting on the couch",
          "The mail carrier",
          "The neighbor",
          "The teacher"
        ],
        c: 0
      },
      {
        q: "A door was locked from the inside, but a window was open. What should you investigate first?",
        a: [
          "The window",
          "The refrigerator",
          "The mailbox",
          "The driveway"
        ],
        c: 0
      },
      {
        q: "You find wet footprints leading from the pool to the kitchen. What do they tell you?",
        a: [
          "Someone came inside from the pool",
          "Someone left the house",
          "It rained inside",
          "The kitchen leaked"
        ],
        c: 0
      },
      {
        q: "A clock stopped at exactly 8:00. What is that clue?",
        a: [
          "It may show when something happened",
          "It proves the clock is new",
          "It proves nobody was there",
          "It means it is morning"
        ],
        c: 0
      },
      {
        q: "A missing toy is found underneath a bed. What clue is most useful?",
        a: [
          "Who had access to the room",
          "What color the toy is",
          "How old the bed is",
          "What day it is"
        ],
        c: 0
      },
      {
        q: "Three people were home. One has muddy shoes and the missing item was found outside. What clue connects them?",
        a: [
          "The muddy shoes",
          "Their favorite color",
          "Their lunch",
          "Their phone"
        ],
        c: 0
      },
      {
        q: "A note says 'LOOK UNDER THE TABLE.' What should you do?",
        a: [
          "Check under the table",
          "Throw the note away",
          "Look at the ceiling",
          "Leave the room"
        ],
        c: 0
      },
      {
        q: "A glass is broken beside a baseball. What is the strongest clue?",
        a: [
          "The baseball may have caused the break",
          "The glass was expensive",
          "The room is large",
          "The ball is round"
        ],
        c: 0
      },
      {
        q: "A suspect says they were outside, but their shoes are completely dry during a rainstorm. What should you consider?",
        a: [
          "Their story may need checking",
          "They definitely did nothing",
          "The rain was fake",
          "Their shoes are broken"
        ],
        c: 0
      },
      {
        q: "The best mystery solver should rely on:",
        a: [
          "Evidence and clues",
          "Random guesses",
          "Luck only",
          "The loudest person"
        ],
        c: 0
      }
    ]
  },


  quick: {
    title: "Quick Fire",
    description:
      "Fast questions. Fast decisions. Keep your streak alive.",
    type: "QUICK FIRE",

    questions: [
      {
        q: "How many days are in a week?",
        a: ["5", "6", "7", "8"],
        c: 2
      },
      {
        q: "What color do you get by mixing blue and yellow?",
        a: ["Green", "Purple", "Orange", "Pink"],
        c: 0
      },
      {
        q: "How many legs does a spider have?",
        a: ["6", "8", "10", "12"],
        c: 1
      },
      {
        q: "Which animal says 'moo'?",
        a: ["Dog", "Cow", "Horse", "Sheep"],
        c: 1
      },
      {
        q: "What is 10 + 10?",
        a: ["15", "18", "20", "25"],
        c: 2
      },
      {
        q: "Which month comes after June?",
        a: ["May", "July", "August", "April"],
        c: 1
      },
      {
        q: "How many hours are in one day?",
        a: ["12", "18", "24", "30"],
        c: 2
      },
      {
        q: "What shape has three sides?",
        a: ["Square", "Circle", "Triangle", "Rectangle"],
        c: 2
      },
      {
        q: "Which direction does the sun rise?",
        a: ["North", "South", "East", "West"],
        c: 2
      },
      {
        q: "How many fingers are on one hand?",
        a: ["4", "5", "6", "10"],
        c: 1
      }
    ]
  }

};


/* =========================================================
   HTML ELEMENTS
   ========================================================= */

const pointsElement =
  document.getElementById("points");

const streakElement =
  document.getElementById("streak");

const winsElement =
  document.getElementById("wins");

const levelElement =
  document.getElementById("level");

const gamesSection =
  document.getElementById("games");

const difficultySection =
  document.getElementById("difficulty");

const selectedGameTitle =
  document.getElementById("selectedGameTitle");

const selectedGameDescription =
  document.getElementById("selectedGameDescription");

const gameScreen =
  document.getElementById("gameScreen");

const gameDifficulty =
  document.getElementById("gameDifficulty");

const activeGameTitle =
  document.getElementById("activeGameTitle");

const questionNumber =
  document.getElementById("questionNumber");

const questionTotal =
  document.getElementById("questionTotal");

const questionType =
  document.getElementById("questionType");

const questionText =
  document.getElementById("questionText");

const answerArea =
  document.getElementById("answerArea");

const gameMessage =
  document.getElementById("gameMessage");

const nextButton =
  document.getElementById("nextButton");


/* =========================================================
   SAVE PLAYER DATA
   ========================================================= */

function savePlayerData() {

  localStorage.setItem(
    "ffg_points",
    String(points)
  );

  localStorage.setItem(
    "ffg_streak",
    String(streak)
  );

  localStorage.setItem(
    "ffg_wins",
    String(wins)
  );

  localStorage.setItem(
    "ffg_correct",
    String(correctAnswers)
  );
}


/* =========================================================
   UPDATE PLAYER DISPLAY
   ========================================================= */

function updatePlayerDisplay() {

  if (pointsElement) {
    pointsElement.textContent = points;
  }

  if (streakElement) {
    streakElement.textContent = streak;
  }

  if (winsElement) {
    winsElement.textContent = wins;
  }

  const level =
    Math.floor(points / 100) + 1;

  if (levelElement) {
    levelElement.textContent = level;
  }

  updateAchievements();

  savePlayerData();

  setArcadeProgress();
}


/* =========================================================
   SCROLL TO GAMES
   ========================================================= */

function scrollToGames() {

  if (!gamesSection) {
    return;
  }

  gamesSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* =========================================================
   CHOOSE GAME
   ========================================================= */

function chooseGame(gameName) {

  if (!games[gameName]) {
    console.error(
      "Game does not exist:",
      gameName
    );
    return;
  }

  selectedGame = gameName;

  const game =
    games[gameName];

  if (selectedGameTitle) {
    selectedGameTitle.textContent =
      game.title;
  }

  if (selectedGameDescription) {
    selectedGameDescription.textContent =
      game.description;
  }

  if (difficultySection) {
    difficultySection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


/* =========================================================
   START GAME
   ========================================================= */

function startGame(difficulty) {

  if (!selectedGame) {

    if (selectedGameTitle) {
      selectedGameTitle.textContent =
        "Choose a game first.";
    }

    if (selectedGameDescription) {
      selectedGameDescription.textContent =
        "Select a game above before choosing a difficulty.";
    }

    if (difficultySection) {
      difficultySection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    return;
  }

  const game =
    games[selectedGame];

  if (!game || !game.questions.length) {
    return;
  }

  selectedDifficulty =
    difficulty;

  currentQuestions =
    [...game.questions];

  currentQuestionIndex = 0;

  currentScore = 0;

  answered = false;

  if (activeGameTitle) {
    activeGameTitle.textContent =
      game.title;
  }

  if (gameDifficulty) {
    gameDifficulty.textContent =
      String(difficulty).toUpperCase();
  }

  if (questionType) {
    questionType.textContent =
      game.type;
  }

  if (questionTotal) {
    questionTotal.textContent =
      currentQuestions.length;
  }

  if (gameScreen) {

    gameScreen.classList.add(
      "active"
    );

    gameScreen.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  if (nextButton) {
    nextButton.onclick =
      nextQuestion;
  }

  loadQuestion();
}


/* =========================================================
   LOAD QUESTION
   ========================================================= */

function loadQuestion() {

  const current =
    currentQuestions[
      currentQuestionIndex
    ];

  if (!current) {
    return;
  }

  answered = false;

  if (questionNumber) {
    questionNumber.textContent =
      currentQuestionIndex + 1;
  }

  if (questionText) {
    questionText.textContent =
      current.q;
  }

  if (gameMessage) {
    gameMessage.textContent = "";
  }

  if (nextButton) {

    nextButton.style.display =
      "none";

    nextButton.textContent =
      "NEXT CHALLENGE →";
  }

  if (!answerArea) {
    return;
  }

  answerArea.innerHTML = "";

  current.a.forEach(
    (answer, index) => {

      const button =
        document.createElement(
          "button"
        );

      button.className =
        "answer-button";

      button.type =
        "button";

      button.textContent =
        answer;

      button.addEventListener(
        "click",
        () => {
          checkAnswer(
            index,
            button
          );
        }
      );

      answerArea.appendChild(
        button
      );
    }
  );
}


/* =========================================================
   CHECK ANSWER
   ========================================================= */

function checkAnswer(
  selectedIndex,
  selectedButton
) {

  if (answered) {
    return;
  }

  const current =
    currentQuestions[
      currentQuestionIndex
    ];

  if (!current) {
    return;
  }

  answered = true;

  const answerButtons =
    answerArea
      ? answerArea.querySelectorAll(
          ".answer-button"
        )
      : [];

  answerButtons.forEach(
    button => {
      button.disabled = true;
    }
  );

  if (
    selectedIndex ===
    current.c
  ) {

    if (selectedButton) {
      selectedButton.classList.add(
        "correct"
      );
    }

    streak++;

    correctAnswers++;

    const pointsEarned =
      getPointsForDifficulty();

    points +=
      pointsEarned;

    currentScore +=
      pointsEarned;

    if (gameMessage) {
      gameMessage.textContent =
        "CORRECT! +" +
        pointsEarned +
        " POINTS 🎉";
    }

  } else {

    if (selectedButton) {
      selectedButton.classList.add(
        "wrong"
      );
    }

    if (
      answerButtons[
        current.c
      ]
    ) {
      answerButtons[
        current.c
      ].classList.add(
        "correct"
      );
    }

    streak = 0;

    if (gameMessage) {
      gameMessage.textContent =
        "Not quite. The correct answer is: " +
        current.a[current.c];
    }
  }

  updatePlayerDisplay();

  if (nextButton) {

    nextButton.style.display =
      "block";

    if (
      currentQuestionIndex ===
      currentQuestions.length - 1
    ) {

      nextButton.textContent =
        "FINISH GAME →";

    } else {

      nextButton.textContent =
        "NEXT CHALLENGE →";
    }
  }
}


/* =========================================================
   POINTS BY DIFFICULTY
   ========================================================= */

function getPointsForDifficulty() {

  if (
    selectedDifficulty ===
    "expert"
  ) {
    return 30;
  }

  if (
    selectedDifficulty ===
    "intermediate"
  ) {
    return 20;
  }

  return 10;
}


/* =========================================================
   NEXT QUESTION
   ========================================================= */

function nextQuestion() {

  if (!answered) {
    return;
  }

  currentQuestionIndex++;

  if (
    currentQuestionIndex >=
    currentQuestions.length
  ) {

    finishGame();

    return;
  }

  loadQuestion();
}


/* =========================================================
   FINISH GAME
   ========================================================= */

function finishGame() {

  wins++;

  savePlayerData();

  updatePlayerDisplay();

  if (questionText) {
    questionText.textContent =
      "Challenge Complete!";
  }

  if (questionType) {
    questionType.textContent =
      "GAME FINISHED";
  }

  if (answerArea) {
    answerArea.innerHTML = "";
  }

  if (gameMessage) {
    gameMessage.textContent =
      "You earned " +
      currentScore +
      " points this round!";
  }

  if (questionNumber) {
    questionNumber.textContent =
      currentQuestions.length;
  }

  if (nextButton) {

    nextButton.textContent =
      "PLAY AGAIN →";

    nextButton.style.display =
      "block";

    nextButton.onclick =
      function () {
        startGame(
          selectedDifficulty
        );
      };
  }
}


/* =========================================================
   ACHIEVEMENTS
   ========================================================= */

function updateAchievements() {

  const badgeFirst =
    document.getElementById(
      "badgeFirst"
    );

  const badgeFive =
    document.getElementById(
      "badgeFive"
    );

  const badgeStreak =
    document.getElementById(
      "badgeStreak"
    );

  const badge250 =
    document.getElementById(
      "badge250"
    );

  const badge500 =
    document.getElementById(
      "badge500"
    );

  if (
    badgeFirst &&
    correctAnswers >= 1
  ) {
    badgeFirst.classList.remove(
      "locked"
    );
  }

  if (
    badgeFive &&
    correctAnswers >= 5
  ) {
    badgeFive.classList.remove(
      "locked"
    );
  }

  if (
    badgeStreak &&
    streak >= 5
  ) {
    badgeStreak.classList.remove(
      "locked"
    );
  }

  if (
    badge250 &&
    points >= 250
  ) {
    badge250.classList.remove(
      "locked"
    );
  }

  if (
    badge500 &&
    points >= 500
  ) {
    badge500.classList.remove(
      "locked"
    );
  }
}


/* =========================================================
   REDEEM REWARD
   ========================================================= */

function redeemReward(
  cost,
  title
) {

  cost = Number(cost);

  if (
    !Number.isFinite(cost)
  ) {
    return;
  }

  if (points < cost) {

    alert(
      "You need " +
      (cost - points) +
      " more points to unlock " +
      title +
      "."
    );

    return;
  }

  points -= cost;

  updatePlayerDisplay();

  alert(
    "🎉 " +
    title +
    " unlocked!"
  );
}


/* =========================================================
   ARCADE DATA
   ========================================================= */

const ARCADE_GAMES = {

  double: {
    points: 100,
    title: "SUPERSTAR",
    game: "DOUBLE DOWN"
  },

  tropical: {
    points: 250,
    title: "CHAMPION",
    game: "TROPICAL POP"
  },

  vault: {
    points: 500,
    title: "BRAIN ROYALTY",
    game: "MYSTERY VAULT"
  },

  speed: {
    points: 750,
    title: "ELITE",
    game: "SPEED FRENZY"
  },

  legend: {
    points: 1000,
    title: "LEGEND",
    game: "THE ULTIMATE"
  }

};


/* =========================================================
   ARCADE QUESTIONS
   ========================================================= */

const ARCADE_CHALLENGES = {

  double: [

    {
      q: "Which word doesn't belong?",
      a: [
        "SHARK",
        "DOLPHIN",
        "WHALE",
        "PENGUIN"
      ],
      c: 3
    },

    {
      q: "Which symbol appeared twice?",
      a: [
        "⭐ 🌙 ⭐ 🔥",
        "⭐ 🌙 🔥 🍀",
        "🌙 🔥 🍀 🦋",
        "🍀 🦋 🌙 🔥"
      ],
      c: 0
    },

    {
      q: "What comes next?",
      a: [
        "AZ",
        "BY",
        "CX",
        "DW"
      ],
      c: 0
    },

    {
      q: "Which one is the odd one out?",
      a: [
        "Circle",
        "Triangle",
        "Square",
        "Blue"
      ],
      c: 3
    },

    {
      q: "A detective says: 'The thief was not wearing red.' Which clue is strongest?",
      a: [
        "A red jacket was found",
        "A blue hat was found",
        "A red shoe was found",
        "A green scarf was found"
      ],
      c: 1
    },

    {
      q: "Which word can follow all three?",
      a: [
        "HOUSE",
        "LIGHT",
        "FALL",
        "STAR"
      ],
      c: 3
    },

    {
      q: "Which one is hiding the pattern?",
      a: [
        "ABABAB",
        "ABCABC",
        "AABBCC",
        "ABCCBA"
      ],
      c: 2
    },

    {
      q: "Which choice completes the relationship?",
      a: [
        "Bird : Nest",
        "Bee : Hive",
        "Lion : ?",
        "Fish : Water"
      ],
      c: 2
    }

  ],


  tropical: [

    {
      q: "🌴 🌺 🥭 🌴 🌺 ?",
      a: [
        "🥭",
        "🌴",
        "🐚",
        "🍍"
      ],
      c: 0
    },

    {
     
