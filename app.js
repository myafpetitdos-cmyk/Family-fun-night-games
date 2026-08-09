/* =========================================================
   FAMILY FUN GAMES
   app.js
   COMPLETE GAME-ROOM VERSION
   Works with the existing index.html + style.css
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

let unlockedTitles = JSON.parse(
  localStorage.getItem("ffg_titles") || "[]"
);

let activeBonusGame = null;


/* =========================================================
   GAME DATABASE
   ========================================================= */

const games = {

  brain: {
    title: "Brain Teasers",
    type: "BRAIN CHALLENGE",
    description:
      "Tricky riddles that make you stop, think, and look twice.",

    beginner: [
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
        q: "What has many teeth but cannot bite?",
        a: ["A comb", "A shark", "A zipper", "A fork"],
        c: 0
      },
      {
        q: "What has hands but cannot clap?",
        a: ["A clock", "A robot", "A statue", "A tree"],
        c: 0
      }
    ],

    intermediate: [
      {
        q: "What can travel around the world while staying in one corner?",
        a: ["A stamp", "A plane", "A postcard", "A compass"],
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
        q: "What has a neck but no head?",
        a: ["A bottle", "A shirt", "A guitar", "A chair"],
        c: 0
      },
      {
        q: "The more you take, the more you leave behind. What are they?",
        a: ["Footsteps", "Pictures", "Coins", "Words"],
        c: 0
      }
    ],

    expert: [
      {
        q: "I speak without a mouth and hear without ears. What am I?",
        a: ["An echo", "A radio", "A shadow", "A dream"],
        c: 0
      },
      {
        q: "What disappears as soon as you say its name?",
        a: ["Silence", "A secret", "A shadow", "Sleep"],
        c: 0
      },
      {
        q: "What can fill a room but takes up no space?",
        a: ["Light", "Water", "Air", "Sound"],
        c: 0
      },
      {
        q: "What is always in front of you but can never be seen?",
        a: ["The future", "Your shadow", "Yesterday", "The past"],
        c: 0
      },
      {
        q: "What question can you never truthfully answer yes to?",
        a: [
          "Are you asleep?",
          "Are you hungry?",
          "Are you ready?",
          "Are you awake?"
        ],
        c: 0
      }
    ]
  },


  trivia: {
    title: "Trivia Rush",
    type: "TRIVIA",
    description:
      "Science, animals, history, geography, sports, and surprising facts.",

    beginner: [
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
      }
    ],

    intermediate: [
      {
        q: "Which animal is the largest mammal?",
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
    ],

    expert: [
      {
        q: "Which planet has the shortest day?",
        a: ["Earth", "Mars", "Jupiter", "Venus"],
        c: 2
      },
      {
        q: "What is the chemical symbol for gold?",
        a: ["Ag", "Au", "Gd", "Go"],
        c: 1
      },
      {
        q: "Which layer of Earth is liquid?",
        a: ["Crust", "Mantle", "Outer core", "Inner core"],
        c: 2
      },
      {
        q: "Which blood type is the universal red-cell donor?",
        a: ["AB+", "O-", "A+", "B-"],
        c: 1
      },
      {
        q: "Which continent has the most countries?",
        a: ["Asia", "Africa", "Europe", "South America"],
        c: 1
      }
    ]
  },


  decode: {
    title: "Decode It",
    type: "SECRET CODE",
    description:
      "Crack secret messages, patterns, symbols, and hidden words.",

    beginner: [
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
        q: "What comes next: 5, 10, 15, 20, ___?",
        a: ["22", "24", "25", "30"],
        c: 2
      },
      {
        q: "If every letter moves one place forward, A becomes:",
        a: ["B", "C", "Z", "AA"],
        c: 0
      }
    ],

    intermediate: [
      {
        q: "If CAT becomes DBU, what does DOG become?",
        a: ["EPH", "EPG", "DOH", "FPH"],
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
      },
      {
        q: "If 1 = A, 2 = B and 3 = C, what does 3-1 spell?",
        a: ["CA", "AC", "BC", "AB"],
        c: 0
      },
      {
        q: "Which word is hidden inside STREET?",
        a: ["TREE", "STAR", "TEAR", "REST"],
        c: 0
      }
    ],

    expert: [
      {
        q: "If each letter moves two places forward, CAT becomes:",
        a: ["ECV", "EDV", "DBU", "ECR"],
        c: 0
      },
      {
        q: "What comes next: 1, 4, 9, 16, 25, ___?",
        a: ["30", "36", "40", "49"],
        c: 1
      },
      {
        q: "What comes next: 2, 6, 12, 20, 30, ___?",
        a: ["36", "40", "42", "44"],
        c: 2
      },
      {
        q: "If CODE becomes DPEF, what does GAME become?",
        a: ["HBNF", "HBMF", "FZLD", "HAME"],
        c: 0
      },
      {
        q: "What number comes next: 3, 9, 27, 81, ___?",
        a: ["162", "216", "243", "324"],
        c: 2
      }
    ]
  },


  rebus: {
    title: "Rebus Puzzles",
    type: "REBUS PUZZLE",
    description:
      "Look at the clues differently and discover the hidden phrase.",

    beginner: [
      {
        q: "What phrase is represented by CYCLE CYCLE CYCLE?",
        a: ["Tricycle", "Bicycle", "Three wheels", "Cycle path"],
        c: 0
      },
      {
        q: "What phrase is represented by MAN BOARD?",
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
        q: "What phrase does BROKEN BROKEN HEART suggest?",
        a: ["Heartbreak", "Broken promise", "Hard heart", "Heart attack"],
        c: 0
      }
    ],

    intermediate: [
      {
        q: "What phrase is represented by THINK written inside a box?",
        a: ["Think outside the box", "Think inside the box", "Boxed thinking", "Think twice"],
        c: 1
      },
      {
        q: "What phrase is represented by CYCLE written three times?",
        a: ["Tricycle", "Bicycle", "Cycle race", "Three cycles"],
        c: 0
      },
      {
        q: "What phrase does 0 M.D. PH.D. suggest?",
        a: ["No doctor", "Two degrees", "Doctor doctor", "Degree zero"],
        c: 0
      },
      {
        q: "What phrase does JOBINJOB suggest?",
        a: ["In between jobs", "Job inside job", "Double job", "Job security"],
        c: 0
      },
      {
        q: "What phrase does READ written between two lines suggest?",
        a: ["Read between the lines", "Read aloud", "Line reader", "Read twice"],
        c: 0
      }
    ],

    expert: [
      {
        q: "What phrase is represented by TIME written four times?",
        a: ["Time after time", "Four times", "Time out", "Long time"],
        c: 0
      },
      {
        q: "What phrase is represented by YOU JUST ME?",
        a: ["Just between you and me", "You and me", "Just you", "Me first"],
        c: 0
      },
      {
        q: "What phrase does ECNALG suggest when read backward?",
        a: ["Glance", "Cancel", "Change", "Clean"],
        c: 0
      },
      {
        q: "What phrase is represented by WHEATHER?",
        a: ["Under the weather", "Bad weather", "Weather report", "Cold weather"],
        c: 0
      },
      {
        q: "What phrase does cycle written inside cycle suggest?",
        a: ["Cycle within a cycle", "Circle of life", "Inside information", "Inner circle"],
        c: 3
      }
    ]
  },


  number: {
    title: "Number Ninja",
    type: "NUMBER CHALLENGE",
    description:
      "Patterns, math tricks, and number challenges designed to fool you.",

    beginner: [
      {
        q: "What is 5 + 7?",
        a: ["10", "11", "12", "13"],
        c: 2
      },
      {
        q: "What is 10 × 2?",
        a: ["12", "20", "22", "25"],
        c: 1
      },
      {
        q: "What comes next: 2, 4, 6, 8?",
        a: ["9", "10", "11", "12"],
        c: 1
      },
      {
        q: "What is half of 20?",
        a: ["5", "8", "10", "12"],
        c: 2
      },
      {
        q: "What is 100 - 25?",
        a: ["65", "70", "75", "80"],
        c: 2
      }
    ],

    intermediate: [
      {
        q: "What is 12 × 8?",
        a: ["86", "96", "106", "116"],
        c: 1
      },
      {
        q: "What is 144 ÷ 12?",
        a: ["10", "11", "12", "14"],
        c: 2
      },
      {
        q: "What comes next: 3, 6, 12, 24?",
        a: ["36", "42", "48", "54"],
        c: 2
      },
      {
        q: "What is 15% of 100?",
        a: ["10", "15", "20", "25"],
        c: 1
      },
      {
        q: "What is 7²?",
        a: ["14", "21", "42", "49"],
        c: 3
      }
    ],

    expert: [
      {
        q: "What comes next: 1, 1, 2, 3, 5, 8, ___?",
        a: ["11", "12", "13", "15"],
        c: 2
      },
      {
        q: "What is 17 × 12?",
        a: ["194", "204", "214", "224"],
        c: 1
      },
      {
        q: "What is the square root of 169?",
        a: ["11", "12", "13", "14"],
        c: 2
      },
      {
        q: "What comes next: 2, 6, 18, 54, ___?",
        a: ["108", "126", "162", "216"],
        c: 2
      },
      {
        q: "If x + 7 = 19, what is x?",
        a: ["10", "11", "12", "13"],
        c: 2
      }
    ]
  },


  word: {
    title: "Word Scramble",
    type: "WORD SCRAMBLE",
    description:
      "Unscramble words and beat the challenge.",

    beginner: [
      {
        q: "Unscramble: TAC",
        a: ["CAT", "ACT", "COT", "CUT"],
        c: 0
      },
      {
        q: "Unscramble: GOD",
        a: ["DOG", "GOD", "DIG", "DOT"],
        c: 0
      },
      {
        q: "Unscramble: RAE",
        a: ["EAR", "ARE", "ERA", "All of these"],
        c: 3
      },
      {
        q: "Unscramble: HSUO",
        a: ["SHOE", "HOUSE", "HUSH", "SHOW"],
        c: 2
      },
      {
        q: "Unscramble: KOOB",
        a: ["BOOK", "BOOT", "LOOK", "COOK"],
        c: 0
      }
    ],

    intermediate: [
      {
        q: "Unscramble: RATHE",
        a: ["EARTH", "HEART", "EARTH / HEART", "HATER"],
        c: 2
      },
      {
        q: "Unscramble: TISENL",
        a: ["LISTEN", "SILENT", "ENLIST", "All of these"],
        c: 3
      },
      {
        q: "Unscramble: CNOICFUS",
        a: ["CONFUSIC", "CONFUSION", "CONFLICT", "FUNCTION"],
        c: 1
      },
      {
        q: "Unscramble: RYETSMY",
        a: ["MYSTERY", "MYSTERY", "SYSTEMRY", "RHYTHM"],
        c: 0
      },
      {
        q: "Unscramble: EGNALHCL E",
        a: ["CHALLENGE", "CHANGE", "LENGTH", "CHARGE"],
        c: 0
      }
    ],

    expert: [
      {
        q: "Unscramble: NITRAPCO",
        a: ["CONTRAPIN", "PARTICION", "PARTITION", "CAPTION"],
        c: 2
      },
      {
        q: "Unscramble: LOPRBAEM",
        a: ["PROBLEM", "PROGRAM", "PROBE", "PARABLE"],
        c: 0
      },
      {
        q: "Unscramble: NITNAOTIVON",
        a: ["INNOVATION", "MOTIVATION", "NAVIGATION", "INFORMATION"],
        c: 0
      },
      {
        q: "Unscramble: EGNELALCH",
        a: ["CHALLENGE", "CHANGE", "LENGTH", "CHARGE"],
        c: 0
      },
      {
        q: "Unscramble: TEGYTSAR",
        a: ["STRATEGY", "TARGETS", "ENERGY", "GATEWAY"],
        c: 0
      }
    ]
  },


  mystery: {
    title: "Mystery Case",
    type: "MYSTERY CASE",
    description:
      "Follow the clues and solve the case.",

    beginner: [
      {
        q: "A cookie disappeared. The crumbs lead to the kitchen. Where should you look first?",
        a: ["Kitchen", "Garage", "Bedroom", "Yard"],
        c: 0
      },
      {
        q: "A muddy footprint is found by an open window. What is the strongest clue?",
        a: ["The footprint", "The wall", "The ceiling", "The lamp"],
        c: 0
      },
      {
        q: "The clock stopped at 8:00. What should an investigator do?",
        a: ["Check other evidence", "Guess the culprit", "Ignore it", "Destroy the clock"],
        c: 0
      },
      {
        q: "A missing toy is found under a bed. What is the simplest explanation?",
        a: ["It was pushed underneath", "A ghost took it", "It vanished", "It flew away"],
        c: 0
      },
      {
        q: "Two people give different stories. What should you compare?",
        a: ["Their evidence", "Their clothes", "Their height", "Their favorite color"],
        c: 0
      }
    ],

    intermediate: [
      {
        q: "A suspect claims they were outside, but their shoes are completely dry during heavy rain. What does this suggest?",
        a: ["Their story may be false", "They ran fast", "They wore blue shoes", "Nothing"],
        c: 0
      },
      {
        q: "A glass is broken inward from a window. What does that suggest?",
        a: ["The glass may have been broken from outside", "It was never broken", "Wind did it", "It proves theft"],
        c: 0
      },
      {
        q: "A note contains a time that conflicts with a security camera. What should you trust first?",
        a: ["Verify both sources", "Always the note", "Always the camera", "Neither"],
        c: 0
      },
      {
        q: "A key is found in a locked room. What is the best next question?",
        a: ["Who had access?", "What color is it?", "Who bought it?", "Is it shiny?"],
        c: 0
      },
      {
        q: "A suspect says they never entered the room, but their fingerprints are found inside. What is this?",
        a: ["Evidence contradicting their statement", "Proof of guilt by itself", "No clue", "A coincidence guaranteed"],
        c: 0
      }
    ],

    expert: [
      {
        q: "A suspect's timeline has one unexplained 30-minute gap. What should investigators do?",
        a: ["Investigate the gap", "Assume guilt", "Ignore it", "Close the case"],
        c: 0
      },
      {
        q: "Three clues independently point toward the same suspect. What should happen next?",
        a: ["Verify the clues", "Immediately convict them", "Delete the clues", "Ignore witnesses"],
        c: 0
      },
      {
        q: "A witness changes their story after hearing another witness. What should investigators consider?",
        a: ["Possible influence or memory change", "Automatic guilt", "Automatic truth", "No relevance"],
        c: 0
      },
      {
        q: "A camera records a person entering at 9:10, but a witness says they left at 9:00. What is needed?",
        a: ["More evidence", "A guess", "A confession", "Nothing"],
        c: 0
      },
      {
        q: "The strongest conclusion should be based on:",
        a: ["Verified evidence", "Rumors", "Assumptions", "Popularity"],
        c: 0
      }
    ]
  },


  quick: {
    title: "Quick Fire",
    type: "QUICK FIRE",
    description:
      "Fast questions. Fast decisions. Keep your streak alive.",

    beginner: [
      {
        q: "Which is larger?",
        a: ["10", "100", "5", "1"],
        c: 1
      },
      {
        q: "Which animal says moo?",
        a: ["Cow", "Dog", "Cat", "Duck"],
        c: 0
      },
      {
        q: "How many minutes are in an hour?",
        a: ["30", "45", "60", "90"],
        c: 2
      },
      {
        q: "What color do you get by mixing red and blue?",
        a: ["Green", "Purple", "Orange", "Yellow"],
        c: 1
      },
      {
        q: "Which direction does the sun rise?",
        a: ["North", "South", "East", "West"],
        c: 2
      }
    ],

    intermediate: [
      {
        q: "Which number is prime?",
        a: ["9", "15", "17", "21"],
        c: 2
      },
      {
        q: "Which planet is known for its rings?",
        a: ["Mars", "Saturn", "Mercury", "Earth"],
        c: 1
      },
      {
        q: "How many degrees are in a right angle?",
        a: ["45", "90", "180", "360"],
        c: 1
      },
      {
        q: "Which is a mammal?",
        a: ["Shark", "Dolphin", "Trout", "Lizard"],
        c: 1
      },
      {
        q: "What is 9 × 9?",
        a: ["72", "81", "89", "99"],
        c: 1
      }
    ],

    expert: [
      {
        q: "Which number is both a square and a cube?",
        a: ["16", "36", "64", "100"],
        c: 2
      },
      {
        q: "What is the next prime after 29?",
        a: ["30", "31", "32", "33"],
        c: 1
      },
      {
        q: "Which planet rotates in the opposite direction to most planets?",
        a: ["Mars", "Venus", "Jupiter", "Neptune"],
        c: 1
      },
      {
        q: "What is 15²?",
        a: ["200", "215", "225", "250"],
        c: 2
      },
      {
        q: "What is the smallest prime number?",
        a: ["0", "1", "2", "3"],
        c: 2
      }
    ]
  }
};


/* =========================================================
   DIFFICULTY POINT VALUES
   ========================================================= */

const difficultyPoints = {
  beginner: 10,
  intermediate: 20,
  expert: 30
};


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  updatePlayerDisplay();
  updateAchievements();
});


/* =========================================================
   SAVE PLAYER
   ========================================================= */

function savePlayerData() {
  localStorage.setItem("ffg_points", points);
  localStorage.setItem("ffg_streak", streak);
  localStorage.setItem("ffg_wins", wins);
  localStorage.setItem("ffg_correct", correctAnswers);

  localStorage.setItem(
    "ffg_titles",
    JSON.stringify(unlockedTitles)
  );
}


/* =========================================================
   PLAYER LEVEL
   ========================================================= */

function getLevel() {
  return Math.floor(points / 100) + 1;
}


/* =========================================================
   UPDATE PLAYER BAR
   ========================================================= */

function updatePlayerDisplay() {

  const pointsEl = document.getElementById("points");
  const streakEl = document.getElementById("streak");
  const winsEl = document.getElementById("wins");
  const levelEl = document.getElementById("level");

  if (pointsEl) pointsEl.textContent = points;
  if (streakEl) streakEl.textContent = streak;
  if (winsEl) winsEl.textContent = wins;
  if (levelEl) levelEl.textContent = getLevel();
}


/* =========================================================
   SCROLL TO GAMES
   ========================================================= */

function scrollToGames() {

  const gamesSection = document.getElementById("games");

  if (gamesSection) {
    gamesSection.scrollIntoView({
      behavior: "smooth"
    });
  }
}


/* =========================================================
   CHOOSE GAME
   ========================================================= */

function chooseGame(gameKey) {

  if (!games[gameKey]) {
    return;
  }

  selectedGame = gameKey;

  const game = games[gameKey];

  const title =
    document.getElementById("selectedGameTitle");

  const description =
    document.getElementById("selectedGameDescription");

  if (title) {
    title.textContent = game.title;
  }

  if (description) {
    description.textContent =
      game.description +
      " Choose your difficulty below.";
  }

  const difficulty =
    document.getElementById("difficulty");

  if (difficulty) {
    difficulty.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
}


/* =========================================================
   START GAME
   ========================================================= */

function startGame(difficulty) {

  if (!selectedGame) {

    alert(
      "Choose a game from the Game Room first."
    );

    return;
  }

  if (
    !games[selectedGame] ||
    !games[selectedGame][difficulty]
  ) {
    return;
  }

  selectedDifficulty = difficulty;

  currentQuestions =
    shuffleArray(
      games[selectedGame][difficulty]
    ).slice(0, 5);

  currentQuestionIndex = 0;
  currentScore = 0;
  answered = false;

  activeBonusGame = null;

  const screen =
    document.getElementById("gameScreen");

  if (screen) {
    screen.classList.add("active");

    setTimeout(function () {
      screen.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 50);
  }

  const title =
    document.getElementById("activeGameTitle");

  const difficultyEl =
    document.getElementById("gameDifficulty");

  const total =
    document.getElementById("questionTotal");

  if (title) {
    title.textContent =
      games[selectedGame].title;
  }

  if (difficultyEl) {
    difficultyEl.textContent =
      difficulty.toUpperCase();
  }

  if (total) {
    total.textContent =
      currentQuestions.length;
  }

  renderQuestion();
}


/* =========================================================
   RENDER QUESTION
   ========================================================= */

function renderQuestion() {

  if (
    !currentQuestions.length ||
    currentQuestionIndex >= currentQuestions.length
  ) {
    finishGame();
    return;
  }

  answered = false;

  const question =
    currentQuestions[currentQuestionIndex];

  const number =
    document.getElementById("questionNumber");

  const type =
    document.getElementById("questionType");

  const text =
    document.getElementById("questionText");

  const answerArea =
    document.getElementById("answerArea");

  const message =
    document.getElementById("gameMessage");

  const next =
    document.getElementById("nextButton");

  if (number) {
    number.textContent =
      currentQuestionIndex + 1;
  }

  if (type) {
    type.textContent =
      games[selectedGame].type;
  }

  if (text) {
    text.textContent =
      question.q;
  }

  if (message) {
    message.textContent = "";
  }

  if (next) {
    next.style.display = "none";
  }

  if (!answerArea) {
    return;
  }

  answerArea.innerHTML = "";

  question.a.forEach(function (answer, index) {

    const button =
      document.createElement("button");

    button.className =
      "answer-button";

    button.type = "button";

    button.textContent =
      answer;

    button.addEventListener(
      "click",
      function () {
        answerQuestion(index);
      }
    );

    answerArea.appendChild(button);
  });
}


/* =========================================================
   ANSWER QUESTION
   ========================================================= */

function answerQuestion(answerIndex) {

  if (answered) {
    return;
  }

  answered = true;

  const question =
    currentQuestions[currentQuestionIndex];

  const buttons =
    document.querySelectorAll(
      "#answerArea .answer-button"
    );

  buttons.forEach(function (button, index) {

    button.disabled = true;

    if (index === question.c) {
      button.classList.add("correct");
    }

    if (
      index === answerIndex &&
      index !== question.c
    ) {
      button.classList.add("wrong");
    }
  });

  const message =
    document.getElementById("gameMessage");

  if (answerIndex === question.c) {

    const earned =
      difficultyPoints[selectedDifficulty];

    currentScore += earned;
    points += earned;
    wins++;
    correctAnswers++;
    streak++;

    if (message) {
      message.textContent =
        "CORRECT! +" +
        earned +
        " POINTS";
    }

  } else {

    streak = 0;

    if (message) {
      message.textContent =
        "Not quite! The correct answer was: " +
        question.a[question.c];
    }
  }

  savePlayerData();
  updatePlayerDisplay();
  updateAchievements();

  const next =
    document.getElementById("nextButton");

  if (next) {
    next.style.display = "block";
  }
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

  } else {

    renderQuestion();
  }
}


/* =========================================================
   FINISH GAME
   ========================================================= */

function finishGame() {

  const questionText =
    document.getElementById("questionText");

  const questionType =
    document.getElementById("questionType");

  const answerArea =
    document.getElementById("answerArea");

  const message =
    document.getElementById("gameMessage");

  const next =
    document.getElementById("nextButton");

  if (questionType) {
    questionType.textContent =
      "CHALLENGE COMPLETE";
  }

  if (questionText) {
    questionText.textContent =
      "You scored " +
      currentScore +
      " points!";
  }

  if (answerArea) {
    answerArea.innerHTML = "";
  }

  if (message) {
    message.textContent =
      "Great job! Choose another difficulty or game.";
  }

  if (next) {
    next.style.display = "none";
  }

  savePlayerData();
  updatePlayerDisplay();
  updateAchievements();
}


/* =========================================================
   ACHIEVEMENTS
   ========================================================= */

function updateAchievements() {

  setBadge(
    "badgeFirst",
    correctAnswers >= 1
  );

  setBadge(
    "badgeFive",
    correctAnswers >= 5
  );

  setBadge(
    "badgeStreak",
    streak >= 5
  );

  setBadge(
    "badge250",
    points >= 250
  );

  setBadge(
    "badge500",
    points >= 500
  );
}


function setBadge(id, unlocked) {

  const badge =
    document.getElementById(id);

  if (!badge) {
    return;
  }

  if (unlocked) {
    badge.classList.remove("locked");
  } else {
    badge.classList.add("locked");
  }
}


/* =========================================================
   REWARDS / TITLES
   ========================================================= */

function redeemReward(cost, title) {

  if (unlockedTitles.includes(title)) {

    alert(
      "You already unlocked the " +
      title +
      " title!"
    );

    startBonusGame(title);

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

  unlockedTitles.push(title);

  savePlayerData();
  updatePlayerDisplay();

  alert(
    "TITLE UNLOCKED!\n\n" +
    title +
    "\n\nYou unlocked a special bonus game!"
  );

  startBonusGame(title);
}


/* =========================================================
   BONUS TITLE GAMES
   ========================================================= */

function startBonusGame(title) {

  activeBonusGame = title;

  const screen =
    document.getElementById("gameScreen");

  if (screen) {
    screen.classList.add("active");

    setTimeout(function () {
      screen.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 50);
  }

  if (title === "Super Star") {
    startSuperStarGame();
    return;
  }

  if (title === "Champion") {
    startChampionGame();
    return;
  }

  if (title === "Brain Royalty") {
    startBrainRoyaltyGame();
    return;
  }
}


/* =========================================================
   BONUS GAME ENGINE
   ========================================================= */

function showBonusScreen(
  gameTitle,
  gameType,
  question,
  choices,
  callback
) {

  answered = false;

  const title =
    document.getElementById("activeGameTitle");

  const difficulty =
    document.getElementById("gameDifficulty");

  const type =
    document.getElementById("questionType");

  const text =
    document.getElementById("questionText");

  const answerArea =
    document.getElementById("answerArea");

  const message =
    document.getElementById("gameMessage");

  const next =
    document.getElementById("nextButton");

  if (title) {
    title.textContent = gameTitle;
  }

  if (difficulty) {
    difficulty.textContent =
      "TITLE BONUS";
  }

  if (type) {
    type.textContent =
      gameType;
  }

  if (text) {
    text.textContent =
      question;
  }

  if (message) {
    message.textContent = "";
  }

  if (next) {
    next.style.display = "none";
  }

  if (!answerArea) {
    return;
  }

  answerArea.innerHTML = "";

  choices.forEach(function (choice) {

    const button =
      document.createElement("button");

    button.className =
      "answer-button";

    button.type = "button";

    button.textContent =
      choice.text;

    button.addEventListener(
      "click",
      function () {

        if (answered) {
          return;
        }

        answered = true;

        answerArea
          .querySelectorAll("button")
          .forEach(function (b) {
            b.disabled = true;
          });

        if (choice.correct) {

          button.classList.add("correct");

          points += 2 * 25;

          if (message) {
            message.textContent =
              "BONUS WIN! +50 POINTS!";
          }

          savePlayerData();
          updatePlayerDisplay();
          updateAchievements();

          setTimeout(function () {
            callback(true);
          }, 900);

        } else {

          button.classList.add("wrong");

          if (message) {
            message.textContent =
              "Missed it! Try the bonus game again.";
          }

          setTimeout(function () {
            callback(false);
          }, 900);
        }
      }
    );

    answerArea.appendChild(button);
  });
}


/* =========================================================
   SUPER STAR
   ROLL THE DICE
   ========================================================= */

function startSuperStarGame() {

  const roll =
    Math.floor(Math.random() * 6) + 1;

  const choices = [
    {
      text: "ROLL THE DICE 🎲",
      correct: true
    }
  ];

  showBonusScreen(
    "SUPER STAR BONUS",
    "DICE DASH",
    "Roll the dice! You need 4 or higher to defeat the first monster.",
    choices,
    function () {

      if (roll >= 4) {

        showBonusScreen(
          "SUPER STAR BONUS",
          "MONSTER BATTLE",
          "You rolled " +
          roll +
          "! The monster is vulnerable. Strike or retreat?",
          [
            {
              text: "STRIKE ⚔️",
              correct: true
            },
            {
              text: "RETREAT 🏃",
              correct: false
            }
          ],
          function () {

            alert(
              "MONSTER DEFEATED!\n\n" +
              "You earned DOUBLE POINTS!"
            );

            finishBonusGame();
          }
        );

      } else {

        const message =
          document.getElementById("gameMessage");

        if (message) {
          message.textContent =
            "You rolled " +
            roll +
            ". The monster escaped!";
        }

        setTimeout(function () {
          finishBonusGame();
        }, 1200);
      }
    }
  );
}


/* =========================================================
   CHAMPION
   RACE GAME
   ========================================================= */

function startChampionGame() {

  showBonusScreen(
    "CHAMPION BONUS",
    "FINAL RACE",
    "You're in a race! Pick your move.",
    [
      {
        text: "SPRINT 🏃",
        correct: Math.random() > 0.35
      },
      {
        text: "POWER BOOST ⚡",
        correct: Math.random() > 0.45
      },
      {
        text: "PLAY IT SAFE 🛡️",
        correct: false
      },
      {
        text: "FINISHING MOVE 🔥",
        correct: Math.random() > 0.30
      }
    ],
    function (won) {

      if (won) {

        alert(
          "RACE WON!\n\n" +
          "CHAMPION BONUS:\n" +
          "DOUBLE POINTS!"
        );

      }

      finishBonusGame();
    }
  );
}


/* =========================================================
   BRAIN ROYALTY
   FINAL BOSS
   ========================================================= */

function startBrainRoyaltyGame() {

  const bossQuestions = [
    {
      q: "The final boss has 3 shields. Which number completes the pattern: 4, 8, 16, 32, ___?",
      answers: ["48", "56", "64", "72"],
      correct: 2
    },
    {
      q: "A secret door has 3 symbols. Which comes next: ▲, ■, ▲, ■, ___?",
      answers: ["▲", "●", "■", "◆"],
      correct: 0
    },
    {
      q: "The boss says: What gets larger the more you take away from it?",
      answers: ["A hole", "A box", "A shadow", "A mountain"],
      correct: 0
    }
  ];

  const boss =
    bossQuestions[
      Math.floor(
        Math.random() * bossQuestions.length
      )
    ];

  showBonusScreen(
    "BRAIN ROYALTY",
    "FINAL BOSS",
    boss.q,
    boss.answers.map(function (answer, index) {
      return {
        text: answer,
        correct: index === boss.correct
      };
    }),
    function (won) {

      if (won) {

        alert(
          "FINAL BOSS DEFEATED!\n\n" +
          "BRAIN ROYALTY BONUS:\n" +
          "DOUBLE POINTS!"
        );

      }

      finishBonusGame();
    }
  );
}


/* =========================================================
   FINISH BONUS GAME
   ========================================================= */

function finishBonusGame() {

  activeBonusGame = null;
  answered = false;

  savePlayerData();
  updatePlayerDisplay();
  updateAchievements();

  const type =
    document.getElementById("questionType");

  const text =
    document.getElementById("questionText");

  const answerArea =
    document.getElementById("answerArea");

  const message =
    document.getElementById("gameMessage");

  if (type) {
    type.textContent =
      "BONUS COMPLETE";
  }

  if (text) {
    text.textContent =
      "Bonus game complete!";
  }

  if (answerArea) {
    answerArea.innerHTML = "";
  }

  if (message) {
    message.textContent =
      "Your points have been saved.";
  }
}


/* =========================================================
   SHUFFLE
   ========================================================= */

function shuffleArray(array) {

  const copy =
    [...array];

  for (
    let i = copy.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [
      copy[i],
      copy[j]
    ] = [
      copy[j],
      copy[i]
    ];
  }

  return copy;
}


/* =========================================================
   GLOBAL FUNCTIONS
   Required by index.html onclick attributes.
   ========================================================= */

window.scrollToGames = scrollToGames;
window.chooseGame = chooseGame;
window.startGame = startGame;
window.nextQuestion = nextQuestion;
window.redeemReward = redeemReward;


/* =========================================================
   END OF app.js
   ========================================================= */
