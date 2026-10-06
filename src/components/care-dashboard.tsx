"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSaatth } from "@/components/saatth-provider";
import { ServiceCards } from "@/components/service-cards";
import { Icon, MapPreview } from "@/components/ui";

export { VisitsPage, FamilyPage, SupportPage } from "@/components/secondary-pages";

export function DashboardHome() {
  const { openDialog, bookings, plans } = useSaatth();
  const router = useRouter();
  return (
    <div className="dashboard-page">
      <div className="dashboard-heading page-heading">
        <div><span className="eyebrow">A LITTLE CARE GOES A LONG WAY</span><h1>Good to see you, Ujwal<span className="greeting-dot">.</span></h1><p>Your people. Our priority. Let’s make today a little lighter.</p></div>
        <button className="btn small" onClick={() => openDialog({ kind: "booking", serviceId: 0 })}><Icon name="plus" /> Book a visit</button>
      </div>
      <div className="care-overview" aria-label="Your care at a glance">
        <Link href="/family"><span className="overview-icon"><Icon name="users" /></span><span><b>2 people</b> in your circle</span><Icon name="chevron" /></Link>
        <Link href="/visits"><span className="overview-icon peach"><Icon name="calendar" /></span><span><b>{bookings.length + 1} {bookings.length === 0 ? "visit" : "visits"}</b> to keep close <small>· sample</small></span><Icon name="chevron" /></Link>
        <button onClick={() => plans.length ? router.push("/visits") : openDialog({ kind: "recurring" })}><span className="overview-icon lavender"><Icon name="heart" /></span><span><b>{plans.length ? `${plans.length} care ${plans.length === 1 ? "plan" : "plans"}` : "A steady rhythm"}</b>{plans.length ? " saved for you" : " starts here"}</span><Icon name="chevron" /></button>
      </div>
      <div className="dashboard-columns">
        <div className="dashboard-primary">
          <section className="apphero">
            <div className="copy"><span className="eyebrow">HERE FOR YOUR EVERYDAY</span><h2>A helping hand.<br /><em>A familiar feeling.</em></h2><p>Thoughtful companions for the little things that mean so much.</p><button className="btn small" onClick={() => openDialog({ kind: "booking", serviceId: 0 })}>Find the right help <Icon name="arrow" /></button></div>
            <div className="apphero-photo"><Image src="/images/care-companion.webp" alt="A care companion sharing a warm moment with an older woman" fill sizes="(max-width: 600px) 90vw, (max-width: 1180px) 40vw, 28vw" preload /></div>
            <div className="apphero-note"><Icon name="heart" /> A little more together.</div>
          </section>
          <section className="appservices" aria-labelledby="services-heading"><div className="sectionhead"><div><h2 id="services-heading">What would help today?</h2><p>Little things, taken care of.</p></div><button className="textbtn" onClick={() => openDialog({ kind: "support" })}>Help me choose <Icon name="arrow" /></button></div><ServiceCards compact /></section>
        </div>
        <aside className="dashboard-aside">
          <section className="card next-visit" aria-labelledby="next-visit-heading">
            <div className="cardhead"><span className="eyebrow" id="next-visit-heading">A LITTLE PEACE OF MIND</span><Link className="textbtn" href="/visits">All visits <Icon name="arrow" /></Link></div>
            <div className="visit-status"><span className="status-dot" /> On the way <span>· Sample visit</span></div>
            <h3>Maa’s doctor visit</h3><div className="date"><Icon name="calendar" /><span>Today, 10:00 AM</span></div>
            <MapPreview />
            <div className="person companion"><div className="avatar">AS</div><div className="name"><b>Anjali Sharma</b><small>Your companion</small></div><button className="round" aria-label="Message companion" onClick={() => openDialog({ kind: "support", topic: "Managing a visit" })}><Icon name="chat" /></button></div>
            <button className="btn wide" onClick={() => openDialog({ kind: "tracking" })}>View visit updates <Icon name="arrow" /></button><span className="visit-reassurance"><Icon name="shield" /> A familiar face. A reassuring presence.</span>
          </section>
          <section className="card familycard" aria-labelledby="family-heading"><div className="cardhead"><h3 id="family-heading">Your inner circle</h3><Link className="textbtn" href="/family">Manage <Icon name="arrow" /></Link></div><Link className="family-preview" href="/family"><span className="avatar-stack"><span className="avatar">M</span><span className="avatar">P</span></span><span><b>Maa &amp; Papa</b><small>Close to your heart.<br />Close to our care.</small></span><Icon name="chevron" /></Link></section>
          <div className="care-note"><Icon name="leaf" /><p>Being there takes many forms.<br /><em>This is one of them.</em></p></div>
        </aside>
      </div>
      <section className="repeat"><div className="repeat-icon"><Icon name="calendar" /></div><div className="repeat-copy"><span className="eyebrow">A FAMILIAR FACE, AGAIN AND AGAIN</span><h2>Good care, <em>on repeat.</em></h2><p>Build a little support into your family’s everyday.</p></div><button className="btn white small" onClick={() => openDialog({ kind: "recurring" })}>Set up recurring care <Icon name="arrow" /></button></section>
      <p className="demo-note"><span className="status-dot" /> You’re exploring a preview. Profiles, visits, and tracking are illustrative.</p>
    </div>
  );
}
