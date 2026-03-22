"use client";
import { useState, useEffect } from "react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Cinzel:wght@400;500;600&family=Jost:wght@300;400;500&display=swap');
`;

const styles = `
  :root {
    --cream:      #f5f0e8;
    --parchment:  #ede5d0;
    --warm-white: #faf7f2;
    --sand:       #d4c4a0;
    --gold:       #c9a84c;
    --gold-light: #e8d5a3;
    --terracotta: #b5654a;
    --deep-brown: #2c1810;
    --stone:      #8a7560;
    --ink:        #1a1208;
  }

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior: smooth; }
  body { background:var(--cream); color:var(--ink); font-family:'Jost',sans-serif; overflow-x:hidden; }

  /* ── NAVBAR ── */
  .navbar {
    position:fixed; top:0; left:0; right:0; z-index:200;
    padding:22px 60px;
    display:flex; align-items:center; justify-content:space-between;
    transition:all 0.45s ease;
  }
  .navbar.scrolled {
    background:rgba(245,240,232,0.96); backdrop-filter:blur(12px);
    border-bottom:1px solid var(--sand); padding:14px 60px;
    box-shadow:0 2px 28px rgba(44,24,16,0.08);
  }
  .nav-logo {
    font-family:'Cinzel',serif; font-size:22px; letter-spacing:0.3em;
    color:var(--warm-white); text-decoration:none; transition:color 0.4s;
  }
  .navbar.scrolled .nav-logo { color:var(--deep-brown); }
  .nav-links { display:flex; gap:34px; list-style:none; }
  .nav-links a {
    font-family:'Jost',sans-serif; font-size:11px; font-weight:400;
    letter-spacing:0.2em; text-transform:uppercase;
    color:rgba(255,255,255,0.85); text-decoration:none; transition:color 0.3s;
  }
  .navbar.scrolled .nav-links a { color:var(--stone); }
  .nav-links a:hover { color:var(--gold) !important; }
  .nav-cta {
    font-family:'Jost',sans-serif; font-size:11px; font-weight:500;
    letter-spacing:0.2em; text-transform:uppercase;
    padding:10px 24px; border:1px solid rgba(255,255,255,0.55);
    color:var(--warm-white); text-decoration:none; background:transparent;
    cursor:pointer; transition:all 0.3s; display:inline-block;
  }
  .navbar.scrolled .nav-cta { border-color:var(--gold); color:var(--deep-brown); }
  .nav-cta:hover { background:var(--gold); border-color:var(--gold); color:var(--deep-brown) !important; }

  /* ── HERO ── */
  .hero {
    position:relative; height:100vh; min-height:720px;
    overflow:hidden;
    background:var(--deep-brown);
    display:flex; align-items:center; justify-content:center;
  }

  /* Background photo — full bleed */
  .hero-bg-img {
    position:absolute; inset:0; width:100%; height:100%;
    object-fit:cover; object-position:center 35%;
    filter:brightness(0.78) saturate(0.88); z-index:0;
  }

  /*
    Arch SVG overlay — THE FIX
    ─────────────────────────────────────────────────────────────
    • position:absolute, top:0, left:0, width:100% — stays strictly
      inside the hero, no 100vw tricks that escape the parent
    • height:auto — lets the SVG scale proportionally, zero overflow
    • display:block — kills the inline gap below the image
    • No wrapper div needed — img IS the overlay element
    ─────────────────────────────────────────────────────────────
  */
  .hero-arch {
  position: absolute;
  top: -175px;   /* desktop */
  left: 0;
  width: 100%;
  height: auto;
  display: block;
  z-index: 1;
  pointer-events: none;
}

@media (max-width: 768px) {
  .hero-arch {
    top: 0px;  /* mobile */
  }
}

  /* Bottom vignette for text legibility */
  .hero-vignette {
    position:absolute; inset:0; z-index:2; pointer-events:none;
    background:linear-gradient(to bottom, transparent 38%, rgba(26,18,8,0.62) 100%);
  }

  /* Text sits above arch + vignette */
  .hero-content {
    position:relative; z-index:3; text-align:center; padding:0 24px;
  }

  @keyframes heroReveal {
    from { opacity:0; transform:translateY(26px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .hero-eyebrow {
    font-size:11px; font-weight:400; letter-spacing:0.38em; text-transform:uppercase;
    color:var(--gold-light); margin-bottom:16px; display:block;
    animation:heroReveal 1.2s 0.3s ease both;
  }
  .hero-title {
    font-family:'Cormorant Garamond',serif;
    font-size:clamp(80px,13vw,156px); font-weight:300; line-height:0.9;
    color:var(--warm-white); letter-spacing:0.05em; margin-bottom:12px;
    animation:heroReveal 1.2s 0.5s ease both;
  }
  .hero-subtitle {
    font-family:'Cinzel',serif; font-size:clamp(10px,1.3vw,13px);
    letter-spacing:0.45em; text-transform:uppercase;
    color:var(--gold); margin-bottom:30px; display:block;
    animation:heroReveal 1.2s 0.7s ease both;
  }
  .hero-tagline {
    font-family:'Cormorant Garamond',serif;
    font-size:clamp(16px,1.9vw,21px); font-style:italic; font-weight:300;
    color:rgba(250,247,242,0.65); margin-bottom:42px;
    animation:heroReveal 1.2s 0.9s ease both;
  }
  .hero-actions {
    display:flex; gap:16px; justify-content:center; align-items:center;
    animation:heroReveal 1.2s 1.1s ease both;
  }
  .hero-scroll {
    position:absolute; bottom:32px; left:50%; transform:translateX(-50%);
    z-index:3; display:flex; flex-direction:column; align-items:center; gap:8px;
    animation:heroReveal 1.2s 1.5s ease both;
  }
  .hero-scroll span { font-size:9px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(255,255,255,0.38); }
  .scroll-line {
    width:1px; height:48px;
    background:linear-gradient(to bottom, rgba(201,168,76,0.9), transparent);
    animation:scrollPulse 2s ease infinite;
  }
  @keyframes scrollPulse {
    0%,100%{ opacity:0.4; transform:scaleY(0.8); }
    50%    { opacity:1;   transform:scaleY(1); }
  }

  /* ── BUTTONS ── */
  .btn-primary {
    font-family:'Jost',sans-serif; font-size:11px; font-weight:500;
    letter-spacing:0.25em; text-transform:uppercase; padding:15px 38px;
    background:var(--gold); color:var(--deep-brown); border:none; cursor:pointer;
    text-decoration:none; display:inline-block; transition:all 0.3s;
  }
  .btn-primary:hover { background:var(--gold-light); transform:translateY(-2px); box-shadow:0 8px 28px rgba(201,168,76,0.35); }
  .btn-ghost {
    font-family:'Jost',sans-serif; font-size:11px; font-weight:400;
    letter-spacing:0.25em; text-transform:uppercase; padding:15px 38px;
    background:transparent; color:var(--warm-white); border:1px solid rgba(255,255,255,0.4);
    cursor:pointer; text-decoration:none; display:inline-block; transition:all 0.3s;
  }
  .btn-ghost:hover { border-color:var(--gold-light); color:var(--gold-light); transform:translateY(-2px); }
  .btn-outline-dark {
    font-family:'Jost',sans-serif; font-size:11px; font-weight:400;
    letter-spacing:0.25em; text-transform:uppercase; padding:13px 34px;
    background:transparent; color:var(--stone); border:1px solid var(--sand);
    cursor:pointer; text-decoration:none; display:inline-block; transition:all 0.3s;
  }
  .btn-outline-dark:hover { border-color:var(--deep-brown); color:var(--deep-brown); }

  /* ── ORNAMENT ── */
  .ornament { display:flex; align-items:center; gap:16px; }
  .ornament-line { flex:1; height:1px; background:linear-gradient(to right, transparent, var(--sand), transparent); }
  .ornament-diamond { width:6px; height:6px; background:var(--gold); transform:rotate(45deg); flex-shrink:0; }

  /* ── SECTION COMMONS ── */
  section { padding:100px 60px; }
  .section-tag {
    font-family:'Cinzel',serif; font-size:10px; font-weight:400;
    letter-spacing:0.42em; text-transform:uppercase;
    color:var(--gold); margin-bottom:14px; display:block;
  }
  .section-title {
    font-family:'Cormorant Garamond',serif;
    font-size:clamp(38px,5.2vw,66px); font-weight:300; line-height:1.06;
    color:var(--deep-brown); margin-bottom:20px;
  }
  .section-title em { font-style:italic; color:var(--terracotta); }
  .section-body {
    font-family:'Jost',sans-serif; font-size:15px; font-weight:300;
    line-height:1.9; color:var(--stone);
  }

  /* ── ABOUT ── */
  .about { background:var(--warm-white); display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
  .about-images { position:relative; height:580px; }
  .about-img-main {
    position:absolute; top:0; left:0; width:72%; height:78%; overflow:hidden;
    box-shadow:18px 18px 50px rgba(44,24,16,0.14);
  }
  .about-img-secondary {
    position:absolute; bottom:0; right:0; width:55%; height:50%; overflow:hidden;
    border:6px solid var(--warm-white); box-shadow:-8px -8px 36px rgba(44,24,16,0.1);
  }
  .about-stat {
    position:absolute; top:44%; left:60%; background:var(--gold);
    padding:22px 26px; text-align:center; z-index:2;
  }
  .about-stat-num { font-family:'Cormorant Garamond',serif; font-size:46px; font-weight:300; color:var(--deep-brown); line-height:1; }
  .about-stat-label { font-size:9px; letter-spacing:0.25em; text-transform:uppercase; color:var(--deep-brown); margin-top:4px; }
  .about-features { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:34px; }
  .about-feature { padding:20px; border:1px solid var(--parchment); background:var(--cream); transition:border-color 0.3s; }
  .about-feature:hover { border-color:var(--gold); }
  .about-feature-icon { margin-bottom:10px; }
  .about-feature-title { font-family:'Cinzel',serif; font-size:11px; letter-spacing:0.15em; color:var(--deep-brown); margin-bottom:5px; }
  .about-feature-text { font-size:12px; color:var(--stone); line-height:1.7; }

  /* ── STATS BAR ── */
  .experience-bar { background:var(--deep-brown); padding:0 60px; display:grid; grid-template-columns:repeat(4,1fr); }
  .exp-item { text-align:center; padding:50px 20px; border-right:1px solid rgba(255,255,255,0.07); }
  .exp-item:last-child { border-right:none; }
  .exp-num { font-family:'Cormorant Garamond',serif; font-size:54px; font-weight:300; color:var(--gold); line-height:1; display:block; }
  .exp-label { font-size:10px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(255,255,255,0.38); margin-top:8px; display:block; }

  /* ── MENU ── */
  .menu-section { background:var(--parchment); position:relative; overflow:hidden; }
  .menu-section::before {
    content:''; position:absolute; top:-60px; right:-60px; width:380px; height:380px; border-radius:50%;
    background:radial-gradient(circle, rgba(201,168,76,0.07), transparent 70%); pointer-events:none;
  }
  .menu-header { text-align:center; margin-bottom:56px; }
  .menu-tabs { display:flex; justify-content:center; border-bottom:1px solid var(--sand); margin-bottom:48px; }
  .menu-tab {
    font-family:'Cinzel',serif; font-size:11px; letter-spacing:0.25em; text-transform:uppercase;
    padding:14px 36px; background:none; border:none; color:var(--stone); cursor:pointer;
    border-bottom:2px solid transparent; margin-bottom:-1px; transition:color 0.3s;
  }
  .menu-tab.active { color:var(--deep-brown); border-bottom-color:var(--gold); }
  .menu-tab:hover  { color:var(--deep-brown); }
  .menu-grid { display:grid; grid-template-columns:repeat(2,1fr); max-width:900px; margin:0 auto; }
  .menu-item {
    padding:26px 30px; border-bottom:1px solid var(--sand); border-right:1px solid var(--sand);
    display:flex; justify-content:space-between; align-items:flex-start; gap:20px; transition:background 0.3s;
  }
  .menu-item:nth-child(even) { border-right:none; }
  .menu-item:hover { background:rgba(255,255,255,0.55); }
  .menu-item-name { font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:400; color:var(--deep-brown); display:block; margin-bottom:4px; }
  .menu-item-desc { font-size:12px; color:var(--stone); line-height:1.6; font-weight:300; }
  .menu-item-price { font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:300; color:var(--gold); flex-shrink:0; }
  .menu-cta { text-align:center; margin-top:54px; }

  /* ── EVENTS ── */
  .events-section { background:var(--warm-white); }
  .events-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:52px; }
  .events-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:26px; }
  .event-card { background:var(--cream); overflow:hidden; transition:transform 0.4s ease, box-shadow 0.4s ease; cursor:pointer; }
  .event-card:hover { transform:translateY(-8px); box-shadow:0 20px 56px rgba(44,24,16,0.12); }
  .event-card-img-wrap { overflow:hidden; height:240px; transition:transform 0.6s; }
  .event-card:hover .event-card-img-wrap { transform:scale(1.05); }
  .event-card-body { padding:26px; }
  .event-date-badge {
    display:inline-block; font-family:'Cinzel',serif; font-size:9px; letter-spacing:0.3em; text-transform:uppercase;
    color:var(--gold); border:1px solid var(--gold-light); padding:5px 12px; margin-bottom:14px;
  }
  .event-title { font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:400; color:var(--deep-brown); margin-bottom:10px; line-height:1.2; }
  .event-desc { font-size:13px; color:var(--stone); line-height:1.75; margin-bottom:20px; }
  .event-register {
    font-family:'Jost',sans-serif; font-size:10px; letter-spacing:0.25em; text-transform:uppercase;
    color:var(--terracotta); text-decoration:none; border-bottom:1px solid var(--terracotta); padding-bottom:2px;
    transition:color 0.3s, border-color 0.3s;
  }
  .event-register:hover { color:var(--deep-brown); border-color:var(--deep-brown); }

  /* ── GALLERY ── */
  .gallery-section { background:var(--cream); padding:100px 0; }
  .gallery-header { text-align:center; padding:0 60px; margin-bottom:52px; }
  .gallery-grid { display:grid; grid-template-columns:2fr 1fr 1fr; grid-template-rows:290px 290px; gap:4px; }
  .gallery-item { overflow:hidden; position:relative; }
  .gallery-item:first-child { grid-row:span 2; }
  .gallery-img-wrap { width:100%; height:100%; transition:transform 0.8s ease; }
  .gallery-item:hover .gallery-img-wrap { transform:scale(1.06); }
  .gallery-overlay { position:absolute; inset:0; background:rgba(44,24,16,0); transition:background 0.4s; }
  .gallery-item:hover .gallery-overlay { background:rgba(44,24,16,0.18); }

  /* ── RESERVATION ── */
  .reservation-section { background:var(--deep-brown); position:relative; overflow:hidden; }
  .reservation-section::before {
    content:''; position:absolute; inset:0;
    background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c9a84c' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
    opacity:0.5;
  }
  .reservation-inner { position:relative; z-index:1; max-width:820px; margin:0 auto; text-align:center; }
  .reservation-inner .section-title { color:var(--warm-white); }
  .reservation-inner .section-body { color:rgba(255,255,255,0.45); margin:0 auto 40px; max-width:500px; }
  .res-form { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-bottom:12px; }
  .res-input {
    width:100%; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15);
    padding:15px 18px; font-family:'Jost',sans-serif; font-size:13px;
    color:var(--warm-white); outline:none; transition:border-color 0.3s;
  }
  .res-input::placeholder { color:rgba(255,255,255,0.35); }
  .res-input:focus { border-color:var(--gold); }
  .res-select {
    width:100%;
    background-color:#3d2416;
    border:1px solid rgba(255,255,255,0.22);
    padding:15px 40px 15px 18px;
    font-family:'Jost',sans-serif; font-size:13px;
    color:rgba(255,255,255,0.82);
    outline:none; cursor:pointer;
    -webkit-appearance:none; appearance:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23c9a84c' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat:no-repeat; background-position:right 16px center;
    transition:border-color 0.3s;
  }
  .res-select:focus { border-color:var(--gold); color:var(--warm-white); }
  .res-select option { background-color:#2c1810; color:#faf7f2; }
  .res-note { font-size:11px; color:rgba(255,255,255,0.28); letter-spacing:0.04em; margin-bottom:26px; text-align:left; }
  .res-submit {
    width:100%; background:var(--gold); border:none; padding:18px;
    font-family:'Cinzel',serif; font-size:12px; letter-spacing:0.32em; text-transform:uppercase;
    color:var(--deep-brown); cursor:pointer; transition:all 0.3s;
  }
  .res-submit:hover { background:var(--gold-light); transform:translateY(-2px); box-shadow:0 8px 28px rgba(201,168,76,0.35); }

  /* ── SERVICES ── */
  .services-section { background:var(--parchment); }
  .services-header { text-align:center; margin-bottom:60px; }
  .services-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; background:var(--sand); }
  .service-card {
    background:var(--parchment); padding:48px 38px; text-align:center;
    transition:background 0.3s; position:relative; overflow:hidden;
  }
  .service-card::after {
    content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%);
    width:0; height:2px; background:var(--gold); transition:width 0.4s ease;
  }
  .service-card:hover::after { width:60%; }
  .service-card:hover { background:var(--warm-white); }
  .service-icon { margin-bottom:18px; display:flex; justify-content:center; }
  .service-title { font-family:'Cinzel',serif; font-size:13px; letter-spacing:0.18em; color:var(--deep-brown); margin-bottom:12px; }
  .service-desc { font-size:13px; color:var(--stone); line-height:1.8; }

  /* ── FOOTER ── */
  footer { background:var(--ink); padding:80px 60px 40px; color:rgba(255,255,255,0.48); }
  .footer-top {
    display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:54px;
    padding-bottom:54px; border-bottom:1px solid rgba(255,255,255,0.07); margin-bottom:34px;
  }
  .footer-brand-name { font-family:'Cinzel',serif; font-size:28px; letter-spacing:0.2em; color:var(--gold); margin-bottom:6px; }
  .footer-brand-sub { font-size:10px; letter-spacing:0.38em; text-transform:uppercase; color:rgba(255,255,255,0.26); margin-bottom:18px; display:block; }
  .footer-desc { font-size:13px; line-height:1.85; max-width:280px; }
  .footer-col-title { font-family:'Cinzel',serif; font-size:10px; letter-spacing:0.3em; text-transform:uppercase; color:var(--gold); margin-bottom:20px; }
  .footer-links { list-style:none; display:flex; flex-direction:column; gap:10px; }
  .footer-links a { color:rgba(255,255,255,0.38); text-decoration:none; font-size:13px; transition:color 0.3s; }
  .footer-links a:hover { color:var(--gold); }
  .footer-address { font-size:13px; line-height:2.1; }
  .footer-bottom { display:flex; justify-content:space-between; align-items:center; }
  .footer-copy { font-size:11px; }
  .footer-socials { display:flex; gap:20px; }
  .footer-social { font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.36); text-decoration:none; transition:color 0.3s; }
  .footer-social:hover { color:var(--gold); }

  /* ── RESPONSIVE ── */
  @media (max-width:1024px) {
    .navbar,.navbar.scrolled { padding:16px 30px; }
    section { padding:80px 30px; }
    .about { grid-template-columns:1fr; gap:50px; }
    .about-images { height:420px; order:-1; }
    .experience-bar { grid-template-columns:repeat(2,1fr); padding:0 30px; }
    .events-grid { grid-template-columns:repeat(2,1fr); }
    .footer-top { grid-template-columns:1fr 1fr; gap:36px; }
    .services-grid { grid-template-columns:repeat(2,1fr); }
  }
  @media (max-width:768px) {
    .nav-links { display:none; }
    .hero-title { font-size:70px; }
    .menu-grid { grid-template-columns:1fr; }
    .menu-item { border-right:none !important; }
    .res-form { grid-template-columns:1fr; }
    .services-grid { grid-template-columns:1fr; }
    .gallery-grid { grid-template-columns:1fr 1fr; grid-template-rows:auto; }
    .gallery-item:first-child { grid-row:auto; }
    .gallery-section { padding:80px 0; }
    .footer-top { grid-template-columns:1fr; }
    .events-header { flex-direction:column; align-items:flex-start; gap:16px; }
    .events-grid { grid-template-columns:1fr; }
  }
`;

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const IconFort = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
    <rect x="4" y="20" width="30" height="14" rx="1" stroke="var(--stone)" strokeWidth="1.3" fill="none"/>
    <rect x="4" y="15" width="5" height="7" stroke="var(--stone)" strokeWidth="1.3" fill="none"/>
    <rect x="16.5" y="15" width="5" height="7" stroke="var(--stone)" strokeWidth="1.3" fill="none"/>
    <rect x="29" y="15" width="5" height="7" stroke="var(--stone)" strokeWidth="1.3" fill="none"/>
    <path d="M10 20V13a9 9 0 0 1 18 0v7" stroke="var(--stone)" strokeWidth="1.3" fill="none"/>
    <rect x="15" y="26" width="8" height="8" rx="0.5" stroke="var(--gold)" strokeWidth="1.2" fill="none"/>
  </svg>
);
const IconCocktail = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
    <path d="M7 6h24L19 21v11" stroke="var(--stone)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    <path d="M13 32h12" stroke="var(--stone)" strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="25" cy="11" r="2.5" fill="var(--gold)" opacity="0.45"/>
    <path d="M7 6l5 9" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const IconTerrace = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
    <path d="M4 30h30" stroke="var(--stone)" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M8 30V20a11 11 0 0 1 22 0v10" stroke="var(--stone)" strokeWidth="1.3" fill="none"/>
    <path d="M14 30v-8a5 5 0 0 1 10 0v8" stroke="var(--gold)" strokeWidth="1.2" fill="none"/>
    <circle cx="19" cy="11" r="3" stroke="var(--stone)" strokeWidth="1.2" fill="none"/>
  </svg>
);
const IconCamera = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
    <rect x="3" y="11" width="32" height="23" rx="2" stroke="var(--stone)" strokeWidth="1.3" fill="none"/>
    <circle cx="19" cy="23" r="7" stroke="var(--stone)" strokeWidth="1.3" fill="none"/>
    <circle cx="19" cy="23" r="3" fill="var(--gold)" opacity="0.4"/>
    <path d="M13 11V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" stroke="var(--stone)" strokeWidth="1.3"/>
    <circle cx="30" cy="16" r="1.5" fill="var(--stone)"/>
  </svg>
);
const IconParty = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
    <path d="M9 30L19 7l10 23" stroke="var(--stone)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    <path d="M12 23h14" stroke="var(--stone)" strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="28" cy="11" r="2" fill="var(--gold)" opacity="0.55"/>
    <path d="M28 11l3-3M28 11l3 2M28 11l-1 3.5" stroke="var(--gold)" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);
const IconChef = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
    <path d="M11 18c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="var(--stone)" strokeWidth="1.3" fill="none"/>
    <path d="M9 18h20v4a10 10 0 0 1-20 0v-4z" stroke="var(--stone)" strokeWidth="1.3" fill="none"/>
    <path d="M15 32v3M19 32v3M23 32v3" stroke="var(--stone)" strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="27" cy="13" r="4" stroke="var(--stone)" strokeWidth="1.2" fill="none"/>
    <circle cx="11" cy="13" r="4" stroke="var(--stone)" strokeWidth="1.2" fill="none"/>
    <path d="M17 21h4" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const IconMusic = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
    <path d="M15 30V12l18-4v18" stroke="var(--stone)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    <circle cx="11" cy="30" r="4" stroke="var(--stone)" strokeWidth="1.3" fill="none"/>
    <circle cx="29" cy="26" r="4" stroke="var(--stone)" strokeWidth="1.3" fill="none"/>
    <circle cx="11" cy="30" r="1.5" fill="var(--gold)" opacity="0.5"/>
    <circle cx="29" cy="26" r="1.5" fill="var(--gold)" opacity="0.5"/>
  </svg>
);
const IconVenue = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
    <path d="M19 4L35 13V35H3V13Z" stroke="var(--stone)" strokeWidth="1.3" strokeLinejoin="round" fill="none"/>
    <rect x="14" y="24" width="10" height="11" rx="0.5" stroke="var(--stone)" strokeWidth="1.3" fill="none"/>
    <rect x="8" y="17" width="7" height="7" rx="0.5" stroke="var(--gold)" strokeWidth="1.2" fill="none"/>
    <rect x="23" y="17" width="7" height="7" rx="0.5" stroke="var(--gold)" strokeWidth="1.2" fill="none"/>
  </svg>
);
const IconTable = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
    <path d="M4 15h30" stroke="var(--stone)" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M4 9h30v6H4z" stroke="var(--stone)" strokeWidth="1.3" fill="none"/>
    <path d="M9 15v16M29 15v16" stroke="var(--stone)" strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="13" cy="25" r="2.5" stroke="var(--gold)" strokeWidth="1.2" fill="none"/>
    <circle cx="25" cy="25" r="2.5" stroke="var(--gold)" strokeWidth="1.2" fill="none"/>
  </svg>
);
const IconMoon = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
    <path d="M30 22a13 13 0 1 1-14-14 10 10 0 0 0 14 14z" stroke="var(--stone)" strokeWidth="1.3" fill="none"/>
    <circle cx="28" cy="10" r="1.5" fill="var(--gold)"/>
    <circle cx="33" cy="15" r="1" fill="var(--gold)" opacity="0.55"/>
    <circle cx="31" cy="6" r="1.2" fill="var(--gold)" opacity="0.4"/>
  </svg>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const menuData = {
  Cocktails: [
    { name: "Desert Rose Fizz",        desc: "Rose water · Elderflower · Prosecco · Dried petals",      price: "₹799"    },
    { name: "Haveli Sour",             desc: "Aged whisky · Tamarind · Jaggery syrup · Smoked salt",     price: "₹849"    },
    { name: "Rajputana Old Fashioned", desc: "Bourbon · Cardamom bitters · Orange · Demerara",           price: "₹899"    },
    { name: "Jasmine Monsoon",         desc: "Gin · Jasmine tea · Lychee · Fresh lime · Foam",           price: "₹749"    },
  ],
  Food: [
    { name: "Smoked Paneer Tikka",  desc: "Heritage cheese · Saffron marinade · Charcoal-kissed",        price: "₹515"    },
    { name: "Lamb Galouti Sliders", desc: "Melt-away kebabs · Brioche bun · Mint chutney aioli",         price: "₹650"    },
    { name: "Truffle Corn Chaat",   desc: "Kachri crumble · Pomegranate · White truffle oil",            price: "₹480"    },
    { name: "Dal Bati Arancini",    desc: "Rajasthani soul meets Sicilian craft · Saffron aioli",        price: "₹520"    },
  ],
  Spirits: [
    { name: "JW Blue Label",        desc: "Legendary Scotch blend · 750ml bottle service",               price: "₹35,000" },
    { name: "Dom Pérignon",         desc: "Vintage Champagne · Chilled presentation",                    price: "₹65,000" },
    { name: "Hendrick's Gin",       desc: "Rose & cucumber infused · Premium serve",                     price: "₹1,200"  },
    { name: "Royal Salute 21yr",    desc: "Rare blended Scotch whisky · Heritage collection",            price: "₹32,000" },
  ],
};

const events = [
  { img: "/images/event-sundowner.jpg",   date: "Every Friday",  title: "Sundowner Sessions",   desc: "As dusk paints Jaipur gold, lose yourself in curated beats, signature cocktails, and ancient fort walls glowing amber." },
  { img: "/images/event-supper-club.jpg", date: "Last Saturday", title: "Heritage Supper Club", desc: "An intimate multi-course journey through Rajputana flavours, reinterpreted by our culinary team. Reservation required." },
  { img: "/images/event-art-pour.jpg",    date: "Monthly",       title: "Art & Pour Nights",    desc: "Local artists, live canvas, flowing wine. Witness Jaipur's creative spirit come alive beneath the arches of Dahmi Fort." },
];

const galleryItems = [
  { img: "/images/gallery-main-venue.jpg",   label: "Main Venue"      },
  { img: "/images/gallery-interior.jpg",     label: "Interior Detail" },
  { img: "/images/gallery-cocktail-bar.jpg", label: "Cocktail Bar"    },
  { img: "/images/gallery-outdoor.jpg",      label: "Outdoor Seating" },
  { img: "/images/gallery-night.jpg",        label: "Night Ambiance"  },
];

const services = [
  { Icon: IconParty, title: "Private Parties",        desc: "Birthdays, anniversaries, corporate events — the fort's grandeur is your canvas. Fully bespoke packages available." },
  { Icon: IconChef,  title: "Culinary Experiences",   desc: "Chef's Table dinners to curated tasting menus — our kitchen crafts moments that linger long after the last bite." },
  { Icon: IconMusic, title: "Live Entertainment",     desc: "Local artists, jazz evenings, and curated DJ nights that turn every visit into an unforgettable evening." },
  { Icon: IconVenue, title: "Heritage Venue Hire",    desc: "Open the fort for your event. Wedding shoots, brand activations, or intimate gatherings — we accommodate all." },
  { Icon: IconTable, title: "Dedicated Table Service",desc: "Full table service with dedicated hosts ensuring every detail of your evening is seamlessly taken care of." },
  { Icon: IconMoon,  title: "Late Night Lounge",      desc: "Stoa comes alive after midnight. Resident DJs, signature pours, and the magic of a fort under the stars." },
];

const navLinks = [
  { label: "About",   href: "#about"    },
  { label: "Menu",    href: "#menu"     },
  { label: "Events",  href: "#events"   },
  { label: "Gallery", href: "#gallery"  },
  { label: "Services",href: "#services" },
  { label: "Contact", href: "#contact"  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function StoaLanding() {
  const [scrolled,  setScrolled]  = useState(false);
  const [activeTab, setActiveTab] = useState("Cocktails");
  const [form,      setForm]      = useState({ name:"", phone:"", email:"", party:"", date:"", time:"" });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{FONTS + styles}</style>

      {/* ── NAVBAR ── */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <a href="#home" className="nav-logo">STOA</a>
        <ul className="nav-links">
          {navLinks.map(({ label, href }) => (
            <li key={label}><a href={href}>{label}</a></li>
          ))}
        </ul>
        <a href="#reservation" className="nav-cta">Reserve a Table</a>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">

        {/* Background photo */}
        <img src="/images/stoaimg1.jpg" alt="Stoa Jaipur" className="hero-bg-img" />

        {/*
          ── ARCH SVG OVERLAY — THE FIX ──
          Direct <img> tag, no wrapper div.
          width:100% stays inside hero, height:auto = zero overflow.
        */}
        <img
          src="/topshape.svg"
          alt=""
          className="hero-arch"
          aria-hidden="true"
        />

        {/* Bottom vignette */}
        <div className="hero-vignette" />

        {/* Text content */}
        <div className="hero-content">
          <span className="hero-eyebrow">Urban Heritage Bar · Dahmi Kalan, Jaipur</span>
          <h1 className="hero-title">Stoa</h1>
          <span className="hero-subtitle">Est. Jaipur · Rajasthan</span>
          <p className="hero-tagline">Where ancient walls pour modern stories</p>
          <div className="hero-actions">
            <a href="#reservation" className="btn-primary">Reserve a Table</a>
            <a href="#menu"        className="btn-ghost"  >Explore Menu</a>
          </div>
        </div>

        <div className="hero-scroll">
          <span>Discover</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="about" id="about">
        <div className="about-images">
          <div className="about-img-main">
            <img src="/images/about-main.jpg" alt="Stoa venue daytime" style={{width:"100%",height:"100%",objectFit:"cover"}} />
          </div>
          <div className="about-img-secondary">
            <img src="/images/about-interior.jpg" alt="Stoa interior detail" style={{width:"100%",height:"100%",objectFit:"cover"}} />
          </div>
          <div className="about-stat">
            <div className="about-stat-num">2019</div>
            <div className="about-stat-label">Est. in Jaipur</div>
          </div>
        </div>
        <div>
          <span className="section-tag">Our Heritage</span>
          <h2 className="section-title">A fort <em>reimagined</em> as Jaipur's most beautiful bar</h2>
          <p className="section-body">
            Nestled within the weathered walls of a renovated fort in Dahmi Kalan, Stoa is not merely a restaurant —
            it is a living canvas where Rajputana grandeur converses with contemporary sophistication. Every stone,
            every arch, every flickering lantern tells a story centuries in the making.
          </p>
          <div className="about-features">
            {[
              { Icon: IconFort,     title: "Heritage Fort Venue", text: "A restored Rajasthani fort — the most unique backdrop in Jaipur" },
              { Icon: IconCocktail, title: "Craft Cocktails",     text: "Signature drinks inspired by the flavours of the Pink City" },
              { Icon: IconTerrace,  title: "Al Fresco Dining",    text: "Open-air seating beneath ancient arches and starlit skies" },
              { Icon: IconCamera,   title: "Pinterest Aesthetic", text: "Every corner is a frame — designed to be lived and shared" },
            ].map(({ Icon, title, text }) => (
              <div className="about-feature" key={title}>
                <div className="about-feature-icon"><Icon /></div>
                <div className="about-feature-title">{title}</div>
                <div className="about-feature-text">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="experience-bar">
        {[["5+","Years of Legacy"],["50K+","Happy Guests"],["120+","Menu Items"],["4.8★","Avg. Rating"]].map(([n,l]) => (
          <div className="exp-item" key={l}>
            <span className="exp-num">{n}</span>
            <span className="exp-label">{l}</span>
          </div>
        ))}
      </div>

      {/* ── MENU ── */}
      <section className="menu-section" id="menu">
        <div className="menu-header">
          <span className="section-tag">Our Offerings</span>
          <h2 className="section-title">Curated <em>flavours</em> of Rajputana</h2>
          <div className="ornament" style={{ maxWidth:360, margin:"18px auto 0" }}>
            <div className="ornament-line"/><div className="ornament-diamond"/><div className="ornament-line"/>
          </div>
        </div>
        <div className="menu-tabs">
          {Object.keys(menuData).map(tab => (
            <button key={tab} className={`menu-tab ${activeTab===tab?"active":""}`} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>
        <div className="menu-grid">
          {menuData[activeTab].map((item, i) => (
            <div className="menu-item" key={i}>
              <div>
                <span className="menu-item-name">{item.name}</span>
                <p className="menu-item-desc">{item.desc}</p>
              </div>
              <span className="menu-item-price">{item.price}</span>
            </div>
          ))}
        </div>
        <div className="menu-cta"><a href="#" className="btn-primary">View Full Menu</a></div>
      </section>

      {/* ── EVENTS ── */}
      <section className="events-section" id="events">
        <div className="events-header">
          <div>
            <span className="section-tag">What's On</span>
            <h2 className="section-title">Evenings <em>worth</em> living for</h2>
          </div>
          <a href="#" className="btn-outline-dark">All Events</a>
        </div>
        <div className="events-grid">
          {events.map((e, i) => (
            <div className="event-card" key={i}>
              <div className="event-card-img-wrap">
                <img src={e.img} alt={e.title} style={{width:"100%",height:"100%",objectFit:"cover"}} />
              </div>
              <div className="event-card-body">
                <span className="event-date-badge">{e.date}</span>
                <h3 className="event-title">{e.title}</h3>
                <p className="event-desc">{e.desc}</p>
                <a href="#" className="event-register">Register Now →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="gallery-section" id="gallery">
        <div className="gallery-header">
          <span className="section-tag">The Aesthetic</span>
          <h2 className="section-title">Every corner, <em>a story</em></h2>
        </div>
        <div className="gallery-grid">
          {galleryItems.map((item, i) => (
            <div className="gallery-item" key={i}>
              <img src={item.img} alt={item.label} style={{width:"100%",height:"100%",objectFit:"cover"}} />
              <div className="gallery-overlay" />
            </div>
          ))}
        </div>
      </section>

      {/* ── RESERVATION ── */}
      <section className="reservation-section" id="reservation">
        <div className="reservation-inner">
          <span className="section-tag">Reservations</span>
          <h2 className="section-title">Reserve your <em style={{ color:"var(--gold)" }}>table</em></h2>
          <p className="section-body">
            Secure your evening at Jaipur's most coveted address. Tables fill quickly — we recommend booking 48 hours in advance.
          </p>
          <div className="res-form">
            <input className="res-input" placeholder="Your Name"     value={form.name}  onChange={e=>setForm({...form,name:e.target.value})} />
            <input className="res-input" placeholder="Phone Number"  value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
            <input className="res-input" placeholder="Email Address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
            <select className="res-select" value={form.party} onChange={e=>setForm({...form,party:e.target.value})}>
              <option value="" disabled>Party Size</option>
              {[1,2,3,4,5,6,7,"8+"].map(n=>(
                <option key={n} value={n}>{n} {n===1?"Guest":"Guests"}</option>
              ))}
            </select>
            <input className="res-input" type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
            <input className="res-input" type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} />
          </div>
          <p className="res-note">* Dress code: Smart Casual / Party wear. Rights of admission reserved as per management discretion.</p>
          <button className="res-submit">Confirm Reservation</button>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services-section" id="services">
        <div className="services-header">
          <span className="section-tag">What We Offer</span>
          <h2 className="section-title">Exceptional <em>experiences</em>, every time</h2>
        </div>
        <div className="services-grid">
          {services.map(({ Icon, title, desc }) => (
            <div className="service-card" key={title}>
              <div className="service-icon"><Icon /></div>
              <div className="service-title">{title}</div>
              <p className="service-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact">
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">STOA</div>
            <span className="footer-brand-sub">Urban Heritage Bar · Jaipur</span>
            <p className="footer-desc">Where the grandeur of Rajputana meets the art of the modern bar. A place where every evening becomes a memory etched in stone.</p>
          </div>
          <div>
            <p className="footer-col-title">Navigate</p>
            <ul className="footer-links">
              {navLinks.map(({ label, href }) => (
                <li key={label}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Hours</p>
            <div className="footer-address">
              <p>Tuesday – Sunday</p>
              <p style={{ color:"var(--gold)", marginTop:4 }}>6:00 PM – 1:00 AM</p>
              <p style={{ marginTop:14, color:"rgba(255,255,255,0.28)", fontSize:11 }}>Closed on Mondays</p>
            </div>
          </div>
          <div>
            <p className="footer-col-title">Find Us</p>
            <div className="footer-address">
              <p>Dahmi Kalan Fort</p>
              <p>Jaipur, Rajasthan</p>
              <p style={{ marginTop:12 }}>
                <a href="tel:+91" style={{ color:"var(--gold)", textDecoration:"none" }}>+91 XXXXX XXXXX</a>
              </p>
              <p style={{ marginTop:4 }}>
                <a href="mailto:hello@stoajaipur.com" style={{ color:"rgba(255,255,255,0.36)", textDecoration:"none", fontSize:12 }}>
                  hello@stoajaipur.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2025 Stoa Jaipur. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#" className="footer-social">Instagram</a>
            <a href="#" className="footer-social">Facebook</a>
            <a href="#" className="footer-social">WhatsApp</a>
          </div>
        </div>
      </footer>
    </>
  );
}