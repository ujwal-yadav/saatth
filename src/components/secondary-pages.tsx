"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { useSaatth } from "@/components/saatth-provider";
import { Icon, MapPreview, type IconName } from "@/components/ui";
import { dateString, formatDate, formatMoney, services, type Booking } from "@/lib/saatth";
import "./secondary-pages.css";

type VisitFilter = "all" | "visits" | "recurring";

function SavedVisit({ booking }: { booking: Booking }) {
  const { openDialog } = useSaatth();
  const service = services.find((item) => item.id === booking.serviceId);
  if (!service) return null;

  return (
    <article className="secondary-saved-visit">
      <span className="secondary-service-icon" style={{ "--service-tone": service.tone } as CSSProperties}>
        <Icon name={service.icon} />
      </span>
      <div className="secondary-saved-details">
        <span className="secondary-caption">For {booking.person} <span aria-hidden="true">·</span> Sample request</span>
        <h3>{service.title}</h3>
        <div className="secondary-visit-meta">
          <span><Icon name="calendar" /><time dateTime={booking.date}>{formatDate(booking.date)}</time> · {booking.hours} hours</span>
          <span><Icon name="pin" />{booking.address}</span>
        </div>
      </div>
      <div className="secondary-visit-price">
        <strong>{formatMoney(Math.round(booking.hours * service.rate * 1.18))}</strong>
        <span>Estimated total</span>
        <button className="textbtn" onClick={() => openDialog({ kind: "booking", serviceId: service.id, person: booking.person })}>
          Plan another <span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  );
}

export function VisitsPage() {
  const { openDialog, bookings, plans } = useSaatth();
  const [filter, setFilter] = useState<VisitFilter>("all");
  const filters: { value: VisitFilter; label: string; count: number }[] = [
    { value: "all", label: "All visits", count: bookings.length + plans.length + 1 },
    { value: "visits", label: "One-time visits", count: bookings.length + 1 },
    { value: "recurring", label: "Recurring care", count: plans.length },
  ];

  return (
    <div className="secondary-page secondary-visits-page">
      <header className="secondary-page-intro">
        <div>
          <p className="eyebrow">A LITTLE PEACE OF MIND</p>
          <h1 className="page-heading">Your care, <em>all together.</em></h1>
          <p>Every visit, every familiar face. A little less to keep track of.</p>
        </div>
        <button className="btn" onClick={() => openDialog({ kind: "booking", serviceId: 0 })}>
          Book a visit <Icon name="arrow" />
        </button>
      </header>

      <div className="secondary-filters" role="group" aria-label="Filter your visits">
        {filters.map(({ value, label, count }) => (
          <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>
            {label}<span>{count}</span>
          </button>
        ))}
      </div>

      {filter !== "recurring" && (
        <>
          <section className="secondary-active-visit" aria-labelledby="active-visit-title">
            <div className="secondary-active-copy">
              <div className="secondary-active-top">
                <span className="secondary-status"><span />On the way</span>
                <span className="secondary-caption">Sample visit</span>
              </div>
              <div className="secondary-active-title">
                <div className="secondary-date-tile"><span>TODAY</span><strong>10:00</strong><span>AM</span></div>
                <div>
                  <p className="secondary-caption">Hospital companion</p>
                  <h2 id="active-visit-title">Maa’s doctor visit</h2>
                  <p>A familiar face for a little reassurance.</p>
                </div>
              </div>
              <div className="secondary-companion-row">
                <span className="secondary-companion-avatar">AS</span>
                <div><strong>Anjali Sharma</strong><span>Maa’s sample companion</span></div>
                <button className="secondary-icon-button" aria-label="Contact your care coordinator" onClick={() => openDialog({ kind: "support", topic: "Managing a visit" })}>
                  <Icon name="chat" />
                </button>
              </div>
              <button className="btn secondary-view-visit" onClick={() => openDialog({ kind: "tracking" })}>
                View visit updates <Icon name="arrow" />
              </button>
            </div>
            <div className="secondary-active-map">
              <MapPreview />
              <div className="secondary-map-caption"><Icon name="pin" /><span>A little closer to their day.<small>Illustrative route · No live tracking</small></span></div>
            </div>
          </section>

          <section className="secondary-requests" aria-labelledby="saved-visits-heading">
            <div className="secondary-section-heading">
              <h2 id="saved-visits-heading">Your saved visits</h2>
              <span>{bookings.length} {bookings.length === 1 ? "request" : "requests"}</span>
            </div>
            {bookings.length ? (
              <div className="secondary-visit-list">
                {bookings.map((booking) => <SavedVisit key={booking.id} booking={booking} />)}
              </div>
            ) : (
              <div className="secondary-empty-state">
                <span className="secondary-empty-icon"><Icon name="calendar" /></span>
                <div><h3>Make a little room for support.</h3><p>Your next visit will feel right at home here. Start with what your family needs.</p></div>
                <button className="textbtn" onClick={() => openDialog({ kind: "booking", serviceId: 0 })}>Plan your first visit <Icon name="arrow" /></button>
              </div>
            )}
          </section>
        </>
      )}

      {filter !== "visits" && (
        <section className="secondary-recurring-section" aria-labelledby="recurring-care-heading">
          <div className="secondary-section-heading">
            <h2 id="recurring-care-heading">Care with a rhythm</h2>
            {plans.length > 0 && <button className="textbtn" onClick={() => openDialog({ kind: "recurring" })}>Add a plan <span aria-hidden="true">+</span></button>}
          </div>
          {plans.length ? (
            <div className="secondary-plan-grid">
              {plans.map((plan) => (
                <article className="secondary-plan-card" key={plan.id}>
                  <div className="secondary-plan-top"><span className="secondary-empty-icon"><Icon name="calendar" /></span><span className="secondary-caption">Sample plan</span></div>
                  <h3>{plan.frequency}</h3>
                  <p>{plan.time} visits, with time for what matters.</p>
                  <div className="secondary-plan-footer"><Icon name="heart" />A familiar face. A steady rhythm.</div>
                </article>
              ))}
            </div>
          ) : (
            <div className="secondary-recurring-empty">
              <span className="secondary-recurring-leaf" aria-hidden="true"><Icon name="leaf" /></span>
              <div><p className="eyebrow">A STEADY RHYTHM</p><h3>Good care, on repeat.</h3><p>Make everyday support a familiar part of their week.</p></div>
              <button className="btn white" onClick={() => openDialog({ kind: "recurring" })}>Explore recurring care <Icon name="arrow" /></button>
            </div>
          )}
        </section>
      )}
      <p className="secondary-demo-note"><Icon name="shield" />Your requests stay in this browser. No live bookings or payments.</p>
    </div>
  );
}

const familyProfiles = [
  { name: "Maa", relationship: "Your mother", monogram: "M", preference: "Female companion", note: "A little company. A lot of comfort.", tone: "peach" },
  { name: "Papa", relationship: "Your father", monogram: "P", preference: "Morning visits", note: "Support that fits his everyday rhythm.", tone: "sage" },
];

export function FamilyPage() {
  const { openDialog, neighbourhood, bookings } = useSaatth();
  const today = dateString();

  return (
    <div className="secondary-page secondary-family-page">
      <header className="secondary-page-intro">
        <div><p className="eyebrow">THE PEOPLE WHO MATTER</p><h1 className="page-heading">Your circle. <em>Our care.</em></h1><p>Knowing the little things makes all the difference.</p></div>
        <span className="secondary-family-label"><Icon name="users" />2 sample profiles</span>
      </header>

      <div className="secondary-family-layout">
        <div className="secondary-profile-grid">
          {familyProfiles.map(({ name, relationship, monogram, preference, note, tone }) => {
            const upcomingCount = bookings.filter((booking) => booking.person === name && booking.date >= today).length;
            return (
              <section className={`secondary-profile-card secondary-profile-${tone}`} key={name} aria-labelledby={`profile-${name}`}>
                <div className="secondary-profile-cover"><span className="secondary-profile-monogram">{monogram}</span><Icon name="leaf" /></div>
                <div className="secondary-profile-body">
                  <span className="secondary-relationship">{relationship}</span>
                  <h2 id={`profile-${name}`}>{name}</h2>
                  <p className="secondary-profile-note">{note}</p>
                  <div className="secondary-profile-location"><Icon name="pin" /><span>{neighbourhood}, Jaipur</span></div>
                  <div className="secondary-profile-preferences"><span><Icon name="chat" />Hindi</span><span><Icon name={name === "Maa" ? "users" : "calendar"} />{preference}</span></div>
                  <div className="secondary-profile-next"><Icon name="calendar" /><span>{upcomingCount > 0 ? `${upcomingCount} upcoming sample ${upcomingCount === 1 ? "visit" : "visits"}` : "Ready when they need you"}</span></div>
                  <button className="btn white" onClick={() => openDialog({ kind: "booking", serviceId: 1, person: name })}>Plan a visit for {name}<Icon name="arrow" /></button>
                </div>
              </section>
            );
          })}
        </div>
        <aside className="secondary-family-story">
          <div className="secondary-connected-art" aria-hidden="true"><span>M</span><Icon name="heart" /><span>P</span><i /></div>
          <p className="eyebrow">CLOSER, EVEN FROM AFAR</p>
          <h2>Distance changes.<br /><em>Care doesn’t.</em></h2>
          <p>Build a familiar rhythm around the people you love, with a little support to look forward to.</p>
          <button className="btn" onClick={() => openDialog({ kind: "recurring" })}>Set up recurring care <Icon name="arrow" /></button>
          <Link className="textbtn" href="/visits">See your family’s visits <span aria-hidden="true">↗</span></Link>
        </aside>
      </div>

      <section className="secondary-family-bottom">
        <span className="secondary-empty-icon"><Icon name="heart" /></span>
        <div><h2>The little things are the big things.</h2><p>A preferred language. A familiar routine. Thoughtful care starts by listening.</p></div>
        <button className="textbtn" onClick={() => openDialog({ kind: "support" })}>Talk to us about their needs <Icon name="arrow" /></button>
      </section>
      <p className="secondary-demo-note">These sample profiles help you explore the experience. New requests are saved in this browser.</p>
    </div>
  );
}

const supportCategories: { title: string; description: string; icon: IconName; tone: string; topic: string }[] = [
  { title: "Find the right support", description: "A little guidance on choosing care that fits your family.", icon: "heart", tone: "#f2e7dc", topic: "Choosing a service" },
  { title: "Help with a visit", description: "Talk through your plans, preferences, or a question about a visit.", icon: "calendar", tone: "#e8edde", topic: "Managing a visit" },
  { title: "Share what’s on your mind", description: "A question, a concern, or something you’d like us to know.", icon: "chat", tone: "#ebe7ef", topic: "Report a concern" },
];

const careQuestions = [
  { question: "How do I choose the right service?", answer: "Start with the kind of help you need: someone to accompany a hospital visit, everyday companionship for a parent, errands, a driver, or support at a family event. Open “Find the right support” above to explore the care team conversation." },
  { question: "Can I arrange a visit for Maa or Papa?", answer: "Yes. Open My circle and choose “Plan a visit” on their profile. You can review the service, date, duration, and meeting address before adding a sample request. It will appear in My visits." },
  { question: "What goes into the estimated price?", answer: "The estimate uses the service’s hourly rate and your chosen duration, plus an illustrative 18% tax. You’ll see the full breakdown before confirming a sample request. There are no payments in this preview." },
  { question: "Can I set up care every week?", answer: "Explore recurring care to choose three visits a week, five visits a week, or daily visits, with a morning or afternoon preference. Your sample plan will be saved under Recurring care in My visits." },
  { question: "Where are my plans and requests saved?", answer: "Your sample visits, recurring plans, and neighbourhood are saved in this browser on this device. Clearing browser storage removes them. This preview does not send requests, dispatch companions, or send support messages." },
];

export function SupportPage() {
  const { openDialog } = useSaatth();

  return (
    <div className="secondary-page secondary-support-page">
      <header className="secondary-support-hero">
        <div><p className="eyebrow">WE’RE IN THIS TOGETHER</p><h1 className="page-heading">A little help.<br /><em>A real conversation.</em></h1><p>Sometimes, you just need someone to talk it through with.<br className="secondary-desktop-break" /> Let’s find the right support for your people.</p><button className="btn" onClick={() => openDialog({ kind: "support" })}>Start a conversation <Icon name="arrow" /></button></div>
        <div className="secondary-support-art" aria-hidden="true"><div className="secondary-art-ring" /><span className="secondary-art-chat"><Icon name="chat" /></span><span className="secondary-art-heart"><Icon name="heart" /></span><span className="secondary-art-leaf"><Icon name="leaf" /></span><span className="secondary-art-dot" /></div>
      </header>

      <section aria-labelledby="support-categories-title">
        <div className="secondary-section-heading"><h2 id="support-categories-title">What can we help with?</h2><span>One step at a time.</span></div>
        <div className="secondary-support-categories">
          {supportCategories.map(({ title, description, icon, tone, topic }) => (
            <button className="secondary-support-category" key={title} onClick={() => openDialog({ kind: "support", topic })}>
              <span className="secondary-service-icon" style={{ "--service-tone": tone } as CSSProperties}><Icon name={icon} /></span>
              <h3>{title}</h3><p>{description}</p><span className="secondary-category-action">Let’s talk <Icon name="arrow" /></span>
            </button>
          ))}
        </div>
      </section>

      <section className="secondary-faq-layout" aria-labelledby="faq-title">
        <div className="secondary-faq-intro"><p className="eyebrow">A LITTLE CLARITY</p><h2 id="faq-title">Good questions.<br /><em>Thoughtful answers.</em></h2><p>A few things you might be wondering before getting started.</p><button className="textbtn" onClick={() => openDialog({ kind: "how" })}>See how Saatth works <Icon name="arrow" /></button></div>
        <div className="secondary-faq-list">
          {careQuestions.map(({ question, answer }) => (
            <details className="secondary-faq-item" name="care-questions" key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>
          ))}
        </div>
      </section>

      <section className="secondary-support-footer"><span className="secondary-empty-icon"><Icon name="support" /></span><div><h2>You don’t need to have it all figured out.</h2><p>Tell us what’s on your mind. We’ll start there.</p></div><button className="btn white" onClick={() => openDialog({ kind: "support" })}>Talk it through <Icon name="arrow" /></button></section>
      <p className="secondary-demo-note">Explore the support experience. Messages in this preview are not sent.</p>
    </div>
  );
}
