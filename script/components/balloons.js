(function () {
  window.Components = window.Components || {};

  const COLORS = [
    "#e85868", // vivid pink
    "#a868c0", // vivid purple
    "#48a058", // vivid green
    "#c0c050", // vivid yellow-green
    "#4090a0", // vivid blue
  ];

  function lighten(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  function createBalloonSVG(color, size) {
    const w = size;
    const h = Math.round(size * 1.25);
    const gradId = "bg_" + Math.floor(Math.random() * 100000);
    const lightColor = lighten(color, 22);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 100 125" style="overflow:visible">
      <defs>
        <radialGradient id="${gradId}" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stop-color="${lightColor}" stop-opacity="1"/>
          <stop offset="60%" stop-color="${color}" stop-opacity="1"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.95"/>
        </radialGradient>
      </defs>
      <path d="M50 6 C78 6, 96 28, 96 56 C96 84, 72 102, 50 118 C28 102, 4 84, 4 56 C4 28, 22 6, 50 6 Z" 
            fill="url(#${gradId})" stroke="rgba(255,255,255,0.35)" stroke-width="1.2"/>
      <path d="M50 118 L50 122" stroke="${color}" stroke-width="1.5" stroke-opacity="0.9" fill="none"/>
    </svg>`;
    return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
  }

  window.Components.balloons = {
    overlay: true,

    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-balloons";
      div.style.visibility = "hidden";
      div.style.position = "absolute";
      div.style.inset = "0";
      div.style.pointerEvents = "none";
      div.style.zIndex = "2";

      const isMobile = window.innerWidth <= 768;
      const count = isMobile ? Math.floor((section.count || 15) * 0.5) : (section.count || 15);

      for (let i = 0; i < count; i++) {
        const size = 50 + Math.random() * 70; // 50-120px
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];

        const wrapper = document.createElement("div");
        wrapper.className = "balloon-item";
        wrapper.style.position = "absolute";
        wrapper.style.left = (Math.random() * 90 + 2).toFixed(2) + "%";
        wrapper.style.top = (Math.random() * 16 + 92).toFixed(2) + "%";
        wrapper.style.width = size + "px";
        wrapper.style.height = (size * 1.25) + "px";
        wrapper.style.opacity = "1.0";

        const img = document.createElement("img");
        img.src = createBalloonSVG(color, size);
        img.alt = "";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.display = "block";

        wrapper.appendChild(img);
        div.appendChild(wrapper);
      }

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      tl.set(el, { visibility: "visible" });
      const items = el.querySelectorAll(".balloon-item");
      if (!items.length) return;

      // 启动气球循环飘动（独立动画）
      items.forEach((item) => {
        const duration = 2 + Math.random() * 2; // 2-4s
        const sway = (Math.random() - 0.5) * 60;
        const rotation = (Math.random() - 0.5) * 16;
        const delay = Math.random() * 1.5;

        gsap.fromTo(
          item,
          { opacity: 0, y: 60, x: 0, rotation: 0 },
          {
            opacity: 1,
            y: -window.innerHeight - 260,
            x: sway,
            rotation: rotation,
            duration: duration,
            ease: "sine.inOut",
            delay: delay,
            repeat: -1,
            repeatDelay: Math.random() * 2,
          }
        );
      });

      // 在主 timeline 上停留 8 秒，让用户看气球
      tl.to({}, { duration: 8 });
    },

    exit(tl, el) {
      // 停止所有气球动画
      gsap.killTweensOf(el.querySelectorAll(".balloon-item"));
      gsap.set(el.querySelectorAll(".balloon-item"), { opacity: 0 });
      tl.to(el, { opacity: 0, duration: 1, ease: "power2.inOut" });
    }
  };
})();
