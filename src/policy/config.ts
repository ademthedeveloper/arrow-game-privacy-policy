export interface PolicyConfig {
  studioName: string;
  studioShort: string;
  email: string;
  country: string;
  hasAccount: boolean;
  cloudSave: boolean;
  inAppPurchases: boolean;
  kidsDirected: boolean;
  ads: string[];
  analytics: string[];
  effectiveDate: string;
}

export const AD_OPTIONS = [
  { id: "admob", label: "Google AdMob" },
  { id: "unity", label: "Unity Ads" },
  { id: "applovin", label: "AppLovin MAX" },
  { id: "meta", label: "Meta Audience Network" },
  { id: "ironsource", label: "ironSource / LevelPlay" },
] as const;

/**
 * Official values for the shipped game: published by Dev360 (Türkiye),
 * no sign-in, progress kept on device ("2 / 268 cleared"), third-party
 * banner + rewarded ads, hints earned in-game.
 */
export const DEFAULT_CONFIG: PolicyConfig = {
  studioName: "Dev360",
  studioShort: "Tap Away",
  email: "ademthedeveloper@gmail.com",
  country: "Türkiye",
  hasAccount: false,
  cloudSave: false,
  inAppPurchases: false,
  kidsDirected: false,
  ads: ["admob"],
  analytics: [],
  effectiveDate: "January 15, 2026",
};

export const AD_PRIVACY_NOTES: Record<string, string> = {
  admob:
    "Google AdMob serves the banner and rewarded ads you see between puzzles. Google may use a resettable advertising identifier (GAID on Android, IDFA on iOS if you grant consent) and coarse diagnostic data to select and measure ads.",
  unity:
    "Unity Ads serves ads and may process a resettable device identifier and gameplay-adjacent diagnostic data for ad selection and fraud prevention.",
  applovin:
    "AppLovin MAX mediates ads and may process resettable advertising identifiers and limited diagnostic data to serve and measure campaigns.",
  meta:
    "Meta Audience Network may use advertising identifiers and install/attribution signals to personalize the ads shown to you.",
  ironsource:
    "ironSource / LevelPlay mediates ad networks and may process resettable device identifiers for serving, frequency capping and measurement.",
};
