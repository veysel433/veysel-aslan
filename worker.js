export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname !== '/' && url.pathname !== '/index.html') {
      return new Response('Not Found', { status: 404 });
    }

    const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Veysel Aslan / Creative Developer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Raleway:ital,wght@0,200;0,300;0,400;0,500;1,300&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    :root{
      --bg:#050810;
      --teal-deep:#0a1628;
      --teal:#0d4f5c;
      --teal-glow:rgba(13,200,200,0.15);
      --orange:#e8722a;
      --orange-glow:rgba(232,114,42,0.25);
      --gold:#d4a853;
      --gold-glow:rgba(212,168,83,0.3);
      --text-primary:#e8e0d0;
      --text-secondary:#8a9bb0;
      --border:rgba(13,200,200,0.12);
      --surface:rgba(10,22,40,0.7);
    }
    html{scroll-behavior:smooth;background:var(--bg);overflow-x:hidden}
    body{
      font-family:'Raleway',sans-serif;
      background:var(--bg);
      color:var(--text-primary);
      overflow-x:hidden;
      cursor:none;
      -webkit-font-smoothing:antialiased;
    }

    /* ── CURSOR ── */
    .cursor{
      position:fixed;width:10px;height:10px;
      background:var(--orange);border-radius:50%;
      pointer-events:none;z-index:99999;
      transform:translate(-50%,-50%);
      box-shadow:0 0 10px var(--orange-glow),0 0 20px var(--orange-glow);
      transition:width .2s,height .2s;
    }
    .cursor-ring{
      position:fixed;width:40px;height:40px;
      border:1px solid rgba(13,200,200,0.6);border-radius:50%;
      pointer-events:none;z-index:99998;
      transform:translate(-50%,-50%);
      transition:all .12s ease-out;
    }
    .cursor.hov{width:50px;height:50px;background:rgba(232,114,42,.15);border:1px solid var(--orange)}
    .cursor-ring.hov{width:70px;height:70px;border-color:rgba(232,114,42,.4)}

    /* ── PARALLAX HERO ── */
    .parallax-hero{
      position:relative;height:100vh;overflow:hidden;
      display:flex;align-items:center;justify-content:center;
    }
    /* Layer 0 – Sky / deep bg */
    .layer-bg{
      position:absolute;inset:0;z-index:0;
      background:
        radial-gradient(ellipse 80% 50% at 50% 0%, rgba(13,79,92,0.5) 0%, transparent 60%),
        radial-gradient(ellipse 60% 40% at 70% 30%, rgba(232,114,42,0.08) 0%, transparent 50%),
        linear-gradient(180deg, #050d1a 0%, #030810 40%, #050810 100%);
      will-change:transform;
    }
    /* Nebula rings */
    .layer-bg::before{
      content:'';position:absolute;
      width:700px;height:700px;
      top:50%;left:50%;transform:translate(-50%,-60%);
      background:radial-gradient(circle, rgba(13,200,200,0.07) 0%, rgba(13,79,92,0.05) 30%, transparent 70%);
      border-radius:50%;
      box-shadow:0 0 120px 40px rgba(13,200,200,0.04),inset 0 0 80px rgba(13,200,200,0.03);
      animation:nebulaPulse 8s ease-in-out infinite;
    }
    .layer-bg::after{
      content:'';position:absolute;
      width:400px;height:400px;
      top:30%;left:55%;transform:translate(-50%,-50%);
      background:radial-gradient(circle, rgba(232,114,42,0.12) 0%, transparent 70%);
      border-radius:50%;
      animation:moonGlow 6s ease-in-out infinite alternate;
    }
    @keyframes nebulaPulse{0%,100%{opacity:.7;transform:translate(-50%,-60%) scale(1)}50%{opacity:1;transform:translate(-50%,-60%) scale(1.05)}}
    @keyframes moonGlow{0%{opacity:.6}100%{opacity:1}}

    /* Layer 1 – Floating mountains (mid) */
    .layer-mid{
      position:absolute;inset:0;z-index:1;
      will-change:transform;
      pointer-events:none;
    }
    /* SVG mountains injected via canvas */
    .mountain-svg{
      position:absolute;bottom:0;width:100%;height:70%;
    }

    /* Layer 2 – Mist / atmosphere */
    .layer-mist{
      position:absolute;inset:0;z-index:2;
      pointer-events:none;
      background:linear-gradient(to top, rgba(5,8,16,0) 0%, rgba(5,8,16,0.08) 50%, rgba(5,8,16,0) 100%);
      will-change:transform;
    }

    /* Layer 3 – Foreground rocks silhouette */
    .layer-fg{
      position:absolute;inset:0;z-index:3;
      pointer-events:none;
      will-change:transform;
    }

    /* Layer 4 – Particles canvas */
    #particle-canvas{
      position:absolute;inset:0;z-index:4;
      pointer-events:none;
      opacity:.9;
    }

    /* Layer 5 – Hero content */
    .hero-content{
      position:relative;z-index:10;
      text-align:center;
      padding:2rem;
    }
    .hero-badge{
      display:inline-block;
      padding:.5rem 2rem;
      border:1px solid rgba(13,200,200,0.3);
      border-radius:2px;
      font-size:.65rem;letter-spacing:6px;
      text-transform:uppercase;
      color:rgba(13,220,220,0.8);
      margin-bottom:2rem;
      background:rgba(13,200,200,0.05);
      backdrop-filter:blur(10px);
      clip-path:polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
    }
    .hero-title{
      font-family:'Cinzel',serif;
      font-size:clamp(4rem,11vw,9.5rem);
      font-weight:900;
      line-height:.88;
      letter-spacing:.05em;
      text-transform:uppercase;
      color:var(--text-primary);
      text-shadow:0 0 60px rgba(13,200,200,0.15),0 0 120px rgba(13,200,200,0.08);
      margin-bottom:1.5rem;
    }
    .hero-title .fire{
      display:block;
      background:linear-gradient(135deg,#e8722a 0%,#f0a050 40%,#d4a853 60%,#e8722a 100%);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
      filter:drop-shadow(0 0 30px rgba(232,114,42,0.4));
      animation:fireShimmer 4s ease-in-out infinite;
    }
    @keyframes fireShimmer{
      0%,100%{filter:drop-shadow(0 0 30px rgba(232,114,42,.4))}
      50%{filter:drop-shadow(0 0 50px rgba(232,114,42,.7)) drop-shadow(0 0 80px rgba(212,168,83,.3))}
    }
    .hero-sub{
      font-family:'Raleway',sans-serif;
      font-size:.9rem;font-weight:300;
      letter-spacing:5px;text-transform:uppercase;
      color:var(--text-secondary);
      margin-top:1rem;
    }
    .hero-cta{
      display:inline-flex;align-items:center;gap:.8rem;
      margin-top:3rem;
      padding:1rem 3rem;
      background:rgba(232,114,42,0.1);
      border:1px solid rgba(232,114,42,0.4);
      border-radius:2px;
      color:var(--orange);
      text-decoration:none;
      font-family:'Raleway',sans-serif;
      font-size:.8rem;letter-spacing:4px;text-transform:uppercase;
      backdrop-filter:blur(20px);
      transition:all .4s;
      clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);
      position:relative;overflow:hidden;
    }
    .hero-cta::before{
      content:'';position:absolute;inset:0;
      background:linear-gradient(90deg,transparent,rgba(232,114,42,.1),transparent);
      transform:translateX(-100%);transition:transform .6s;
    }
    .hero-cta:hover::before{transform:translateX(100%)}
    .hero-cta:hover{
      background:rgba(232,114,42,0.2);
      border-color:rgba(232,114,42,0.7);
      box-shadow:0 0 30px rgba(232,114,42,0.3),inset 0 0 20px rgba(232,114,42,0.05);
      color:#f0c070;
    }

    .scroll-indicator{
      position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);
      display:flex;flex-direction:column;align-items:center;gap:.8rem;
      z-index:10;color:rgba(255,255,255,.3);
      font-size:.6rem;letter-spacing:4px;text-transform:uppercase;
    }
    .scroll-line{
      width:1px;height:60px;
      background:linear-gradient(to bottom,var(--teal),transparent);
      animation:scrollDrop 2s ease-in-out infinite;
    }
    @keyframes scrollDrop{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}

    /* ── NAV ── */
    .nav{
      position:fixed;top:0;left:0;right:0;z-index:100;
      padding:1.8rem 4rem;
      display:flex;justify-content:space-between;align-items:center;
      background:linear-gradient(to bottom,rgba(5,8,16,0.6),transparent);
      backdrop-filter:blur(0px);
      transition:all .4s;
    }
    .nav.scrolled{
      backdrop-filter:blur(20px);
      background:rgba(5,8,16,0.85);
      border-bottom:1px solid var(--border);
      padding:1.2rem 4rem;
    }
    .nav-logo{
      font-family:'Cinzel',serif;
      font-weight:700;font-size:1.1rem;
      letter-spacing:4px;text-transform:uppercase;
      color:var(--text-primary);
    }
    .nav-logo span{color:var(--orange)}
    .nav-links{display:flex;gap:3rem;list-style:none}
    .nav-links a{
      color:rgba(232,224,208,.6);text-decoration:none;
      font-size:.75rem;font-weight:400;letter-spacing:2px;text-transform:uppercase;
      transition:color .3s;position:relative;
    }
    .nav-links a::after{
      content:'';position:absolute;bottom:-4px;left:0;
      width:0;height:1px;background:var(--teal);transition:width .3s;
    }
    .nav-links a:hover{color:rgba(13,220,220,.9)}
    .nav-links a:hover::after{width:100%}

    /* ── ABOUT ── */
    .about-section{
      min-height:100vh;display:flex;align-items:center;justify-content:center;
      padding:8rem 2rem;position:relative;
      background:linear-gradient(180deg,var(--bg) 0%,rgba(8,15,28,1) 50%,var(--bg) 100%);
      overflow:hidden;
    }
    .about-section::before{
      content:'';position:absolute;
      width:600px;height:600px;
      top:50%;left:50%;transform:translate(-50%,-50%);
      background:radial-gradient(circle,rgba(13,200,200,0.04) 0%,transparent 70%);
      pointer-events:none;
    }
    .about-card{
      max-width:820px;width:100%;
      background:rgba(10,22,40,0.6);
      border:1px solid var(--border);
      border-radius:4px;
      padding:5rem 4rem;
      text-align:center;
      position:relative;
      overflow:hidden;
      backdrop-filter:blur(40px);
      clip-path:polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,20px 100%,0 calc(100% - 20px));
    }
    .about-card::before{
      content:'';position:absolute;
      top:0;left:0;right:0;height:1px;
      background:linear-gradient(90deg,transparent,rgba(13,200,200,0.4),rgba(232,114,42,0.4),transparent);
    }
    .about-card::after{
      content:'';position:absolute;
      bottom:0;left:0;right:0;height:1px;
      background:linear-gradient(90deg,transparent,rgba(232,114,42,0.3),transparent);
    }
    .about-ornament{
      font-family:'Cinzel',serif;
      font-size:5rem;color:rgba(13,200,200,0.06);
      position:absolute;top:1.5rem;left:2.5rem;
      line-height:1;user-select:none;
    }
    .about-quote{
      font-family:'Cinzel',serif;
      font-size:clamp(1.6rem,3.5vw,2.5rem);
      font-weight:600;line-height:1.4;
      color:var(--text-primary);
      margin-bottom:2rem;position:relative;z-index:1;
    }
    .about-quote .teal{color:rgba(13,220,220,0.9);text-shadow:0 0 20px rgba(13,200,200,0.4)}
    .about-quote .fire-text{
      background:linear-gradient(135deg,#e8722a,#f0a050,#d4a853);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    }
    .about-author{
      font-size:.7rem;letter-spacing:6px;text-transform:uppercase;
      color:rgba(13,200,200,0.5);position:relative;z-index:1;
    }
    .about-author::before{
      content:'';display:inline-block;width:30px;height:1px;
      background:rgba(13,200,200,0.4);vertical-align:middle;margin-right:1rem;
    }
    .about-author::after{
      content:'';display:inline-block;width:30px;height:1px;
      background:rgba(13,200,200,0.4);vertical-align:middle;margin-left:1rem;
    }

    /* ── CONNECT ── */
    .connect-section{
      padding:10rem 2rem;min-height:100vh;
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      position:relative;
      background:var(--bg);
    }
    .connect-section::before{
      content:'';position:absolute;inset:0;
      background:
        radial-gradient(ellipse 50% 40% at 30% 50%,rgba(13,79,92,0.08) 0%,transparent 60%),
        radial-gradient(ellipse 40% 30% at 70% 50%,rgba(232,114,42,0.06) 0%,transparent 60%);
      pointer-events:none;
    }
    .section-eyebrow{
      font-size:.65rem;letter-spacing:7px;text-transform:uppercase;
      color:rgba(13,220,220,0.7);margin-bottom:1.2rem;
    }
    .section-title{
      font-family:'Cinzel',serif;
      font-size:clamp(2.5rem,6vw,5rem);
      font-weight:700;letter-spacing:.05em;text-transform:uppercase;
      line-height:.9;text-align:center;margin-bottom:5rem;
    }
    .section-title .fire{
      display:block;
      background:linear-gradient(135deg,#e8722a,#f0a050,#d4a853);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
      filter:drop-shadow(0 0 20px rgba(232,114,42,0.3));
    }
    .connect-grid{
      display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
      gap:1.5rem;max-width:900px;width:100%;
    }
    .connect-card{
      background:rgba(10,22,40,0.5);
      border:1px solid rgba(13,200,200,0.12);
      border-radius:4px;
      padding:3rem 2rem;
      text-decoration:none;color:inherit;
      transition:all .4s cubic-bezier(.16,1,.3,1);
      position:relative;overflow:hidden;
      display:flex;flex-direction:column;align-items:center;
      text-align:center;gap:1.5rem;
      clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px));
      backdrop-filter:blur(20px);
    }
    .connect-card::before{
      content:'';position:absolute;
      top:0;left:0;right:0;height:1px;
      background:linear-gradient(90deg,transparent,rgba(13,200,200,0.5),transparent);
      opacity:0;transition:opacity .4s;
    }
    .connect-card:hover::before{opacity:1}
    .connect-card::after{
      content:'';position:absolute;inset:0;
      background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(13,200,200,0.08) 0%,transparent 60%);
      opacity:0;transition:opacity .4s;
    }
    .connect-card:hover::after{opacity:1}
    .connect-card:hover{
      border-color:rgba(13,200,200,0.3);
      transform:translateY(-6px);
      box-shadow:0 20px 60px rgba(0,0,0,.6),0 0 40px rgba(13,200,200,0.08);
    }
    .connect-card.orange-card:hover{
      border-color:rgba(232,114,42,0.3);
      box-shadow:0 20px 60px rgba(0,0,0,.6),0 0 40px rgba(232,114,42,0.1);
    }
    .connect-card.orange-card::after{
      background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(232,114,42,0.1) 0%,transparent 60%);
    }
    .connect-card.orange-card::before{
      background:linear-gradient(90deg,transparent,rgba(232,114,42,0.5),transparent);
    }
    .connect-icon{
      width:64px;height:64px;border-radius:50%;
      background:rgba(13,200,200,0.06);
      border:1px solid rgba(13,200,200,0.2);
      display:flex;align-items:center;justify-content:center;
      position:relative;z-index:1;
      transition:all .4s;
    }
    .connect-card.orange-card .connect-icon{
      background:rgba(232,114,42,0.06);border-color:rgba(232,114,42,0.2);
    }
    .connect-card:hover .connect-icon{box-shadow:0 0 20px rgba(13,200,200,0.2)}
    .connect-card.orange-card:hover .connect-icon{box-shadow:0 0 20px rgba(232,114,42,0.2)}
    .connect-icon svg{width:26px;height:26px;fill:rgba(13,220,220,0.8)}
    .connect-card.orange-card .connect-icon svg{fill:var(--orange)}
    .connect-platform{
      font-family:'Cinzel',serif;font-weight:600;font-size:1.2rem;
      letter-spacing:.05em;position:relative;z-index:1;
    }
    .connect-username{
      font-size:.8rem;color:var(--text-secondary);
      position:relative;z-index:1;letter-spacing:1px;
    }
    .connect-arrow{
      position:relative;z-index:1;
      font-size:1.1rem;color:rgba(13,220,220,0.6);
      transition:transform .3s;
    }
    .connect-card.orange-card .connect-arrow{color:rgba(232,114,42,0.6)}
    .connect-card:hover .connect-arrow{transform:translate(4px,-4px);color:rgba(13,220,220,1)}
    .connect-card.orange-card:hover .connect-arrow{color:var(--orange)}

    /* ── FOOTER ── */
    .footer{
      padding:4rem 2rem;text-align:center;
      border-top:1px solid rgba(13,200,200,0.08);
      background:var(--bg);
    }
    .footer-name{
      font-family:'Cinzel',serif;font-size:1.8rem;font-weight:700;
      letter-spacing:.1em;text-transform:uppercase;margin-bottom:1rem;
    }
    .footer-name .fire{
      background:linear-gradient(135deg,#e8722a,#f0a050,#d4a853);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    }
    .footer-copy{font-size:.7rem;color:rgba(138,155,176,.5);letter-spacing:3px;text-transform:uppercase}

    ::selection{background:rgba(13,200,200,0.25);color:#fff}

    @media(max-width:768px){
      .nav{padding:1.5rem}
      .nav-links{display:none}
      .about-card{padding:3rem 1.5rem}
      .connect-grid{grid-template-columns:1fr}
    }
  </style>
</head>
<body>
  <div class="cursor" id="cursor"></div>
  <div class="cursor-ring" id="cursorRing"></div>

  <nav class="nav" id="nav">
    <div class="nav-logo">V<span>.</span>A</div>
    <ul class="nav-links">
      <li><a href="#home">Anasayfa</a></li>
      <li><a href="#about">Hakkımda</a></li>
      <li><a href="#connect">İletişim</a></li>
    </ul>
  </nav>

  <!-- ═══════════ PARALLAX HERO ═══════════ -->
  <section class="parallax-hero" id="home">
    <!-- Layer 0: Background sky -->
    <div class="layer-bg" id="layerBg"></div>

    <!-- Layer 1: Mountain silhouettes (mid, 0.2x speed) -->
    <div class="layer-mid" id="layerMid">
      <svg class="mountain-svg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
        <!-- Floating mountains (back) -->
        <g opacity="0.5">
          <path d="M-50,600 L100,320 L200,400 L350,180 L500,350 L600,260 L700,380 L800,200 L950,340 L1100,160 L1250,300 L1380,220 L1490,350 L1490,600 Z" fill="url(#mountGrad1)"/>
        </g>
        <!-- Mid mountains -->
        <g opacity="0.7">
          <path d="M-50,600 L150,420 L280,480 L420,300 L520,380 L650,320 L750,420 L900,280 L1000,370 L1100,290 L1250,400 L1380,340 L1490,420 L1490,600 Z" fill="url(#mountGrad2)"/>
        </g>
        <!-- Glowing portal circle -->
        <circle cx="720" cy="230" r="90" fill="none" stroke="url(#portalGrad)" stroke-width="2" opacity="0.6"/>
        <circle cx="720" cy="230" r="70" fill="url(#portalFill)" opacity="0.15"/>
        <circle cx="720" cy="230" r="60" fill="none" stroke="rgba(13,200,200,0.3)" stroke-width="1"/>
        <!-- Adventurer silhouette -->
        <g transform="translate(700,340)">
          <rect x="-3" y="-50" width="6" height="50" fill="#060d1a" rx="3"/>
          <ellipse cx="0" cy="-55" rx="7" ry="7" fill="#060d1a"/>
          <path d="M-3,-45 L-20,0 L20,0 L3,-45" fill="#060d1a"/>
          <path d="M0,-40 L-15,-15" stroke="#060d1a" stroke-width="3" stroke-linecap="round"/>
          <path d="M0,-40 L18,-20" stroke="#060d1a" stroke-width="2" stroke-linecap="round"/>
        </g>
        <defs>
          <linearGradient id="mountGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0a2030" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#060d1a" stop-opacity="1"/>
          </linearGradient>
          <linearGradient id="mountGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#050d1a" stop-opacity="1"/>
            <stop offset="100%" stop-color="#030810" stop-opacity="1"/>
          </linearGradient>
          <radialGradient id="portalGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(13,220,220,0.8)"/>
            <stop offset="100%" stop-color="rgba(232,114,42,0.8)"/>
          </radialGradient>
          <radialGradient id="portalFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(13,200,200,1)"/>
            <stop offset="100%" stop-color="rgba(232,114,42,0)"/>
          </radialGradient>
        </defs>
      </svg>
    </div>

    <!-- Layer 2: Atmospheric mist -->
    <div class="layer-mist" id="layerMist"></div>

    <!-- Layer 3: Foreground rocks (0.8x speed – appears to move faster) -->
    <div class="layer-fg" id="layerFg">
      <svg style="position:absolute;bottom:0;width:100%;height:50%" viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
        <!-- Dark jagged rocks -->
        <path d="M-20,300 L0,150 L30,220 L70,80 L100,180 L140,60 L180,140 L220,300 Z" fill="#020508"/>
        <path d="M1220,300 L1260,120 L1300,200 L1340,90 L1380,160 L1420,80 L1460,300 Z" fill="#020508"/>
        <!-- Icicles left -->
        <path d="M0,140 L8,300 L-8,300 Z" fill="#030a18" opacity="0.8"/>
        <path d="M25,80 L33,300 L17,300 Z" fill="#030a18" opacity="0.7"/>
        <path d="M55,140 L63,300 L47,300 Z" fill="#030a18" opacity="0.8"/>
        <!-- Icicles right -->
        <path d="M1415,90 L1423,300 L1407,300 Z" fill="#030a18" opacity="0.8"/>
        <path d="M1390,150 L1398,300 L1382,300 Z" fill="#030a18" opacity="0.7"/>
        <!-- Ground fog effect -->
        <path d="M-20,300 L1460,300 L1460,260 Q900,240 720,255 Q400,270 -20,250 Z" fill="#030810" opacity="0.9"/>
      </svg>
    </div>

    <!-- Particles canvas -->
    <canvas id="particle-canvas"></canvas>

    <!-- Hero content -->
    <div class="hero-content">
      <div class="hero-badge">Creative Developer</div>
      <h1 class="hero-title">
        Veysel<br>
        <span class="fire">Aslan</span>
      </h1>
      <p class="hero-sub">Sınırları Aş — İz Bırak</p>
      <a href="#connect" class="hero-cta">Birlikte Çalış ↗</a>
    </div>

    <div class="scroll-indicator">
      <span>Keşfet</span>
      <div class="scroll-line"></div>
    </div>
  </section>

  <!-- ═══════════ ABOUT ═══════════ -->
  <section class="about-section" id="about">
    <div class="about-card">
      <div class="about-ornament">"</div>
      <p class="about-quote">
        İyi bir <span class="teal">tasarım</span> sadece görülmez.<br>
        Hissedilir, yaşanır ve <span class="fire-text">hatırlanır.</span>
      </p>
      <p class="about-author">Veysel Aslan</p>
    </div>
  </section>

  <!-- ═══════════ CONNECT ═══════════ -->
  <section class="connect-section" id="connect">
    <p class="section-eyebrow">Bağlantı Kur</p>
    <h2 class="section-title">
      Birlikte<br>
      <span class="fire">Çalışalım.</span>
    </h2>
    <div class="connect-grid">
      <a href="https://www.instagram.com/veyseloffical433?igsh=cjZjbG9yNHIyc3B2&utm_source=qr" target="_blank" rel="noopener" class="connect-card orange-card" id="ig-card">
        <div class="connect-icon">
          <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        </div>
        <div class="connect-platform">Instagram</div>
        <div class="connect-username">@veyseloffical433</div>
        <span class="connect-arrow">↗</span>
      </a>
      <a href="https://t.me/veyseloffical" target="_blank" rel="noopener" class="connect-card" id="tg-card">
        <div class="connect-icon">
          <svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        </div>
        <div class="connect-platform">Telegram</div>
        <div class="connect-username">@veyseloffical</div>
        <span class="connect-arrow">↗</span>
      </a>
    </div>
  </section>

  <footer class="footer">
    <p class="footer-name"><span class="fire">Veysel</span> Aslan</p>
    <p class="footer-copy">© 2026 — Tüm hakları saklıdır</p>
  </footer>

  <script>
    gsap.registerPlugin(ScrollTrigger);

    /* ── CURSOR ── */
    const cur=document.getElementById('cursor');
    const ring=document.getElementById('cursorRing');
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',e=>{
      mx=e.clientX;my=e.clientY;
      cur.style.left=mx+'px';cur.style.top=my+'px';
    });
    (function loop(){
      rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
      ring.style.left=rx+'px';ring.style.top=ry+'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a,button,.connect-card,.about-card').forEach(el=>{
      el.addEventListener('mouseenter',()=>{cur.classList.add('hov');ring.classList.add('hov')});
      el.addEventListener('mouseleave',()=>{cur.classList.remove('hov');ring.classList.remove('hov')});
    });

    /* ── CARD MOUSE RADIAL ── */
    document.querySelectorAll('.connect-card').forEach(c=>{
      c.addEventListener('mousemove',e=>{
        const r=c.getBoundingClientRect();
        c.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
        c.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
      });
    });

    /* ── PARALLAX SCROLL (3 speeds) ── */
    // Background: 0.2x (slowest)
    gsap.to('#layerBg',{
      yPercent:-20,ease:'none',
      scrollTrigger:{trigger:'.parallax-hero',start:'top top',end:'bottom top',scrub:true}
    });
    // Mid mountains: 0.5x
    gsap.to('#layerMid',{
      yPercent:-50,ease:'none',
      scrollTrigger:{trigger:'.parallax-hero',start:'top top',end:'bottom top',scrub:true}
    });
    // Mist: subtle
    gsap.to('#layerMist',{
      yPercent:-30,opacity:.4,ease:'none',
      scrollTrigger:{trigger:'.parallax-hero',start:'top top',end:'bottom top',scrub:true}
    });
    // Foreground: 1x (fastest)
    gsap.to('#layerFg',{
      yPercent:20,ease:'none',
      scrollTrigger:{trigger:'.parallax-hero',start:'top top',end:'bottom top',scrub:true}
    });
    // Hero content: gentle float up
    gsap.to('.hero-content',{
      yPercent:-15,opacity:0,ease:'none',
      scrollTrigger:{trigger:'.parallax-hero',start:'30% top',end:'bottom top',scrub:true}
    });

    /* ── PARTICLE CANVAS ── */
    const canvas=document.getElementById('particle-canvas');
    const ctx=canvas.getContext('2d');
    let W,H;
    function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
    window.addEventListener('resize',resize);resize();

    class Particle{
      constructor(){this.init()}
      init(){
        this.x=Math.random()*W;this.y=Math.random()*H;
        this.size=Math.random()*1.2+.3;
        this.vx=(Math.random()-.5)*.25;this.vy=-Math.random()*.35-.05;
        this.life=0;this.maxLife=Math.random()*200+100;
        this.type=Math.random()<.6?'teal':'orange';
        this.opacity=0;
      }
      update(){
        this.life++;
        const t=this.life/this.maxLife;
        this.opacity=t<.2?(t/.2):(1-t);
        this.x+=this.vx;this.y+=this.vy;
        if(this.life>=this.maxLife)this.init();
      }
      draw(){
        ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        const col=this.type==='teal'?'13,200,200':'232,114,42';
        ctx.fillStyle='rgba('+col+','+this.opacity+')';
        ctx.fill();
      }
    }
    const particles=[];
    for(let i=0;i<180;i++){
      const p=new Particle();
      p.life=Math.random()*p.maxLife; // stagger
      particles.push(p);
    }

    // Mist overlay
    function drawMist(){
      const g=ctx.createLinearGradient(0,H*.6,0,H);
      g.addColorStop(0,'rgba(5,8,16,0)');
      g.addColorStop(1,'rgba(5,8,16,0.15)');
      ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    }

    function animate(){
      ctx.clearRect(0,0,W,H);
      drawMist();
      // Draw connection lines between close teal particles
      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
          if(particles[i].type!=='teal'||particles[j].type!=='teal')continue;
          const dx=particles[i].x-particles[j].x;
          const dy=particles[i].y-particles[j].y;
          const d=Math.sqrt(dx*dx+dy*dy);
          if(d<80){
            ctx.beginPath();
            ctx.moveTo(particles[i].x,particles[i].y);
            ctx.lineTo(particles[j].x,particles[j].y);
            ctx.strokeStyle='rgba(13,200,200,'+(0.05*(1-d/80))+')';
            ctx.lineWidth=.5;ctx.stroke();
          }
        }
      }
      particles.forEach(p=>{p.update();p.draw()});
      requestAnimationFrame(animate);
    }
    animate();

    /* ── NAV SCROLL ── */
    window.addEventListener('scroll',()=>{
      document.getElementById('nav').classList.toggle('scrolled',window.scrollY>60);
    });

    /* ── REVEAL ANIMATIONS ── */
    gsap.fromTo('.about-card',
      {opacity:0,y:60},
      {opacity:1,y:0,duration:1,ease:'power3.out',
        scrollTrigger:{trigger:'.about-section',start:'top 75%'}}
    );
    gsap.fromTo('.connect-card',
      {opacity:0,y:40},
      {opacity:1,y:0,duration:.8,ease:'power3.out',stagger:.2,
        scrollTrigger:{trigger:'.connect-section',start:'top 75%'}}
    );
    gsap.fromTo('.section-title,.section-eyebrow',
      {opacity:0,y:30},
      {opacity:1,y:0,duration:.8,ease:'power3.out',stagger:.1,
        scrollTrigger:{trigger:'.connect-section',start:'top 80%'}}
    );

    // Hero entrance
    gsap.fromTo('.hero-badge',{opacity:0,y:20},{opacity:1,y:0,duration:1,delay:.3,ease:'power3.out'});
    gsap.fromTo('.hero-title',{opacity:0,y:40},{opacity:1,y:0,duration:1.2,delay:.5,ease:'power3.out'});
    gsap.fromTo('.hero-sub',{opacity:0,y:20},{opacity:1,y:0,duration:1,delay:.9,ease:'power3.out'});
    gsap.fromTo('.hero-cta',{opacity:0,y:20},{opacity:1,y:0,duration:1,delay:1.1,ease:'power3.out'});

    /* ── SMOOTH SCROLL ── */
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click',e=>{
        e.preventDefault();
        const t=document.querySelector(a.getAttribute('href'));
        if(t)t.scrollIntoView({behavior:'smooth'});
      });
    });
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  },
};
