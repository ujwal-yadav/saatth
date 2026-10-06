"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useSaatth } from "@/components/saatth-provider";
import { Brand, Icon, MapPreview, type IconName } from "@/components/ui";
import { dateString, formatDate, formatMoney, neighbourhoods, services } from "@/lib/saatth";
import "./care-dialog.css";

function DialogIntro({
  icon,
  eyebrow,
  tone,
  children,
}: {
  icon: IconName;
  eyebrow: string;
  tone?: string;
  children: ReactNode;
}) {
  return (
    <div className="sheet-intro">
      <span className="sheet-intro-icon" style={tone ? { background: tone } : undefined}>
        <Icon name={icon} />
      </span>
      <span className="sheet-eyebrow">{eyebrow}</span>
      {children}
    </div>
  );
}

function ProgressSteps({ review, label }: { review: boolean; label: string }) {
  return (
    <ol className="sheet-steps" aria-label={label}>
      <li className={review ? "complete" : "current"} aria-current={review ? undefined : "step"}>
        <span>{review ? <Icon name="check" /> : "1"}</span> Details
      </li>
      <li className={review ? "current" : ""} aria-current={review ? "step" : undefined}>
        <span>2</span> Review
      </li>
    </ol>
  );
}

function DialogTitle({
  id,
  children,
  step = "initial",
}: {
  id: string;
  children: ReactNode;
  step?: string;
}) {
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => heading.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [step]);

  return (
    <h2 id={id} ref={heading} className="dialog-heading" tabIndex={-1}>
      {children}
    </h2>
  );
}

function DialogShell({
  children,
  headingId,
}: {
  children: ReactNode;
  headingId: string;
}) {
  const { closeDialog } = useSaatth();
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = modal.current;
    if (!element) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <dialog
      ref={modal}
      className="modal"
      aria-labelledby={headingId}
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog();
      }}
    >
      <section className="sheet">
        <header className="sheethead">
          <Brand />
          <button
            type="button"
            className="round"
            aria-label="Close dialog"
            onClick={closeDialog}
          >
            <Icon name="close" />
          </button>
        </header>
        <div className="sheet-content">{children}</div>
      </section>
    </dialog>
  );
}

function Estimate({ rate, hours }: { rate: number; hours: number }) {
  const base = rate * hours;
  const tax = Math.round(base * 0.18);

  return (
    <div className="summary estimate" aria-live="polite" aria-atomic="true">
      <span className="summary-caption"><Icon name="rupee" /> A clear picture, upfront</span>
      <div className="summary-row">
        <span>Service estimate</span>
        <b>{formatMoney(base)}</b>
      </div>
      <div className="summary-row">
        <span>Illustrative tax · 18%</span>
        <span>{formatMoney(tax)}</span>
      </div>
      <div className="summary-row total">
        <span>Estimated total</span>
        <span>{formatMoney(base + tax)}</span>
      </div>
    </div>
  );
}

function BookingDialog({
  headingId,
  serviceId,
  initialPerson,
}: {
  headingId: string;
  serviceId: number;
  initialPerson?: string;
}) {
  const { addBooking, closeDialog, neighbourhood } = useSaatth();
  const router = useRouter();
  const service = services.find((item) => item.id === serviceId) ?? services[0];
  const [person, setPerson] = useState(initialPerson ?? "Maa");
  const [date, setDate] = useState(() => dateString(1));
  const [hours, setHours] = useState(3);
  const [address, setAddress] = useState(`${neighbourhood}, Jaipur`);
  const [step, setStep] = useState<"details" | "review">("details");
  const [error, setError] = useState("");
  const submitted = useRef(false);
  const id = useId();

  function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!address.trim()) {
      setError("Please enter a meet-up address.");
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < dateString()) {
      setError("Please choose today or a future visit date.");
      return;
    }
    setError("");
    setStep("review");
  }

  function confirm() {
    if (submitted.current) return;
    submitted.current = true;
    addBooking({ serviceId: service.id, person, date, hours, address: address.trim() });
    closeDialog();
    router.push("/visits");
  }

  if (step === "review") {
    return (
      <>
        <ProgressSteps review label="Booking progress" />
        <DialogIntro icon="check" eyebrow="EVERY LITTLE DETAIL">
          <DialogTitle id={headingId} step={step}>One less thing to worry about.</DialogTitle>
          <p>Take a moment to check the details of your sample visit.</p>
        </DialogIntro>
        <div className="summary">
          <div className="summary-service">
            <span style={{ background: service.tone }}><Icon name={service.icon} /></span>
            <b>{service.title}</b>
          </div>
          <div className="summary-row"><span>For</span><b>{person}</b></div>
          <div className="summary-row"><span>Date</span><span>{formatDate(date)}</span></div>
          <div className="summary-row"><span>Duration</span><span>{hours} hours</span></div>
          <div className="summary-row"><span>Meet-up address</span><span>{address.trim()}</span></div>
          <div className="summary-row total">
            <span>Estimated total</span>
            <span>{formatMoney(service.rate * hours + Math.round(service.rate * hours * 0.18))}</span>
          </div>
        </div>
        <div className="sheet-actions">
          <button type="button" className="btn white" onClick={() => setStep("details")}>
            ← Back
          </button>
          <button type="button" className="btn" onClick={confirm}>
            Add sample visit →
          </button>
        </div>
        <p className="fine sheet-note"><Icon name="shield" /> A sample visit only. No request or payment is sent.</p>
      </>
    );
  }

  return (
    <>
      <ProgressSteps review={false} label="Booking progress" />
      <DialogIntro icon={service.icon} tone={service.tone} eyebrow="A LITTLE SUPPORT, PLANNED">
        <DialogTitle id={headingId} step={step}>{service.title}</DialogTitle>
        <p>{service.description}</p>
        <span className="service-rate">{formatMoney(service.rate)} <span>/ hour · illustrative rate</span></span>
      </DialogIntro>
      <form onSubmit={review}>
        <label htmlFor={`${id}-person`}>Who are we helping?</label>
        <select id={`${id}-person`} value={person} onChange={(event) => setPerson(event.target.value)}>
          {["Maa", "Papa", "Myself"].map((name) => <option key={name}>{name}</option>)}
        </select>
        <div className="sheet-field-row">
          <div>
            <label htmlFor={`${id}-date`}>Visit date</label>
            <input
              id={`${id}-date`}
              type="date"
              value={date}
              min={dateString()}
              required
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${id}-hours`}>Duration</label>
            <select id={`${id}-hours`} value={hours} onChange={(event) => setHours(Number(event.target.value))}>
              {[2, 3, 6].map((duration) => <option value={duration} key={duration}>{duration} hours</option>)}
            </select>
          </div>
        </div>
        <label htmlFor={`${id}-address`}>Meet-up address</label>
        <input
          id={`${id}-address`}
          autoComplete="street-address"
          value={address}
          required
          maxLength={200}
          aria-describedby={`${id}-address-hint`}
          onChange={(event) => setAddress(event.target.value)}
        />
        <p className="field-hint" id={`${id}-address-hint`}>A home, hospital, or somewhere familiar.</p>
        {error && <p className="form-error" role="alert">{error}</p>}
        <Estimate rate={service.rate} hours={hours} />
        <button type="submit" className="btn wide">Review request →</button>
      </form>
      <p className="fine sheet-note"><Icon name="shield" /> Illustrative prices only. No payment or real booking.</p>
    </>
  );
}

function TrackingDialog({ headingId }: { headingId: string }) {
  const { openDialog } = useSaatth();

  return (
    <>
      <DialogIntro icon="hospital" eyebrow="A LITTLE UPDATE. A BIG RELIEF.">
        <DialogTitle id={headingId}>Maa is in good company.</DialogTitle>
        <p>Hospital companion · Today, 10:00 AM</p>
      </DialogIntro>
      <div className="sheet-visit-status"><span className="pill">On the way · Sample</span><span>Vaishali Nagar, Jaipur</span></div>
      <MapPreview />
      <div className="person sheet-companion">
        <div className="avatar">AS</div>
        <div className="name"><b>Anjali Sharma</b><small>Your sample companion</small></div>
        <span className="companion-check" aria-label="Sample profile"><Icon name="shield" /></span>
      </div>
      <div className="sheet-timeline">
        <h3>Every step, together.</h3>
        <div className="event current"><span className="event-dot"><Icon name="car" /></span><b>Anjali is on her way</b><p>Expected arrival in 12 minutes.</p></div>
        <div className="event"><span className="event-dot"><Icon name="check" /></span><b>Visit plan ready</b><p>Registration, consultation and return home.</p></div>
        <div className="event"><span className="event-dot"><Icon name="check" /></span><b>Preferences shared</b><p>Hindi conversation · Female companion.</p></div>
      </div>
      <div className="sheet-pin">
        <div><span className="sheet-eyebrow">SAMPLE ARRIVAL PIN</span><p>Share when your companion arrives.</p></div>
        <b>4826</b>
      </div>
      <button type="button" className="btn white wide" onClick={() => openDialog({ kind: "support", topic: "Managing a visit" })}>
        <Icon name="support" /> Contact coordinator
      </button>
      <p className="fine sheet-note">Illustrative map and status. Not live tracking.</p>
    </>
  );
}

function SupportDialog({ headingId, initialTopic = "Choosing a service" }: { headingId: string; initialTopic?: string }) {
  const { closeDialog } = useSaatth();
  const [topic, setTopic] = useState(initialTopic);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState("");
  const id = useId();

  if (preview) {
    return (
      <>
        <DialogIntro icon="chat" eyebrow="YOUR MESSAGE, AT A GLANCE">
          <DialogTitle id={headingId} step="preview">Thanks for sharing.</DialogTitle>
          <p>Here’s your sample message. Nothing was sent.</p>
        </DialogIntro>
        <div className="summary message-preview">
          <span className="summary-caption">A NOTE FOR YOUR CARE TEAM</span>
          <div className="summary-row"><span>Topic</span><b>{topic}</b></div>
          <p className="summary-message">{message.trim()}</p>
        </div>
        <div className="sheet-actions">
          <button type="button" className="btn white" onClick={() => setPreview(false)}>← Edit message</button>
          <button type="button" className="btn" onClick={closeDialog}>Done</button>
        </div>
      </>
    );
  }

  return (
    <>
      <DialogIntro icon="support" tone="#f5e8db" eyebrow="A LISTENING EAR">
        <DialogTitle id={headingId} step="compose">A real conversation helps.</DialogTitle>
        <p>Choosing care can bring questions. Start with whatever’s on your mind.</p>
      </DialogIntro>
      <div className="sheet-callout"><Icon name="heart" /><span>For the little questions and the bigger ones, too.</span></div>
      <form onSubmit={(event) => {
        event.preventDefault();
        if (!message.trim()) {
          setError("Please add a message to preview.");
          return;
        }
        setError("");
        setPreview(true);
      }}>
        <label htmlFor={`${id}-topic`}>Topic</label>
        <select id={`${id}-topic`} value={topic} onChange={(event) => setTopic(event.target.value)}>
          <option>Choosing a service</option>
          <option>Managing a visit</option>
          <option>Report a concern</option>
        </select>
        <label htmlFor={`${id}-message`}>Message</label>
        <textarea
          id={`${id}-message`}
          rows={5}
          required
          maxLength={2000}
          aria-describedby={`${id}-message-count`}
          placeholder="Tell us a little more…"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <p className="field-hint message-count" id={`${id}-message-count`}>{message.length.toLocaleString()} / 2,000 characters</p>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="btn wide" type="submit">Preview message →</button>
      </form>
      <p className="fine sheet-note"><Icon name="shield" /> A private preview. This demo does not send messages.</p>
    </>
  );
}

function RecurringDialog({ headingId }: { headingId: string }) {
  const { addPlan, closeDialog } = useSaatth();
  const [frequency, setFrequency] = useState("3 visits per week");
  const [time, setTime] = useState("Morning");
  const [step, setStep] = useState<"details" | "preview" | "saved">("details");
  const submitted = useRef(false);
  const id = useId();

  if (step === "saved") {
    return (
      <>
        <div className="plan-success">
          <div className="plan-success-art" aria-hidden="true"><span><Icon name="check" /></span><Icon name="leaf" className="success-leaf" /></div>
          <span className="sheet-eyebrow">A LITTLE MORE PEACE OF MIND</span>
          <DialogTitle id={headingId} step={step}>Your sample plan is ready.</DialogTitle>
          <p>A little support to look forward to.<br />A rhythm that feels like you.</p>
          <div className="saved-plan-details"><Icon name="calendar" /><div><b>{frequency}</b><span>{time} visits</span></div></div>
        </div>
        <Link className="btn wide" href="/visits" onClick={closeDialog}>View my visits →</Link>
        <p className="fine sheet-note">Your sample preferences are saved. No enquiry was sent.</p>
      </>
    );
  }

  if (step === "preview") {
    return (
      <>
        <ProgressSteps review label="Recurring care progress" />
        <DialogIntro icon="calendar" eyebrow="A ROUTINE TO LOOK FORWARD TO">
          <DialogTitle id={headingId} step={step}>Care that fits your rhythm.</DialogTitle>
          <p>Review your recurring care preferences. Little moments of support, more often.</p>
        </DialogIntro>
        <div className="summary">
          <span className="summary-caption"><Icon name="heart" /> Your personal care rhythm</span>
          <div className="summary-row"><span>Visit frequency</span><b>{frequency}</b></div>
          <div className="summary-row"><span>Preferred time</span><b>{time}</b></div>
        </div>
        <div className="sheet-actions">
          <button type="button" className="btn white" onClick={() => setStep("details")}>← Back</button>
          <button type="button" className="btn" onClick={() => {
            if (submitted.current) return;
            submitted.current = true;
            addPlan({ frequency, time });
            setStep("saved");
          }}>Save sample plan →</button>
        </div>
        <p className="fine sheet-note">A sample plan only. No recurring visits will be booked.</p>
      </>
    );
  }

  return (
    <>
      <ProgressSteps review={false} label="Recurring care progress" />
      <DialogIntro icon="calendar" eyebrow="GOOD CARE, ON REPEAT">
        <DialogTitle id={headingId} step={step}>A familiar face.<br />A steady rhythm.</DialogTitle>
        <p>Make room for regular support with a familiar companion, subject to availability.</p>
      </DialogIntro>
      <div className="sheet-callout"><Icon name="leaf" /><span>A reassuring routine for the people you love.</span></div>
      <form onSubmit={(event) => { event.preventDefault(); setStep("preview"); }}>
        <label htmlFor={`${id}-frequency`}>Visit frequency</label>
        <select id={`${id}-frequency`} value={frequency} onChange={(event) => setFrequency(event.target.value)}>
          <option>3 visits per week</option><option>5 visits per week</option><option>Daily visits</option>
        </select>
        <label htmlFor={`${id}-time`}>Preferred time</label>
        <select id={`${id}-time`} value={time} onChange={(event) => setTime(event.target.value)}>
          <option>Morning</option><option>Afternoon</option>
        </select>
        <button className="btn wide" type="submit">Preview personal plan →</button>
      </form>
      <p className="fine sheet-note">Explore a sample plan. No enquiry will be sent.</p>
    </>
  );
}

function LocationDialog({ headingId }: { headingId: string }) {
  const { neighbourhood, setNeighbourhood, closeDialog } = useSaatth();
  const [selected, setSelected] = useState(neighbourhood);
  const id = useId();

  return (
    <>
      <DialogIntro icon="pin" tone="#f5e8db" eyebrow="CARE, A LITTLE CLOSER">
        <DialogTitle id={headingId}>Close to your people.</DialogTitle>
        <p>Choose a neighbourhood to make your care plans feel closer to home.</p>
      </DialogIntro>
      <div className="sheet-location-card"><span><Icon name="home" /></span><div><b>Jaipur, Rajasthan</b><p>The Pink City. A familiar place.</p></div><span className="pill">Sample city</span></div>
      <form onSubmit={(event) => {
        event.preventDefault();
        setNeighbourhood(selected);
        closeDialog();
      }}>
        <label htmlFor={`${id}-neighbourhood`}>Neighbourhood</label>
        <select id={`${id}-neighbourhood`} value={selected} onChange={(event) => setSelected(event.target.value)}>
          {neighbourhoods.map((name) => <option key={name}>{name}</option>)}
        </select>
        <p className="field-hint">We’ll use this as the starting address for new visits.</p>
        <button type="submit" className="btn wide">Done</button>
      </form>
      <p className="fine sheet-note">Jaipur is the sample location for this design.</p>
    </>
  );
}

function HowDialog({ headingId }: { headingId: string }) {
  const { closeDialog } = useSaatth();

  return (
    <>
      <DialogIntro icon="leaf" eyebrow="THOUGHTFUL FROM THE FIRST STEP">
        <DialogTitle id={headingId}>A little help.<br />Without the extra effort.</DialogTitle>
        <p>A few simple steps towards a lighter day. For you, and the people you love.</p>
      </DialogIntro>
      <ol className="sheet-how-steps">
        <li><span>01</span><div><h3>Tell us what you need</h3><p>Choose a service, a time, and who we’re helping. Every little detail matters.</p></div></li>
        <li><span>02</span><div><h3>Know who’s coming</h3><p>Review availability, pricing, and your companion before the visit.</p></div></li>
        <li><span>03</span><div><h3>Stay close to their day</h3><p>Follow visit updates and keep your family in the loop, wherever you are.</p></div></li>
      </ol>
      <Link className="btn wide" href="/dashboard" onClick={closeDialog}>Explore the app →</Link>
      <p className="fine sheet-note">Explore the experience with sample visits and profiles.</p>
    </>
  );
}

export function CareDialog() {
  const { dialog } = useSaatth();
  const headingId = useId();
  if (!dialog) return null;

  return (
    <DialogShell headingId={headingId}>
      {dialog.kind === "booking" && (
        <BookingDialog key={`${dialog.serviceId}-${dialog.person ?? "Maa"}`} headingId={headingId} serviceId={dialog.serviceId} initialPerson={dialog.person} />
      )}
      {dialog.kind === "tracking" && <TrackingDialog headingId={headingId} />}
      {dialog.kind === "support" && <SupportDialog key={dialog.topic ?? "Choosing a service"} headingId={headingId} initialTopic={dialog.topic} />}
      {dialog.kind === "recurring" && <RecurringDialog headingId={headingId} />}
      {dialog.kind === "location" && <LocationDialog headingId={headingId} />}
      {dialog.kind === "how" && <HowDialog headingId={headingId} />}
    </DialogShell>
  );
}
