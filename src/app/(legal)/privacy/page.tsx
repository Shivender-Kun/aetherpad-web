import type { Metadata } from "next";
import { APP } from "@/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${APP.NAME} - Privacy Policy`,
  description: `Read the privacy policy for ${APP.NAME}. Learn how we collect, use, and protect your information.`,
  keywords:
    "privacy policy, Aetherpad, data protection, user privacy, app privacy",
  openGraph: {
    title: `${APP.NAME} - Privacy Policy`,
    description: `Read the privacy policy for ${APP.NAME}. Learn how we collect, use, and protect your information.`,
    url: `${APP.URL}privacy`,
    type: "website",
    siteName: APP.NAME,
  },
  twitter: {
    title: `${APP.NAME} - Privacy Policy`,
    description: `Read the privacy policy for ${APP.NAME}. Learn how we collect, use, and protect your information.`,
    card: "summary_large_image",
  },
};

const sections = [
  {
    title: "1. Information We Collect",
    content: (
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Account Information:</strong> We collect your email address
          and securely hashed password upon registration. Optionally, you may
          provide a profile photo.
        </li>
        <li>
          <strong>Notes Content:</strong> Your titles, text, and tags are stored
          securely for your use.
        </li>
        <li>
          <strong>Usage Data:</strong> Non-personal data such as device,
          browser, IP, and usage metrics may be collected to improve the app.
        </li>
      </ul>
    ),
  },
  {
    title: "2. How We Use Your Information",
    content: (
      <ul className="list-disc pl-6 space-y-2">
        <li>To provide and maintain the Service.</li>
        <li>To analyze and improve functionality.</li>
        <li>To respond to inquiries and offer support.</li>
        <li>To personalize user experience and develop new features.</li>
        <li>To prevent fraud and secure user data.</li>
      </ul>
    ),
  },
  {
    title: "3. Data Protection and Security",
    content: (
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>HTTPS Encryption:</strong> All data is encrypted in transit.
        </li>
        <li>
          <strong>Password Hashing:</strong> We never store plain-text
          passwords.
        </li>
        <li>
          <strong>Access Control:</strong> Only authorized staff may access
          system-level data.
        </li>
      </ul>
    ),
  },
  {
    title: "4. Sharing & Disclosure",
    content:
      "We never sell your data. We may share minimal information with trusted third parties solely to provide the Service. Legal obligations may also require disclosure in limited cases.",
  },
  {
    title: "5. Your Data Rights",
    content: (
      <ul className="list-disc pl-6 space-y-2">
        <li>You may view or update your profile within app settings.</li>
        <li>You may delete your notes at any time.</li>
        <li>You may request full account deletion via email.</li>
      </ul>
    ),
  },
  {
    title: "6. Cookies and Tracking",
    content:
      "We may use cookies and similar tools to enhance usability and monitor traffic. You can disable these in your browser settings.",
  },
  {
    title: "7. Children’s Privacy",
    content:
      "Our Service is not intended for users under 13. If we discover data from a minor, we will promptly delete it.",
  },
  {
    title: "8. Policy Updates",
    content:
      "Any changes to this policy will be communicated in-app or via email. Continued use of the Service implies agreement to the revised policy.",
  },
  {
    title: "9. Contact",
    content: (
      <>
        Questions or concerns? Reach us at:{" "}
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

const PrivacyPolicyPage = () => {
  const effectiveDate = new Date();

  return (
    <div className="w-full max-w-3xl space-y-10">
      <h1 className="text-4xl font-extrabold text-center drop-shadow-lg">
        Privacy Policy
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
        {`${APP.NAME} ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application and services (the "Service").`}
      </p>

      {sections.map((section, index) => (
        <div key={index}>
          <h2 className="text-2xl font-bold mb-3">{section.title}</h2>
          <div className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
            {section.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrivacyPolicyPage;
