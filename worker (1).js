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
<title>Veysel Aslan — Mastery & Legacy</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --bg-primary: #0a0a0f;
    --bg-secondary: #111118;
    --bg-card: rgba(255,255,255,0.03);
    --text-primary: #ffffff;
    --text-secondary: #8892b0;
    --accent: #00d4ff;
    --accent-secondary: #7b2cbf;
    --accent-gradient: linear-gradient(135deg, #00d4ff 0%, #7b2cbf 100%);
    --glass: rgba(255,255,255,0.05);
    --glass-border: rgba(255,255,255,0.1);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    overflow-x: hidden;
    line-height: 1.6;
    cursor: none;
  }

  /* Custom Cursor */
  .cursor {
    position: fixed; width: 12px; height: 12px;
    background: var(--accent);
    border-radius: 50%;
    pointer-events: none; z-index: 99999;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s, background 0.3s;
    mix-blend-mode: difference;
    box-shadow: 0 0 20px var(--accent), 0 0 40px var(--accent);
  }
  .cursor.hover {
    width: 40px; height: 40px;
    background: transparent;
    border: 2px solid var(--accent);
    box-shadow: 0 0 30px var(--accent);
  }
  .cursor-ring {
    position: fixed; width: 40px; height: 40px;
    border: 1px solid rgba(0,212,255,0.3);
    border-radius: 50%;
    pointer-events: none; z-index: 99998;
    transform: translate(-50%, -50%);
    transition: all 0.15s ease-out;
  }

  /* Particle Canvas */
  #particles {
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 0; pointer-events: none;
  }

  /* Navigation */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 48px;
    background: rgba(10,10,15,0.7);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--glass-border);
    transition: all 0.4s ease;
  }
  nav.scrolled {
    padding: 16px 48px;
    background: rgba(10,10,15,0.95);
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
  }
  .nav-logo {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 28px; font-weight: 700;
    color: var(--text-primary);
    text-decoration: none;
    letter-spacing: -1px;
    position: relative;
  }
  .nav-logo::after {
    content: ''; position: absolute;
    bottom: -4px; left: 0; width: 100%; height: 2px;
    background: var(--accent-gradient);
    transform: scaleX(0); transform-origin: right;
    transition: transform 0.4s ease;
  }
  .nav-logo:hover::after {
    transform: scaleX(1); transform-origin: left;
  }
  .nav-logo span {
    background: var(--accent-gradient);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .nav-links {
    display: flex; gap: 40px; list-style: none;
  }
  .nav-links a {
    font-size: 14px; font-weight: 500;
    color: var(--text-secondary); text-decoration: none;
    position: relative; padding: 8px 0;
    transition: color 0.3s ease;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .nav-links a::before {
    content: ''; position: absolute;
    bottom: 0; left: 0; width: 0; height: 2px;
    background: var(--accent-gradient);
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .nav-links a:hover { color: var(--text-primary); }
  .nav-links a:hover::before { width: 100%; }
  .nav-cta {
    padding: 12px 28px;
    background: var(--accent-gradient);
    color: white;
    font-size: 14px; font-weight: 600;
    text-decoration: none; border-radius: 8px;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
    border: none;
    letter-spacing: 0.5px;
  }
  .nav-cta::before {
    content: ''; position: absolute;
    top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.6s ease;
  }
  .nav-cta:hover::before { left: 100%; }
  .nav-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0,212,255,0.3);
  }

  /* Hero */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center;
    padding: 140px 48px 80px;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; top: -50%; right: -20%;
    width: 800px; height: 800px;
    background: radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%);
    animation: float 8s ease-in-out infinite;
    pointer-events: none;
  }
  .hero::after {
    content: '';
    position: absolute; bottom: -30%; left: -10%;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(123,44,191,0.1) 0%, transparent 70%);
    animation: float 10s ease-in-out infinite reverse;
    pointer-events: none;
  }
  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(30px, -30px) scale(1.1); }
  }
  .hero-content {
    max-width: 1300px; margin: 0 auto;
    display: grid; grid-template-columns: 1.2fr 1fr; gap: 100px;
    align-items: center;
    position: relative; z-index: 1;
  }
  .hero-text {
    opacity: 0; transform: translateY(50px);
    animation: fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.3s;
  }
  .hero-eyebrow {
    font-size: 13px; font-weight: 600; text-transform: uppercase;
    color: var(--accent); letter-spacing: 3px; margin-bottom: 24px;
    display: flex; align-items: center; gap: 16px;
    font-family: 'Space Grotesk', sans-serif;
  }
  .hero-eyebrow::before {
    content: ''; width: 40px; height: 1px;
    background: var(--accent-gradient);
  }
  .hero-title {
    font-size: clamp(48px, 6vw, 80px);
    font-weight: 800; line-height: 1.05;
    margin-bottom: 28px;
    letter-spacing: -2px;
  }
  .hero-title .gradient-text {
    background: var(--accent-gradient);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    position: relative;
    display: inline-block;
  }
  .hero-title .gradient-text::after {
    content: '';
    position: absolute;
    bottom: -8px; left: 0; width: 100%; height: 4px;
    background: var(--accent-gradient);
    border-radius: 2px;
    transform: scaleX(0); transform-origin: left;
    animation: lineExpand 1s ease forwards 1.5s;
  }
  @keyframes lineExpand {
    to { transform: scaleX(1); }
  }
  .hero-desc {
    font-size: 18px; color: var(--text-secondary);
    margin-bottom: 48px; max-width: 520px;
    line-height: 1.8;
  }
  .hero-buttons {
    display: flex; gap: 20px;
  }
  .btn {
    padding: 18px 36px; font-size: 15px; font-weight: 600;
    text-decoration: none; border-radius: 12px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-flex; align-items: center; gap: 10px;
    position: relative; overflow: hidden;
    letter-spacing: 0.5px;
  }
  .btn-primary {
    background: var(--accent-gradient);
    color: white;
    border: none;
    box-shadow: 0 10px 30px rgba(0,212,255,0.2);
  }
  .btn-primary:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,212,255,0.3);
  }
  .btn-secondary {
    background: transparent;
    color: var(--text-primary);
    border: 2px solid var(--glass-border);
    backdrop-filter: blur(10px);
  }
  .btn-secondary:hover {
    border-color: var(--accent);
    background: rgba(0,212,255,0.05);
    transform: translateY(-3px);
  }
  .hero-visual {
    position: relative;
    opacity: 0; transform: translateY(50px) rotateY(-15deg);
    animation: fadeInUp3D 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.6s;
    perspective: 1000px;
  }
  @keyframes fadeInUp3D {
    to { opacity: 1; transform: translateY(0) rotateY(0deg); }
  }
  .profile-card {
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .profile-card:hover {
    transform: rotateY(5deg) rotateX(-5deg) translateZ(20px);
  }
  .profile-bg {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 24px; padding: 48px;
    backdrop-filter: blur(20px);
    position: relative; overflow: hidden;
    box-shadow: 0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
  }
  .profile-bg::before {
    content: ''; position: absolute; top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: conic-gradient(from 0deg, transparent, rgba(0,212,255,0.1), transparent, rgba(123,44,191,0.1), transparent);
    animation: rotate 15s linear infinite;
  }
  @keyframes rotate { to { transform: rotate(360deg); } }
  .profile-content {
    position: relative; z-index: 1; text-align: center;
  }
  .profile-avatar {
    width: 140px; height: 140px;
    background: var(--accent-gradient);
    border-radius: 50%; margin: 0 auto 28px;
    display: flex; align-items: center; justify-content: center;
    font-size: 56px; color: white; font-weight: 800;
    box-shadow: 0 20px 40px rgba(0,212,255,0.3);
    position: relative;
    animation: pulse 3s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 20px 40px rgba(0,212,255,0.3); }
    50% { box-shadow: 0 20px 60px rgba(0,212,255,0.5), 0 0 80px rgba(0,212,255,0.2); }
  }
  .profile-avatar::before {
    content: ''; position: absolute; inset: -4px;
    border-radius: 50%;
    background: var(--accent-gradient);
    z-index: -1;
    opacity: 0.5;
    animation: pulse 3s ease-in-out infinite;
  }
  .profile-name {
    font-size: 28px; font-weight: 700; margin-bottom: 10px;
    letter-spacing: -0.5px;
  }
  .profile-title {
    font-size: 13px; color: var(--text-secondary);
    text-transform: uppercase; letter-spacing: 3px;
    font-family: 'Space Grotesk', sans-serif;
  }
  .social-links {
    display: flex; justify-content: center; gap: 16px;
    margin-top: 28px;
  }
  .social-link {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: var(--glass);
    border: 1px solid var(--glass-border);
    display: flex; align-items: center; justify-content: center;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 18px;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
  }
  .social-link:hover {
    color: var(--accent);
    border-color: var(--accent);
    transform: translateY(-4px) scale(1.1);
    box-shadow: 0 10px 20px rgba(0,212,255,0.2);
  }
  .social-link svg {
    width: 20px; height: 20px;
    fill: currentColor;
  }

  /* Stats */
  .stats {
    padding: 100px 48px;
    background: var(--bg-secondary);
    position: relative;
    overflow: hidden;
  }
  .stats::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
  }
  .stats-grid {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px;
  }
  .stat-item {
    text-align: center;
    padding: 40px 20px;
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    transition: all 0.4s ease;
    opacity: 0; transform: translateY(40px);
  }
  .stat-item.visible {
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  .stat-item:nth-child(1).visible { animation-delay: 0.1s; }
  .stat-item:nth-child(2).visible { animation-delay: 0.2s; }
  .stat-item:nth-child(3).visible { animation-delay: 0.3s; }
  .stat-item:nth-child(4).visible { animation-delay: 0.4s; }
  .stat-item:hover {
    transform: translateY(-8px);
    border-color: var(--accent);
    box-shadow: 0 20px 40px rgba(0,212,255,0.1);
  }
  .stat-number {
    font-size: 52px; font-weight: 800;
    background: var(--accent-gradient);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    margin-bottom: 8px;
    font-family: 'Space Grotesk', sans-serif;
  }
  .stat-label {
    font-size: 13px; color: var(--text-secondary);
    text-transform: uppercase; letter-spacing: 2px;
  }

  /* Values */
  .values {
    padding: 140px 48px;
    background: var(--bg-primary);
    position: relative;
  }
  .values-header {
    text-align: center; margin-bottom: 100px;
    opacity: 0; transform: translateY(40px);
  }
  .values-header.visible {
    animation: fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  .values-eyebrow {
    font-size: 13px; font-weight: 600; text-transform: uppercase;
    color: var(--accent); letter-spacing: 3px; margin-bottom: 20px;
    font-family: 'Space Grotesk', sans-serif;
  }
  .values-title {
    font-size: clamp(36px, 5vw, 64px); font-weight: 800;
    margin-bottom: 20px;
    letter-spacing: -2px;
  }
  .values-title .gradient-text {
    background: var(--accent-gradient);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .values-subtitle {
    color: var(--text-secondary); font-size: 18px; max-width: 500px; margin: 0 auto;
  }
  .values-grid {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;
    perspective: 1000px;
  }
  .value-card {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    padding: 48px 36px;
    backdrop-filter: blur(20px);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0; transform: translateY(40px) rotateX(10deg);
    transform-style: preserve-3d;
    position: relative;
    overflow: hidden;
  }
  .value-card.visible {
    animation: cardReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  .value-card:nth-child(1).visible { animation-delay: 0.2s; }
  .value-card:nth-child(2).visible { animation-delay: 0.35s; }
  .value-card:nth-child(3).visible { animation-delay: 0.5s; }
  @keyframes cardReveal {
    to { opacity: 1; transform: translateY(0) rotateX(0deg); }
  }
  .value-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: 0; transition: opacity 0.4s ease;
  }
  .value-card:hover::before { opacity: 1; }
  .value-card:hover {
    transform: translateY(-12px) rotateX(5deg);
    border-color: rgba(0,212,255,0.3);
    box-shadow: 0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(0,212,255,0.05);
  }
  .value-icon {
    font-size: 56px; margin-bottom: 28px;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-block;
  }
  .value-card:hover .value-icon {
    transform: scale(1.2) rotate(-5deg);
  }
  .value-title {
    font-size: 24px; font-weight: 700; margin-bottom: 16px;
    letter-spacing: -0.5px;
  }
  .value-desc {
    color: var(--text-secondary); line-height: 1.7; font-size: 15px;
  }
  .value-number {
    position: absolute; top: 24px; right: 24px;
    font-size: 72px; font-weight: 800;
    color: rgba(0,212,255,0.05);
    font-family: 'Space Grotesk', sans-serif;
    line-height: 1;
  }

  /* Philosophy */
  .philosophy {
    padding: 140px 48px;
    background: var(--bg-secondary);
    position: relative;
    overflow: hidden;
  }
  .philosophy::before {
    content: '';
    position: absolute; top: 50%; left: 50%;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .philosophy-content {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 100px;
    align-items: center;
    position: relative; z-index: 1;
  }
  .philosophy-text {
    opacity: 0; transform: translateX(-50px);
  }
  .philosophy-text.visible {
    animation: slideInLeft 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  @keyframes slideInLeft {
    to { opacity: 1; transform: translateX(0); }
  }
  .philosophy-title {
    font-size: clamp(36px, 4vw, 56px); font-weight: 800;
    margin-bottom: 28px; letter-spacing: -2px;
  }
  .philosophy-title .gradient-text {
    background: var(--accent-gradient);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .philosophy-desc {
    font-size: 18px; color: var(--text-secondary); margin-bottom: 48px;
    line-height: 1.8;
  }
  .philosophy-quote {
    font-style: italic; font-size: 22px; color: var(--text-primary);
    border-left: 4px solid var(--accent);
    padding-left: 28px;
    line-height: 1.6;
    position: relative;
  }
  .philosophy-quote::before {
    content: '"';
    position: absolute; top: -20px; left: 10px;
    font-size: 80px; color: rgba(0,212,255,0.1);
    font-family: Georgia, serif;
    line-height: 1;
  }
  .philosophy-visual {
    opacity: 0; transform: translateX(50px);
  }
  .philosophy-visual.visible {
    animation: slideInRight 1s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.3s;
  }
  @keyframes slideInRight {
    to { opacity: 1; transform: translateX(0); }
  }
  .philosophy-card {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 24px; padding: 48px;
    backdrop-filter: blur(20px);
    text-align: center;
    transform-style: preserve-3d;
    transition: transform 0.6s ease;
    box-shadow: 0 25px 50px rgba(0,0,0,0.3);
  }
  .philosophy-card:hover {
    transform: rotateY(-5deg) rotateX(5deg);
  }
  .philosophy-avatar {
    width: 120px; height: 120px;
    background: var(--accent-gradient);
    border-radius: 50%;
    margin: 0 auto 28px;
    display: flex; align-items: center; justify-content: center;
    font-size: 48px; color: white; font-weight: 800;
    box-shadow: 0 15px 30px rgba(0,212,255,0.3);
    animation: pulse 3s ease-in-out infinite;
  }
  .philosophy-role {
    color: var(--text-secondary); font-size: 14px;
    text-transform: uppercase; letter-spacing: 3px;
    font-family: 'Space Grotesk', sans-serif;
  }

  /* Achievements Section */
  .achievements {
    padding: 140px 48px;
    background: var(--bg-primary);
    position: relative;
  }
  .achievements-header {
    text-align: center; margin-bottom: 80px;
    opacity: 0; transform: translateY(40px);
  }
  .achievements-header.visible {
    animation: fadeInUp 1s ease forwards;
  }
  .achievements-grid {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px;
  }
  .achievement-card {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 40px;
    backdrop-filter: blur(10px);
    transition: all 0.4s ease;
    opacity: 0; transform: translateY(30px);
    position: relative;
    overflow: hidden;
  }
  .achievement-card.visible {
    animation: fadeInUp 0.8s ease forwards;
  }
  .achievement-card:nth-child(1).visible { animation-delay: 0.1s; }
  .achievement-card:nth-child(2).visible { animation-delay: 0.2s; }
  .achievement-card:nth-child(3).visible { animation-delay: 0.3s; }
  .achievement-card:nth-child(4).visible { animation-delay: 0.4s; }
  .achievement-card:hover {
    transform: translateY(-8px);
    border-color: rgba(0,212,255,0.3);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }
  .achievement-icon {
    font-size: 40px; margin-bottom: 20px;
  }
  .achievement-title {
    font-size: 20px; font-weight: 700; margin-bottom: 12px;
  }
  .achievement-desc {
    color: var(--text-secondary); font-size: 15px; line-height: 1.6;
  }

  /* Insights Section */
  .insights {
    padding: 140px 48px;
    background: var(--bg-secondary);
    position: relative;
  }
  .insights-header {
    text-align: center; margin-bottom: 80px;
    opacity: 0; transform: translateY(40px);
  }
  .insights-header.visible {
    animation: fadeInUp 1s ease forwards;
  }
  .insights-grid {
    max-width: 1000px; margin: 0 auto;
    display: flex; flex-direction: column; gap: 24px;
  }
  .insight-item {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 32px 40px;
    backdrop-filter: blur(10px);
    transition: all 0.4s ease;
    opacity: 0; transform: translateX(-30px);
    display: flex; align-items: flex-start; gap: 24px;
  }
  .insight-item.visible {
    animation: slideInLeft 0.8s ease forwards;
  }
  .insight-item:nth-child(1).visible { animation-delay: 0.1s; }
  .insight-item:nth-child(2).visible { animation-delay: 0.2s; }
  .insight-item:nth-child(3).visible { animation-delay: 0.3s; }
  .insight-item:hover {
    transform: translateX(10px);
    border-color: var(--accent);
  }
  .insight-number {
    font-size: 36px; font-weight: 800;
    color: var(--accent);
    font-family: 'Space Grotesk', sans-serif;
    line-height: 1;
    min-width: 50px;
  }
  .insight-text {
    color: var(--text-secondary); line-height: 1.7;
  }
  .insight-text strong {
    color: var(--text-primary); display: block; margin-bottom: 6px;
    font-size: 18px;
  }

  /* Testimonials */
  .testimonials {
    padding: 140px 48px;
    background: var(--bg-primary);
    position: relative;
  }
  .testimonials-header {
    text-align: center; margin-bottom: 80px;
    opacity: 0; transform: translateY(40px);
  }
  .testimonials-header.visible {
    animation: fadeInUp 1s ease forwards;
  }
  .testimonials-grid {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;
  }
  .testimonial-card {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 40px;
    backdrop-filter: blur(10px);
    transition: all 0.4s ease;
    opacity: 0; transform: translateY(30px);
    position: relative;
  }
  .testimonial-card.visible {
    animation: fadeInUp 0.8s ease forwards;
  }
  .testimonial-card:nth-child(1).visible { animation-delay: 0.1s; }
  .testimonial-card:nth-child(2).visible { animation-delay: 0.2s; }
  .testimonial-card:nth-child(3).visible { animation-delay: 0.3s; }
  .testimonial-card:hover {
    transform: translateY(-8px);
    border-color: rgba(0,212,255,0.3);
  }
  .testimonial-stars {
    color: #ffd700; font-size: 18px; margin-bottom: 20px;
    letter-spacing: 2px;
  }
  .testimonial-text {
    color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px;
    font-style: italic;
  }
  .testimonial-author {
    display: flex; align-items: center; gap: 16px;
  }
  .testimonial-avatar {
    width: 48px; height: 48px;
    background: var(--accent-gradient);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; color: white;
  }
  .testimonial-name {
    font-weight: 600; margin-bottom: 4px;
  }
  .testimonial-role {
    font-size: 13px; color: var(--text-secondary);
  }

  /* Connect / CTA Section */
  .connect {
    padding: 140px 48px;
    background: var(--bg-secondary);
    position: relative;
    overflow: hidden;
    text-align: center;
  }
  .connect::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
  }
  .connect-content {
    max-width: 700px; margin: 0 auto;
    position: relative; z-index: 1;
    opacity: 0; transform: translateY(40px);
  }
  .connect-content.visible {
    animation: fadeInUp 1s ease forwards;
  }
  .connect-title {
    font-size: clamp(36px, 5vw, 56px); font-weight: 800;
    margin-bottom: 24px; letter-spacing: -2px;
  }
  .connect-title .gradient-text {
    background: var(--accent-gradient);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .connect-desc {
    color: var(--text-secondary); font-size: 18px;
    margin-bottom: 48px; line-height: 1.8;
  }
  .connect-socials {
    display: flex; justify-content: center; gap: 20px;
    margin-bottom: 40px;
  }
  .connect-social {
    display: flex; align-items: center; gap: 12px;
    padding: 16px 32px;
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 14px;
    color: var(--text-primary);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.4s ease;
    backdrop-filter: blur(10px);
  }
  .connect-social:hover {
    border-color: var(--accent);
    transform: translateY(-4px);
    box-shadow: 0 15px 30px rgba(0,212,255,0.15);
  }
  .connect-social svg {
    width: 24px; height: 24px;
    fill: currentColor;
  }

  /* Footer */
  footer {
    padding: 40px 48px;
    background: var(--bg-primary);
    border-top: 1px solid var(--glass-border);
    text-align: center;
    color: var(--text-secondary);
    font-size: 14px;
  }
  footer .gradient-text {
    background: var(--accent-gradient);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    font-weight: 600;
  }

  /* Back to Top */
  .back-to-top {
    position: fixed; bottom: 40px; right: 40px;
    width: 56px; height: 56px;
    background: var(--accent-gradient);
    color: white;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    text-decoration: none; font-size: 24px;
    opacity: 0; visibility: hidden;
    transition: all 0.4s ease;
    z-index: 1000;
    box-shadow: 0 10px 30px rgba(0,212,255,0.3);
    border: none;
    cursor: none;
  }
  .back-to-top.visible {
    opacity: 1; visibility: visible;
  }
  .back-to-top:hover {
    transform: scale(1.1) translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,212,255,0.4);
  }

  /* Animations */
  @keyframes fadeInUp {
    to { opacity: 1; transform: translateY(0); }
  }

  /* Scroll Progress Bar */
  .scroll-progress {
    position: fixed; top: 0; left: 0; height: 3px;
    background: var(--accent-gradient);
    z-index: 10000;
    width: 0%;
    transition: width 0.1s ease;
  }

  /* Mobile */
  @media (max-width: 1024px) {
    .hero-content { grid-template-columns: 1fr; gap: 60px; text-align: center; }
    .hero-text { display: flex; flex-direction: column; align-items: center; }
    .values-grid { grid-template-columns: 1fr; }
    .philosophy-content { grid-template-columns: 1fr; gap: 60px; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .achievements-grid { grid-template-columns: 1fr; }
    .testimonials-grid { grid-template-columns: 1fr; }
    .connect-socials { flex-direction: column; align-items: center; }
  }
  @media (max-width: 768px) {
    nav { padding: 16px 24px; }
    .nav-links { display: none; }
    .hero { padding: 100px 24px 60px; }
    .stats, .values, .philosophy, .achievements, .insights, .testimonials, .connect { padding: 80px 24px; }
    .stats-grid { grid-template-columns: 1fr; }
    body { cursor: auto; }
    .cursor, .cursor-ring { display: none; }
  }
</style>
</head>
<body>

<!-- Scroll Progress -->
<div class="scroll-progress" id="scrollProgress"></div>

<!-- Custom Cursor -->
<div class="cursor" id="cursor"></div>
<div class="cursor-ring" id="cursorRing"></div>

<!-- Particle Canvas -->
<canvas id="particles"></canvas>

<!-- Back to Top -->
<a href="#" class="back-to-top" id="backToTop">↑</a>

<!-- Navigation -->
<nav id="navbar">
  <a href="#" class="nav-logo">V<span>.</span>A</a>
  <ul class="nav-links">
    <li><a href="#values">Felsefe</a></li>
    <li><a href="#philosophy">Yaklaşım</a></li>
    <li><a href="#achievements">Başarılar</a></li>
    <li><a href="#insights">İçgörüler</a></li>
    <li><a href="#testimonials">Referanslar</a></li>
  </ul>
  <a href="#connect" class="nav-cta">İletişim</a>
</nav>

<!-- Hero -->
<section class="hero" id="hero">
  <div class="hero-content">
    <div class="hero-text">
      <div class="hero-eyebrow">Usta — Lider — Vizyoner</div>
      <h1 class="hero-title">Disiplin & <span class="gradient-text">Miras</span> Sanatı</h1>
      <p class="hero-desc">Sabır ve tutarlılığın yolculuğu — zamanı aşan bir miras inşa etmek. Odaklanmış eylemin arenasına adım at.</p>
      <div class="hero-buttons">
        <a href="#philosophy" class="btn btn-primary">Hikayemi Gör →</a>
        <a href="#values" class="btn btn-secondary">Felsefeyi Keşfet</a>
      </div>
    </div>
    <div class="hero-visual">
      <div class="profile-card">
        <div class="profile-bg">
          <div class="profile-content">
            <div class="profile-avatar">VA</div>
            <div class="profile-name">Veysel Aslan</div>
            <div class="profile-title">Mastery · Discipline · Legacy</div>
            <div class="social-links">
              <a href="https://instagram.com/veyselaslan" target="_blank" class="social-link" title="Instagram">
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://t.me/veyselaslan" target="_blank" class="social-link" title="Telegram">
                <svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Stats -->
<section class="stats">
  <div class="stats-grid">
    <div class="stat-item">
      <div class="stat-number" data-target="10">0</div>
      <div class="stat-label">Yıl Deneyim</div>
    </div>
    <div class="stat-item">
      <div class="stat-number" data-target="500">0</div>
      <div class="stat-label">Mentorluk Saati</div>
    </div>
    <div class="stat-item">
      <div class="stat-number" data-target="47">0</div>
      <div class="stat-label">Tamamlanan Proje</div>
    </div>
    <div class="stat-item">
      <div class="stat-number" data-target="1000">0</div>
      <div class="stat-label">Tutarlılık Günü</div>
    </div>
  </div>
</section>

<!-- Values -->
<section class="values" id="values">
  <div class="values-header">
    <div class="values-eyebrow">Temel Değerler</div>
    <h2 class="values-title">Ustalığın <span class="gradient-text">Üç Sütunu</span></h2>
    <p class="values-subtitle">Başarının temelinde yatan ilkeler ve onları hayata geçirme sanatı</p>
  </div>
  <div class="values-grid">
    <div class="value-card">
      <div class="value-number">01</div>
      <div class="value-icon">🔑</div>
      <h3 class="value-title">Kaçınılmaz Disiplin</h3>
      <p class="value-desc">Ustalığın köşe taşı. Her gün, istisnasız uygulanan yapısal eylem. Karakteri şekillendiren rutinler ve alışkanlıklar zinciri.</p>
    </div>
    <div class="value-card">
      <div class="value-number">02</div>
      <div class="value-icon">🌿</div>
      <h3 class="value-title">Sınırlı Sabır</h3>
      <p class="value-desc">Büyüklük için beklemenin bilgeliği. Kalıcı temeller inşa etmek. Zamanın gücüne güvenmek ve aceleciliği reddetmek.</p>
    </div>
    <div class="value-card">
      <div class="value-number">03</div>
      <div class="value-icon">🎯</div>
      <h3 class="value-title">Amansız Tutarlılık</h3>
      <p class="value-desc">Alışkanlıklı odağın gücü. Küçük eylemler anıtsal sonuçlara dönüşür. Her gün bir adım, her adım bir zafer.</p>
    </div>
  </div>
</section>

<!-- Philosophy -->
<section class="philosophy" id="philosophy">
  <div class="philosophy-content">
    <div class="philosophy-text">
      <h2 class="philosophy-title">Uzun <span class="gradient-text">Oyunu</span> Oynuyorum</h2>
      <p class="philosophy-desc">Stratejik öngörü, amansız odak ve etik dürüstlük — bunlar sadece kelimeler değil, yaşam şeklim. Kısa vadeli kazanımlar yerine kalıcı etki bırakmayı hedefliyorum.</p>
      <div class="philosophy-quote">Disiplin özgürlüktür. Kısıtlama değil — kapasitenin genişlemesi. Her sabah kalktığımda, dünkü versiyonumdan daha iyi olmak için bir fırsat görüyorum.</div>
    </div>
    <div class="philosophy-visual">
      <div class="philosophy-card">
        <div class="philosophy-avatar">VA</div>
        <p class="philosophy-role">Stratejik Vizyoner</p>
      </div>
    </div>
  </div>
</section>

<!-- Achievements -->
<section class="achievements" id="achievements">
  <div class="achievements-header">
    <div class="values-eyebrow">Başarılar</div>
    <h2 class="values-title">Yolculuğun <span class="gradient-text">Kilometre Taşları</span></h2>
  </div>
  <div class="achievements-grid">
    <div class="achievement-card">
      <div class="achievement-icon">🏆</div>
      <h3 class="achievement-title">Liderlik Mükemmelliği</h3>
      <p class="achievement-desc">Birden fazla ekip ve projede liderlik rolü üstlenerek, stratejik vizyon ve operasyonel mükemmellik arasında köprü kurma becerisi geliştirildi.</p>
    </div>
    <div class="achievement-card">
      <div class="achievement-icon">📈</div>
      <h3 class="achievement-title">Sürdürülebilir Büyüme</h3>
      <p class="achievement-desc">Uzun vadeli düşünce ve tutarlı eylemlerle, kişisel ve profesyonel alanlarda sürdürülebilir büyüme stratejileri tasarlandı ve uygulandı.</p>
    </div>
    <div class="achievement-card">
      <div class="achievement-icon">🤝</div>
      <h3 class="achievement-title">Topluluk Etkisi</h3>
      <p class="achievement-desc">500+ saat mentorluk ve rehberlik ile yeni nesil liderlerin gelişimine katkı sağlandı. Bilgi paylaşımı ve topluluk gelişimi odaklı çalışmalar.</p>
    </div>
    <div class="achievement-card">
      <div class="achievement-icon">⚡</div>
      <h3 class="achievement-title">Stratejik Dönüşüm</h3>
      <p class="achievement-desc">47+ proje ile karmaşık sorunlara yenilikçi çözümler üretildi. Her proje, disiplinli yaklaşım ve detaycı planlama ile hayata geçirildi.</p>
    </div>
  </div>
</section>

<!-- Insights -->
<section class="insights" id="insights">
  <div class="insights-header">
    <div class="values-eyebrow">İçgörüler</div>
    <h2 class="values-title">Düşünce <span class="gradient-text">Parçacıkları</span></h2>
  </div>
  <div class="insights-grid">
    <div class="insight-item">
      <div class="insight-number">01</div>
      <div class="insight-text">
        <strong>Disiplin = Özgürlük</strong>
        Disiplin kısıtlama değil, potansiyelin kilidini açan anahtardır. Yapılandırılmış bir hayat, yaratıcılığa ve büyümeye daha fazla alan tanır.
      </div>
    </div>
    <div class="insight-item">
      <div class="insight-number">02</div>
      <div class="insight-text">
        <strong>Sabır, Güçtür</strong>
        Anlık tatmin çağında, uzun vadeli düşünmek bir süper güç haline geldi. Gerçek değer, zamanın testinden geçerek ortaya çıkar.
      </div>
    </div>
    <div class="insight-item">
      <div class="insight-number">03</div>
      <div class="insight-text">
        <strong>Tutarlılık > Yoğunluk</strong>
        Her gün %1 daha iyi olmak, bir günde %100 daha iyi olmaktan daha etkilidir. Bileşik faizin gücü, hayatın her alanında geçerlidir.
      </div>
    </div>
  </div>
</section>

<!-- Testimonials -->
<section class="testimonials" id="testimonials">
  <div class="testimonials-header">
    <div class="values-eyebrow">Referanslar</div>
    <h2 class="values-title">İnsanlar <span class="gradient-text">Ne Diyor?</span></h2>
  </div>
  <div class="testimonials-grid">
    <div class="testimonial-card">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">"Veysel'in disiplin ve odaklanma yeteneği bana ilham verdi. Onunla çalışmak, sadece profesyonel değil, kişisel gelişim açısından da dönüştürücü bir deneyimdi."</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">AK</div>
        <div>
          <div class="testimonial-name">Ahmet Kaya</div>
          <div class="testimonial-role">Proje Yöneticisi</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">"Stratejik düşünme yeteneği ve uzun vadeli planlama becerisi, projelerimizin başarısında kritik rol oynadı. Kesinlikle öneririm."</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">SY</div>
        <div>
          <div class="testimonial-name">Selin Yılmaz</div>
          <div class="testimonial-role">Girişimci</div>
        </div>
      </div>
    </div>
    <div class="testimonial-card">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">"Mentorluk sürecinde kazandığım bakış açısı, kariyerimde dönüm noktası oldu. Sabır ve tutarlılığın gücünü ondan öğrendim."</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">MO</div>
        <div>
          <div class="testimonial-name">Mehmet Öz</div>
          <div class="testimonial-role">Yazılım Geliştirici</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Connect -->
<section class="connect" id="connect">
  <div class="connect-content">
    <h2 class="connect-title">Hadi <span class="gradient-text">Bağlantı</span> Kuralım</h2>
    <p class="connect-desc">Fikirlerini paylaş, sorularını sor veya sadece selam ver. Her mesaj değerlidir ve yanıtlanmayı hak eder.</p>
    <div class="connect-socials">
      <a href="https://instagram.com/veyselaslan" target="_blank" class="connect-social">
        <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        Instagram
      </a>
      <a href="https://t.me/veyselaslan" target="_blank" class="connect-social">
        <svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        Telegram
      </a>
    </div>
    <p style="color: var(--text-secondary); font-size: 14px;">veyselaslan@email.com</p>
  </div>
</section>

<!-- Footer -->
<footer>
  <p>© 2026 <span class="gradient-text">Veysel Aslan</span> — Tüm hakları saklıdır.</p>
</footer>

<script>
  // Particle System
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouseX = 0, mouseY = 0;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 212, 255, ' + this.opacity + ')';
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }
  }
  initParticles();

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(0, 212, 255, ' + (0.1 * (1 - distance / 150)) + ')';
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function(p) { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Custom Cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function updateRing() {
    ring.style.left = mouseX + 'px';
    ring.style.top = mouseY + 'px';
    requestAnimationFrame(updateRing);
  }
  updateRing();

  document.querySelectorAll('a, button, .value-card, .stat-item, .achievement-card, .testimonial-card, .insight-item, .connect-social, .social-link').forEach(function(el) {
    el.addEventListener('mouseenter', function() { cursor.classList.add('hover'); });
    el.addEventListener('mouseleave', function() { cursor.classList.remove('hover'); });
  });

  // Scroll Progress
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  });

  // Navbar scroll
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    backToTop.classList.toggle('visible', window.scrollY > 300);
  });

  // Intersection Observer for animations
  const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.values-header, .value-card, .stat-item, .philosophy-text, .philosophy-visual, .achievements-header, .achievement-card, .insights-header, .insight-item, .testimonials-header, .testimonial-card, .connect-content').forEach(function(el) {
    observer.observe(el);
  });

  // Counter animation
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.target);
        let count = 0;
        const increment = target / 100;
        const timer = setInterval(function() {
          count += increment;
          if (count >= target) {
            counter.textContent = target;
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(count);
          }
        }, 20);
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(function(counter) { counterObserver.observe(counter); });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
</script>
</body>
</html>
`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  },
};
