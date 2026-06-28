(function () {
  window.Components = window.Components || {};

  const ENTER = { opacity: 0, y: 12, scale: 0.985 };
  const LEAVE = { opacity: 0, y: -12, scale: 0.99 };

  window.Components.ideas = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-ideas";

      const lines = section.lines || [];
      lines.forEach((line, i) => {
        const isLast = i === lines.length - 1;
        const p = document.createElement("p");
        p.className = isLast ? "idea-line idea-special" : "idea-line";
        p.innerHTML = line;
        div.appendChild(p);
      });

      // Big letters (e.g. "SO")
      if (section.bigLetters) {
        const p = document.createElement("p");
        p.className = "idea-big-letters";
        p.innerHTML = section.bigLetters
          .split("")
          .map((ch) => `<span>${ch}</span>`)
          .join("");
        div.appendChild(p);
      }

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const regularLines = el.querySelectorAll(".idea-line:not(.idea-special)");
      const specialLine = el.querySelector(".idea-special");
      const bigLetters = el.querySelectorAll(".idea-big-letters span");

      regularLines.forEach((line) => {
        tl.fromTo(line, { ...ENTER }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power2.out" })
          .to(line, { duration: 0.8, ...LEAVE, ease: "power2.inOut" }, "+=2.4");
      });

      if (specialLine) {
        tl.fromTo(specialLine,
          { ...ENTER },
          { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: "power2.out" },
          "+=0.8"
        );

        tl.to(specialLine, {
          duration: 0.8, ...LEAVE, ease: "power2.inOut",
        }, "+=2");
      }

      if (bigLetters.length) {
        tl.fromTo(bigLetters,
          { scale: 0.98, opacity: 0, y: 12 },
          { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.12 }
        )
        .to(bigLetters, {
          duration: 0.8, scale: 0.99, opacity: 0, y: -12,
          ease: "power2.inOut", stagger: 0.12,
        }, "+=1.5");
      }
    },
  };
})();
