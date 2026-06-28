(function () {
  window.Components = window.Components || {};

  const COLORS = [
    "#f0a0a8", "#c0a0d0", "#90c090", "#d0d8b0", "#90c8d0",
    "#e0b080", "#b0a0b0",
  ];

  const PRESETS = [
    { left: "18vw", top: "22vh" },
    { left: "76vw", top: "28vh" },
    { left: "28vw", top: "68vh" },
    { left: "68vw", top: "72vh" },
    { left: "48vw", top: "42vh" },
  ];

  function createPetalSVG(color, size) {
    const s = size;
    const points = [
      [s * 0.5, s * 0.05],
      [s * 0.85, s * 0.35],
      [s * 0.65, s * 0.85],
      [s * 0.35, s * 0.85],
      [s * 0.15, s * 0.35],
    ];
    const jittered = points.map(([x, y]) => {
      const jx = (Math.random() - 0.5) * s * 0.12;
      const jy = (Math.random() - 0.5) * s * 0.12;
      return [x + jx, y + jy];
    });
    const d = "M" + jittered[0][0].toFixed(1) + " " + jittered[0][1].toFixed(1)
      + " Q" + jittered[1][0].toFixed(1) + " " + jittered[1][1].toFixed(1) + " " + jittered[2][0].toFixed(1) + " " + jittered[2][1].toFixed(1)
      + " Q" + jittered[3][0].toFixed(1) + " " + jittered[3][1].toFixed(1) + " " + jittered[4][0].toFixed(1) + " " + jittered[4][1].toFixed(1)
      + " Q" + (s * 0.35).toFixed(1) + " " + (s * 0.2).toFixed(1) + " " + jittered[0][0].toFixed(1) + " " + jittered[0][1].toFixed(1)
      + " Z";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="overflow:visible">
      <defs>
        <filter id="blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5"/>
        </filter>
      </defs>
      <path d="${d}" fill="${color}" filter="url(#blur)" opacity="0.92"/>
    </svg>`;
    return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
  }

  window.Components.confetti = {
    overlay: true,

    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-confetti";
      div.style.visibility = "hidden";
      div.style.position = "absolute";
      div.style.inset = "0";
      div.style.pointerEvents = "none";
      div.style.zIndex = "2";
      const count = section.count || 30;

      for (let i = 0; i < count; i++) {
        const preset = PRESETS[i % PRESETS.length];
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const size = 12 + Math.random() * 10; // 12-22px

        const dot = document.createElement("img");
        dot.className = "confetti-dot";
        dot.src = createPetalSVG(color, size * 2);
        dot.style.left = preset.left;
        dot.style.top = preset.top;
        dot.style.width = (size * 2) + "px";
        dot.style.height = (size * 2) + "px";
        div.appendChild(dot);
      }

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      tl.set(el, { visibility: "visible" });
      const dots = el.querySelectorAll(".confetti-dot");
      if (!dots.length) return;

      // 爆发出现
      tl.fromTo(dots,
        { scale: 0, opacity: 0, rotation: 0 },
        {
          scale: 25 + Math.random() * 15,
          opacity: 0.85,
          rotation: Math.random() * 180,
          duration: 1.2,
          stagger: 0.04,
          ease: "back.out(1.8)",
        }
      );

      // 停留2秒后淡出
      tl.to(dots, {
        opacity: 0,
        scale: 0.5,
        duration: 2,
        stagger: 0.04,
        ease: "power2.inOut",
      }, "+=2");

      // 再停留1秒
      tl.to({}, { duration: 1 });
    },

    exit(tl, el) {
      tl.to(el, { opacity: 0, duration: 1, ease: "power2.inOut" });
    }
  };
})();
