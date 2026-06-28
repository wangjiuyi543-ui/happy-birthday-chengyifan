(function () {
  window.Components = window.Components || {};

  window.Components.closing = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-closing";
      div.innerHTML = `
        <p class="closing-text">${
          section.text || "Okay, now come back and tell me if you liked it."
        }</p>
        <p class="replay-btn" id="replay">${
          section.replayText || "Or click, if you want to watch it again."
        }</p>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      tl.from(el.querySelectorAll("p"), {
        duration: 1, opacity: 0, y: 12, ease: "power2.out", stagger: 0.6,
      })
      .set(el.querySelector("#replay"), { pointerEvents: "auto" });
    },
  };
})();
