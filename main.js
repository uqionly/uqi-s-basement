document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toastStack = document.getElementById("toastStack");
  const introOverlay = document.getElementById("introOverlay");
  const visitorNameInput = document.getElementById("visitorNameInput");
  const introEnterButton = document.getElementById("introEnterButton");
  const themeToggle = document.getElementById("themeToggle");
  const themeLabel = document.getElementById("themeLabel");
  const audioToggle = document.getElementById("audioToggle");
  const ageValue = document.getElementById("ageValue");
  const statusText = document.getElementById("statusText");
  const statusDot = document.getElementById("statusDot");
  const viewCount = document.getElementById("viewCount");
  const visitorNames = document.getElementById("visitorNames");
  const liveTime = document.getElementById("liveTime");
  const liveDate = document.getElementById("liveDate");
  const aiAffirmation = document.getElementById("aiAffirmation");
  const affirmationButton = document.getElementById("affirmationButton");
  const batteryLevel = document.getElementById("batteryLevel");
  const batteryState = document.getElementById("batteryState");
  const networkStatus = document.getElementById("networkStatus");
  const networkDetail = document.getElementById("networkDetail");
  const deviceName = document.getElementById("deviceName");
  const wifiName = document.getElementById("wifiName");
  const playButton = document.getElementById("playButton");
  const musicVideo = document.getElementById("musicVideo");
  const nowPlaying = document.getElementById("nowPlaying");
  const visualizer = document.getElementById("visualizer");
  const phaseDate = document.getElementById("phaseDate");
  const phaseMessage = document.getElementById("phaseMessage");
  const skillSelector = document.getElementById("skillSelector");
  const skillCategory = document.getElementById("skillCategory");
  const skillTitle = document.getElementById("skillTitle");
  const skillPercent = document.getElementById("skillPercent");
  const skillOrbitValue = document.getElementById("skillOrbitValue");
  const skillInsight = document.getElementById("skillInsight");
  const skillMilestones = document.getElementById("skillMilestones");
  const steamRefreshButton = document.getElementById("steamRefreshButton");
  const steamStatusText = document.getElementById("steamStatusText");
  const steamOnlineState = document.getElementById("steamOnlineState");
  const steamSince = document.getElementById("steamSince");
  const steamPlaying = document.getElementById("steamPlaying");
  const gameSearch = document.getElementById("gameSearch");
  const gameGrid = document.getElementById("gameGrid");
  const genreStrip = document.getElementById("genreStrip");
  const phoneUsageGrid = document.getElementById("phoneUsageGrid");
  const phoneAppName = document.getElementById("phoneAppName");
  const phoneAppMinutes = document.getElementById("phoneAppMinutes");
  const phoneAddButton = document.getElementById("phoneAddButton");

  const filterButtons = document.querySelectorAll(".filter-btn");
  const hobbyCards = document.querySelectorAll(".hobby-card");
  const copyButtons = document.querySelectorAll(".social-copy");
  const visualizerBars = visualizer ? visualizer.querySelectorAll("span") : [];
  const statusSeed = statusText ? statusText.textContent.trim() : "Solitude";
  const statuses = Array.from(new Set([statusSeed, "Even", "Solitude"]));
  const phaseButtons = document.querySelectorAll(".phase-button");
  const timelineSteps = document.querySelectorAll(".timeline-step");
  const gameFilterButtons = document.querySelectorAll(".game-filter");
  const powerMeters = document.querySelectorAll(".power-meter");
  let statusIndex = 0;
  let visualizerTimer = null;
  let activeGameFilter = "all";
  let activeGenre = "all";
  let previousOnlineState = navigator.onLine;
  let previousNetworkQuality = "";
  let introCounted = false;

  const affirmations = [
    "You are not required to solve the whole future tonight. Hold the line, polish one skill, and let the next minute become useful.",
    "Attention check: your current pain is information, not a final sentence. Convert one fragment into one clean action.",
    "The quiet version of progress still counts. If you keep returning to the craft, the craft keeps remembering you.",
    "You can be wounded and still be precise. You can be alone and still build something that answers back.",
    "Do not negotiate with the worst hour. Name it, breathe through it, then move one small piece forward."
  ];

  const phaseStatements = {
    relapse: "Relapse has been recorded for today. This does not erase progress. It identifies the exact pressure point that needs care, structure, and a smaller next step.",
    acceptance: "Acceptance has been recorded for today. The situation is being named clearly, which means energy can move from denial into recovery and decision.",
    tranquility: "serenity has been recorded for today. You are not forcing the wound to disappear. You are reducing its authority over the rest of your life.",
    rebuilt: "Rebuilt has been recorded for today. This phase marks active reconstruction: routine, skill, discipline, and identity are being put back into working order."
  };

  const skills = [
    {
      id: "coding",
      icon: "01",
      title: "Coding",
      category: "Interface / Web Systems",
      percent: 90,
      insight: "Coding has become the main structure: the place where ideas, discipline, and interface taste start turning into usable work.",
      milestones: ["Responsive page systems", "Interactive JavaScript logic", "Personal visual identity in UI"]
    },
    {
      id: "editing",
      icon: "02",
      title: "Editing",
      category: "Visual Rhythm",
      percent: 84,
      insight: "Editing is moving from simple correction into taste control: pacing, contrast, timing, and emotional weight.",
      milestones: ["Cleaner cuts", "Mood-first color direction", "Sharper sequencing"]
    },
    {
      id: "music",
      icon: "03",
      title: "Music Production",
      category: "Sound Architecture",
      percent: 82,
      insight: "Music production is becoming an emotional engine: sound selection, atmosphere, drums, and texture are forming a signature.",
      milestones: ["Atmospheric layers", "Underground tone", "Stronger arrangement discipline"]
    },
    {
      id: "photo",
      icon: "04",
      title: "Photography",
      category: "Frame Language",
      percent: 78,
      insight: "Photography is becoming a way to notice quiet detail: light, shadow, distance, and stillness are being trained into composition.",
      milestones: ["Portrait awareness", "Street detail capture", "Mood-based framing"]
    },
    {
      id: "video",
      icon: "05",
      title: "Videography",
      category: "Motion Story",
      percent: 80,
      insight: "Videography is now a bridge between image and time: movement, scene intention, and atmosphere are being organized.",
      milestones: ["Cinematic pacing", "Scene planning", "Better visual continuity"]
    },
    {
      id: "design",
      icon: "06",
      title: "UI Concepting",
      category: "Creative Direction",
      percent: 88,
      insight: "UI concepting is becoming a personal language: game-inspired layout, hard contrast, and interactive identity are becoming clearer.",
      milestones: ["Persona-style contrast", "Dashboard systems", "Stronger visual hierarchy"]
    }
  ];

  const gameData = [
    { title: "Neverness To Everness", url: "https://nte.perfectworld.com/en/index.html", source: "non-steam", status: "playlist", genre: "Open World", platforms: ["w", "V"], appId: null },
    { title: "Persona 4 Revival", url: "https://store.steampowered.com/app/2963950/Persona_4_Revival/", source: "steam", status: "playlist", genre: "JRPG", platforms: ["w", "V"], appId: "2963950" },
    { title: "Persona 4 Golden", url: "https://store.steampowered.com/app/1113000/Persona_4_Golden/", source: "steam", status: "playlist", genre: "JRPG", platforms: ["w", "V"], appId: "1113000" },
    { title: "Persona 5 Royal", url: "https://store.steampowered.com/app/1687950/Persona_5_Royal/", source: "steam", status: "playlist", genre: "JRPG", platforms: ["w", "V"], appId: "1687950" },
    { title: "Redout 2", url: "https://store.steampowered.com/app/1799930/Redout_2/", source: "steam", status: "playlist", genre: "Racing", platforms: ["w", "V"], appId: "1799930" },
    { title: "Forza Horizon 6", url: "https://store.steampowered.com/app/2483190/Forza_Horizon_6/", source: "steam", status: "playlist", genre: "Racing", platforms: ["w", "V"], appId: "2483190" },
    { title: "Death Stranding Director's Cut", url: "https://store.steampowered.com/app/1850570/DEATH_STRANDING_DIRECTORS_CUT/", source: "steam", status: "playlist", genre: "Cinematic", platforms: ["w", "V"], appId: "1850570" },
    { title: "Samson", url: "https://store.steampowered.com/app/3634520/Samson/", source: "steam", status: "playlist", genre: "Action", platforms: ["w", "V"], appId: "3634520" },
    { title: "OverField", url: "https://store.steampowered.com/app/3879660/OverField/", source: "steam", status: "playlist", genre: "RPG", platforms: ["w", "V"], appId: "3879660" },
    { title: "Strinova", url: "https://store.steampowered.com/app/1282270/Strinova/", source: "steam", status: "playlist", genre: "Shooter", platforms: ["w", "V"], appId: "1282270" },
    { title: "Yuki", url: "https://store.steampowered.com/app/3909220/Yuki/", source: "steam", status: "playlist", genre: "Adventure", platforms: ["w", "V"], appId: "3909220" },
    { title: "Yume Nikki", url: "https://store.steampowered.com/app/650700/Yume_Nikki/", source: "steam", status: "playlist", genre: "Psychological", platforms: ["w"], appId: "650700" },
    { title: "Elden Ring", url: "https://store.steampowered.com/app/1245620/ELDEN_RING/", source: "steam", status: "playlist", genre: "Soulslike", platforms: ["w", "V", "y", "c"], appId: "1245620" },
    { title: "Sekiro: Shadows Die Twice", url: "https://store.steampowered.com/agecheck/app/814380/", source: "steam", status: "playlist", genre: "Soulslike", platforms: ["w", "V", "y", "c"], appId: "814380" },
    { title: "Dark Souls Remastered", url: "https://store.steampowered.com/app/570940/DARK_SOULS_REMASTERED/", source: "steam", status: "playlist", genre: "Soulslike", platforms: ["w", "V"], appId: "570940" },
    { title: "Dark Souls II: Scholar of the First Sin", url: "https://store.steampowered.com/app/335300/DARK_SOULS_II_Scholar_of_the_First_Sin/", source: "steam", status: "playlist", genre: "Soulslike", platforms: ["w", "V"], appId: "335300" },
    { title: "Dark Souls III", url: "https://store.steampowered.com/app/374320/DARK_SOULS_III/", source: "steam", status: "playlist", genre: "Soulslike", platforms: ["w", "V"], appId: "374320" },
    { title: "Lords of the Fallen", url: "https://store.steampowered.com/app/1501750/Lords_of_the_Fallen/", source: "steam", status: "playlist", genre: "Soulslike", platforms: ["w", "V"], appId: "1501750" },
    { title: "No Man's Sky", url: "https://store.steampowered.com/app/275850/No_Mans_Sky/", source: "steam", status: "playlist", genre: "Sandbox", platforms: ["w", "V", "y", "c"], appId: "275850" },
    { title: "Delta Force", url: "https://store.steampowered.com/app/2507950/Delta_Force/", source: "steam", status: "playlist", genre: "Shooter", platforms: ["w", "V"], appId: "2507950" },
    { title: "Counter-Strike 2", url: "https://store.steampowered.com/app/730/CounterStrike_2/", source: "steam", status: "playlist", genre: "Shooter", platforms: ["w", "V"], appId: "730" },
    { title: "Need for Speed Heat", url: "https://store.steampowered.com/app/1222680/Need_for_Speed_Heat/", source: "steam", status: "playlist", genre: "Racing", platforms: ["w", "V"], appId: "1222680" },
    { title: "Need for Speed", url: "https://store.steampowered.com/app/1262540/Need_for_Speed/", source: "steam", status: "playlist", genre: "Racing", platforms: ["w", "V"], appId: "1262540" },
    { title: "Blight: Survival", url: "https://store.steampowered.com/app/1774880/Blight_Survival/", source: "steam", status: "wishlist", genre: "Survival", platforms: ["w", "V"], appId: "1774880" },
    { title: "Subnautica 2", url: "https://store.steampowered.com/app/1962700/Subnautica_2/", source: "steam", status: "wishlist", genre: "Survival", platforms: ["w", "V"], appId: "1962700" },
    { title: "Minecraft", url: "https://www.minecraft.net/en-us", source: "xbox", status: "playlist", genre: "Sandbox", platforms: ["c", "w", "a", "y"], appId: null },
    { title: "Call of Duty Mobile", url: "https://play.google.com/store/apps/details?id=com.garena.game.codm", source: "android", status: "playlist", genre: "Shooter", platforms: ["a"], appId: null },
    { title: "Mobile Legends", url: "https://play.google.com/store/apps/details?id=com.mobile.legends", source: "android", status: "playlist", genre: "MOBA", platforms: ["a"], appId: null }
  ];

  function getSavedTheme() {
    try {
      return localStorage.getItem("uqi-theme");
    } catch (error) {
      return null;
    }
  }

  function saveTheme(mode) {
    try {
      localStorage.setItem("uqi-theme", mode);
    } catch (error) {
      return;
    }
  }

  function getStoredJson(key, fallback) {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function setStoredJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      return;
    }
  }

  function showToast(title, message) {
    if (!toastStack) {
      return;
    }

    const bubble = document.createElement("div");
    bubble.className = "toast-bubble";
    bubble.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
    toastStack.appendChild(bubble);

    setTimeout(() => {
      bubble.remove();
    }, 4200);
  }

  function cleanVisitorName(name) {
    return (name || "Guest").trim().replace(/[<>]/g, "").slice(0, 32) || "Guest";
  }

  function renderVisitorStats() {
    const stats = getStoredJson("uqi-visitor-stats", { views: 0, names: [] });

    if (viewCount) {
      viewCount.textContent = stats.views;
    }

    if (visitorNames) {
      const names = stats.names.length ? stats.names.slice(-4).join(", ") : "Guest";
      visitorNames.textContent = `Visitors: ${names}`;
    }
  }

  function registerVisitor(name) {
    if (introCounted) {
      return;
    }

    const visitor = cleanVisitorName(name);
    const stats = getStoredJson("uqi-visitor-stats", { views: 0, names: [] });
    stats.views += 1;

    if (!stats.names.includes(visitor)) {
      stats.names.push(visitor);
    }

    stats.names = stats.names.slice(-20);
    setStoredJson("uqi-visitor-stats", stats);
    setStoredJson("uqi-last-visitor", visitor);
    introCounted = true;
    renderVisitorStats();
    showToast("Welcome Home", visitor);
  }

  function closeIntro() {
    const name = cleanVisitorName(visitorNameInput ? visitorNameInput.value : "Guest");
    registerVisitor(name);

    if (introOverlay) {
      introOverlay.classList.add("is-hidden");
    }
  }

  function setTheme(mode) {
    const isLight = mode === "light";
    body.classList.toggle("light-mode", isLight);

    if (themeLabel) {
      themeLabel.textContent = isLight ? "Light" : "Dark";
    }

    if (themeToggle) {
      themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    }

    saveTheme(mode);
  }

  function updateAudioToggle() {
    if (!audioToggle || !musicVideo) {
      return;
    }

    audioToggle.textContent = musicVideo.muted ? "Unmute" : "Mute";
    audioToggle.classList.toggle("is-muted", musicVideo.muted);
    audioToggle.setAttribute("aria-label", musicVideo.muted ? "Unmute music" : "Mute music");
  }

  function toggleAudioMute() {
    if (!musicVideo) {
      return;
    }

    musicVideo.muted = !musicVideo.muted;
    updateAudioToggle();
  }

  function localDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function updateClock() {
    const now = new Date();

    if (liveTime) {
      liveTime.textContent = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }).format(now);
    }

    if (liveDate) {
      liveDate.textContent = new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
      }).format(now);
    }

    if (phaseDate) {
      phaseDate.textContent = localDateKey(now);
    }
  }

  function updateAge() {
    if (!ageValue) {
      return;
    }

    const birthDate = new Date(2005, 8, 17);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!hasBirthdayPassed) {
      age -= 1;
    }

    ageValue.textContent = age;
  }

  function filterHobbies(type) {
    hobbyCards.forEach((card) => {
      const isVisible = type === "all" || card.dataset.type === type;
      card.classList.toggle("hidden", !isVisible);
    });

    filterButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.filter === type);
    });
  }

  function startStatusLoop() {
    if (!statusText || statuses.length < 2) {
      return;
    }

    setInterval(() => {
      statusText.classList.add("is-changing");

      setTimeout(() => {
        statusIndex = (statusIndex + 1) % statuses.length;
        statusText.textContent = statuses[statusIndex];
        statusText.classList.remove("is-changing");
      }, 260);
    }, 5000);
  }

  function rotateAffirmation() {
    if (!aiAffirmation) {
      return;
    }

    const current = aiAffirmation.textContent.trim();
    const nextPool = affirmations.filter((text) => text !== current);
    const next = nextPool[Math.floor(Math.random() * nextPool.length)] || affirmations[0];
    aiAffirmation.classList.add("is-changing");

    setTimeout(() => {
      aiAffirmation.textContent = next;
      aiAffirmation.classList.remove("is-changing");
    }, 220);
  }

  async function setupBattery() {
    if (!batteryLevel || !batteryState) {
      return;
    }

    if (!("getBattery" in navigator)) {
      batteryLevel.textContent = "Hidden";
      batteryState.textContent = "Battery API is not available in this browser.";
      return;
    }

    try {
      const battery = await navigator.getBattery();
      const render = () => {
        batteryLevel.textContent = `${Math.round(battery.level * 100)}%`;
        batteryState.textContent = battery.charging ? "Charging now" : "Running on battery";
      };

      render();
      battery.addEventListener("levelchange", render);
      battery.addEventListener("chargingchange", render);
    } catch (error) {
      batteryLevel.textContent = "Blocked";
      batteryState.textContent = "The browser blocked battery access.";
    }
  }

  function updateNetwork() {
    if (!networkStatus || !networkDetail) {
      return;
    }

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const online = navigator.onLine;
    networkStatus.textContent = online ? "Connected" : "Offline";

    if (statusText) {
      statusText.textContent = online ? "Online" : "Offline";
    }

    const statusBox = statusText ? statusText.closest(".status-console") : null;
    if (statusBox) {
      statusBox.classList.toggle("status-online", online);
      statusBox.classList.toggle("status-offline", !online);
    }

    if (!online) {
      networkDetail.textContent = "No active browser network signal.";
      if (previousOnlineState) {
        showToast("Network Offline", "Connection dropped. Some live profile data may pause.");
      }
      previousOnlineState = false;
      return;
    }

    if (!previousOnlineState) {
      showToast("Back Online", "Your connection is active again.");
    }

    if (connection) {
      const speed = connection.downlink ? `${connection.downlink} Mbps` : "speed hidden";
      const quality = connection.effectiveType || "type hidden";
      networkDetail.textContent = `Signal online, ${quality}, ${speed}. WiFi type may be hidden by browser.`;

      const unstable = ["slow-2g", "2g"].includes(connection.effectiveType) || (connection.downlink && connection.downlink < 1.5);
      const qualityKey = unstable ? "unstable" : "stable";
      if (unstable && previousNetworkQuality !== "unstable") {
        showToast("Network Unstable", "Your connection looks slow right now.");
      }

      previousNetworkQuality = qualityKey;
      previousOnlineState = true;
      return;
    }

    networkDetail.textContent = "Browser is online. Exact WiFi type is hidden by this browser.";
    previousOnlineState = true;
  }

  function detectDeviceName() {
    const ua = navigator.userAgent;
    const platform = navigator.userAgentData?.platform || navigator.platform || "Unknown Platform";
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
    let browser = "Browser";
    let os = platform;

    if (/Edg\//.test(ua)) {
      browser = "Microsoft Edge";
    } else if (/Chrome\//.test(ua)) {
      browser = "Google Chrome";
    } else if (/Firefox\//.test(ua)) {
      browser = "Mozilla Firefox";
    } else if (/Safari\//.test(ua)) {
      browser = "Safari";
    }

    if (/Windows NT/i.test(ua)) {
      os = "Windows";
    } else if (/Android/i.test(ua)) {
      os = "Android";
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
      os = "iOS";
    } else if (/Mac OS X/i.test(ua)) {
      os = "macOS";
    } else if (/Linux/i.test(ua)) {
      os = "Linux";
    }

    const memory = navigator.deviceMemory ? `${navigator.deviceMemory}GB RAM class` : "memory hidden";
    const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} cores` : "cores hidden";
    return `${isMobile ? "Mobile" : "Desktop"} ${os} / ${browser} / ${cores} / ${memory}`;
  }

  function setupDeviceInfo() {
    if (deviceName) {
      deviceName.textContent = detectDeviceName();
    }

    if (wifiName) {
      wifiName.textContent = "SSID Hidden";
    }
  }

  function setVisualizerPaused() {
    if (!visualizer) {
      return;
    }

    clearInterval(visualizerTimer);
    visualizer.classList.remove("is-playing");
    visualizer.classList.add("is-paused");

    visualizerBars.forEach((bar, index) => {
      bar.style.height = `${12 + (index % 4) * 5}%`;
    });
  }

  function startVisualizer() {
    if (!visualizer) {
      return;
    }

    clearInterval(visualizerTimer);
    visualizer.classList.add("is-playing");
    visualizer.classList.remove("is-paused");

    visualizerTimer = setInterval(() => {
      visualizerBars.forEach((bar, index) => {
        const pulse = 20 + Math.floor(Math.random() * 72);
        const offset = (index % 3) * 5;
        bar.style.height = `${Math.min(pulse + offset, 96)}%`;
      });
    }, 170);
  }

  function showNowPlaying() {
    if (!nowPlaying) {
      return;
    }

    nowPlaying.hidden = false;
    requestAnimationFrame(() => {
      nowPlaying.classList.add("is-visible");
    });
  }

  function setMusicPausedState() {
    body.classList.remove("is-playing");

    if (playButton) {
      playButton.textContent = "Play";
    }

    setVisualizerPaused();
  }

  async function toggleMusic() {
    if (!musicVideo || !playButton) {
      return;
    }

    if (musicVideo.paused) {
      try {
        await musicVideo.play();
        body.classList.add("is-playing");
        playButton.textContent = "Paused";
        showNowPlaying();
        startVisualizer();
      } catch (error) {
        playButton.textContent = "Play";
        showNowPlaying();
        setVisualizerPaused();
      }
      return;
    }

    musicVideo.pause();
    setMusicPausedState();
  }

  async function copyText(text, button) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const field = document.createElement("textarea");
        field.value = text;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        document.body.removeChild(field);
      }

      button.textContent = "Copied";
    } catch (error) {
      button.textContent = text;
    }

    setTimeout(() => {
      button.textContent = "Copy";
    }, 1600);
  }

  function countUp(element, value) {
    if (!element) {
      return;
    }

    const start = Number(element.textContent) || 0;
    const diff = value - start;
    const duration = 480;
    const started = performance.now();

    function tick(now) {
      const progress = Math.min((now - started) / duration, 1);
      element.textContent = Math.round(start + diff * progress);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  function renderPhaseStats(activePhase) {
    const log = getStoredJson("uqi-phase-log", {});
    const counts = { relapse: 0, acceptance: 0, berdamai: 0, rebuilt: 0 };

    Object.values(log).forEach((phase) => {
      if (counts[phase] !== undefined) {
        counts[phase] += 1;
      }
    });

    countUp(document.getElementById("relapseCount"), counts.relapse);
    countUp(document.getElementById("acceptanceCount"), counts.acceptance);
    countUp(document.getElementById("berdamaiCount"), counts.berdamai);
    countUp(document.getElementById("rebuiltCount"), counts.rebuilt);

    [...phaseButtons, ...timelineSteps].forEach((button) => {
      button.classList.toggle("active", button.dataset.phase === activePhase);
    });
  }

  function setPhase(phase) {
    const log = getStoredJson("uqi-phase-log", {});
    log[localDateKey()] = phase;
    setStoredJson("uqi-phase-log", log);

    if (phaseMessage) {
      phaseMessage.classList.add("is-changing");
      setTimeout(() => {
        phaseMessage.textContent = phaseStatements[phase] || phaseStatements.rebuilt;
        phaseMessage.classList.remove("is-changing");
      }, 240);
    }

    renderPhaseStats(phase);
  }

  function setupPhases() {
    const log = getStoredJson("uqi-phase-log", {});
    const todayPhase = log[localDateKey()] || null;
    renderPhaseStats(todayPhase);

    if (todayPhase && phaseMessage) {
      phaseMessage.textContent = phaseStatements[todayPhase];
    }

    [...phaseButtons, ...timelineSteps].forEach((button) => {
      button.addEventListener("click", () => setPhase(button.dataset.phase));
    });
  }

  function renderSkills() {
    if (!skillSelector) {
      return;
    }

    skillSelector.innerHTML = skills.map((skill) => `
      <button class="skill-select-button" type="button" data-skill="${skill.id}">
        <i>${skill.icon}</i>
        <span>${skill.title}<small>${skill.category}</small></span>
        <strong>${skill.percent}</strong>
      </button>
    `).join("");

    skillSelector.querySelectorAll("[data-skill]").forEach((button) => {
      button.addEventListener("click", () => selectSkill(button.dataset.skill));
    });

    selectSkill(skills[0].id);
  }

  function selectSkill(id) {
    const skill = skills.find((item) => item.id === id) || skills[0];

    if (skillCategory) {
      skillCategory.textContent = skill.category;
    }

    if (skillTitle) {
      skillTitle.textContent = skill.title;
    }

    if (skillPercent) {
      skillPercent.textContent = `${skill.percent}%`;
    }

    if (skillInsight) {
      skillInsight.textContent = skill.insight;
    }

    if (skillMilestones) {
      skillMilestones.innerHTML = skill.milestones.map((item) => `<span>${item}</span>`).join("");
    }

    if (skillOrbitValue) {
      const circumference = 301;
      skillOrbitValue.style.strokeDashoffset = `${circumference - (circumference * skill.percent) / 100}`;
    }

    document.querySelectorAll(".skill-select-button").forEach((button) => {
      button.classList.toggle("active", button.dataset.skill === skill.id);
    });
  }

  function platformLabel(symbol) {
    const labels = { w: "Windows", V: "NVIDIA", a: "Android", y: "PlayStation", c: "Xbox" };
    return labels[symbol] || symbol;
  }

  function gameImage(game) {
    if (!game.appId) {
      return "";
    }

    return `https://cdn.akamai.steamstatic.com/steam/apps/${game.appId}/header.jpg`;
  }

  function renderGenres() {
    if (!genreStrip) {
      return;
    }

    const genres = ["all", ...Array.from(new Set(gameData.map((game) => game.genre))).sort()];
    genreStrip.innerHTML = genres.map((genre) => `
      <button class="genre-chip ${genre === activeGenre ? "active" : ""}" type="button" data-genre="${genre}">
        ${genre}
      </button>
    `).join("");

    genreStrip.querySelectorAll("[data-genre]").forEach((button) => {
      button.addEventListener("click", () => {
        activeGenre = button.dataset.genre;
        renderGenres();
        renderGames();
      });
    });
  }

  function renderGames() {
    if (!gameGrid) {
      return;
    }

    const query = gameSearch ? gameSearch.value.trim().toLowerCase() : "";
    const filtered = gameData.filter((game) => {
      const haystack = `${game.title} ${game.genre} ${game.source} ${game.status} ${game.platforms.join(" ")}`.toLowerCase();
      const matchesSearch = !query || haystack.includes(query);
      const matchesGenre = activeGenre === "all" || game.genre === activeGenre;
      const matchesFilter =
        activeGameFilter === "all" ||
        game.source === activeGameFilter ||
        game.status === activeGameFilter;

      return matchesSearch && matchesGenre && matchesFilter;
    });

    gameGrid.innerHTML = filtered.map((game) => {
      const image = gameImage(game);
      const initials = game.title.split(/\s+/).slice(0, 2).map((word) => word[0]).join("");
      const thumb = image
        ? `<span class="game-thumb"><img src="${image}" alt="${game.title} thumbnail" loading="lazy" onerror="this.parentElement.classList.add('fallback'); this.remove();"></span>`
        : `<span class="game-thumb fallback">${initials}</span>`;
      const platforms = game.platforms.map((symbol) => `
        <span class="platform-pill"><i class="logo-font">${symbol}</i>${platformLabel(symbol)}</span>
      `).join("");

      return `
        <article class="game-card reveal-card">
          ${thumb}
          <div class="game-card-body">
            <p>${game.status} / ${game.source}</p>
            <h3>${game.title}</h3>
            <p>${game.genre}</p>
            <div class="platform-row">${platforms}</div>
            <a href="${game.url}" target="_blank" rel="noopener noreferrer">Open Link</a>
          </div>
        </article>
      `;
    }).join("");

    if (!filtered.length) {
      gameGrid.innerHTML = `<article class="game-card reveal-card"><div class="game-card-body"><h3>No Result</h3><p>Try another search or genre filter.</p></div></article>`;
    }

    setupReveal();
  }

  async function refreshSteamProfile() {
    if (!steamStatusText || !steamOnlineState || !steamSince || !steamPlaying) {
      return;
    }

    steamStatusText.textContent = "Attempting to read public Steam XML profile...";

    try {
      const response = await fetch("https://steamcommunity.com/profiles/76561198774246739/?xml=1", { cache: "no-store" });
      const xmlText = await response.text();
      const xml = new DOMParser().parseFromString(xmlText, "application/xml");
      const state = xml.querySelector("onlineState")?.textContent || "Unknown";
      const since = xml.querySelector("memberSince")?.textContent || "Hidden";
      const playing = xml.querySelector("inGameInfo gameName")?.textContent || "None";

      steamOnlineState.textContent = state;
      steamSince.textContent = since;
      steamPlaying.textContent = playing;
      steamStatusText.textContent = "Steam profile data refreshed. If this looks old, Steam privacy or browser CORS may be limiting access.";
    } catch (error) {
      steamOnlineState.textContent = "Blocked";
      steamSince.textContent = "API hidden";
      steamPlaying.textContent = "Unknown";
      steamStatusText.textContent = "Static browser mode cannot access Steam live status here. Open the Steam profile link for confirmed online/currently playing data.";
    }
  }

  function formatMinutes(minutes) {
    const total = Math.max(0, Number(minutes) || 0);
    const hours = Math.floor(total / 60);
    const mins = total % 60;

    if (hours && mins) {
      return `${hours}h ${mins}m`;
    }

    if (hours) {
      return `${hours}h`;
    }

    return `${mins}m`;
  }

  function defaultPhoneUsage() {
    return [
      { app: "YouTube", minutes: 300 },
      { app: "Instagram", minutes: 13 },
      { app: "WhatsApp", minutes: 3 }
    ];
  }

  function getPhoneUsage() {
    return getStoredJson("uqi-phone-usage", defaultPhoneUsage());
  }

  function setPhoneUsage(data) {
    setStoredJson("uqi-phone-usage", data);
  }

  function renderPhoneUsage() {
    if (!phoneUsageGrid) {
      return;
    }

    const usage = getPhoneUsage();
    phoneUsageGrid.innerHTML = usage.map((item, index) => `
      <article class="phone-card reveal-card">
        <h3>${item.app}</h3>
        <strong>${formatMinutes(item.minutes)}</strong>
        <div class="phone-actions">
          <button type="button" data-phone="${index}" data-delta="-5">-5</button>
          <button type="button" data-phone="${index}" data-delta="5">+5</button>
          <button type="button" data-phone="${index}" data-delta="30">+30</button>
        </div>
      </article>
    `).join("");

    phoneUsageGrid.querySelectorAll("[data-phone]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextUsage = getPhoneUsage();
        const item = nextUsage[Number(button.dataset.phone)];
        item.minutes = Math.max(0, item.minutes + Number(button.dataset.delta));
        setPhoneUsage(nextUsage);
        renderPhoneUsage();
      });
    });

    setupReveal();
  }

  function addPhoneUsage() {
    if (!phoneAppName || !phoneAppMinutes) {
      return;
    }

    const app = phoneAppName.value.trim();
    const minutes = Number(phoneAppMinutes.value);

    if (!app || Number.isNaN(minutes)) {
      return;
    }

    const usage = getPhoneUsage();
    const existing = usage.find((item) => item.app.toLowerCase() === app.toLowerCase());

    if (existing) {
      existing.minutes = Math.max(0, minutes);
    } else {
      usage.push({ app, minutes: Math.max(0, minutes) });
    }

    setPhoneUsage(usage);
    phoneAppName.value = "";
    phoneAppMinutes.value = "";
    renderPhoneUsage();
  }

  function setupPowerMeters() {
    powerMeters.forEach((meter) => {
      const level = Number(meter.dataset.level) || 0;
      const bar = meter.querySelector("i");

      if (bar) {
        bar.style.setProperty("--meter-width", "0%");
        setTimeout(() => {
          bar.style.setProperty("--meter-width", `${level}%`);
        }, 300);
      }
    });
  }

  function setupReveal() {
    const targets = document.querySelectorAll(".panel, .stat-panel, .hobby-card, .social-card, .photo-widget, .game-card, .phone-card, .live-clock-card");

    targets.forEach((target) => {
      target.classList.add("reveal-card");
    });

    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    targets.forEach((target) => {
      if (!target.classList.contains("is-visible")) {
        observer.observe(target);
      }
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = body.classList.contains("light-mode") ? "dark" : "light";
      setTheme(nextTheme);
    });
  }

  if (audioToggle) {
    audioToggle.addEventListener("click", toggleAudioMute);
  }

  if (introEnterButton) {
    introEnterButton.addEventListener("click", closeIntro);
  }

  if (visitorNameInput) {
    visitorNameInput.value = getStoredJson("uqi-last-visitor", "");
    visitorNameInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        closeIntro();
      }
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterHobbies(button.dataset.filter);
    });
  });

  if (affirmationButton) {
    affirmationButton.addEventListener("click", rotateAffirmation);
  }

  if (playButton) {
    playButton.addEventListener("click", toggleMusic);
  }

  if (musicVideo) {
    musicVideo.addEventListener("pause", setMusicPausedState);
    musicVideo.addEventListener("play", () => {
      body.classList.add("is-playing");
      showNowPlaying();
      startVisualizer();
    });
  }

  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      copyText(button.dataset.copy, button);
    });
  });

  gameFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeGameFilter = button.dataset.gameFilter;
      gameFilterButtons.forEach((item) => item.classList.toggle("active", item === button));
      renderGames();
    });
  });

  if (gameSearch) {
    gameSearch.addEventListener("input", renderGames);
  }

  if (steamRefreshButton) {
    steamRefreshButton.addEventListener("click", refreshSteamProfile);
  }

  if (phoneAddButton) {
    phoneAddButton.addEventListener("click", addPhoneUsage);
  }

  window.addEventListener("online", updateNetwork);
  window.addEventListener("offline", updateNetwork);

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection && connection.addEventListener) {
    connection.addEventListener("change", updateNetwork);
  }

  setTheme(getSavedTheme() || "dark");
  renderVisitorStats();
  updateAge();
  updateClock();
  setInterval(updateClock, 1000);
  setInterval(rotateAffirmation, 14000);
  setupBattery();
  setupDeviceInfo();
  updateNetwork();
  updateAudioToggle();
  setVisualizerPaused();
  setupPhases();
  renderSkills();
  renderGenres();
  renderGames();
  renderPhoneUsage();
  setupPowerMeters();
  setupReveal();
});
