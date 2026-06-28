/**
 * ✨ EDIT THIS FILE to customize the birthday greeting! ✨
 *
 * This is the ONLY file you need to modify.
 * No need to touch HTML, CSS, or any other JavaScript files.
 */

const CONFIG = {
  // ── Recipient Info ────────────────────────────────────────────
  name: "程亦凡",
  photo: "./img/avatar.png",        // 程亦凡的头像
  music: "./music/birthday-bgm.mp3",

  // ── Theme Colors ──────────────────────────────────────────────
  colors: {
    primary: "#cda7ac",
    accent: "#718b75",
    dark: {
      background: "#c8d9d8",
      text: "#374647",
    },
    light: {
      background: "#f2ecdc",
      text: "#374647",
    },
  },

  // ── Default Color Mode ────────────────────────────────────────
  defaultMode: "dark",

  // ── Sections ──────────────────────────────────────────────────
  sections: [
    {
      type: "greeting",
      title: "Hey 程亦凡",
      subtitle: "今天是特别的一天 ✨",
    },
    {
      type: "countdown",
      from: 3,
      goText: "🎂",
    },
    {
      type: "announcement",
      text: "今天是你的生日！🎉",
    },
    {
      type: "chatbox",
      message:
        "程亦凡，生日快乐！祝你天天开心，心想事成，新的一岁越来越好。",
      buttonText: "Send",
    },
    {
      type: "ideas",
      lines: [
        "本来只是想说一句生日快乐。",
        "但是想了想，",
        "毕竟今天是你的生日。",
        "总想送一个特别一点的礼物。",
        "所以我做了这个网页。",
        "技术一般，效果可能没那么好。",
        "但祝福是真的。",
      ],
      bigLetters: "",
    },
    {
      type: "quote",
      text: "愿新的一岁，平安、自在，也常有惊喜。",
      author: "",
    },
    {
      type: "stars",
      count: 40,
    },
    {
      type: "balloons",
      count: 15,
    },
    {
      type: "profile",
      wishTitle: "生日快乐，程亦凡",
      wishText: "希望你按自己的节奏生活，也一直有勇气奔向喜欢的事。",
    },
    {
      type: "fireworks",
      count: 24,
    },
    {
      type: "confetti",
      count: 9,
    },
    {
      type: "closing",
      text: "今天就好好收下祝福吧。",
      replayText: "想再看一次",
    },
  ],
};
