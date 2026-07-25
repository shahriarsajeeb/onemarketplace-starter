import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "../_components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service | OneMarketplace.io",
  description: "The terms governing your use of OneMarketplace.io.",
};

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Your agreement with us",
    content: (
      <p>
        By accessing or using OneMarketplace.io, you agree to these Terms. If
        you use the service on behalf of an organization, you confirm that you
        have authority to bind that organization. If you do not agree, do not
        use the service.
      </p>
    ),
  },
  {
    id: "accounts",
    title: "Accounts and eligibility",
    content: (
      <>
        <p>
          You must be legally able to enter into contracts and provide accurate,
          current information. You are responsible for your account activity
          and for keeping your credentials confidential.
        </p>
        <p>
          You may not impersonate another person, create misleading profiles,
          transfer your account without permission, or use the platform after
          suspension.
        </p>
      </>
    ),
  },
  {
    id: "marketplace",
    title: "Marketplace relationships",
    content: (
      <>
        <p>
          OneMarketplace.io helps clients, independent professionals, and
          agencies discover and communicate with one another. Unless explicitly
          stated otherwise, users contract directly with each other and remain
          responsible for evaluating opportunities, agreeing on scope, and
          performing their obligations.
        </p>
        <p>
          We do not guarantee a user’s identity, work quality, availability,
          suitability, or the accuracy of information they provide.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>break the law or infringe another person’s rights;</li>
          <li>post fraudulent, deceptive, discriminatory, or harmful content;</li>
          <li>scrape, overload, disrupt, or bypass platform security;</li>
          <li>introduce malware or attempt unauthorized access;</li>
          <li>manipulate ratings, reviews, search results, or account activity.</li>
        </ul>
      </>
    ),
  },
  {
    id: "content",
    title: "Your content",
    content: (
      <>
        <p>
          You retain ownership of content you submit. You grant us a
          non-exclusive, worldwide license to host, display, reproduce, and
          adapt that content only as needed to operate, promote, secure, and
          improve the service.
        </p>
        <p>
          You confirm that you have the rights needed to submit your content and
          that it does not violate these Terms.
        </p>
      </>
    ),
  },
  {
    id: "service-changes",
    title: "Service changes and termination",
    content: (
      <p>
        We may add, change, suspend, or discontinue features. We may restrict or
        terminate access when we reasonably believe an account violates these
        Terms, creates risk, or harms users or the platform. You may stop using
        the service at any time.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers and liability",
    content: (
      <>
        <p>
          The service is provided “as is” and “as available” to the extent
          permitted by law. We disclaim implied warranties, including
          merchantability, fitness for a particular purpose, and
          non-infringement.
        </p>
        <p>
          To the extent permitted by law, OneMarketplace.io will not be liable
          for indirect, incidental, special, consequential, or punitive damages,
          or for lost profits, data, opportunities, or goodwill.
        </p>
      </>
    ),
  },
  {
    id: "changes-contact",
    title: "Changes and contact",
    content: (
      <>
        <p>
          We may update these Terms. Material changes will be communicated
          through the service or another appropriate channel. Continued use
          after an update means you accept the revised Terms.
        </p>
        <p>
          Questions can be sent to{" "}
          <a href="mailto:legal@onemarketplace.io">
            legal@onemarketplace.io
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms of service"
      title="Clear expectations make better work possible."
      introduction="These Terms explain the rules for using OneMarketplace.io and the responsibilities shared by clients, talent, agencies, and our platform."
      updated="July 25, 2026"
      sections={sections}
    />
  );
}
