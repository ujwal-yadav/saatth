"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useSaatth } from "@/components/saatth-provider";
import { ServiceCards } from "@/components/service-cards";
import { Brand, Icon, type IconName } from "@/components/ui";

const promises: { icon: IconName; title: string; detail: string; tone: string }[] = [
  { icon: "shield", title: "People you can trust", detail: "Thoughtfully verified companions", tone: "#eaf0e0" },
  { icon: "rupee", title: "No surprises", detail: "Clear estimates, right from the start", tone: "#faecdf" },
  { icon: "users", title: "Care that feels personal", detail: "Your routines. Your preferences.", tone: "#eeebf4" },
  { icon: "support", title: "A human touch", detail: "Someone to help you find your way", tone: "#e7eee7" },
];

export function LandingPage() {
  const { openDialog } = useSaatth();
  return (
    <div className="landing">
      <header className="landing-header">
        <nav className="nav wrap" aria-label="Main navigation">
          <Link href="/" className="brand-link" aria-label="Saatth home"><Brand /></Link>
          <div className="links">
            <a href="#services">Our services</a>
            <a href="#how-it-works">How it works</a>
            <Link href="/family">For your family</Link>
          </div>
          <Link className="btn small" href="/dashboard">Get started <Icon name="arrow" /></Link>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow"><span className="status-dot" /> A LITTLE HELP. A LOT OF HEART.</span>
            <h1 id="hero-title">Someone there.<br /><em>When you can’t be.</em></h1>
            <p>For the appointments, the everyday errands, and the moments that matter. Thoughtful support for you and the people you love.</p>
            <div className="actions">
              <Link className="btn" href="/dashboard">Find the right help <Icon name="arrow" /></Link>
              <button className="btn ghost" onClick={() => openDialog({ kind: "how" })}><span className="play-circle"><Icon name="play" /></span> How it works</button>
            </div>
            <div className="hero-reassurance"><Icon name="heart" /><span>A little peace of mind. A little more <i>saatth.</i></span></div>
          </div>
          <div className="hero-visual">
            <div className="heroimage">
              <Image src="/images/care-companion.webp" alt="A smiling older woman sharing a warm moment with her care companion" fill sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1300px) 45vw, 568px" preload />
              <span className="photo-note"><Icon name="leaf" /> Care that feels like family</span>
            </div>
            <div className="float"><span className="float-icon"><Icon name="heart" /></span><div><b>A little update. A big relief.</b><small>Closer, even from a distance.</small></div><span className="float-check"><Icon name="check" /></span></div>
            <span className="visual-caption">BECAUSE SHOWING UP MEANS EVERYTHING.</span>
          </div>
        </section>

        <div className="wrap">
          <div className="trust" aria-label="Care you can count on">
            {promises.map((promise) => <div className="trustitem" key={promise.title}><span className="iconbox" style={{ "--tone": promise.tone } as CSSProperties}><Icon name={promise.icon} /></span><div><b>{promise.title}</b><small>{promise.detail}</small></div></div>)}
          </div>
          <section id="services" className="landing-services" aria-labelledby="services-title">
            <div className="sectionhead">
              <div><span className="eyebrow">SUPPORT, IN ALL ITS LITTLE FORMS</span><h2 id="services-title">Everyday needs.<br className="mobile-break" /> <em>Extraordinary care.</em></h2></div>
              <Link className="textbtn" href="/dashboard">Explore all services <Icon name="arrow" /></Link>
            </div>
            <ServiceCards />
            <p className="service-footnote"><Icon name="shield" /> A clear estimate before you make a plan. Always.</p>
          </section>

          <section className="how-section" id="how-it-works" aria-labelledby="how-title">
            <div className="how-intro"><span className="eyebrow">LESS TO FIGURE OUT. MORE PEACE OF MIND.</span><h2 id="how-title">A little help.<br /><em>Without the extra effort.</em></h2><p>From “I wish someone could” to knowing someone will be there.</p><button className="textbtn" onClick={() => openDialog({ kind: "how" })}>See how Saatth works <Icon name="arrow" /></button></div>
            <div className="how-steps">
              {[
                ["01", "Tell us what would help", "A doctor’s appointment, a familiar face, or a few things off your list. Start with what you need."],
                ["02", "Make a plan that fits", "Choose who we’re helping, when, and for how long. See your estimate before moving ahead."],
                ["03", "Feel a little closer", "Know the plan, know your companion, and keep the people you love in the loop."],
              ].map(([number, title, description]) => <div className="how-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}
            </div>
          </section>

          <section className="cta" aria-labelledby="care-title">
            <div className="cta-leaf" aria-hidden="true"><Icon name="leaf" /></div>
            <div className="copy"><span className="eyebrow">YOU DON’T HAVE TO DO IT ALL.</span><h2 id="care-title">A little support.<br /><em>A lighter day.</em></h2><p>Let’s find the right help for your people.</p></div>
            <Link className="btn white" href="/dashboard">Find your kind of care <Icon name="arrow" /></Link>
          </section>
        </div>
      </main>

      <footer className="footer wrap">
        <div className="footer-main"><Link href="/" aria-label="Saatth home"><Brand /></Link><span>Made for the ones you love.</span><button className="textbtn" onClick={() => openDialog({ kind: "support" })}>Let’s talk <Icon name="arrow" /></button></div>
        <div className="footer-bottom"><span>© 2026 Saatth. A little closer, together.</span><span>Interactive preview · No live bookings or payments.</span></div>
      </footer>
    </div>
  );
}
