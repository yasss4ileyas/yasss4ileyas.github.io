(function() {
  const doc   = document.getElementById("desktop");
        app   = document.getElementById("searchApp"),
        fade  = document.getElementById("fade"),
        play  = document.getElementById("play"),
        wins  = document.getElementById("wins"),
        msg   = document.getElementById("msg"),
        timer = document.getElementById("timer"),
        hsCon = document.getElementById("highscoreContainer"),
        hs    = document.getElementById("highscore"),
        prize = document.getElementById("prize"),
        img   = new Image(60 + (Math.random() * 50));

  // set attr of the head picture to find.
  img.src = "assets/headsmall.png";
  img.id  = "head";
  app.appendChild(img);

  var done = false,
      secs = 0,
      highscore = Infinity
      first = true;

  const messages = [
    "Yasss you found Ileyas!",
    "Awesome skills! You found me so fast!",
    "Yasss! Yasss! Yasss! You're awesome. Now go vote Ileyas!",
    "You must be a Pro!",
    "Wow check you. You must be smart."
  ];

  const content = [
    {title: "The Mannifesto",     link: "https://classic.luu.org.uk/leadluu/manifesto/10988/"},
    {title: "The Campaign Video", link: "https://youtu.be/ZwSrRyN-fBc"},
    {title: "++Study Skills",     link: "http://turnitin.com/en_us/resources/blog/2667-memes-how-do-you-cite-them"},
    {title: "The debate",         link: "https://youtu.be/rOWT64Ht6R0?t=6h25m37s"},
    {title: "The Vote",           link: "https://classic.luu.org.uk/leadluu/Overview/"},
  ];

  const tweetUrl = "https://twitter.com/intent/tweet?text=";
  const site     = "https://yasss4ileyas.github.io/";

  function rando(arr) { return arr[~~(Math.random() * arr.length)]; }

  function startTimer() {
    secs = 0;
    done = false;
    timer.textContent = secs + " Secs";
    setTimeout(function tick() {
      secs += 0.05;
      timer.textContent = secs.toFixed(2) + " Secs";
      if (!done) {
        setTimeout(tick, 50);
      }
    }, 250);
  }

  function stopTimer() {
    done = true;
    timer.textContent = 0 + " Secs";
  }

  function setChallenge() {
    // make so we can click play again.
    play.style.pointerEvents = "none";
    prize.style.pointerEvents = "none";
    // little background noise...
    doc.style.backgroundPositionX = (Math.random() * -500) + "px";
    doc.style.backgroundPositionY = (Math.random() * -500) + "px";

    // little bit of positioning entropy...
    img.style.top = 96 + (Math.random() * (window.innerHeight - 196 - img.height)) + "px";
    img.style.left = (Math.random() * window.innerWidth - (img.width / 2)) + "px"
    img.style.transform = "rotate(" + (-30 + Math.random() * 60) + ")";
  }

  function updateHighScore() {
    highscore = (secs < highscore) ? secs.toFixed(2) : highscore;
    hs.textContent = highscore;
    hsCon.href = tweetUrl + encodeURIComponent(
      ("Ah yeah! I just found Ileyas in "
        + highscore + " secs."
        + " see if you can find him too @ "
        + site + " #Yasss4ILEYAS #LeadLUU"));
  }

  // ##### event listeners.

  // img event listener finishes the game.
  img.addEventListener("click", function() {
    if (first) {
      first = false;
      document.getElementById("infos").remove();
      wins.style.display = "block";
      hsCon.style.display = "block";
      play.textContent = "Play Again";
    }
    stopTimer();
    updateHighScore();

    // update unlocked prize.
    let p = rando(content);
    prize.href = p.link;
    prize.textContent = p.title;
    // update win message
    msg.textContent = rando(messages);
    // make play button clickable.
    play.style.pointerEvents = "auto";
    fade.style.pointerEvents = "auto";
    prize.style.pointerEvents = "auto";
    fade.style.display = "flex";
    fade.style.zIndex = 9;
    fade.style.opacity = 1;
  });

  // start button starts / restarts the game.
  play.addEventListener("click", function() {
    setChallenge();
    startTimer();
    // fadeout background.
    fade.style.opacity = 1;
    let inc = 0.001;
    (function fadeout() {
      fade.style.opacity -= inc;
      if (fade.style.opacity > 0) {
        inc *= 1.15;
        setTimeout(fadeout, 10);
      } else {
        fade.style.display = "none";
        fade.style.zIndex = -1;
      }
    })();
  });
})();
