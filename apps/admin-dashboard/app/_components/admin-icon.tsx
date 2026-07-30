type IconName =
  | "grid"
  | "users"
  | "jobs"
  | "proposal"
  | "contract"
  | "wallet"
  | "verified"
  | "report"
  | "settings"
  | "search"
  | "bell"
  | "arrow"
  | "trend"
  | "shield"
  | "menu"
  | "close";

const paths: Record<IconName, React.ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  jobs: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 5V3h8v2M8 11h8M8 15h5" /></>,
  proposal: <><path d="M6 2h9l5 5v15H6z" /><path d="M14 2v6h6M9 13h6M9 17h6" /></>,
  contract: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18M9 12v2h6v-2" /></>,
  wallet: <><path d="M3 6h16a2 2 0 0 1 2 2v11H5a2 2 0 0 1-2-2z" /><path d="M3 8V5a2 2 0 0 1 2-2h12v3M16 12h5" /></>,
  verified: <><path d="m12 2 2.2 2.1 3-.1.8 2.9 2.5 1.7-1.1 2.8.8 2.9-2.7 1.5-.2 3-3-.2L12 22l-2.2-2.1-3 .1-.8-2.9-2.5-1.7 1.1-2.8-.8-2.9 2.7-1.5.2-3 3 .2z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
  report: <><path d="M12 3 2 20h20z" /><path d="M12 9v4M12 17h.01" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.1A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.1A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.15.36.37.68.66.94.3.25.67.4 1.06.4H21v4h-.1a1.7 1.7 0 0 0-1.5.66z" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  trend: <><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-5" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
};

export function AdminIcon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{paths[name]}</svg>;
}
