(function () {
  window.Components = window.Components || {};

  const STAR_COLORS = [
    "rgba(255, 220, 150, 0.95)",   // 亮暖金
    "rgba(255, 250, 235, 0.9)",   // 亮冷白
    "rgba(180, 220, 240, 0.85)",  // 亮淡蓝
    "rgba(255, 200, 180, 0.85)",  // 亮粉
    "rgba(200, 255, 210, 0.85)",  // 亮绿
  ];

  function createStarSVG(size, color) {
    const s = size;
    const cx = s / 2, cy = s / 2;
    const r1 = s * 0.48;
    const r2 = s * 0.15;
    const points = [];
    for (let i = 0; i < 8; i++) {
      const r = i % 2 === 0 ? r1 : r2;
      const angle = (i * Math.PI / 4) - Math.PI / 2;
      const jitter = (Math.random() - 0.5) * s * 0.06;
      const x = cx + r * Math.cos(angle) + jitter;
      const y = cy + r * Math.sin(angle) + jitter;
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    const polygon = points.join(" ");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="overflow:visible">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <polygon points="${polygon}" fill="${color}" filter="url(#glow)"/>
    </svg>`;
    return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
  }

  window.Components.stars = {
    overlay: true,

    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-stars";
      div.style.visibility = "hidden";
      div.style.position = "absolute";
      div.style.inset = "0";
      div.style.pointerEvents = "none";
      div.style.zIndex = "2";

      const isMobile = window.innerWidth <= 768;
      const count = isMobile ? Math.floor((section.count || 40) * 0.6) : (section.count || 40);

      for (let i = 0; i < count; i++) {
        const size = Math.random() * 8 + 6; // 6-14px
        const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];

        const star = document.createElement("img");
        star.className = "star";
        star.src = createStarSVG(size * 3, color);
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.width = (size * 3) + "px";
        star.style.height = (size * 3) + "px";
        star.style.setProperty("--duration", (Math.random() * 4 + 2) + "s");
        star.style.setProperty("--delay", (Math.random() * 2) + "s");
        div.appendChild(star);
      }

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      tl.set(el, { visibility: "visible" });
      const stars = el.querySelectorAll(".star");
      if (!stars.length) return;

      // 星星依次出现
      tl.fromTo(stars,
        { opacity: 0, scale: 0.2 },
        { opacity: 1, scale: 1, duration: 1, stagger: 0.02, ease: "back.out(2)" },
        "<"
      );

      // 停留3秒，让用户看到星星
      tl.to({}, { duration: 3 });

      // 持续闪烁
      stars.forEach((star) => {
        gsap.to(star, {
          opacity: 0.4 + Math.random() * 0.6,
          scale: 0.8 + Math.random() * 0.4,
          duration: 1.5 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    },

    exit(tl, el) {
      // 停止所有闪烁动画
      gsap.killTweensOf(el.querySelectorAll(".star"));
      gsap.set(el.querySelectorAll(".star"), { opacity: 0 });
      tl.to(el, { opacity: 0, duration: 1, ease: "power2.inOut" });
    }
  };
})();
