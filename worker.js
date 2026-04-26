export default {
  async fetch(request, env, ctx) {
    const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Veysel Aslan - Sınırları Aş, İz Bırak. Creative Developer & Designer.">
  <meta name="author" content="Veysel Aslan">
  <title>Veysel Aslan | Creative Developer</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Raleway:wght@200;300;400;500&display=swap" rel="stylesheet">
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  
  <style>
    :root {
      --midnight: #030508;
      --midnight-light: #0a0f1a;
      --teal: #0d4f5c;
      --teal-glow: rgba(13, 79, 92, 0.4);
      --orange: #e8722a;
      --orange-glow: rgba(232, 114, 42, 0.3);
      --gold: #d4a853;
      --gold-glow: rgba(212, 168, 83, 0.2);
      --text: #e8ecf1;
      --text-dim: #6b7a8f;
      --border: rgba(212, 168, 83, 0.08);
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    html { scroll-behavior: smooth; }
    
    body {
      font-family: 'Raleway', sans-serif;
      background: var(--midnight);
      color: var(--text);
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Custom Cursor - Desktop Only */
    .cursor { 
      position: fixed; 
      pointer-events: none; 
      z-index: 99999; 
      mix-blend-mode: difference; 
    }
    .cursor-dot { 
      width: 8px; 
      height: 8px; 
      background: var(--orange); 
      border-radius: 50%; 
      transform: translate(-50%, -50%); 
      transition: transform 0.1s; 
    }
    .cursor-ring { 
      width: 40px; 
      height: 40px; 
      border: 1.5px solid var(--teal); 
      border-radius: 50%; 
      transform: translate(-50%, -50%); 
      transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
    }
    .cursor-ring.hover { 
      width: 55px; 
      height: 55px; 
      border-color: var(--orange); 
      background: rgba(232, 114, 42, 0.05); 
    }
    @media (pointer: coarse) { 
      .cursor { display: none !important; } 
      body { cursor: auto !important; } 
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--midnight); }
    ::-webkit-scrollbar-thumb { background: var(--teal); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--orange); }

    /* Navigation */
    .nav {
      position: fixed; 
      top: 0; 
      left: 0; 
      width: 100%; 
      z-index: 1000;
      padding: 1.8rem 4rem;
      display: flex; 
      justify-content: space-between; 
      align-items: center;
      transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .nav.scrolled {
      background: rgba(3, 5, 8, 0.85);
      backdrop-filter: blur(30px) saturate(180%);
      -webkit-backdrop-filter: blur(30px) saturate(180%);
      border-bottom: 1px solid var(--border);
      padding: 1rem 4rem;
    }
    .nav-logo {
      font-family: 'Cinzel', serif;
      font-size: 1.6rem; 
      font-weight: 800;
      color: var(--text);
      text-decoration: none;
      letter-spacing: 3px;
      display: flex; 
      align-items: baseline; 
      gap: 2px;
    }
    .nav-logo span { color: var(--orange); }
    .nav-links { display: flex; 
      gap: 3rem; 
      list-style: none; 
    }
    .nav-links a {
      font-family: 'Raleway', sans-serif;
      font-size: 0.75rem; 
      font-weight: 500;
      color: var(--text-dim);
      text-decoration: none;
      letter-spacing: 3.5px;
      text-transform: uppercase;
      position: relative;
      padding: 0.5rem 0;
      transition: color 0.3s;
    }
    .nav-links a::after {
      content: ''; 
      position: absolute; 
      bottom: 0; 
      left: 0;
      width: 0; 
      height: 1px;
      background: linear-gradient(90deg, var(--orange), var(--gold));
      transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .nav-links a:hover { color: var(--orange); }
    .nav-links a:hover::after { width: 100%; }
    @media (max-width: 768px) {
      .nav { padding: 1.2rem 1.5rem; }
      .nav.scrolled { padding: 0.8rem 1.5rem; }
      .nav-links { gap: 1.2rem; }
      .nav-links a { font-size: 0.65rem; letter-spacing: 2px; }
    }

    /* HERO SECTION */
    .hero {
      position: relative;
      width: 100%; 
      min-height: 100vh;
      display: flex; 
      align-items: center; 
      justify-content: center;
      overflow: hidden;
      background: var(--midnight);
    }

    /* Animated Mesh Gradient Background */
    .hero-bg {
      position: absolute; 
      inset: 0; 
      z-index: 1;
      background:
        radial-gradient(ellipse 80% 60% at 20% 40%, rgba(13, 79, 92, 0.35) 0%, transparent 60%),
        radial-gradient(ellipse 60% 80% at 80% 60%, rgba(232, 114, 42, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse 50% 50% at 50% 50%, rgba(212, 168, 83, 0.08) 0%, transparent 60%),
        var(--midnight);
      animation: meshMove 20s ease-in-out infinite alternate;
    }
    @keyframes meshMove {
      0% { background-position: 0% 0%, 100% 100%, 50% 50%; }
      100% { background-position: 100% 100%, 0% 0%, 60% 40%; }
    }

    /* CSS Particles - Lag Free */
    .particles {
      position: absolute; 
      inset: 0; 
      z-index: 2;
      overflow: hidden; 
      pointer-events: none;
    }
    .particle {
      position: absolute;
      border-radius: 50%;
      opacity: 0.4;
      animation: float linear infinite;
    }
    @keyframes float {
      0% { transform: translateY(100vh) translateX(0); opacity: 0; }
      10% { opacity: 0.6; }
      90% { opacity: 0.4; }
      100% { transform: translateY(-10vh) translateX(50px); opacity: 0; }
    }

    /* Mountain Layers */
    .mountains {
      position: absolute; 
      bottom: 0; 
      left: 0; 
      width: 100%; 
      z-index: 3;
      pointer-events: none;
    }
    .mountain-layer {
      position: absolute; 
      bottom: 0; 
      left: 0; 
      width: 100%;
      transition: transform 0.1s linear;
      will-change: transform;
    }

    /* Mist */
    .mist {
      position: absolute; 
      bottom: 0; 
      left: 0; 
      width: 100%; 
      height: 40%; 
      z-index: 4;
      background: linear-gradient(to top, var(--midnight) 0%, transparent 100%);
      pointer-events: none;
    }

    /* Hero Content */
    .hero-content {
      position: relative; 
      z-index: 10;
      text-align: center; 
      padding: 0 2rem;
      max-width: 1000px;
    }
    .hero-eyebrow {
      font-family: 'Raleway', sans-serif;
      font-size: 0.8rem; 
      font-weight: 300;
      letter-spacing: 8px;
      text-transform: uppercase;
      color: var(--text-dim);
      margin-bottom: 2rem;
      opacity: 0;
      animation: fadeInUp 1s 0.3s forwards;
    }
    .hero-title {
      font-family: 'Cinzel', serif;
      font-size: clamp(3.5rem, 12vw, 9rem);
      font-weight: 900;
      line-height: 0.95;
      letter-spacing: 6px;
      margin-bottom: 2rem;
      background: linear-gradient(135deg, var(--text) 0%, var(--gold) 30%, var(--orange) 60%, var(--gold) 100%);
      background-size: 300% 300%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gradientShift 6s ease infinite, fadeInUp 1.2s 0.5s forwards;
      opacity: 0;
      filter: drop-shadow(0 0 60px rgba(232, 114, 42, 0.15));
    }
    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    .hero-subtitle {
      font-family: 'Cinzel', serif;
      font-size: clamp(0.9rem, 2.5vw, 1.4rem);
      font-weight: 400;
      letter-spacing: 10px;
      text-transform: uppercase;
      color: var(--text-dim);
      margin-bottom: 4rem;
      opacity: 0;
      animation: fadeInUp 1s 0.8s forwards;
    }
    .hero-cta {
      display: inline-flex; 
      align-items: center; 
      gap: 1rem;
      padding: 1.2rem 3.5rem;
      font-family: 'Raleway', sans-serif;
      font-size: 0.8rem; 
      font-weight: 500;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--text);
      text-decoration: none;
      background: linear-gradient(135deg, rgba(13, 79, 92, 0.2), rgba(232, 114, 42, 0.15));
      border: 1px solid rgba(212, 168, 83, 0.2);
      position: relative;
      overflow: hidden;
      opacity: 0;
      animation: fadeInUp 1s 1.1s forwards;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .hero-cta::before {
      content: ''; 
      position: absolute; 
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      transform: translateX(-100%);
      transition: transform 0.6s;
    }
    .hero-cta:hover {
      border-color: var(--orange);
      box-shadow: 0 0 40px var(--orange-glow), inset 0 0 20px rgba(232, 114, 42, 0.05);
      transform: translateY(-3px);
      letter-spacing: 5px;
    }
    .hero-cta:hover::before { transform: translateX(100%); }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Scroll Indicator */
    .scroll-ind {
      position: absolute; 
      bottom: 3rem; 
      left: 50%; 
      transform: translateX(-50%);
      z-index: 10; 
      display: flex; 
      flex-direction: column; 
      align-items: center; 
      gap: 1rem;
      opacity: 0;
      animation: fadeInUp 1s 1.5s forwards;
    }
    .scroll-line {
      width: 1px; 
      height: 50px;
      background: linear-gradient(to bottom, var(--orange), transparent);
      animation: scrollPulse 2s ease-in-out infinite;
      transform-origin: top;
    }
    @keyframes scrollPulse {
      0% { transform: scaleY(0); }
      50% { transform: scaleY(1); }
      50.1% { transform-origin: bottom; }
      100% { transform: scaleY(0); transform-origin: bottom; }
    }
    .scroll-text {
      font-size: 0.65rem; 
      letter-spacing: 4px;
      text-transform: uppercase; 
      color: var(--text-dim);
    }

    /* QUOTES SECTION - Ultra Premium */
    .quotes {
      position: relative;
      padding: 10rem 2rem;
      background: linear-gradient(180deg, var(--midnight) 0%, var(--midnight-light) 50%, var(--midnight) 100%);
    }
    .quotes-header {
      text-align: center; 
      margin-bottom: 8rem;
    }
    .quotes-label {
      font-size: 0.75rem; 
      letter-spacing: 6px;
      text-transform: uppercase; 
      color: var(--orange);
      margin-bottom: 1.5rem;
      font-weight: 500;
    }
    .quotes-title {
      font-family: 'Cinzel', serif;
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 700;
      letter-spacing: 3px;
    }
    .quotes-grid {
      max-width: 1100px; 
      margin: 0 auto;
      display: flex; 
      flex-direction: column; 
      gap: 6rem;
    }
    .quote-item {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 4rem; 
      align-items: center;
      opacity: 0; 
      transform: translateY(60px);
    }
    .quote-item:nth-child(even) { 
      direction: rtl; 
    }
    .quote-item:nth-child(even) > * { 
      direction: ltr; 
    }
    .quote-num {
      font-family: 'Cinzel', serif;
      font-size: clamp(4rem, 10vw, 8rem);
      font-weight: 900;
      line-height: 1;
      background: linear-gradient(180deg, var(--teal) 0%, transparent 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      opacity: 0.3;
    }
    .quote-body { position: relative; }
    .quote-mark {
      font-family: 'Cinzel', serif;
      font-size: 6rem; 
      line-height: 0;
      color: var(--teal); 
      opacity: 0.2;
      position: absolute; 
      top: -1rem; 
      left: -2rem;
    }
    .quote-text {
      font-family: 'Cinzel', serif;
      font-size: clamp(1.3rem, 3vw, 1.9rem);
      font-weight: 500;
      line-height: 1.7;
      color: var(--text);
      margin-bottom: 1.5rem;
    }
    .quote-text .accent {
      background: linear-gradient(90deg, var(--teal), var(--orange));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 700;
    }
    .quote-divider {
      width: 60px; 
      height: 2px;
      background: linear-gradient(90deg, var(--orange), var(--gold));
      margin-bottom: 1rem;
    }
    .quote-topic {
      font-size: 0.75rem; 
      letter-spacing: 5px;
      text-transform: uppercase; 
      color: var(--text-dim);
      font-weight: 500;
    }
    @media (max-width: 768px) {
      .quote-item { grid-template-columns: 1fr; gap: 1.5rem; text-align: center; }
      .quote-item:nth-child(even) { direction: ltr; }
      .quote-mark { left: 50%; transform: translateX(-50%); top: -2rem; }
      .quote-divider { margin: 0 auto 1rem; }
    }

    /* ABOUT SECTION */
    .about {
      padding: 12rem 2rem;
      display: flex; 
      justify-content: center; 
      align-items: center;
      min-height: 100vh;
      position: relative;
      overflow: hidden;
    }
    .about::before {
      content: ''; 
      position: absolute; 
      inset: 0;
      background: radial-gradient(ellipse at center, rgba(13, 79, 92, 0.1) 0%, transparent 70%);
    }
    .about-card {
      position: relative;
      max-width: 850px; 
      width: 100%;
      padding: 5rem 4rem;
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(40px) saturate(150%);
      -webkit-backdrop-filter: blur(40px) saturate(150%);
      border: 1px solid var(--border);
      text-align: center;
      opacity: 0; 
      transform: translateY(80px) scale(0.95);
    }
    .about-card::before, .about-card::after {
      content: ''; 
      position: absolute; 
      left: 0; 
      width: 100%; 
      height: 2px;
    }
    .about-card::before {
      top: 0;
      background: linear-gradient(90deg, transparent, var(--teal), var(--orange), var(--gold), transparent);
    }
    .about-card::after {
      bottom: 0;
      background: linear-gradient(90deg, transparent, var(--gold), var(--orange), var(--teal), transparent);
    }
    .about-ornament {
      font-family: 'Cinzel', serif;
      font-size: 10rem; 
      line-height: 0;
      color: var(--teal); 
      opacity: 0.08;
      position: absolute; 
      top: 2rem; 
      left: 2rem;
      pointer-events: none;
    }
    .about-quote {
      font-family: 'Cinzel', serif;
      font-size: clamp(1.4rem, 3vw, 2rem);
      font-weight: 500;
      line-height: 1.9;
      color: var(--text);
      position: relative; 
      z-index: 1;
    }
    .about-quote .teal { color: var(--teal); text-shadow: 0 0 30px var(--teal-glow); font-weight: 700; }
    .about-quote .fire {
      background: linear-gradient(90deg, var(--orange), var(--gold));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 700;
    }
    @media (max-width: 768px) {
      .about-card { padding: 3rem 2rem; }
      .about-ornament { font-size: 6rem; }
    }

    /* CONNECT SECTION */
    .connect {
      padding: 10rem 2rem;
      min-height: 100vh;
      display: flex; 
      flex-direction: column; 
      align-items: center; 
      justify-content: center;
      background: var(--midnight);
      position: relative;
    }
    .connect::before {
      content: ''; 
      position: absolute; 
      top: 0; 
      left: 50%; 
      transform: translateX(-50%);
      width: 1px; 
      height: 100px;
      background: linear-gradient(to bottom, transparent, var(--teal), transparent);
    }
    .connect-header {
      text-align: center; 
      margin-bottom: 6rem;
    }
    .connect-label {
      font-size: 0.75rem; 
      letter-spacing: 6px;
      text-transform: uppercase; 
      color: var(--orange);
      margin-bottom: 1.5rem;
    }
    .connect-title {
      font-family: 'Cinzel', serif;
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 700;
      letter-spacing: 3px;
    }
    .connect-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 3rem;
      max-width: 900px; 
      width: 100%;
    }
    .connect-card {
      position: relative;
      padding: 4rem 3rem;
      background: rgba(255, 255, 255, 0.015);
      border: 1px solid var(--border);
      text-align: center;
      text-decoration: none; 
      color: inherit;
      overflow: hidden;
      transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      opacity: 0; 
      transform: translateY(50px);
    }
    .connect-card::before {
      content: ''; 
      position: absolute; 
      inset: 0;
      background: radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), var(--glow), transparent 40%);
      opacity: 0; 
      transition: opacity 0.3s;
    }
    .connect-card:hover::before { opacity: 1; }
    .connect-card:hover {
      transform: translateY(-8px);
      border-color: var(--accent);
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    }
    .connect-card.teal { --glow: rgba(13, 79, 92, 0.25); --accent: var(--teal); }
    .connect-card.orange { --glow: rgba(232, 114, 42, 0.2); --accent: var(--orange); }
    
    .connect-icon {
      width: 70px; 
      height: 70px;
      margin: 0 auto 2rem;
      border-radius: 50%;
      display: flex; 
      align-items: center; 
      justify-content: center;
      position: relative; 
      z-index: 1;
      transition: transform 0.4s;
    }
    .connect-card:hover .connect-icon { transform: scale(1.1) rotate(-5deg); }
    .connect-card.teal .connect-icon {
      background: rgba(13, 79, 92, 0.15);
      border: 1px solid rgba(13, 79, 92, 0.4);
      box-shadow: 0 0 30px rgba(13, 79, 92, 0.2);
      color: var(--teal);
    }
    .connect-card.orange .connect-icon {
      background: rgba(232, 114, 42, 0.1);
      border: 1px solid rgba(232, 114, 42, 0.3);
      box-shadow: 0 0 30px rgba(232, 114, 42, 0.15);
      color: var(--orange);
    }
    .connect-platform {
      font-family: 'Cinzel', serif;
      font-size: 1.6rem; 
      font-weight: 700;
      margin-bottom: 0.8rem;
      letter-spacing: 2px;
      position: relative; 
      z-index: 1;
    }
    .connect-handle {
      font-size: 0.85rem; 
      color: var(--text-dim);
      letter-spacing: 2px;
      position: relative; 
      z-index: 1;
    }
    @media (max-width: 768px) {
      .connect-grid { grid-template-columns: 1fr; gap: 2rem; }
      .connect-card { padding: 3rem 2rem; }
    }

    /* FOOTER */
    .footer {
      padding: 4rem 2rem;
      text-align: center;
      border-top: 1px solid var(--border);
      background: var(--midnight);
    }
    .footer-name {
      font-family: 'Cinzel', serif;
      font-size: 1.8rem; 
      font-weight: 800;
      background: linear-gradient(90deg, var(--orange), var(--gold), var(--orange));
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gradientShift 3s linear infinite;
      display: inline-block; 
      margin-bottom: 1rem;
    }
    .footer-copy {
      font-size: 0.75rem; 
      color: var(--text-dim);
      letter-spacing: 2px;
    }

    /* Reveal Animation Base */
    .reveal { opacity: 0; transform: translateY(40px); }
  </style>
</head>
<body>

  <!-- Cursor -->
  <div class="cursor cursor-dot"></div>
  <div class="cursor cursor-ring"></div>

  <!-- Nav -->
  <nav class="nav" id="nav">
    <a href="#" class="nav-logo">V<span>.</span>A</a>
    <ul class="nav-links">
      <li><a href="#hero">Anasayfa</a></li>
      <li><a href="#quotes">Sözler</a></li>
      <li><a href="#about">Hakkımda</a></li>
      <li><a href="#connect">İletişim</a></li>
    </ul>
  </nav>

  <!-- Hero -->
  <section class="hero" id="hero">
    <div class="hero-bg"></div>
    
    <div class="particles" id="particles"></div>
    
    <svg class="mountains" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <defs>
        <linearGradient id="mg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0a1520"/>
          <stop offset="100%" stop-color="#030508"/>
        </linearGradient>
        <linearGradient id="mg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#060a12"/>
          <stop offset="100%" stop-color="#030508"/>
        </linearGradient>
      </defs>
      <path class="mountain-layer" data-speed="0.15" d="M0,320 L0,180 Q360,80 720,160 T1440,140 L1440,320 Z" fill="url(#mg1)" opacity="0.6"/>
      <path class="mountain-layer" data-speed="0.35" d="M0,320 L0,220 Q240,160 480,200 T960,180 T1440,220 L1440,320 Z" fill="url(#mg2)" opacity="0.8"/>
      <path class="mountain-layer" data-speed="0.6" d="M0,320 L0,260 L120,200 L200,240 L300,180 L400,230 L500,170 L600,220 L720,160 L840,210 L960,170 L1080,220 L1200,180 L1320,230 L1440,190 L1440,320 Z" fill="#030508"/>
    </svg>
    
    <div class="mist"></div>
    
    <div class="hero-content" id="heroContent">
      <p class="hero-eyebrow">Creative Developer & Designer</p>
      <h1 class="hero-title">Veysel Aslan</h1>
      <p class="hero-subtitle">Sınırları Aş — İz Bırak</p>
      <a href="#quotes" class="hero-cta">Keşfet →</a>
    </div>
    
    <div class="scroll-ind">
      <span class="scroll-text">Keşfet</span>
      <div class="scroll-line"></div>
    </div>
  </section>

  <!-- Quotes -->
  <section class="quotes" id="quotes">
    <div class="quotes-header reveal">
      <p class="quotes-label">Felsefe</p>
      <h2 class="quotes-title">Sözler</h2>
    </div>
    
    <div class="quotes-grid">
      <div class="quote-item reveal">
        <div class="quote-num">01</div>
        <div class="quote-body">
          <span class="quote-mark">"</span>
          <p class="quote-text"><span class="accent">Görüş</span>, karanlıkta yolunu bulabilen tek ışıktır. Gözlerin göremediğini, ruhun <span class="accent">sezer</span>.</p>
          <div class="quote-divider"></div>
          <span class="quote-topic">Vizyon</span>
        </div>
      </div>
      
      <div class="quote-item reveal">
        <div class="quote-num">02</div>
        <div class="quote-body">
          <span class="quote-mark">"</span>
          <p class="quote-text">Sabır, <span class="accent">zamanın</span> mermerine kazınan bir sanattır. Acele eden kaybeder; bekleyen <span class="accent">zaferi</span> bulur.</p>
          <div class="quote-divider"></div>
          <span class="quote-topic">Sabır</span>
        </div>
      </div>
      
      <div class="quote-item reveal">
        <div class="quote-num">03</div>
        <div class="quote-body">
          <span class="quote-mark">"</span>
          <p class="quote-text"><span class="accent">Kararlılık</span>, düşmanın pes ettiği anda seni ayakta tutan tek şeydir. Yorul, ama <span class="accent">yıkılma</span>.</p>
          <div class="quote-divider"></div>
          <span class="quote-topic">Azim</span>
        </div>
      </div>
      
      <div class="quote-item reveal">
        <div class="quote-num">04</div>
        <div class="quote-body">
          <span class="quote-mark">"</span>
          <p class="quote-text">Yaratıcılık, <span class="accent">sınırların</span> ötesinde saklı bir hazinedir. Kuralları bil, sonra onları <span class="accent">parçala</span>.</p>
          <div class="quote-divider"></div>
          <span class="quote-topic">Yaratıcılık</span>
        </div>
      </div>
      
      <div class="quote-item reveal">
        <div class="quote-num">05</div>
        <div class="quote-body">
          <span class="quote-mark">"</span>
          <p class="quote-text">Gelecek, <span class="accent">bugün</span> attığın adımların yankısıdır. Ne ekersen, zamanın <span class="accent">sahibi</span> olursun.</p>
          <div class="quote-divider"></div>
          <span class="quote-topic">Gelecek</span>
        </div>
      </div>
    </div>
  </section>

  <!-- About -->
  <section class="about" id="about">
    <div class="about-card reveal">
      <span class="about-ornament">"</span>
      <p class="about-quote">
        İyi bir tasarım sadece <span class="teal">görülmez</span>. <span class="fire">Hissedilir</span>, yaşanır ve <span class="teal">hatırlanır</span>.
      </p>
    </div>
  </section>

  <!-- Connect -->
  <section class="connect" id="connect">
    <div class="connect-header reveal">
      <p class="connect-label">Bağlantı</p>
      <h2 class="connect-title">İletişim</h2>
    </div>
    
    <div class="connect-grid">
      <a href="https://instagram.com/veyseloffical433" target="_blank" class="connect-card teal reveal" onmousemove="handleMouseMove(event, this)" onmouseleave="handleMouseLeave(this)">
        <div class="connect-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </div>
        <h3 class="connect-platform">Instagram</h3>
        <p class="connect-handle">@veyseloffical433</p>
      </a>
      
      <a href="https://t.me/veyseloffical" target="_blank" class="connect-card orange reveal" onmousemove="handleMouseMove(event, this)" onmouseleave="handleMouseLeave(this)">
        <div class="connect-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </div>
        <h3 class="connect-platform">Telegram</h3>
        <p class="connect-handle">@veyseloffical</p>
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <span class="footer-name">Veysel Aslan</span>
    <p class="footer-copy">© 2026 Tüm Hakları Saklıdır.</p>
  </footer>

  <script>
    gsap.registerPlugin(ScrollTrigger);

    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    // =====================
    // CURSOR
    // =====================
    if (!isTouch) {
      const dot = document.querySelector('.cursor-dot');
      const ring = document.querySelector('.cursor-ring');
      let mx = 0, my = 0, rx = 0, ry = 0;

      document.addEventListener('mousemove', e => {
        mx = e.clientX; 
        my = e.clientY;
        dot.style.left = mx + 'px'; 
        dot.style.top = my + 'px';
      });

      function loop() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px'; 
        ring.style.top = ry + 'px';
        requestAnimationFrame(loop);
      }
      loop();

      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
      });
    }

    // =====================
    // NAV SCROLL
    // =====================
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // =====================
    // CSS PARTICLES (Lag-Free)
    // =====================
    const particleContainer = document.getElementById('particles');
    const pCount = isTouch ? 15 : 35;
    const colors = ['rgba(13,79,92,', 'rgba(232,114,42,', 'rgba(212,168,83,'];

    for (let i = 0; i < pCount; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 3 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = \`
        width: \${size}px; 
        height: \${size}px;
        left: \${Math.random() * 100}%;
        background: \${color}\${Math.random() * 0.4 + 0.2});
        animation-duration: \${Math.random() * 15 + 10}s;
        animation-delay: \${Math.random() * 10}s;
      \`;
      particleContainer.appendChild(p);
    }

    // =====================
    // PARALLAX (Optimized)
    // =====================
    const heroContent = document.getElementById('heroContent');
    const mountainLayers = document.querySelectorAll('.mountain-layer');

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const vh = window.innerHeight;
      
      if (scrolled < vh * 1.2) {
        heroContent.style.transform = \`translateY(\${scrolled * 0.4}px)\`;
        heroContent.style.opacity = Math.max(0, 1 - scrolled / (vh * 0.6));
        
        mountainLayers.forEach(layer => {
          const speed = parseFloat(layer.dataset.speed);
          layer.style.transform = \`translateY(\${scrolled * speed}px)\`;
        });
      }
    }, { passive: true });

    // =====================
    // GSAP REVEALS (Smooth)
    // =====================
    gsap.utils.toArray('.reveal').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Quote items stagger
    gsap.utils.toArray('.quote-item').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });

    // About card special
    gsap.to('.about-card', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-card',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    // =====================
    // CONNECT CARD MOUSE
    // =====================
    function handleMouseMove(e, card) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--y', (e.clientY - rect.top) + 'px');
    }
    function handleMouseLeave(card) {
      card.style.setProperty('--x', '50%');
      card.style.setProperty('--y', '50%');
    }

    // =====================
    // SMOOTH ANCHORS
    // =====================
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function(e) {
        e.preventDefault();
        const t = document.querySelector(this.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth' });
      });
    });
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });
  },
};
