(function () {
  window.Components = window.Components || {};

  window.Components.chatbox = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-chatbox";
      div.innerHTML = `
        <div class="text-box">
          <p class="hbd-chatbox"></p>
          <button class="fake-btn" type="button">${section.buttonText || "Send"}</button>
        </div>
        <p class="chatbox-hint">👆 点击发送继续</p>
      `;
      const chatbox = div.querySelector(".hbd-chatbox");
      const msg = section.message || "Happy Birthday!";
      chatbox.dataset.message = msg;
      chatbox.textContent = "";

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const message = el.querySelector(".hbd-chatbox");
      const btn = el.querySelector(".fake-btn");
      const hint = el.querySelector(".chatbox-hint");
      const chars = [...(message.dataset.message || "")];
      const typing = { count: 0 };

      if (!el._sendHandlerAttached) {
        btn.addEventListener("click", () => {
          if (!btn.classList.contains("is-ready")) return;
          btn.classList.remove("is-ready");
          hint.style.opacity = "0";
          gsap.set(btn, { pointerEvents: "none" });
          tl.resume();
        });
        el._sendHandlerAttached = true;
      }

      tl.call(() => btn.classList.remove("is-ready"))
      .set(btn, { pointerEvents: "none" })
      .set(hint, { opacity: 0 })
      .call(() => {
        typing.count = 0;
        message.textContent = "";
      })
      .from(el.querySelector(".text-box"), {
        duration: 1, scale: 0.97, opacity: 0, y: 12, ease: "power2.out",
      })
      .from(btn, {
        duration: 0.8, opacity: 0, y: 8, ease: "power2.out",
      }, "-=0.2")
      .to(typing, {
        duration: Math.max(chars.length * 0.055, 1.2),
        count: chars.length,
        ease: "none",
        onUpdate: () => {
          message.textContent = chars.slice(0, Math.round(typing.count)).join("");
        },
      })
      .call(() => {
        message.textContent = chars.join("");
      })
      .to(btn, {
        duration: 0.25, backgroundColor: "rgba(228, 201, 149, 0.88)",
      })
      .set(btn, { pointerEvents: "auto" })
      .call(() => btn.classList.add("is-ready"))
      .to(hint, { duration: 0.5, opacity: 1, y: 0 }, "-=0.2")
      .addPause()
      .to(el.querySelector(".text-box"), {
        duration: 0.8, scale: 0.99, opacity: 0, y: -12, ease: "power2.inOut",
      }, "+=0.2");
    },
  };
})();
