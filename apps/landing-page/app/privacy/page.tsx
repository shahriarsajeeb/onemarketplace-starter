import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "../_components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | OneMarketplace.io",
  description:
    "Learn how OneMarketplace.io collects, uses, and protects your information.",
};

const sections: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <p>
          We collect information you provide when you create an account,
          complete a profile, post or apply for work, communicate with other
          users, or contact support.
        </p>
        <ul>
          <li>
            <strong>Account information:</strong> name, email address, country,
            password credentials, and account type.
          </li>
          <li>
            <strong>Profile and marketplace information:</strong> skills,
            experience, portfolio details, company information, proposals,
            reviews, and project history.
          </li>
          <li>
            <strong>Technical information:</strong> browser, device, IP address,
            pages viewed, and basic usage events needed to operate and secure
            the service.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How we use information",
    content: (
      <>
        <p>
          We use information to provide and improve OneMarketplace.io, connect
          clients with talent and agencies, personalize search results, process
          account requests, prevent misuse, and communicate important service
          updates.
        </p>
        <p>
          We may also use aggregated or de-identified information to understand
          marketplace trends and improve product performance.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "When information is shared",
    content: (
      <>
        <p>
          Public profile information and marketplace activity are visible to
          other users as described in the product. We may share necessary
          information with service providers that help us host, secure, analyze,
          and support the platform.
        </p>
        <p>
          We may also disclose information when required by law, to protect
          users or the platform, or as part of a merger, financing, acquisition,
          or sale of assets. We do not sell personal information.
        </p>
      </>
    ),
  },
  {
    id: "retention-security",
    title: "Retention and security",
    content: (
      <>
        <p>
          We retain information for as long as needed to provide the service,
          satisfy legal obligations, resolve disputes, and enforce agreements.
          Retention periods vary according to the type of information and why
          it was collected.
        </p>
        <p>
          We use reasonable administrative, technical, and organizational
          safeguards. No online system is completely secure, so we cannot
          guarantee absolute security.
        </p>
      </>
    ),
  },
  {
    id: "choices-rights",
    title: "Your choices and rights",
    content: (
      <>
        <p>
          You may update your account and profile information through your
          settings. Depending on where you live, you may have rights to access,
          correct, delete, restrict, or receive a copy of your personal
          information.
        </p>
        <p>
          To make a privacy request, email{" "}
          <a href="mailto:privacy@onemarketplace.io">
            privacy@onemarketplace.io
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "international",
    title: "International data",
    content: (
      <p>
        OneMarketplace.io is designed for a global community. Information may
        be processed in countries other than your own. Where required, we use
        appropriate safeguards for international transfers.
      </p>
    ),
  },
  {
    id: "changes-contact",
    title: "Changes and contact",
    content: (
      <>
        <p>
          We may update this policy as the platform evolves. If a change is
          material, we will provide notice through the service or another
          appropriate channel.
        </p>
        <p>
          Questions can be sent to{" "}
          <a href="mailto:privacy@onemarketplace.io">
            privacy@onemarketplace.io
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Your information"
      title="Privacy should feel straightforward."
      introduction="This policy explains what information OneMarketplace.io collects, why we use it, when it may be shared, and the choices available to you."
      updated="July 25, 2026"
      sections={sections}
    />
  );
}
