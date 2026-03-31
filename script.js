let state = {
  affection: 0,
  chemistry: 0,
  respect: 0,
};

const textEl = document.getElementById("text");
const choicesEl = document.getElementById("choices");

function startGame() {
  state = { affection: 0, chemistry: 0, respect: 0 };
  showIntro();
}

function setScene(text, choices) {
  textEl.innerText = text;
  choicesEl.innerHTML = "";

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice.text;
    btn.onclick = () => {
      if (choice.effect) choice.effect();
      choice.next();
    };
    choicesEl.appendChild(btn);
  });
}

// INTRO
function showIntro() {
  setScene(
`You arrive at the zoo on a warm afternoon.

Near the enclosure, a man leans casually against the railing—sun-worn, relaxed, quietly confident.

"Seth," he says, offering a small smile. "You look like you don’t belong here. That’s not a bad thing."

The game has begun. Don’t mess it up.`,
    [
      {
        text: "“Maybe I belong exactly where I want to be.”",
        effect: () => { state.chemistry += 2; },
        next: scene1
      },
      {
        text: "“Just here for the animals, honestly.”",
        effect: () => { state.respect += 2; },
        next: scene1
      },
      {
        text: "“Depends. Are you part of the exhibit?”",
        effect: () => { state.affection += 1; state.chemistry += 1; },
        next: scene1
      }
    ]
  );
}

// SCENE 1
function scene1() {
  setScene(
`Seth huffs a quiet laugh.

"Careful," he says. "I bite."

He gestures toward the path. "Walk with me. I’ve got time."

You do. Obviously.`,
    [
      {
        text: "Walk close beside him",
        effect: () => { state.chemistry += 2; },
        next: scene2
      },
      {
        text: "Keep it casual",
        effect: () => { state.respect += 2; },
        next: scene2
      },
      {
        text: "Tease him again",
        effect: () => { state.affection += 2; },
        next: scene2
      }
    ]
  );
}

// SCENE 2
function scene2() {
  setScene(
`Later, you're both sitting with drinks.

"After this," Seth says, "I usually go hiking. Clears the noise."

He looks at you, measuring.

"You’d keep up?"`,
    [
      {
        text: "“I’d lead.”",
        effect: () => { state.chemistry += 2; },
        next: scene3
      },
      {
        text: "“I’d try.”",
        effect: () => { state.affection += 2; },
        next: scene3
      },
      {
        text: "“I’d bring beer.”",
        effect: () => { state.respect += 1; state.affection += 1; },
        next: scene3
      }
    ]
  );
}

// SCENE 3
function scene3() {
  setScene(
`The sun dips low. The air shifts.

Seth studies you for a moment—longer than before.

"You’re interesting," he says. "That can go a few different ways."

Yeah. No pressure.`,
    [
      {
        text: "Lean into the moment",
        effect: () => { state.chemistry += 2; },
        next: ending
      },
      {
        text: "Play it cool",
        effect: () => { state.respect += 2; },
        next: ending
      },
      {
        text: "Deflect with humor",
        effect: () => { state.affection += 2; },
        next: ending
      }
    ]
  );
}

// ENDINGS
function ending() {
  let result = "";

  if (state.chemistry >= 5) {
    result = "There’s a spark here. Dangerous, mutual, undeniable. Seth smirks. 'Yeah… this could be something.'";
  } else if (state.affection >= 5) {
    result = "Seth smiles warmly. 'You’re good company. I like that.' Not fireworks—but something real.";
  } else if (state.respect >= 5) {
    result = "He nods. 'You’ve got your head on straight. That’s rare.' You leave with quiet approval.";
  } else {
    result = "Seth finishes his drink. 'Well… that was something.' It was not something good.";
  }

  setScene(result, [
    {
      text: "Play Again",
      next: startGame
    }
  ]);
}

startGame();
