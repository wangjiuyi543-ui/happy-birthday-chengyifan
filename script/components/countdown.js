(function () {
  window.Components = window.Components || {};

  window.Components.countdown = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-countdown";

      const numbers = [];
      const start = section.from || 3;
      for (let i = start; i >= 1; i--) numbers.push(i);

      div.innerHTML = `
        <div class="countdown-wrapper">
          ${numbers.map((n) => `<span class="countdown-num">${n}</span>`).join("")}
          <span class="countdown-go">${section.goText || "🎉"}</span>
        </div>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const nums = el.querySelectorAll(".countdown-num");
      const go = el.querySelector(".countdown-go");

      nums.forEach((num) => {
        tl.fromTo(num,
          { scale: 0.97, opacity: 0, y: 12 },
          { scale: 1, opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }
        )
        .to(num, { scale: 1.02, opacity: 0, y: -12, duration: 0.75, ease: "power2.inOut" }, "+=0.45");
      });

      tl.fromTo(go,
        { scale: 0.97, opacity: 0, y: 12 },
        { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
      )
      .to(go, { scale: 1.02, opacity: 0, y: -12, duration: 0.75, ease: "power2.inOut" }, "+=1.2");
    },
  };
})();
