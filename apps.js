/* =========================================================
   FAMILY FUN GAMES
   apps.js — COMPLETE REPLACEMENT
   ========================================================= */

"use strict";

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
      ["What has keys but cannot open locks?", ["A piano","A door","A map","A clock"], 0],
      ["What gets wetter the more it dries?", ["A towel","A sponge","A cloud","A river"], 0],
      ["What has a head and a tail but no body?", ["A coin","A snake","A shirt","A pencil"], 0],
      ["What can travel around the world while staying in one corner?", ["A stamp","A plane","A postcard","A compass"], 0],
      ["What has many teeth but cannot bite?", ["A comb","A shark","A zipper","A fork"], 0],
      ["What has one eye but cannot see?", ["A needle","A potato","A camera","A button"], 0],
      ["What belongs to you but other people use it more than you?", ["Your name","Your phone","Your shoes","Your house"], 0],
      ["What has hands but cannot clap?", ["A clock","A robot","A statue","A tree"], 0],
      ["What has a neck but no head?", ["A bottle","A shirt","A guitar","A chair"], 0],
      ["The more you take, the more you leave behind. What are they?", ["Footsteps","Pictures","Coins","Words"], 0]
    ]
  },

  trivia: {
    title: "Trivia Rush",
    description: "Science, animals, history, geography, sports and surprising facts.",
    type: "TRIVIA",

    questions: [
      ["What is the largest planet in our solar system?", ["Earth","Jupiter","Saturn","Neptune"], 1],
      ["How many continents are there?", ["5","6","7","8"], 2],
      ["Which ocean is the largest?", ["Atlantic","Indian","Pacific","Arctic"], 2],
      ["What is the fastest land animal?", ["Lion","Cheetah","Horse","Leopard"], 1],
      ["How many sides does a hexagon have?", ["5","6","7","8"], 1],
      ["Which animal is known as the largest mammal?", ["Elephant","Blue whale","Giraffe","Hippo"], 1],
      ["What gas do humans need to breathe?", ["Carbon dioxide","Oxygen","Helium","Hydrogen"], 1],
      ["How many days are in a leap year?", ["364","365","366","367"], 2],
      ["Which sport uses a racket and a shuttlecock?", ["Tennis","Badminton","Baseball","Golf"], 1],
      ["What is the capital of France?", ["Rome","Madrid","Paris","Berlin"], 2]
    ]
  },

  decode: {
    title: "Decode It",
    description: "Crack secret messages, patterns, symbols and hidden words.",
    type: "SECRET CODE",

    questions: [
      ["If CAT becomes DBU, what does DOG become?", ["EPH","EPG","DOH","FPH"], 0],
      ["If A = 1, B = 2 and C = 3, what number is D?", ["3","4","5","6"], 1],
      ["What comes next: 2, 4, 6, 8, ___?", ["9","10","11","12"], 1],
      ["What comes next: A, C, E, G, ___?", ["H","I","J","K"], 1],
      ["If 1 = A, 2 = B and 3 = C, what does 3-1 spell?", ["CA","AC","BC","AB"], 0],
      ["Which word is hidden inside 'STREET'?", ["TREE","STAR","TEAR","REST"], 0],
      ["What comes next: 5, 10, 15, 20, ___?", ["22","24","25","30"], 2],
      ["If every letter moves one place forward, A becomes:", ["B","C","Z","AA"], 0],
      ["What number replaces the question mark: 3, 6, 9, 12, ?", ["13","14","15","16"], 2],
      ["Which letter comes next: B, D, F, H, ___?", ["I","J","K","L"], 1]
    ]
  },

  rebus: {
    title: "Rebus Puzzles",
    description: "Look at the clues differently and discover the hidden phrase.",
    type: "REBUS PUZZLE",

    questions: [
      ["What phrase is represented by: CYCLE CYCLE CYCLE?", ["Tricycle","Bicycle","Three wheels","Cycle path"], 0],
      ["What phrase is represented by: MAN BOARD?", ["Man overboard","Board man","Man aboard","Board meeting"], 0],
      ["What phrase does HEAD HEELS suggest?", ["Head over heels","Heads up","Heel first","Two heads"], 0],
      ["What phrase does STAND written very far away suggest?", ["I understand","Long distance","Far away","Stand alone"], 0],
      ["What phrase could be represented by: YOU JUST ME?", ["Just between you and me","You and me","Me first","Just you"], 0],
      ["What phrase could 'JOBINJOB' represent?", ["In between jobs","Job interview","Job hunt","Working hard"], 0],
      ["What phrase could '0 M.D.' represent?", ["No middle ground","Doctor zero","Zero doctor","No medicine"], 0],
      ["What phrase could 'ECNALG' represent when read backward?", ["Glance","Change","Clean","Angle"], 0],
      ["What phrase could 'cycle cycle cycle' describe?", ["Tricycle","Bicycle","Motorcycle","Recycle"], 0],
      ["What phrase does the word 'BROKEN' written in half suggest?", ["Broken in two","Break a leg","Half broken","Broken heart"], 0]
    ]
  },

  number: {
    title: "Number Ninja",
    description: "Patterns, math tricks and number challenges designed to fool you.",
    type: "NUMBER CHALLENGE",

    questions: [
      ["What is 12 × 5?", ["50","55","60","65"], 2],
      ["What is 100 ÷ 4?", ["20","25","30","40"], 1],
      ["What is 15 + 27?", ["40","41","42","43"], 2],
      ["What is 81 ÷ 9?", ["7","8","9","10"], 2],
      ["What is 7 × 8?", ["48","54","56","64"], 2],
      ["What comes next: 2, 4, 8, 16, ___?", ["20","24","32","36"], 2],
      ["What is 45 - 17?", ["26","27","28","29"], 2],
      ["What is half of 90?", ["40","45","50","55"], 1],
      ["What is 9 × 9?", ["72","81","89","91"], 1],
      ["What comes next: 100, 90, 80, 70, ___?", ["50","55","60","65"], 2]
    ]
  },

  word: {
    title: "Word Scramble",
    description: "Unscramble words and beat the challenge.",
    type: "WORD SCRAMBLE",

    questions: [
      ["Unscramble: PAELP", ["APPLE","PEACH","PLACE","PAPER"], 0],
      ["Unscramble: NABANA", ["BANANA","BANDANA","CABANA","BANANAS"], 0],
      ["Unscramble: ROSEH", ["HORSE","HOUSE","SHORE","ROSES"], 0],
      ["Unscramble: RTAEW", ["WATER","EARTH","WEAR","GREAT"], 0],
      ["Unscramble: OCHOLS", ["SCHOOL","CHOOSE","CHOLOS","COOL"], 0],
      ["Unscramble: RDOOG", ["DOOR","GOOD","DOG","GORDO"], 1],
      ["Unscramble: RTEWA", ["WATER","WRITE","TOWER","WEAR"], 0],
      ["Unscramble: KBOO", ["BOOK","BOOM","COOK","LOOK"], 0],
      ["Unscramble: ESUOH", ["HOUSE","HORSE","SHOE","HOURS"], 0],
      ["Unscramble: RIACH", ["CHAIR","HAIR","RICH","CHIRP"], 0]
    ]
  },

  mystery: {
    title: "Mystery Case",
    description: "Follow the clues and solve the case.",
    type: "MYSTERY CASE",

    questions: [
      ["A cookie disappeared from the kitchen. The crumbs lead to the couch. Who is the most likely suspect?", ["The person sitting on the couch","The mail carrier","The neighbor","The teacher"], 0],
      ["A door was locked from the inside, but a window was open. What should you investigate first?", ["The window","The refrigerator","The mailbox","The driveway"], 0],
      ["You find wet footprints leading from the pool to the kitchen. What do they tell you?", ["Someone came inside from the pool","Someone left the house","It rained inside","The kitchen leaked"], 0],
      ["A clock stopped at exactly 8:00. What is that clue?", ["It may show when something happened","It proves the clock is new","It proves nobody was there","It means it is morning"], 0],
      ["A missing toy is found underneath a bed. What clue is most useful?", ["Who had access to the room","What color the toy is","How old the bed is","What day it is"], 0],
      ["Three people were home. One has muddy shoes and the missing item was found outside. What clue connects them?", ["The muddy shoes","Their favorite color","Their lunch","Their phone"], 0],
      ["A note says 'LOOK UNDER THE TABLE.' What should you do?", ["Check under the table","Throw the note away","Look at the ceiling","Leave the room"], 0],
      ["A glass is broken beside a baseball. What is the strongest clue?", ["The baseball may have caused the break","The glass was expensive","The room is large","The ball is round"], 0],
      ["A suspect says they were outside, but their shoes are completely dry during a rainstorm. What should you consider?", ["Their story may need checking","They definitely did nothing","The rain was fake","Their shoes are broken"], 0],
      ["The best mystery solver should rely on:", ["Evidence and clues","Random guesses","Luck only","The loudest person"], 0]
    ]
  },

  quick: {
    title: "Quick Fire",
    description: "Fast questions. Fast decisions. Keep your streak alive.",
    type: "QUICK FIRE",

    questions: [
      ["How many days are in a week?", ["5","6","7","8"], 2],
      ["What color do you get by mixing blue and yellow?", ["Green","Purple","Orange","Pink"], 0],
      ["How many legs does a spider have?", ["6","8","10","12"], 1],
      ["Which animal says 'moo'?", ["Dog","Cow","Horse","Sheep"], 1],
      ["What is 10 + 10?", ["15","18","20","25"], 2],
      ["Which month comes after June?", ["May","July","August","April"], 1],
      ["How many hours are in one day?", ["12","18","24","30"], 2],
      ["What shape has three sides?", ["Square","Circle","Triangle","Rectangle"], 2],
      ["Which direction does the sun rise?", ["North","South","East","West"], 2],
      ["How many fingers are on one hand?", ["4","5","6","10"], 1]
    ]
  }

};


/* =========================================================
   SAFE ELEMENT HELPER
   ========================================================= */

function el(id) {
  return document.getElementById(id);
}


/* =========================================================
   PLAYER DISPLAY
   ========================================================= */

function updatePlayerDisplay() {

  if (el("points")) {
    el("points").textContent = points;
  }

  if (el("streak")) {
    el("streak").textContent = streak;
  }

  if (el("wins")) {
    el("wins").textContent = wins;
  }

  if (el("level")) {
    el("level").textContent =
      Math.floor(points / 100) + 1;
  }

  updateAchievements();
  savePlayerData();
}


function savePlayerData() {

  localStorage.setItem("ffg_points", points);
  localStorage.setItem("ffg_streak", streak);
  localStorage.setItem("ffg_wins", wins);
  localStorage.setItem("ffg_correct", correctAnswers);

  /* Also keep Arcade-compatible storage */
  localStorage.setItem(
    "familyFunPoints",
    points
  );
}


/* =========================================================
   SCROLL
   ========================================================= */

function scrollToGames() {

  const section = el("games");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
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

  if (el("selectedGameTitle")) {
    el("selectedGameTitle").textContent =
      game.title;
  }

  if (el("selectedGameDescription")) {
    el("selectedGameDescription").textContent =
      game.description;
  }

  const difficulty = el("difficulty");

  if (difficulty) {
    difficulty.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


/* =========================================================
   START MAIN GAME
   ========================================================= */

function startGame(difficulty) {

  if (!selectedGame) {

    if (el("selectedGameTitle")) {
      el("selectedGameTitle").textContent =
        "Choose a game first.";
    }

    if (el("selectedGameDescription")) {
      el("selectedGameDescription").textContent =
        "Select a game above before choosing a difficulty.";
    }

    return;
  }

  selectedDifficulty = difficulty;

  const game = games[selectedGame];

  currentQuestions =
    game.questions.map(item => ({
      q: item[0],
      a: item[1],
      c: item[2]
    }));

  currentQuestionIndex = 0;
  currentScore = 0;
  answered = false;

  if (el("activeGameTitle")) {
    el("activeGameTitle").textContent =
      game.title;
  }

  if (el("gameDifficulty")) {
    el("gameDifficulty").textContent =
      difficulty.toUpperCase();
  }

  if (el("questionType")) {
    el("questionType").textContent =
      game.type;
  }

  if (el("questionTotal")) {
    el("questionTotal").textContent =
      currentQuestions.length;
  }

  const screen = el("gameScreen");

  if (screen) {

    screen.classList.add("active");

    screen.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  if (el("nextButton")) {
    el("nextButton").onclick =
      nextQuestion;
  }

  loadQuestion();
}


/* =========================================================
   LOAD QUESTION
   ========================================================= */

function loadQuestion() {

  const current =
    currentQuestions[currentQuestionIndex];

  if (!current) {
    return;
  }

  answered = false;

  if (el("questionNumber")) {
    el("questionNumber").textContent =
      currentQuestionIndex + 1;
  }

  if (el("questionText")) {
    el("questionText").textContent =
      current.q;
  }

  if (el("gameMessage")) {
    el("gameMessage").textContent = "";
  }

  if (el("nextButton")) {
    el("nextButton").style.display = "none";
    el("nextButton").textContent =
      "NEXT CHALLENGE →";
  }

  const area = el("answerArea");

  if (!area) {
    return;
  }

  area.innerHTML = "";

  current.a.forEach((answer, index) => {

    const button =
      document.createElement("button");

    button.className =
      "answer-button";

    button.type = "button";

    button.textContent =
      answer;

    button.addEventListener(
      "click",
      () => checkAnswer(index, button)
    );

    area.appendChild(button);
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

  if (!current) {
    return;
  }

  const area = el("answerArea");

  const buttons = area
    ? area.querySelectorAll(".answer-button")
    : [];

  buttons.forEach(button => {
    button.disabled = true;
  });

  if (selectedIndex === current.c) {

    if (selectedButton) {
      selectedButton.classList.add("correct");
    }

    streak++;
    correctAnswers++;

    const earned =
      getPointsForDifficulty();

    points += earned;
    currentScore += earned;

    if (el("gameMessage")) {
      el("gameMessage").textContent =
        "CORRECT! +" +
        earned +
        " POINTS 🎉";
    }

  } else {

    if (selectedButton) {
      selectedButton.classList.add("wrong");
    }

    if (buttons[current.c]) {
      buttons[current.c]
        .classList.add("correct");
    }

    streak = 0;

    if (el("gameMessage")) {
      el("gameMessage").textContent =
        "Not quite. The correct answer is: " +
        current.a[current.c];
    }
  }

  updatePlayerDisplay();

  if (el("nextButton")) {

    el("nextButton").style.display =
      "block";

    el("nextButton").textContent =
      currentQuestionIndex ===
      currentQuestions.length - 1
        ? "FINISH GAME →"
        : "NEXT CHALLENGE →";
  }
}


/* =========================================================
   DIFFICULTY POINTS
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

  updatePlayerDisplay();

  if (el("questionText")) {
    el("questionText").textContent =
      "Challenge Complete!";
  }

  if (el("questionType")) {
    el("questionType").textContent =
      "GAME FINISHED";
  }

  if (el("answerArea")) {
    el("answerArea").innerHTML = "";
  }

  if (el("gameMessage")) {
    el("gameMessage").textContent =
      "You earned " +
      currentScore +
      " points this round!";
  }

  if (el("questionNumber")) {
    el("questionNumber").textContent =
      currentQuestions.length;
  }

  if (el("nextButton")) {

    el("nextButton").textContent =
      "PLAY AGAIN →";

    el("nextButton").style.display =
      "block";

    el("nextButton").onclick =
      () => startGame(selectedDifficulty);
  }
}


/* =========================================================
   ACHIEVEMENTS
   ========================================================= */

function updateAchievements() {

  if (
    correctAnswers >= 1 &&
    el("badgeFirst")
  ) {
    el("badgeFirst")
      .classList.remove("locked");
  }

  if (
    correctAnswers >= 5 &&
    el("badgeFive")
  ) {
    el("badgeFive")
      .classList.remove("locked");
  }

  if (
    streak >= 5 &&
    el("badgeStreak")
  ) {
    el("badgeStreak")
      .classList.remove("locked");
  }

  if (
    points >= 250 &&
    el("badge250")
  ) {
    el("badge250")
      .classList.remove("locked");
  }

  if (
    points >= 500 &&
    el("badge500")
  ) {
    el("badge500")
      .classList.remove("locked");
  }
}


/* =========================================================
   REWARDS
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
    ["Which word doesn't belong?", ["SHARK","DOLPHIN","WHALE","PENGUIN"], 3],
    ["Which symbol appeared twice?", ["⭐ 🌙 ⭐ 🔥","⭐ 🌙 🔥 🍀","🌙 🔥 🍀 🦋","🍀 🦋 🌙 🔥"], 0],
    ["What comes next?", ["AZ","BY","CX","DW"], 0],
    ["Which one is the odd one out?", ["Circle","Triangle","Square","Blue"], 3],
    ["Which clue is strongest?", ["A red jacket was found","A blue hat was found","A red shoe was found","A green scarf was found"], 1],
    ["Which word can follow all three?", ["HOUSE","LIGHT","FALL","STAR"], 3],
    ["Which is hiding the pattern?", ["ABABAB","ABCABC","AABBCC","ABCCBA"], 2],
    ["Bird : Nest / Bee : Hive / Lion : ?", ["Water","Den","Tree","Cave"], 1]
  ],

  tropical: [
    ["🌴 🌺 🥭 🌴 🌺 ?", ["🥭","🌴","🐚","🍍"], 0],
    ["Which disappeared?", ["🍍","🐚","🌺","🦜"], 1],
    ["Which symbol is the impostor?", ["🥭","🍍","🍉","🐙"], 3],
    ["🍉 → 2, 🥭 → 4, 🍍 → 6. What is 🥥?", ["5","7","8","10"], 2],
    ["Which row matches exactly?", ["🌺 🐚 🍍 🦜","🌺 🐚 🍍 🦜","🌺 🐚 🥭 🦜","🌺 🍍 🐚 🦜"], 1],
    ["Which item moved?", ["🌴","🐚","🦜","🥭"], 2]
  ],

  vault: [
    ["One suspect always lies. Alex says Ben did it. Ben says Cara did it. Cara says Ben is lying. Who is most suspicious?", ["Alex","Ben","Cara","Not enough evidence"], 3],
    ["A vault has a 3-digit code. The first digit is 2 more than the second. The third is twice the second. Which works?", ["426","315","214","531"], 0],
    ["Exactly one statement is true. Which door is safe?", ["GOLD","SILVER","BLACK","Impossible"], 1],
    ["The stolen diamond was NOT in the kitchen. It was NOT with Maya. It was either in the vault or office. Leo was in the office. Where should you investigate?", ["Kitchen","Maya's room","Vault","Outside"], 2]
  ],

  speed: [
    ["FAST! Which number is missing?", ["17","18","19","20"], 2],
    ["FAST! Which word is backwards?", ["TAC","GOD","EMOH","KOOB"], 2],
    ["FAST! Which doesn't belong?", ["👁️","👂","👃","🖐️"], 3],
    ["FAST! Complete: 1, 3, 6, 10, ?", ["12","13","14","15"], 3],
    ["FAST! Which pair matches?", ["AB / BA","CD / DC","EF / FE","GH / GI"], 0],
    ["FAST! What comes first alphabetically?", ["SHARK","SHELL","SHIP","SHOE"], 1],
    ["FAST! Which is different?", ["121","144","169","180"], 3],
    ["FAST! Which one is impossible?", ["Square circle","Red apple","Blue ocean","Green leaf"], 0]
  ],

  legend: [
    ["FINAL ROUND: Maya was not in Room 1. Leo was not in Room 4. Ava was in Room 2. Who can be Room 4?", ["Maya","Leo","Ava","Cannot know"], 0],
    ["FINAL ROUND: Which was second? 🦊 🔑 🌙 🍎", ["🦊","🔑","🌙","🍎"], 1],
    ["FINAL ROUND: TIME / TIME / TIME", ["Time after time","Three times","Time out","Long time"], 0],
    ["FINAL ROUND: If every blue card is hidden and this card is blue, what can you conclude?", ["It is visible","It is hidden","It is red","Nothing"], 1],
    ["FINAL ROUND: STAR + MOON letters =", ["6","7","8","9"], 2]
  ]

};


/* =========================================================
   ARCADE STATE
   ========================================================= */

let arcadeState = {
  current: null,
  index: 0,
  score: 0,
  streak: 0,
  timer: null,
  time: 30
};


/* =========================================================
   GET POINTS
   ========================================================= */

function getMainPoints() {

  return Number(
    localStorage.getItem("ffg_points")
  ) || 0;
}


/* =========================================================
   ARCADE PROGRESS
   ========================================================= */

function setArcadeProgress() {

  const currentPoints =
    getMainPoints();

  localStorage.setItem(
    "familyFunPoints",
    currentPoints
  );

  let next = 100;

  for (
    const game of Object.values(ARCADE_GAMES)
  ) {

    if (
      currentPoints < game.points
    ) {

      next = game.points;
      break;
    }
  }

  const progress =
    Math.min(
      100,
      (currentPoints / next) * 100
    );

  if (el("arcadePoints")) {
    el("arcadePoints").textContent =
      currentPoints + " / " + next;
  }

  if (el("arcadeProgress")) {
    el("arcadeProgress").style.width =
      progress + "%";
  }

  updateArcadeCards(currentPoints);
}


/* =========================================================
   ARCADE CARDS
   ========================================================= */

function updateArcadeCards(points) {

  Object.entries(ARCADE_GAMES)
    .forEach(([id, data]) => {

      const card =
        el("arcade-" + id);

      const lock =
        el("lock-" + id);

      if (!card) {
        return;
      }

      const button =
        card.querySelector(".arcade-play");

      const unlocked =
        points >= data.points;

      if (unlocked) {

        card.classList.remove("locked");

        if (lock) {
          lock.textContent =
            "🔓 UNLOCKED • " +
            data.title;
        }

        if (button) {
          button.disabled = false;
        }

      } else {

        card.classList.add("locked");

        if (lock) {
          lock.textContent =
            "🔒 " +
            data.points +
            " POINTS";
        }

        if (button) {
          button.disabled = true;
        }
      }

    });
}


/* =========================================================
   START ARCADE GAME
   ========================================================= */

function startArcadeGame(id) {

  const points =
    getMainPoints();

  if (!ARCADE_GAMES[id]) {
    return;
  }

  if (
    points <
    ARCADE_GAMES[id].points
  ) {

    alert(
      "Keep playing to unlock this game!"
    );

    return;
  }

  arcadeState = {
    current: id,
    index: 0,
    score: 0,
    streak: 0,
    timer: null,
    time: 30
  };

  renderArcadeChallenge();

  const gameBox =
    el("arcadeGame");

  if (gameBox) {

    gameBox.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
}


/* =========================================================
   RENDER ARCADE
   ========================================================= */

function renderArcadeChallenge() {

  clearInterval(
    arcadeState.timer
  );

  const questions =
    ARCADE_CHALLENGES[
      arcadeState.current
    ];

  if (!questions) {
    return;
  }

  const challenge =
    questions[
      arcadeState.index %
      questions.length
    ];

  const box =
    el("arcadeGame");

  if (!box) {
    return;
  }

  box.innerHTML = `

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

      <div
        class="arcade-timer"
        id="arcadeTimer"
      >
        ${
          arcadeState.current === "vault"
            ? "∞"
            : "30"
        }
      </div>

    </div>

    <div class="arcade-question">
      ${challenge[0]}
    </div>

    <div class="arcade-options">

      ${challenge[1]
        .map(
          (answer, i) => `
            <button
              class="arcade-option"
              type="button"
              onclick="arcadeAnswer(${i}, this)"
            >
              ${answer}
            </button>
          `
        )
        .join("")}

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

  if (
    arcadeState.current !== "vault"
  ) {

    arcadeState.time = 30;

    arcadeState.timer =
      setInterval(() => {

        arcadeState.time--;

        const timer =
          el("arcadeTimer");

        if (timer) {
          timer.textContent =
            arcadeState.time;
        }

        if (
          arcadeState.time <= 0
        ) {

          clearInterval(
            arcadeState.timer
          );

          arcadeAnswer(
            -1,
            null
          );
        }

      }, 1000);
  }
}


/* =========================================================
   ARCADE ANSWER
   ========================================================= */

function arcadeAnswer(
  index,
  button
) {

  clearInterval(
    arcadeState.timer
  );

  const questions =
    ARCADE_CHALLENGES[
      arcadeState.current
    ];

  if (!questions) {
    return;
  }

  const challenge =
    questions[
      arcadeState.index %
      questions.length
    ];

  const buttons =
    document.querySelectorAll(
      ".arcade-option"
    );

  buttons.forEach(b => {
    b.disabled = true;
  });

  const correct =
    index === challenge[2];

  if (button) {

    button.classList.add(
      correct
        ? "correct"
        : "wrong"
    );
  }

  if (correct) {

    arcadeState.streak++;

    let multiplier = 1;

    if (
      arcadeState.current === "double"
    ) {
      multiplier = 2;
    }

    if (
      arcadeState.streak >= 3
    ) {
      multiplier++;
    }

    arcadeState.score +=
      10 * multiplier;

  } else {

    if (buttons[challenge[2]]) {
      buttons[
        challenge[2]
      ].classList.add("correct");
    }

    arcadeState.streak = 0;
  }

  const feedback =
    el("arcadeFeedback");

  if (feedback) {

    feedback.textContent =
      correct
        ? "🔥 CORRECT!"
        : "❌ Not this time.";
  }

  setTimeout(() => {

    arcadeState.index++;

    if (
      arcadeState.index >=
      questions.length
    ) {

      finishArcadeGame();

    } else {

      renderArcadeChallenge();
    }

  }, 850);
}


/* =========================================================
   FINISH ARCADE
   ========================================================= */

function finishArcadeGame() {

  const box =
    el("arcadeGame");

  if (!box) {
    return;
  }

  const bonus =
    arcadeState.streak >= 3
      ? 50
      : 0;

  const finalScore =
    arcadeState.score +
    bonus;

  box.innerHTML = `

    <div class="arcade-result">

      <div class="big">
        ${
          finalScore >= 100
            ? "🏆"
            : "🎮"
        }
      </div>

      <h2>
        ${
          finalScore >= 100
            ? "ABSOLUTE FIRE!"
            : "NICE RUN!"
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
          ? "<p>🔥 STREAK BONUS +50</p>"
          : ""
      }

      <button
        class="arcade-play"
        type="button"
        onclick="startArcadeGame('${arcadeState.current}')"
      >
        PLAY AGAIN →
      </button>

    </div>
  `;
}


/* =========================================================
   UNLOCK POPUP
   ========================================================= */

function closeUnlock() {

  const popup =
    el("arcadeUnlock");

  if (popup) {
    popup.classList.remove("show");
  }
}


function playUnlockedGame() {

  const popup =
    el("arcadeUnlock");

  if (!popup) {
    return;
  }

  const id =
    popup.dataset.game;

  closeUnlock();

  if (id) {
    startArcadeGame(id);
  }
}


/* =========================================================
   CONFETTI
   ========================================================= */

function confetti() {

  for (
    let i = 0;
    i < 50;
    i++
  ) {

    const piece =
      document.createElement("div");

    piece.className =
      "confetti";

    piece.style.left =
      Math.random() * 100 + "%";

    piece.style.top =
      "-30px";

    piece.style.background =
      [
        "#ff3f81",
        "#ff8a00",
        "#ffd43b",
        "#16c7a1",
        "#653cff"
      ][
        Math.floor(
          Math.random() * 5
        )
      ];

    piece.style.animationDelay =
      Math.random() * 0.7 + "s";

    document.body.appendChild(piece);

    setTimeout(
      () => piece.remove(),
      3500
    );
  }
}


/* =========================================================
   SAFE INITIALIZATION
   ========================================================= */

function initializeFamilyFunGames() {

  updatePlayerDisplay();

  setArcadeProgress();

  console.log(
    "Family Fun Games loaded successfully."
  );
}


/* =========================================================
   KEEP ARCADE UPDATED
   ========================================================= */

setInterval(
  setArcadeProgress,
  1500
);


/* =========================================================
   START
   ========================================================= */

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeFamilyFunGames
  );

} else {

  initializeFamilyFunGames();
}


/* =========================================================
   PWA
   ========================================================= */

if (
  "serviceWorker" in navigator
) {

  window.addEventListener(
    "load",
    () => {

      navigator.serviceWorker
        .register("./sw.js")
        .then(() => {

          console.log(
            "Family Fun Games PWA ready."
          );

        })
        .catch(error => {

          console.error(
            "PWA setup error:",
            error
          );

        });

    }
  );
}
