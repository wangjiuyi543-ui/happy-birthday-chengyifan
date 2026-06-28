(function () {
  window.Components = window.Components || {};

  window.Components.quote = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-quote";
      div.innerHTML = `
        <div class="quote-card">
          <span class="quote-mark">"</span>
          <p class="quote-text">${section.text || "Every year is a gift."}</p>
          ${section.author ? `<p class="quote-author">— ${section.author}</p>` : ""}
        </div>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const card = el.querySelector(".quote-card");
      const mark = el.querySelector(".quote-mark");
      const text = el.querySelector(".quote-text");
      const author = el.querySelector(".quote-author");

      tl.from(card, { duration: 1, opacity: 0, scale: 0.97, y: 12, ease: "power2.out" })
        .from(mark, { duration: 0.8, opacity: 0, y: 8, ease: "power2.out" }, "-=0.35")
        .from(text, { duration: 0.9, opacity: 0, y: 12, ease: "power2.out" }, "-=0.2");

      if (author) {
        tl.from(author, { duration: 0.8, opacity: 0, y: 12, ease: "power2.out" });
      }

      tl.to(card, { duration: 0.8, opacity: 0, y: -12, ease: "power2.inOut" }, "+=1.5");
    },
  };
})();
