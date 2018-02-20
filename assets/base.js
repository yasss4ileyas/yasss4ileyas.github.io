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
        img   = new Image(80 + (Math.random() * 40));

  // set attr of the head picture to find.
  img.src = "assets/headsmaller.png";
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
  ];

  // href="https://twitter.com/intent/tweet?text=Hello%20world"

  const content = [
    {title: "The Mannifesto", link: "https://classic.luu.org.uk/leadluu/manifesto/10988/"},
    {title: "Campaign Video", link: "#coming-soon"},
    {title: "++Study Skills", link: "http://turnitin.com/en_us/resources/blog/2667-memes-how-do-you-cite-them"},
    {title: "++Study Skills", link: "http://turnitin.com/en_us/resources/blog/2667-memes-how-do-you-cite-them"},
  ];

  function rando(arr) { return arr[~~(Math.random() * arr.length)]; }

  function Response() {
    this.init = function() {
      wins.style.display = "block";
      hsCon.style.display = "block";
      play.textContent = "Play Again";
    }
    this.update = function() {
      stopTimer();
      // update highscore
      if (secs < highscore) {
        highscore = secs.toFixed(2);
      }
      hs.textContent = highscore;
      // update unlocked prize.
      let p = rando(content);
      prize.href = p.link;
      prize.textContent = p.title;
      // update win message
      msg.textContent = rando(messages);
      // make play button clickable.
      play.style.pointerEvents = "auto";
      fade.style.zIndex = 9;
      fade.style.opacity = 1;
    }
  }

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
    play.style.pointerEvents = 'none';
    // little background noise...
    doc.style.backgroundPositionX = (Math.random() * -500) + "px";
    doc.style.backgroundPositionY = (Math.random() * -500) + "px";

    // little bit of positioning entropy...
    img.style.height    = 200 + (Math.random() * 40);
    img.style.top       = 96 + (Math.random() * (window.innerHeight - 196 - img.height)) + "px";
    img.style.left      = (Math.random() * window.innerWidth - (img.width / 2)) + "px"
    img.style.transform = "rotate(" + (-30 + Math.random() * 60) + ")";
  }

  const res = new Response();

  // ##### event listeners.

  // add image and event listener
  img.addEventListener("click", function() {
    if (first) {
      res.init();
    }
    res.update();
  });

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
        fade.style.zIndex = -1;
      }
    })();
  });
})();