import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">Effective Date: {new Date().toDateString()}</p>

      <p className="mb-4">
        Personal Notes {`("we", "our", or "us")`} values your privacy. This
        policy explains how we handle your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Information We Collect
      </h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Account Info:</strong> Email, password (hashed), profile/cover
          picture
        </li>
        <li>
          <strong>Notes:</strong> Titles, content, labels
        </li>
        <li>
          <strong>Usage Data:</strong> Device, browser, usage patterns
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. How We Use Your Information
      </h2>
      <p className="mb-4">
        To provide services, improve features, and ensure security.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Protection</h2>
      <p className="mb-4">
        We use HTTPS, password hashing, and access controls to protect your
        data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Sharing</h2>
      <p className="mb-4">
        We do not sell your data. We may share data only as required by law or
        with trusted services under confidentiality agreements.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You can update your info, delete notes, or request account deletion by
        emailing us.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Cookies</h2>
      <p className="mb-4">
        We may use cookies to enhance functionality. You can disable them via
        browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Children’s Privacy</h2>
      <p className="mb-4">
        We do not knowingly collect data from users under 13.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes</h2>
      <p className="mb-4">
        We may update this policy and will notify you via the app or email.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact</h2>
      <p>
        Email us at:{" "}
        <Link
          href="mailto:support@shivender.pro"
          className="text-blue-600 underline"
        >
          support@shivender.pro
        </Link>
      </p>
    </div>
  );
};

export default PrivacyPolicy;

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Personal Notes",
  keywords: "privacy, policy, personal notes, app, privacy",
  openGraph: {
    title: "Privacy Policy",
    description: "Privacy Policy for Personal Notes",
    url: "/privacy",
    type: "website",
  },
  twitter: {
    title: "Privacy Policy",
    description: "Privacy Policy for Personal Notes",
    card: "summary_large_image",
  },
};
