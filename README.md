# Family-fun-night-games
Where Every Brain Gets to Play!  Turn an ordinary night at home into a night of laughs, challenges, and friendly competition! 🎉  Welcome to Family Fun Night, your new destination for entertaining picture puzzles, brain games, word challenges, riddles, and thinking games for the whole family! 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Picture Word Puzzles</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #f8f9ff, #eef4ff);
      color: #17233c;
      min-height: 100vh;
    }

    header {
      text-align: center;
      padding: 40px 20px 25px;
    }

    header h1 {
      font-size: 42px;
      margin-bottom: 10px;
    }

    header p {
      font-size: 18px;
      color: #667085;
    }

    .game-container {
      width: 90%;
      max-width: 750px;
      margin: 20px auto 60px;
    }

    .score {
      background: white;
      border-radius: 15px;
      padding: 15px 20px;
      margin-bottom: 20px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      box-shadow: 0 5px 20px rgba(0,0,0,0.08);
    }

    .puzzle-card {
      background: white;
      border-radius: 25px;
      padding: 35px;
      text-align: center;
      box-shadow: 0 10px 35px rgba(0,0,0,0.1);
    }

    .puzzle-number {
      color: #6c5ce7;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 20px;
    }

    .clue {
      min-height: 250px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 70px;
      font-weight: bold;
      margin-bottom: 25px;
    }

    /* Special puzzle styles */

    .american-e {
      color: #fff;
      background:
        linear-gradient(
          to bottom,
          #b22234 0%,
          #b22234 14%,
          white 14%,
          white 28%,
          #b22234 28%,
          #b22234 42%,
          white 42%,
          white 56%,
          #b22234 56%,
          #b22234 70%,
          white 70%,
          white 84%,
          #b22234 84%
        );
      -webkit-background-clip: text;
      background-clip: text;
      border: 5px solid #1d3c88;
      padding: 15px 35px;
      border-radius: 15px;
    }

    .job-clue {
      font-size: 75px;
    }

    .magnifying {
      font-size: 65px;
    }

    .stand-clue {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-size: 55px;
    }

    .stand-clue .line {
      width: 250px;
      height: 5px;
      background: #17233c;
    }

    .look-clue {
      font-size: 70px;
    }

    .eyes {
      font-size: 80px;
    }

    .break-clue {
      display: flex;
      gap: 25px;
      font-size: 55px;
    }

    .down-clue {
      display: flex;
      flex-direction: column;
      line-height: 1;
      font-size: 55px;
    }

    .answer-area {
      margin-top: 20px;
    }

    input {
      width: 100%;
      max-width: 400px;
      padding: 15px;
      border: 2px solid #d0d5dd;
      border-radius: 12px;
      font-size: 18px;
      text-align: center;
      outline: none;
    }

    input:focus {
      border-color: #6c5ce7;
    }

    button {
      margin-top: 15px;
      padding: 14px 28px;
      border: none;
      border-radius: 12px;
      background: #6c5ce7;
      color: white;
      font-size: 17px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.2s;
    }

    button:hover {
      transform: translateY(-2px);
      background: #5847d6;
    }

    #feedback {
      min-height: 30px;
      margin-top: 15px;
      font-size: 18px;
      font-weight: bold;
    }

    .correct {
      color: #16803c;
    }

    .wrong {
      color: #d92d20;
    }

    .next-button {
      display: none;
      background: #111827;
    }

    .next-button:hover {
      background: #000;
    }

    footer {
      text-align: center;
      padding: 25px;
      color: #667085;
    }

    @media (max-width: 600px) {
      header h1 {
        font-size: 32px;
      }

      .puzzle-card {
        padding: 25px 15px;
      }

      .clue {
        min-height: 200px;
      }
    }
  </style>
</head>

<body>

  <header>
    <h1>🧩 Picture Word Puzzles</h1>
    <p>Look at the clue. Can you figure out the word or phrase?</p>
  </header>

  <main class="game-container">

    <div class="score">
      ⭐ Score: <span id="score">0</span>
    </div>

    <div class="puzzle-card">

      <div class="puzzle-number">
        Puzzle <span id="puzzleNumber">1</span>
      </div>

      <div class="clue" id="clue"></div>

      <div class="answer-area">

        <input
          type="text"
          id="answer"
          placeholder="Type your answer..."
          autocomplete="off"
        >

        <br>

        <button id="checkButton" onclick="checkAnswer()">
          Check Answer
        </button>

        <div id="feedback"></div>

        <button
          class="next-button"
          id="nextButton"
          onclick="nextPuzzle()">
          Next Puzzle →
        </button>

      </div>

    </div>

  </main>

  <footer>
    🧠 New puzzles coming soon!
  </footer>


  <script>

    const puzzles = [

      {
        clue: `
          <div class="american-e">E</div>
        `,
        answer: "army",
        hint: "Think about the American flag."
      },

      {
        clue: `
          <div class="job-clue">
            J 🔍 B
          </div>
        `,
        answer: "job search",
        hint: "What do you do when you're looking for a job?"
      },

      {
        clue: `
          <div class="stand-clue">
            <div>STAND</div>
            <div class="line"></div>
            <div>I</div>
          </div>
        `,
        answer: "i understand",
        hint: "Look at where the word 'I' is."
      },

      {
        clue: `
          ☕
        `,
        answer: "coffee",
        hint: "It's a drink."
      },

      {
        clue: `
          <div>
            COUNT<br>
            <span style="font-size:35px;">1 2 3 4 5</span>
          </div>
        `,
        answer: "count on me",
        hint: "Think about counting."
      },

      {
        clue: `
          <div style="font-size:50px;">
            “ MIND ”
          </div>
        `,
        answer: "mind your manners",
        hint: "The word MIND is being surrounded."
      },

      {
        clue: `
          <div style="
            border:8px solid #e63946;
            border-radius:50%;
            padding:30px;
          ">
            ❤️
          </div>
        `,
        answer: "heart to heart",
        hint: "Think about the heart."
      },

      {
        clue: `
          <div class="look-clue">
            L 👀 K
          </div>
        `,
        answer: "look",
        hint: "What are the eyes helping you do?"
      },

      {
        clue: `
          <div style="
            display:flex;
            flex-direction:column;
            font-size:55px;
          ">
            <span>YOU</span>
            <span>JUST</span>
          </div>
        `,
        answer: "you just",
        hint: "Read the words."
      },

      {
        clue: `
          <div class="break-clue">
            <span>BREAK</span>
            <span>I</span>
            <span>T</span>
          </div>
        `,
        answer: "break it",
        hint: "Look at the word BREAK and the letters I and T."
      },

      {
        clue: `
          <div class="down-clue">
            D<br>
            O<br>
            W<br>
            N
          </div>
        `,
        answer: "down",
        hint: "The word is going in one direction."
      },

      {
        clue: `
          🌈☁️
        `,
        answer: "somewhere over the rainbow",
        hint: "Think of a famous song."
      }

    ];


    let currentPuzzle = 0;
    let score = 0;


    function loadPuzzle() {

      const puzzle = puzzles[currentPuzzle];

      document.getElementById("clue").innerHTML =
        puzzle.clue;

      document.getElementById("puzzleNumber").textContent =
        currentPuzzle + 1;

      document.getElementById("answer").value = "";

      document.getElementById("feedback").textContent = "";

      document.getElementById("feedback").className = "";

      document.getElementById("nextButton").style.display =
        "none";

      document.getElementById("checkButton").style.display =
        "inline-block";

      document.getElementById("answer").focus();
    }


    function checkAnswer() {

      const userAnswer =
        document.getElementById("answer")
        .value
        .trim()
        .toLowerCase();

      const correctAnswer =
        puzzles[currentPuzzle].answer.toLowerCase();

      const feedback =
        document.getElementById("feedback");


      if (!userAnswer) {

        feedback.textContent =
          "Type an answer first!";

        feedback.className = "wrong";

        return;
      }


      if (userAnswer === correctAnswer) {

        feedback.textContent =
          "🎉 Correct! Great job!";

        feedback.className = "correct";

        score++;

        document.getElementById("score").textContent =
          score;

        document.getElementById("checkButton").style.display =
          "none";

        document.getElementById("nextButton").style.display =
          "inline-block";

      } else {

        feedback.textContent =
          "❌ Not quite! Try again.";

        feedback.className = "wrong";
      }

    }


    function nextPuzzle() {

      currentPuzzle++;

      if (currentPuzzle >= puzzles.length) {

        document.getElementById("clue").innerHTML = `
          <div>
            🎉<br>
            <span style="font-size:35px;">
              You finished all the puzzles!
            </span>
          </div>
        `;

        document.getElementById("answer-area");

        document.getElementById("answer").style.display =
          "none";

        document.getElementById("checkButton").style.display =
          "none";

        document.getElementById("nextButton").style.display =
          "none";

        document.getElementById("feedback").innerHTML =
          `Final Score: ${score} / ${puzzles.length}`;

        return;
      }

      loadPuzzle();
    }


    document.getElementById("answer")
      .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
          checkAnswer();
        }

      });


    loadPuzzle();

  </script>

</body>
</html>
