"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useSaatth } from "@/components/saatth-provider";
import { Brand, Icon } from "@/components/ui";

const navigation = [
  { href: "/dashboard", label: "Overview", mobile: "Home", icon: "home" },
  { href: "/visits", label: "My visits", mobile: "Visits", icon: "calendar" },
  { href: "/family", label: "My circle", mobile: "My circle", icon: "users" },
  { href: "/support", label: "Support", mobile: "Support", icon: "support" },
] as const;

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  return navigation.map(({ href, label, mobile: shortLabel, icon }) => (
    <Link key={href} href={href} className={pathname === href ? "active" : undefined} aria-current={pathname === href ? "page" : undefined}>
      <Icon name={icon} /><span>{mobile ? shortLabel : label}</span>{!mobile && pathname === href && <span className="nav-dot" />}
    </Link>
  ));
}

export function AppShell({ children }: { children: ReactNode }) {
  const { openDialog, neighbourhood } = useSaatth();
  const pathname = usePathname();
  const title = navigation.find((item) => item.href === pathname)?.label ?? "Your space";
  return (
    <>
      <div className="shell">
        <aside className="sidebar">
          <Link href="/" className="brand-link" aria-label="Saatth home"><Brand /></Link>
          <span className="brand-caption">A LITTLE CLOSER, TOGETHER.</span>
          <span className="nav-label">YOUR SPACE</span>
          <nav className="sidenav" aria-label="Main navigation"><NavigationLinks /></nav>
          <div className="sidebottom">
            <div className="sidebar-help"><span className="iconbox"><Icon name="leaf" /></span><h3>A little guidance?</h3><p>We’ll help you find the right kind of support.</p><button className="textbtn" onClick={() => openDialog({ kind: "support" })}>Let’s talk <Icon name="arrow" /></button></div>
            <Link href="/" className="back-link"><span aria-hidden="true">←</span> Back to website</Link>
            <Link href="/family" className="account" aria-label="Ujwal Yadav’s family account"><span className="avatar">UY</span><span><b>Ujwal Yadav</b><small>Your family account</small></span><Icon name="chevron" /></Link>
          </div>
        </aside>
        <div className="workspace">
          <header className="topbar">
            <div className="breadcrumb"><span>Your space</span><span aria-hidden="true">/</span><b>{title}</b></div>
            <Link className="mobile-brand" href="/" aria-label="Saatth home"><Brand /></Link>
            <div className="topbar-actions"><button className="location" onClick={() => openDialog({ kind: "location" })} aria-label={`Change location, currently ${neighbourhood}, Jaipur`}><Icon name="pin" /><span><b>Jaipur</b><small>{neighbourhood}</small></span><span aria-hidden="true">⌄</span></button><span className="topbar-divider" /><button className="round notification-button" aria-label="Visit notifications" onClick={() => openDialog({ kind: "tracking" })}><Icon name="bell" /><span className="notification-dot" /></button></div>
          </header>
          <main className="workspace-content" id="main-content"><div className="page-enter" key={pathname}>{children}</div></main>
        </div>
      </div>
      <nav className="mobile" aria-label="Mobile navigation"><NavigationLinks mobile /></nav>
    </>
  );
}
