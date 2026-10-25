import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Baby,
  BarChart3,
  BookOpen,
  CloudOff,
  Database,
  FileEdit,
  Lock,
  Mail,
  Megaphone,
  Route,
  Scale,
  Sparkles,
} from "lucide-react";
import { AD_PRIVACY_NOTES, AD_OPTIONS, type PolicyConfig } from "./config";

export interface SectionDef {
  id: string;
  num: string;
  title: string;
  icon: LucideIcon;
  render: (cfg: PolicyConfig) => ReactNode;
}

function P({ children }: { children: ReactNode }) {
  return <p className="leading-relaxed text-ink/85">{children}</p>;
}

function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-extrabold text-ink-deep">{children}</strong>;
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-ink/85">
          <span className="mt-[0.55em] h-2 w-2 shrink-0 rounded-full bg-sky" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export const SECTIONS: SectionDef[] = [
  {
    id: "short-version",
    num: "01",
    title: "The short version",
    icon: Sparkles,
    render: () => (
      <div className="space-y-4">
        <P>
          We built Tap Away to be a quiet little puzzle game — tap arrows, clear
          the board, move on. This page explains, in plain language, exactly what
          that means for your privacy. The three things worth knowing up front:
        </P>
        <div className="flex flex-wrap gap-2.5">
          {[
            "No account required",
            "No personal data required to play",
            "Progress stays on your device",
            "Ads keep the game free",
            "You can erase everything anytime",
          ].map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-panel px-4 py-2 text-sm font-bold text-ink shadow-[0_1.5px_0_rgba(67,53,44,0.08)] ring-1 ring-line"
            >
              {chip}
            </span>
          ))}
        </div>
        <P>
          The rest of this policy is the detailed version. If anything here ever
          changes, we will update this page and the date at the top.
        </P>
      </div>
    ),
  },
  {
    id: "introduction",
    num: "02",
    title: "Introduction",
    icon: BookOpen,
    render: (cfg) => (
      <div className="space-y-4">
        <P>
          This Privacy Policy describes how <Strong>{cfg.studioName}</Strong>{" "}
          (“we”, “us”) collects, uses and shares information when you play{" "}
          <Strong>Tap Away — Arrow Escape · Shape Puzzles</Strong> (the “Game”)
          on iOS and Android, and when you view this page.
        </P>
        <P>
          By downloading or playing the Game you agree to the practices described
          below. We keep these practices deliberately small: the Game is designed
          to work without knowing who you are.
        </P>
      </div>
    ),
  },
  {
    id: "what-we-collect",
    num: "03",
    title: "Information we collect",
    icon: Database,
    render: (cfg) => (
      <div className="space-y-5">
        <P>
          The Game does not ask for your name, email address, phone number,
          location, contacts, photos or payment details{cfg.inAppPurchases ? "" : " — there is nothing to type and nothing to sign"}. We collect only what the
          Game and its ad partners need to function:
        </P>
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-ink-deep">
            Gameplay progress (stored on your device)
          </h3>
          <P>
            Which levels you have cleared, remaining hearts, earned hints and
            your current difficulty are saved <Strong>locally on your device</Strong>{" "}
            so the “Continue” button works when you come back. This data never
            leaves your phone{cfg.cloudSave ? " except where you enable cloud backup (see §07)" : ""}.
          </P>
        </div>
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-ink-deep">
            Device & diagnostic data
          </h3>
          <Bullets
            items={[
              <>Device model, operating system version, language and screen size — used to render the board correctly and diagnose crashes.</>,
              <>Anonymous gameplay diagnostics, such as a level that crashes or an arrow that fails to slide.</>,
              <>Approximate, IP-derived region — never precise GPS location.</>,
            ]}
          />
        </div>
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-ink-deep">
            Advertising identifiers
          </h3>
          <P>
            Resettable advertising IDs (the Advertising ID on Android and the
            Identifier for Advertisers on iOS, only with your consent) may be
            shared with our ad partners so the banner and rewarded ads you see
            are relevant and measurable. You can reset these identifiers in your
            device settings at any time.
          </P>
        </div>
      </div>
    ),
  },
  {
    id: "how-we-use",
    num: "04",
    title: "How we use information",
    icon: Route,
    render: () => (
      <Bullets
        items={[
          <>To make the Game work — restoring your board, hearts and hints where you left off.</>,
          <>To keep the Game stable — finding and fixing crashes and broken puzzles.</>,
          <>To show ads that keep the Game free to play.</>,
          <>To understand, in aggregate, which difficulties players enjoy and where they get stuck.</>,
          <>To respond if you write to us.</>,
        ]}
      />
    ),
  },
  {
    id: "advertising",
    num: "05",
    title: "Advertising & third-party partners",
    icon: Megaphone,
    render: (cfg) => (
      <div className="space-y-4">
        <P>
          Tap Away is free because it shows ads between puzzles. Ads are served
          by third-party networks{cfg.ads.length > 0 ? ", currently:" : "."}
        </P>
        {cfg.ads.length > 0 && (
          <div className="space-y-3">
            {cfg.ads.map((id) => {
              const opt = AD_OPTIONS.find((o) => o.id === id);
              return (
                <div
                  key={id}
                  className="rounded-xl bg-panel-soft p-4 ring-1 ring-line"
                >
                  <p className="font-display font-bold text-ink-deep">
                    {opt?.label ?? id}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/75">
                    {AD_PRIVACY_NOTES[id] ?? "Serves and measures ads."}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        <P>
          These partners act as independent controllers (or processors, depending
          on the partner) under their own privacy policies. On iOS we request
          tracking permission through <Strong>App Tracking Transparency</Strong>;
          on Android and in the EEA/UK we show a consent form before any
          personalized ads load. Without consent you still see ads — they are
          simply not personalized.
        </P>
      </div>
    ),
  },
  {
    id: "analytics",
    num: "06",
    title: "Analytics",
    icon: BarChart3,
    render: (cfg) =>
      cfg.analytics.length === 0 ? (
        <P>
          We currently run <Strong>no third-party analytics SDK</Strong> in the
          Game. Crash and diagnostic signals described in §03 are handled by the
          platform stores (Apple App Store / Google Play) and by the ad SDKs
          listed in §05. If we ever add an analytics tool, this section and the
          effective date above will be updated first.
        </P>
      ) : (
        <div className="space-y-4">
          <P>We use the following analytics services to understand aggregate play:</P>
          <Bullets
            items={cfg.analytics.map((id) => (
              <>
                <Strong>
                  {id === "firebase"
                    ? "Firebase Analytics"
                    : id === "gameanalytics"
                    ? "GameAnalytics"
                    : id === "unity-analytics"
                    ? "Unity Analytics"
                    : "AppsFlyer"}
                </Strong>{" "}
                — collects anonymized session and level-completion events. IP
                addresses are truncated and data is aggregated.
              </>
            ))}
          />
        </div>
      ),
  },
  {
    id: "progress-accounts",
    num: "07",
    title: "Progress, saves & accounts",
    icon: CloudOff,
    render: (cfg) =>
      !cfg.hasAccount && !cfg.cloudSave ? (
        <P>
          The Game has <Strong>no accounts, no sign-in and no cloud profile</Strong>.
          Your cleared levels (“2 / 268 cleared” and counting) live only in your
          device’s local storage. Uninstalling the Game removes them. If you use
          your phone’s built-in backup (iCloud / Google backup), your progress
          travels with that backup under Apple’s or Google’s privacy terms — not
          ours.
        </P>
      ) : (
        <P>
          Where you enable it, progress may be synced through the account or
          backup service you sign in with. We store only your player nickname
          and puzzle progress — never payment or identity documents.
        </P>
      ),
  },
  {
    id: "children",
    num: "08",
    title: "Children’s privacy",
    icon: Baby,
    render: (cfg) =>
      cfg.kidsDirected ? (
        <P>
          The Game is family-friendly. Where required by the Children’s Online
          Privacy Protection Act (COPPA) and similar laws, we do not knowingly
          collect personal information from children under 13 without verifiable
          parental consent, and we serve only contextual, non-personalized ads in
          child-directed settings.
        </P>
      ) : (
        <P>
          Tap Away is a general-audience puzzle game and is{" "}
          <Strong>not directed to children under 13</Strong>. We do not knowingly
          collect personal information from children. Because the Game requires
          no account and no personal data, there is nothing for a child to
          submit. If you believe a child has provided us personal information,
          write to us and we will delete it.
        </P>
      ),
  },
  {
    id: "your-rights",
    num: "09",
    title: "Your rights & choices",
    icon: Scale,
    render: (cfg) => (
      <div className="space-y-4">
        <P>
          Depending on where you live (including under the GDPR in Europe and the
          CCPA/CPRA in California), you may have the right to access, correct,
          export or delete personal information, and to opt out of the “sale” or
          sharing of personal information for advertising.
        </P>
        <Bullets
          items={[
            <>
              <Strong>Delete your data:</Strong> because progress is stored on
              your device, uninstalling the Game deletes it. For ad-partner
              identifiers, reset them in your device’s privacy settings.
            </>,
            <>
              <Strong>Opt out of personalized ads:</Strong> use the in-game
              consent controls, or your device’s “Limit Ad Tracking” / “Opt out
              of Ads Personalization” setting.
            </>,
            <>
              <Strong>Anything else:</Strong> email us at{" "}
              <a
                href={`mailto:${cfg.email}`}
                className="font-bold text-sky-deep underline decoration-sky/40 decoration-2 underline-offset-4 hover:decoration-sky"
              >
                {cfg.email}
              </a>{" "}
              and we will respond within 30 days.
            </>,
          ]}
        />
      </div>
    ),
  },
  {
    id: "retention-security",
    num: "10",
    title: "Retention & security",
    icon: Lock,
    render: () => (
      <div className="space-y-4">
        <P>
          Local progress remains on your device until you clear or uninstall the
          Game. Diagnostic logs held by us or our partners are automatically
          deleted within 90 days. We protect the small amount of data we do hold
          with industry-standard encryption in transit, and we review our ad
          partners’ data-handling practices before integrating them.
        </P>
        <P>
          No method of transmission or storage is 100% secure, but for a game
          that holds almost nothing, the honest summary is: there is very little
          here to protect — and that is by design.
        </P>
      </div>
    ),
  },
  {
    id: "changes",
    num: "11",
    title: "Changes to this policy",
    icon: FileEdit,
    render: (cfg) => (
      <P>
        If our practices change — a new ad partner, an analytics tool, cloud
        saves — we will update this page, bump the effective date (currently{" "}
        <Strong>{cfg.effectiveDate}</Strong>) and, for material changes, notify
        you in the Game before the change takes effect. Continued play after an
        update means you accept the revised policy.
      </P>
    ),
  },
  {
    id: "contact",
    num: "12",
    title: "Contact us",
    icon: Mail,
    render: (cfg) => (
      <div className="space-y-5">
        <P>
          Questions, requests, or a level that feels impossible? We read
          everything sent to:
        </P>
        <a
          href={`mailto:${cfg.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-display text-lg font-bold text-panel shadow-[0_4px_0_rgba(67,53,44,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_rgba(67,53,44,0.25)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(67,53,44,0.25)]"
        >
          <Mail className="h-5 w-5" />
          {cfg.email}
        </a>
        <p className="text-sm text-taupe">
          {cfg.studioName} · {cfg.country}
        </p>
      </div>
    ),
  },
];
