/* stepper.js — kontrol langkah bersama: Reset / Prev / Play-Pause / Next + kecepatan.
 * Dipakai oleh ketiga simulator. */
(function () {
  "use strict";
  const MLSim = (window.MLSim = window.MLSim || {});

  function makeStepper(opts) {
    // opts: { controlsEl, getSteps(), onStep(index, step, steps), onReset(), speedMs }
    const el = opts.controlsEl;
    let index = 0;
    let timer = null;
    let speed = opts.speedMs || 900;

    el.innerHTML =
      '<button class="btn" data-act="reset" title="Ulang dari awal">⏮ Reset</button>' +
      '<button class="btn" data-act="prev" title="Mundur satu langkah">◀ Prev</button>' +
      '<button class="btn btn-primary" data-act="play" title="Jalankan otomatis">▶ Play</button>' +
      '<button class="btn" data-act="next" title="Maju satu langkah">Next ▶</button>' +
      '<span class="step-indicator" data-role="indicator">–</span>' +
      '<label class="speed"><span>Kecepatan</span>' +
      '<input type="range" min="200" max="2000" step="100" value="' +
      (2200 - speed) +
      '" data-role="speed"/></label>';

    const btnPlay = el.querySelector('[data-act="play"]');
    const indicator = el.querySelector('[data-role="indicator"]');
    const speedInput = el.querySelector('[data-role="speed"]');

    function steps() {
      return opts.getSteps() || [];
    }
    function clamp(i) {
      const n = steps().length;
      if (n === 0) return 0;
      return Math.max(0, Math.min(i, n - 1));
    }
    function fire() {
      const s = steps();
      indicator.textContent = s.length ? "Langkah " + (index + 1) + " / " + s.length : "–";
      if (opts.onStep) opts.onStep(index, s[index], s);
    }
    function goto(i) {
      index = clamp(i);
      fire();
    }
    function next() {
      const n = steps().length;
      if (index >= n - 1) {
        stop();
        return false;
      }
      index = clamp(index + 1);
      fire();
      return true;
    }
    function prev() {
      stop();
      goto(index - 1);
    }
    function isPlaying() {
      return timer !== null;
    }
    function play() {
      if (isPlaying()) return;
      const n = steps().length;
      if (index >= n - 1) index = 0; // mulai ulang bila di akhir
      btnPlay.textContent = "⏸ Pause";
      btnPlay.classList.add("playing");
      fire();
      timer = setInterval(() => {
        if (!next()) stop();
      }, speed);
    }
    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
      btnPlay.textContent = "▶ Play";
      btnPlay.classList.remove("playing");
    }
    function toggle() {
      isPlaying() ? stop() : play();
    }
    function reset() {
      stop();
      if (opts.onReset) opts.onReset();
      index = 0;
      fire();
    }

    el.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      const act = b.getAttribute("data-act");
      if (act === "reset") reset();
      else if (act === "prev") prev();
      else if (act === "next") {
        stop();
        next();
      } else if (act === "play") toggle();
    });
    speedInput.addEventListener("input", () => {
      speed = 2200 - parseInt(speedInput.value, 10);
      if (isPlaying()) {
        stop();
        play();
      }
    });

    return {
      reset,
      goto,
      next,
      prev,
      play,
      stop,
      fire,
      get index() {
        return index;
      },
    };
  }

  MLSim.makeStepper = makeStepper;
})();
