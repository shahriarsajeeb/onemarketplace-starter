import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "../_components/legal-page";

export const metadata: Metadata = {
  title: "Accessibility | OneMarketplace.io",
  description:
    "Learn about OneMarketplace.io's commitment to an accessible marketplace.",
};

const sections: LegalSection[] = [
  {
    id: "commitment",
    title: "Our commitment",
    content: (
      <p>
        OneMarketplace.io is committed to making its marketplace usable by as
        many people as possible, including people with disabilities. We treat
        accessibility as an ongoing part of product design, engineering,
        content, and support.
      </p>
    ),
  },
  {
    id: "approach",
    title: "Our approach",
    content: (
      <>
        <p>As the platform develops, our accessibility work includes:</p>
        <ul>
          <li>using semantic structure and meaningful labels;</li>
          <li>supporting keyboard navigation and visible focus states;</li>
          <li>maintaining readable text and sufficient color contrast;</li>
          <li>providing text alternatives for meaningful visual content;</li>
          <li>testing responsive experiences at different zoom levels;</li>
          <li>reviewing important flows with assistive technology.</li>
        </ul>
      </>
    ),
  },
  {
    id: "standards",
    title: "Standards we work toward",
    content: (
      <p>
        We aim to align the product with the Web Content Accessibility
        Guidelines (WCAG) 2.2 Level AA where reasonably possible. Because the
        platform is evolving, some areas may not yet fully meet that goal. We
        prioritize improvements that affect essential marketplace tasks.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "Third-party content",
    content: (
      <p>
        Some content and services may be provided by marketplace users or
        third-party technology providers. We encourage accessible content and
        integrations, but we may not control every external experience.
      </p>
    ),
  },
  {
    id: "feedback",
    title: "Accessibility feedback",
    content: (
      <>
        <p>
          If you encounter a barrier, tell us what happened, which page or
          feature you were using, and the assistive technology or browser
          involved if you are comfortable sharing it.
        </p>
        <p>
          Email{" "}
          <a href="mailto:accessibility@onemarketplace.io">
            accessibility@onemarketplace.io
          </a>
          . We will acknowledge feedback and work to provide an accessible
          alternative when possible.
        </p>
      </>
    ),
  },
  {
    id: "continuous-improvement",
    title: "Continuous improvement",
    content: (
      <p>
        Accessibility is not a one-time checklist. We will update this page as
        our product, testing practices, and accessibility program mature.
      </p>
    ),
  },
];

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Accessibility"
      title="A marketplace designed to include everyone."
      introduction="We are building OneMarketplace.io so clients, talent, and agencies can discover opportunities and work together with fewer barriers."
      updated="July 25, 2026"
      sections={sections}
    />
  );
}
