(function () {
  window.Components = window.Components || {};

  window.Components.profile = {
    render(container, section, config) {
      const div = document.createElement("div");
      div.className = "section section-profile";
      
      // Use photo if available, otherwise show birthday cake icon
      const photoHTML = config.photo 
        ? `<img src="${config.photo}" alt="profile" class="profile-picture" />`
        : `<div class="profile-picture profile-placeholder">🎂</div>`;
      
      div.innerHTML = `
        <div class="profile-wrapper">
          ${photoHTML}
          <img src="img/hat.svg" alt="" class="hat" />
        </div>
        <div class="wish">
          <h3 class="wish-hbd">${section.wishTitle || "Happy Birthday!"}</h3>
          <h5 class="wish-text">${section.wishText || ""}</h5>
        </div>
      `;
      // Split wish title into spans for stagger animation (handle emoji safely)
      const hbd = div.querySelector(".wish-hbd");
      hbd.innerHTML = [...hbd.textContent]
        .map((ch) => `<span>${ch}</span>`)
        .join("");

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const cardEl = el.querySelector(".profile-wrapper");
      const hatEl = el.querySelector(".hat");
      
      tl.from(cardEl, {
        duration: 0.9, scale: 0.97, opacity: 0, y: 16,
        ease: "power2.out",
      }, "-=1")
      .from(hatEl, {
        duration: 0.55, opacity: 0, y: -38, rotation: -8,
        ease: "power2.out",
      }, "-=0.25")
      .to(hatEl, {
        duration: 0.28, y: 0, rotation: 0,
        ease: "power2.out",
      })
      .from(el.querySelectorAll(".wish-hbd span"), {
        duration: 0.9, opacity: 0, y: 12,
        ease: "power2.out", stagger: 0.035,
      }, "-=0.15")
      .from(el.querySelector(".wish-text"), {
        duration: 0.9, opacity: 0, y: 12,
        ease: "power2.out",
      }, "-=0.25");
    },

    exit(tl, el) {
      tl.to(el, {
        duration: 0.8, opacity: 0, y: -12, ease: "power2.inOut",
      });
    },
  };
})();
