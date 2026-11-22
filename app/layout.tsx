import type { Metadata } from "next";
import "./globals.css";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "BANGUS VALLEY RESTAURANT | Kashmiri Wazwan | Chowkibal Road Kralpora",
  description: "BANGUS VALLEY RESTAURANT at Chowkibal Road Kralpora. Enjoy Kashmiri Wazwan and order your favorite dishes online. Home delivery also available.",
  keywords: ["Bangus Valley Restaurant", "Bangus Valley Restaurant", "Kralpora Restaurant", "Chowkibal Road Restaurant", "Kashmiri Wazwan", "Kashmiri Food", "Wazwan Restaurant", "Home Delivery Kralpora"],
  verification: {
    google: "2lyyrkdkUp_5_SkIpQ5y_wqKhW6I-LZ7GWEkOUQ7lzQ",
  },
};

const premiumStyles = `
/* PREMIUM KASHMIRI RESTAURANT THEME */

:root {
  --premium-bg: #faf7ef;
  --premium-card: #fffdf8;
  --premium-green: #263f32;
  --premium-gold: #bd9451;
  --premium-text: #29251f;
  --premium-muted: #625b50;
}

body {
  background: var(--premium-bg);
  color: var(--premium-text);
  font-family: var(--font-body), Arial, sans-serif;
  font-size: 15px;
  line-height: 1.7;
}

/* Premium headings */
h1, h2, h3, .section-title {
  font-family: var(--font-heading), Georgia, serif;
  font-weight: 600;
  letter-spacing: 0.01em;
}

/* Hero section */
.hero {
  background:
    radial-gradient(
      circle at 80% 20%,
      rgba(189, 148, 81, 0.16),
      transparent 38%
    ),
    linear-gradient(120deg, #191f19, #293b30 65%, #1c2922);
}

/* Hero text */
.hero-copy {
  color: #fff9ec;
  font-size: 15px;
  line-height: 1.9;
  font-weight: 500;
}

.hero-title {
  color: #fffaf0;
}

/* Section headings */
.section-title {
  color: #263f32;
  font-size: clamp(2.4rem, 4vw, 3.6rem);
}

/* Small labels */
.eyebrow {
  color: #a87532;
  font-size: 12px;
  letter-spacing: 0.17em;
}

/* Menu cards */
.menu-card {
  background: var(--premium-card);
  border: 1px solid #e7ddca;
  border-radius: 14px;
  box-shadow: 0 5px 18px rgba(43, 35, 23, 0.06);
}

.menu-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 30px rgba(43, 35, 23, 0.12);
}

/* Menu item names */
.menu-card h3,
.menu-card p {
  color: #29251f;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.6;
}

/* Prices */
.menu-card strong {
  color: #263f32;
  font-weight: 800;
  font-size: 14px;
}

/* Menu filters */
.filter {
  background: #fffdf8;
  color: #39372f;
  border-color: #d9cbb2;
  font-size: 13px;
  padding: 9px 15px;
}

.filter-active {
  background: #263f32;
  color: white;
  border-color: #263f32;
}

/* Buttons */
.button-primary {
  background: #b77e38;
  color: white;
}

.button-primary:hover {
  background: #96612b;
}

.button-dark {
  background: #263f32;
  color: white;
}

/* Input fields */
.field input,
.field textarea {
  background: #fffdf8;
  color: #29251f;
  font-size: 15px;
}

/* Mobile readability */
@media (max-width: 640px) {
  body {
    font-size: 14px;
  }

  .hero-copy {
    font-size: 14px;
  }

  .menu-card h3,
  .menu-card p {
    font-size: 13px;
  }
}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        {children}
        <style>{premiumStyles}</style>
      </body>
    </html>
  );
}