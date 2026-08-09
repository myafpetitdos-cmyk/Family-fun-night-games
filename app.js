/* =========================================================
   FAMILY FUN GAMES
   apps.js
   ========================================================= */
/* =========================================================
   PLAYER DATA
   ========================================================= */
let points = Number(localStorage.getItem("ffg_points")) || 0;
let streak = Number(localStorage.getItem("ffg_streak")) || 0;
let wins = Number(localStorage.getItem("ffg_wins")) || 0;
let correctAnswers = Number(localStorage.getItem("ffg_correct")) || 0;
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
    description: "Tricky questions that make you stop, think and look twice.",
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
    description: "Science, animals, history, geography, sports and surprising facts.",
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
    description: "Crack secret messages, patterns, symbols and hidden words.",
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
    description: "Look at the clues differently and discover the hidden phrase.",
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
        a: ["Just between you and me", "You and me", "Me first", "Just you"],
        c: 0
      },
      {
        q: "What phrase could 'JOBINJOB' represent?",
        a: ["In between jobs", "Job interview", "Job hunt", "Working hard"],
        c: 0
      },
      {
        q: "What phrase could '0 M.D.' represent?",
        a: ["No middle ground", "Doctor zero", "Zero doctor", "No medicine"],
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
        a: ["Broken in two", "Break a leg", "Half broken", "Broken heart"],
        c: 0
      }
    ]
  },
  number: {
    title: "Number Ninja",
    description: "Patterns, math tricks and number challenges designed to fool you.",
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
    description: "Unscramble words and beat the challenge.",
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
      {
        q: "Unscramble: RDOOG",
        a: ["DOOR", "GOOD", "DOG", "GORDO"],
        c: 1
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
    description: "Follow the clues and solve the case.",
    type: "MYSTERY CASE",
    questions: [
      {
        q: "A cookie disappeared from the kitchen. The crumbs lead to the couch. Who is the most likely suspect?",
        a: ["The person sitting on the couch", "The mail carrier", "The neighbor", "The teacher"],
        c: 0
      },
      {
        q: "A door was locked from the inside, but a window was open. What should you investigate first?",
        a: ["The window", "The refrigerator", "The mailbox", "The driveway"],
        c: 0
      },
      {
        q: "You find wet footprints leading from the pool to the kitchen. What do they tell you?",
        a: ["Someone came inside from the pool", "Someone left the house", "It rained inside", "The kitchen leaked"],
        c: 0
      },
      {
        q: "A clock stopped at exactly 8:00. What is that clue?",
        a: ["It may show when something happened", "It proves the clock is new", "It proves nobody was there", "It means it is morning"],
        c: 0
      },
      {
        q: "A missing toy is found underneath a bed. What clue is most useful?",
        a: ["Who had access to the room", "What color the toy is", "How old the bed is", "What day it is"],
        c: 0
      },
      {
        q: "Three people were home. One has muddy shoes and the missing item was found outside. What clue connects them?",
        a: ["The muddy shoes", "Their favorite color", "Their lunch", "Their phone"],
        c: 0
      },
      {
        q: "A note says 'LOOK UNDER THE TABLE.' What should you do?",
        a: ["Check under the table", "Throw the note away", "Look at the ceiling", "Leave the room"],
        c: 0
      },
      {
        q: "A glass is broken beside a baseball. What is the strongest clue?",
        a: ["The baseball may have caused the break", "The glass was expensive", "The room is large", "The ball is round"],
        c: 0
      },
      {
        q: "A suspect says they were outside, but their shoes are completely dry during a rainstorm. What should you consider?",
        a: ["Their story may need checking", "They definitely did nothing", "The rain was fake", "Their shoes are broken"],
        c: 0
      },
      {
        q: "The best mystery solver should rely on:",
        a: ["Evidence and clues", "Random guesses", "Luck only", "The loudest person"],
        c: 0
      }
    ]
  },
  quick: {
    title: "Quick Fire",
    description: "Fast questions. Fast decisions. Keep your streak alive.",
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
const pointsElement = document.getElementById("points");
const streakElement = document.getElementById("streak");
const winsElement = document.getElementById("wins");
const levelElement = document.getElementById("level");
const gamesSection = document.getElementById("games");
const difficultySection = document.getElementById("difficulty");
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
  localStorage.setItem("ffg_points", points);
  localStorage.setItem("ffg_streak", streak);
  localStorage.setItem("ffg_wins", wins);
  localStorage.setItem("ffg_correct", correctAnswers);
}
/* =========================================================
   UPDATE PLAYER DISPLAY
   ========================================================= */
function updatePlayerDisplay() {
  pointsElement.textContent = points;
  streakElement.textContent = streak;
  winsElement.textContent = wins;
  const level = Math.floor(points / 100) + 1;
  levelElement.textContent = level;
  updateAchievements();
  savePlayerData();
}
/* =========================================================
   SCROLL TO GAMES
   ========================================================= */
function scrollToGames() {
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
    return;
  }
  selectedGame = gameName;
  const game = games[gameName];
  selectedGameTitle.textContent = game.title;
  selectedGameDescription.textContent =
    game.description;
  difficultySection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
/* =========================================================
   START GAME
   ========================================================= */
function startGame(difficulty) {
  if (!selectedGame) {
    selectedGameTitle.textContent =
      "Choose a game first.";
    selectedGameDescription.textContent =
      "Select a game above before choosing a difficulty.";
    difficultySection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    return;
  }
  selectedDifficulty = difficulty;
  const game = games[selectedGame];
  currentQuestions = [...game.questions];
  currentQuestionIndex = 0;
  currentScore = 0;
  answered = false;
  activeGameTitle.textContent =
    game.title;
  gameDifficulty.textContent =
    difficulty.toUpperCase();
  questionType.textContent =
    game.type;
  questionTotal.textContent =
    currentQuestions.length;
  gameScreen.classList.add("active");
  gameScreen.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
  nextButton.onclick = nextQuestion;
  loadQuestion();
}
/* =========================================================
   LOAD QUESTION
   ========================================================= */
function loadQuestion() {
  const current =
    currentQuestions[currentQuestionIndex];
  answered = false;
  questionNumber.textContent =
    currentQuestionIndex + 1;
  questionText.textContent =
    current.q;
  gameMessage.textContent = "";
  nextButton.style.display = "none";
  nextButton.textContent =
    "NEXT CHALLENGE →";
  answerArea.innerHTML = "";
  current.a.forEach((answer, index) => {
    const button =
      document.createElement("button");
    button.className =
      "answer-button";
    button.type =
      "button";
    button.textContent =
      answer;
    button.addEventListener(
      "click",
      function () {
        checkAnswer(index, button);
      }
    );
    answerArea.appendChild(button);
  });
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
  answered = true;
  const current =
    currentQuestions[currentQuestionIndex];
  const answerButtons =
    answerArea.querySelectorAll(
      ".answer-button"
    );
  answerButtons.forEach(button => {
    button.disabled = true;
  });
  if (selectedIndex === current.c) {
    selectedButton.classList.add(
      "correct"
    );
    streak++;
    correctAnswers++;
    const pointsEarned =
      getPointsForDifficulty();
    points += pointsEarned;
    currentScore += pointsEarned;
    gameMessage.textContent =
      "CORRECT! +" +
      pointsEarned +
      " POINTS 🎉";
  } else {
    selectedButton.classList.add(
      "wrong"
    );
    answerButtons[current.c].classList.add(
      "correct"
    );
    streak = 0;
    gameMessage.textContent =
      "Not quite. The correct answer is: " +
      current.a[current.c];
  }
  updatePlayerDisplay();
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
/* =========================================================
   POINTS BY DIFFICULTY
   ========================================================= */
function getPointsForDifficulty() {
  if (selectedDifficulty === "expert") {
    return 30;
  }
  if (selectedDifficulty === "intermediate") {
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
  questionText.textContent =
    "Challenge Complete!";
  questionType.textContent =
    "GAME FINISHED";
  answerArea.innerHTML = "";
  gameMessage.textContent =
    "You earned " +
    currentScore +
    " points this round!";
  questionNumber.textContent =
    currentQuestions.length;
  nextButton.textContent =
    "PLAY AGAIN →";
  nextButton.style.display =
    "block";
  nextButton.onclick = function () {
    startGame(selectedDifficulty);
  };
}
/* =========================================================
   ACHIEVEMENTS
   ========================================================= */
function updateAchievements() {
  const badgeFirst =
    document.getElementById("badgeFirst");
  const badgeFive =
    document.getElementById("badgeFive");
  const badgeStreak =
    document.getElementById("badgeStreak");
  const badge250 =
    document.getElementById("badge250");
  const badge500 =
    document.getElementById("badge500");
  if (correctAnswers >= 1) {
    badgeFirst.classList.remove(
      "locked"
    );
  }
  if (correctAnswers >= 5) {
    badgeFive.classList.remove(
      "locked"
    );
  }
  if (streak >= 5) {
    badgeStreak.classList.remove(
      "locked"
    );
  }
  if (points >= 250) {
    badge250.classList.remove(
      "locked"
    );
  }
  if (points >= 500) {
    badge500.classList.remove(
      "locked"
    );
  }
}
/* =========================================================
   REDEEM REWARD
   ========================================================= */
function redeemReward(cost, title) {
  cost = Number(cost);
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
   INITIALIZE
   ========================================================= */
updatePlayerDisplay();
/* =========================================
   FAMILY FUN ARCADE ENGINE
   ========================================= */

const ARCADE_GAMES = {
  double:{
    points:100,
    title:"SUPERSTAR",
    game:"DOUBLE DOWN"
  },

  tropical:{
    points:250,
    title:"CHAMPION",
    game:"TROPICAL POP"
  },

  vault:{
    points:500,
    title:"BRAIN ROYALTY",
    game:"MYSTERY VAULT"
  },

  speed:{
    points:750,
    title:"ELITE",
    game:"SPEED FRENZY"
  },

  legend:{
    points:1000,
    title:"LEGEND",
    game:"THE ULTIMATE"
  }
};

const ARCADE_CHALLENGES = {

double:[
{
q:"Which word doesn't belong?",
a:["SHARK","DOLPHIN","WHALE","PENGUIN"],
c:3
},
{
q:"You have 10 seconds. Which symbol appeared twice?",
a:["⭐ 🌙 ⭐ 🔥","⭐ 🌙 🔥 🍀","🌙 🔥 🍀 🦋","🍀 🦋 🌙 🔥"],
c:0
},
{
q:"What comes next?",
a:["AZ","BY","CX","DW"],
c:0
},
{
q:"Which one is the odd one out?",
a:["Circle","Triangle","Square","Blue"],
c:3
},
{
q:"A detective says: 'The thief was not wearing red.' Which clue is strongest?",
a:["A red jacket was found","A blue hat was found","A red shoe was found","A green scarf was found"],
c:1
},
{
q:"Which word can follow all three?",
a:["HOUSE","LIGHT","FALL","STAR"],
c:3
},
{
q:"Which is hiding the pattern?",
a:["ABABAB","ABCABC","AABBCC","ABCCBA"],
c:2
},
{
q:"Which choice completes the relationship?",
a:["Bird : Nest","Bee : Hive","Lion : ?","Fish : Water"],
c:2
}
],

tropical:[
{
q:"🌴 🌺 🥭 🌴 🌺 ?",
a:["🥭","🌴","🐚","🍍"],
c:0
},
{
q:"You see this board for 3 seconds: 🍍 🐚 🌺 🥭 🦜. Which disappeared?",
a:["🍍","🐚","🌺","🦜"],
c:1
},
{
q:"Which symbol is the impostor?",
a:["🥭","🍍","🍉","🐙"],
c:3
},
{
q:"🍉 → 2, 🥭 → 4, 🍍 → 6. What is 🥥?",
a:["5","7","8","10"],
c:2
},
{
q:"Which row matches the first row exactly?",
a:[
"🌺 🐚 🍍 🦜",
"🌺 🐚 🍍 🦜",
"🌺 🐚 🥭 🦜",
"🌺 🍍 🐚 🦜"
],
c:1
},
{
q:"Which item moved?",
a:["🌴","🐚","🦜","🥭"],
c:2
}
],

vault:[
{
q:"CASE FILE: One suspect always lies. Alex says Ben did it. Ben says Cara did it. Cara says Ben is lying. Who is most suspicious?",
a:["Alex","Ben","Cara","Not enough evidence"],
c:3
},
{
q:"A vault has a 3-digit code. The first digit is 2 more than the second. The third is twice the second. Which works?",
a:["426","315","214","531"],
c:0
},
{
q:"Three doors: GOLD, SILVER, BLACK. Only one is safe. GOLD says 'BLACK is safe.' BLACK says 'GOLD is lying.' SILVER says 'I am not safe.' Exactly one statement is true. Which door?",
a:["GOLD","SILVER","BLACK","Impossible"],
c:1
},
{
q:"The stolen diamond was NOT in the kitchen. It was NOT with Maya. It was either in the vault or office. Leo was in the office. Where should you investigate?",
a:["Kitchen","Maya's room","Vault","Outside"],
c:2
}
],

speed:[
{
q:"FAST! Which number is missing?",
a:["17","18","19","20"],
c:2
},
{
q:"FAST! Which word is backwards?",
a:["TAC","GOD","EMOH","KOOB"],
c:2
},
{
q:"FAST! Which doesn't belong?",
a:["👁️","👂","👃","🖐️"],
c:3
},
{
q:"FAST! Complete: 1, 3, 6, 10, ?",
a:["12","13","14","15"],
c:3
},
{
q:"FAST! Which pair matches?",
a:["AB / BA","CD / DC","EF / FE","GH / GI"],
c:0
},
{
q:"FAST! What comes first alphabetically?",
a:["SHARK","SHELL","SHIP","SHOE"],
c:1
},
{
q:"FAST! Which is different?",
a:["121","144","169","180"],
c:3
},
{
q:"FAST! Which one is impossible?",
a:["Square circle","Red apple","Blue ocean","Green leaf"],
c:0
}
],

legend:[
{
q:"FINAL ROUND: Four people entered four rooms. Maya was not in Room 1. Leo was not in Room 4. Ava was in Room 2. Who can be Room 4?",
a:["Maya","Leo","Ava","Cannot know"],
c:0
},
{
q:"FINAL ROUND: Remember these: 🦊 🔑 🌙 🍎. Which was second?",
a:["🦊","🔑","🌙","🍎"],
c:1
},
{
q:"FINAL ROUND: What phrase is represented? TIME / TIME / TIME",
a:["Time after time","Three times","Time out","Long time"],
c:0
},
{
q:"FINAL ROUND: If every blue card is hidden and this card is blue, what can you conclude?",
a:["It is visible","It is hidden","It is red","Nothing"],
c:1
},
{
q:"FINAL ROUND: The final code is the number of letters in STAR + the number of letters in MOON.",
a:["6","7","8","9"],
c:2
}
]

};

let arcadeState={
  current:null,
  index:0,
  score:0,
  streak:0,
  timer:null,
  time:30
};

function getMainPoints(){

  /*
   This supports several common variable names.
   If your existing game already has a points variable,
   the first matching one is used.
  */

  if(typeof window.points==="number") return window.points;
  if(typeof window.score==="number") return window.score;

  const el=document.querySelector(
    "#points,#score,.points,.score,[data-points]"
  );

  if(el){
    const n=parseInt(el.textContent.replace(/\D/g,""),10);
    if(!isNaN(n)) return n;
  }

  return Number(localStorage.getItem("familyFunPoints")||0);
}

function setArcadeProgress(){

  const points=getMainPoints();

  localStorage.setItem(
    "familyFunPoints",
    String(points)
  );

  let next=100;

  for(const game of Object.values(ARCADE_GAMES)){
    if(points<game.points){
      next=game.points;
      break;
    }
  }

  const pct=Math.min(100,(points/next)*100);

  const p=document.getElementById("arcadePoints");
  const bar=document.getElementById("arcadeProgress");

  if(p){
    p.textContent=points+" / "+next;
  }

  if(bar){
    bar.style.width=pct+"%";
  }

  updateArcadeCards(points);

  checkNewUnlock(points);
}

function updateArcadeCards(points){

  Object.entries(ARCADE_GAMES).forEach(([id,data])=>{

    const card=document.getElementById(
      "arcade-"+id
    );

    const lock=document.getElementById(
      "lock-"+id
    );

    if(!card || !lock)return;

    const button=card.querySelector(
      ".arcade-play"
    );

    if(points>=data.points){

      card.classList.remove("locked");

      lock.textContent=
        "🔓 UNLOCKED • "+data.title;

      if(button){
        button.disabled=false;
      }

    }else{

      card.classList.add("locked");

      lock.textContent=
        "🔒 "+data.points+" POINTS";

      if(button){
        button.disabled=true;
      }
    }

  });
}

function checkNewUnlock(points){

  const old=Number(
    localStorage.getItem("familyFunLastPoints")||0
  );

  Object.entries(ARCADE_GAMES).forEach(([id,data])=>{

    const key="arcadeUnlocked_"+id;

    if(
      points>=data.points &&
      !localStorage.getItem(key)
    ){

      localStorage.setItem(key,"1");

      if(old<data.points){

        showUnlock(
          data.title,
          data.game,
          id
        );

      }

    }

  });

  localStorage.setItem(
    "familyFunLastPoints",
    String(points)
  );
}

function showUnlock(title,game,id){

  document.getElementById(
    "unlockTitle"
  ).textContent=title;

  document.getElementById(
    "unlockGame"
  ).textContent=
    "🎮 "+game+" is now unlocked!";

  document.getElementById(
    "arcadeUnlock"
  ).dataset.game=id;

  document.getElementById(
    "arcadeUnlock"
  ).classList.add("show");

  confetti();
}

function closeUnlock(){

  document.getElementById(
    "arcadeUnlock"
  ).classList.remove("show");
}

function playUnlockedGame(){

  const id=document.getElementById(
    "arcadeUnlock"
  ).dataset.game;

  closeUnlock();

  startArcadeGame(id);
}

function startArcadeGame(id){

  const points=getMainPoints();

  if(
    !ARCADE_GAMES[id] ||
    points<ARCADE_GAMES[id].points
  ){

    alert(
      "Keep playing to unlock this game!"
    );

    return;
  }

  arcadeState={
    current:id,
    index:0,
    score:0,
    streak:0,
    timer:null,
    time:30
  };

  renderArcadeChallenge();
}

function renderArcadeChallenge(){

  clearInterval(
    arcadeState.timer
  );

  const game=
    ARCADE_CHALLENGES[
      arcadeState.current
    ];

  const challenge=
    game[
      arcadeState.index % game.length
    ];

  const box=
    document.getElementById(
      "arcadeGame"
    );

  if(!box)return;

  box.innerHTML=`

    <div class="arcade-game-header">

      <strong>
        ${ARCADE_GAMES[
          arcadeState.current
        ].game}
      </strong>

      <div>
        🔥 Streak:
        ${arcadeState.streak}
      </div>

      <div class="arcade-timer"
           id="arcadeTimer">
        ${arcadeState.current==="vault"
          ?"∞"
          :"30"}
      </div>

    </div>

    <div class="arcade-question">
      ${challenge.q}
    </div>

    <div class="arcade-options">

      ${challenge.a.map(
        (answer,i)=>`

        <button
          class="arcade-option"
          onclick="arcadeAnswer(${i},this)"
        >
          ${answer}
        </button>

      `
      ).join("")}

    </div>

    <div
      id="arcadeFeedback"
      style="
        margin-top:18px;
        font-weight:900;
        min-height:30px;
      "
    ></div>
  `;

  if(
    arcadeState.current!=="vault"
  ){

    arcadeState.time=30;

    arcadeState.timer=setInterval(()=>{

      arcadeState.time--;

      const timer=
        document.getElementById(
          "arcadeTimer"
        );

      if(timer){
        timer.textContent=
          arcadeState.time;
      }

      if(
        arcadeState.time<=0
      ){

        clearInterval(
          arcadeState.timer
        );

        arcadeAnswer(
          -1,
          null
        );

      }

    },1000);

  }

}

function arcadeAnswer(index,button){

  clearInterval(
    arcadeState.timer
  );

  const game=
    ARCADE_CHALLENGES[
      arcadeState.current
    ];

  const challenge=
    game[
      arcadeState.index % game.length
    ];

  const buttons=
    document.querySelectorAll(
      ".arcade-option"
    );

  buttons.forEach(
    b=>b.disabled=true
  );

  const correct=
    index===challenge.c;

  if(button){

    button.classList.add(
      correct
        ?"correct"
        :"wrong"
    );

  }

  if(!correct){

    if(buttons[challenge.c]){
      buttons[
        challenge.c
      ].classList.add("correct");
    }

    arcadeState.streak=0;

  }else{

    arcadeState.streak++;

    let multiplier=1;

    if(
      arcadeState.current==="double"
    ){
      multiplier=2;
    }

    if(
      arcadeState.streak>=3
    ){
      multiplier+=1;
    }

    const earned=
      10*multiplier;

    arcadeState.score+=earned;

  }

  const feedback=
    document.getElementById(
      "arcadeFeedback"
    );

  if(feedback){

    feedback.innerHTML=correct
      ?`🔥 CORRECT! +${
        arcadeState.current==="double"
          ?20
          :10
      } POINTS`
      :"❌ Not this time.";

  }

  setTimeout(()=>{

    arcadeState.index++;

    const gameLength=
      ARCADE_CHALLENGES[
        arcadeState.current
      ].length;

    if(
      arcadeState.index>=gameLength
    ){

      finishArcadeGame();

    }else{

      renderArcadeChallenge();

    }

  },850);

}

function finishArcadeGame(){

  const box=
    document.getElementById(
      "arcadeGame"
    );

  const bonus=
    arcadeState.streak>=3
      ?50
      :0;

  const finalScore=
    arcadeState.score+
    bonus;

  box.innerHTML=`

    <div class="arcade-result">

      <div class="big">
        ${
          finalScore>=100
            ?"🏆"
            :"🎮"
        }
      </div>

      <h2>
        ${
          finalScore>=100
            ?"ABSOLUTE FIRE!"
            :"NICE RUN!"
        }
      </h2>

      <p>
        You scored
        <strong>
          ${finalScore}
        </strong>
        arcade points.
      </p>

      ${
        bonus
          ?"<p>🔥 STREAK BONUS +50</p>"
          :""
      }

      <button
        class="arcade-play"
        onclick="startArcadeGame(
          '${arcadeState.current}'
        )"
      >
        PLAY AGAIN →
      </button>

    </div>

  `;

}

function confetti(){

  for(
    let i=0;
    i<70;
    i++
  ){

    const piece=
      document.createElement(
        "div"
      );

    piece.className=
      "confetti";

    piece.style.left=
      Math.random()*100+
      "%";

    piece.style.top=
      "-30px";

    piece.style.background=
      [
        "#ff3f81",
        "#ff8a00",
        "#ffd43b",
        "#16c7a1",
        "#653cff"
      ][
        Math.floor(
          Math.random()*5
        )
      ];

    piece.style.animationDelay=
      Math.random()*0.7+
      "s";

    document.body.appendChild(
      piece
    );

    setTimeout(
      ()=>piece.remove(),
      3500
    );

  }

}

/*
   Keep the arcade synced with the main game.
*/

setInterval(
  setArcadeProgress,
  1500
);

setArcadeProgress();
