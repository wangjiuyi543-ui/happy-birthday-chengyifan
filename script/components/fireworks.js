(function () {
  window.Components = window.Components || {};

  const COLORS = [
    "#e8b4b8", "#b8a8c8", "#8faf88", "#c8d4b8", "#a8c4cc",
    "#d8c0a0", "#c0a0c0", "#e4c995",
  ];

  const NS = "http://www.w3.org/2000/svg";

  function createDropletSVG(color, size) {
    const s = size;
    const d = [
      `M ${s*0.5} 0`,
      `C ${s*0.8} ${s*0.15} ${s*0.95} ${s*0.4} ${s*0.85} ${s*0.65}`,
      `C ${s*0.75} ${s*0.9} ${s*0.55} ${s*1.0} ${s*0.5} ${s*1.0}`,
      `C ${s*0.45} ${s*1.0} ${s*0.25} ${s*0.9} ${s*0.15} ${s*0.65}`,
      `C ${s*0.05} ${s*0.4} ${s*0.2} ${s*0.15} ${s*0.5} 0`,
      `Z`
    ].join(" ");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="overflow:visible">
      <defs>
        <filter id="blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5"/>
        </filter>
      </defs>
      <path d="${d}" fill="${color}" filter="url(#blur)" opacity="0.85"/>
    </svg>`;
    return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
  }

  function createBurst(el, color, count, originX, originY) {
    for (let j = 0; j < count; j++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 60 + 30; // 30-90px
      const size = Math.random() * 10 + 6; // 6-16px

      const spark = document.createElement("img");
      spark.className = "firework-spark";
      spark.src = createDropletSVG(color, size);
      spark.style.left = originX + "vw";
      spark.style.top = originY + "vh";
      spark.style.width = size + "px";
      spark.style.height = size + "px";
      spark.style.position = "absolute";
      spark.style.pointerEvents = "none";

      el.appendChild(spark);

      gsap.fromTo(spark,
        { opacity: 1, x: 0, y: 0, scale: 0.5 },
        {
          opacity: 0,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          scale: 0.2,
          duration: 1 + Math.random() * 0.5,
          ease: "power2.out",
          delay: Math.random() * 0.2,
          onComplete: () => spark.remove(),
        }
      );
    }
  }

  window.Components.fireworks = {
    overlay: true,

    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-fireworks";
      div.style.visibility = "hidden";
      div.style.position = "absolute";
      div.style.inset = "0";
      div.style.pointerEvents = "none";
      div.style.zIndex = "2";
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      tl.set(el, { visibility: "visible" });

      // 立即放第一次烟花
      const color1 = COLORS[Math.floor(Math.random() * COLORS.length)];
      createBurst(el, color1, 12, 30 + Math.random() * 40, 20 + Math.random() * 30);

      // 1.5秒后放第二次
      tl.call(() => {
        const color2 = COLORS[Math.floor(Math.random() * COLORS.length)];
        createBurst(el, color2, 12, 30 + Math.random() * 40, 20 + Math.random() * 30);
      }, null, "+=1.5");

      // 再停留2.5秒让用户欣赏
      tl.to({}, { duration: 2.5 });
    },

    exit(tl, el) {
      tl.to(el, { opacity: 0, duration: 1, ease: "power2.inOut" });
    }
  };
})();
