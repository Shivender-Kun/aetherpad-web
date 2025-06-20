import type { Metadata } from "next";
import { APP } from "@/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${APP.NAME} - Terms of Use`,
  description: `Review the Terms of Use for ${APP.NAME}. Understand your rights and responsibilities when using our note-taking application.`,
  keywords: "terms of use, terms and conditions, legal, AetherPad, app rules",
  openGraph: {
    title: `${APP.NAME} - Terms of Use`,
    description: `Review the Terms of Use for ${APP.NAME}. Understand your rights and responsibilities when using our note-taking application.`,
    url: `${APP.URL}terms`,
    type: "website",
    siteName: APP.NAME,
  },
  twitter: {
    title: `${APP.NAME} - Terms of Use`,
    description: `Review the Terms of Use for ${APP.NAME}. Understand your rights and responsibilities when using our note-taking application.`,
    card: "summary_large_image",
  },
};

const sections = [
  {
    title: "1. Eligibility",
    content:
      "To use the App, you must be at least 13 years old. By using the App, you represent and warrant that you meet this age requirement.",
  },
  {
    title: "2. Account Registration and Security",
    content: (
      <>
        <p>
          To access certain features of the App, you may be required to register
          for an account. You agree to:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Provide accurate, current, and complete information.</li>
          <li>Maintain the confidentiality of your password.</li>
          <li>
            Notify us immediately of unauthorized access or security issues.
          </li>
          <li>We are not liable for losses from failure to do so.</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. User Content",
    content:
      "You retain all rights to the content you create, store, or upload to the App. By using the App, you grant us a limited license to store and display your content solely to operate and improve the service.",
  },
  {
    title: "4. Acceptable Use",
    content: (
      <>
        <p>
          You agree not to use the App for any unlawful or harmful purposes:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Violating laws or regulations.</li>
          <li>Infringing on intellectual property rights.</li>
          <li>Disrupting other users or app functionality.</li>
          <li>Unauthorized access or abuse of systems.</li>
          <li>Uploading malicious code or software.</li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Privacy",
    content: (
      <>
        Your use of the App is governed by our{" "}
        <Link
          href="/privacy"
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Privacy Policy
        </Link>
        , which outlines data practices.
      </>
    ),
  },
  {
    title: "6. Modifications and Termination",
    content:
      "We may modify or discontinue the App at any time, and may suspend or terminate access for violations of these Terms.",
  },
  {
    title: "7. Disclaimer of Warranties",
    content:
      'The App is provided "as is" without warranties. We do not guarantee uninterrupted or error-free service.',
  },
  {
    title: "8. Limitation of Liability",
    content:
      "We are not liable for indirect or consequential damages, including data loss or service interruption.",
  },
  {
    title: "9. Governing Law and Jurisdiction",
    content:
      "These Terms are governed by the laws of India. Disputes are subject to the courts of India.",
  },
  {
    title: "10. Contact Us",
    content: (
      <>
        For questions, contact us at:{" "}
        <Link
          href={`mailto:${APP.CONTACT_EMAIL}`}
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          {APP.CONTACT_EMAIL}
        </Link>
      </>
    ),
  },
];

const TermsOfUsePage = () => {
  const effectiveDate = new Date();

  return (
    <div className="w-full max-w-3xl space-y-10">
      <h1 className="text-4xl font-extrabold text-center drop-shadow-lg">
        Terms of Use
      </h1>

      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
        Effective Date:{" "}
        {effectiveDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
        Welcome to <strong>{APP.NAME}</strong>, a web-based application
        developed by <strong>{APP.DEVELOPER_NAME}</strong>.{" "}
        {`By accessing or
        using the ${APP.NAME} app ("App"), you agree to be bound by these Terms
        of Use ("Terms"). If you do not agree to these Terms, please do not use
        the App.`}
      </p>

      {sections.map((section, idx) => (
        <div key={idx}>
          <h2 className="text-2xl font-bold mb-3">{section.title}</h2>
          <div className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
            {section.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TermsOfUsePage;
