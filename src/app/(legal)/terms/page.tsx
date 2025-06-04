const TermsOfUse = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
      <p className="mb-4">Effective Date: {new Date().toDateString()}</p>

      <p className="mb-4">
        {`Welcome to <strong>Personal Notes</strong>, a web-based application
        developed by <strong>Shiv</strong> ("we," "us," or "our"). By accessing
        or using the Personal Notes app ("App"), you agree to be bound by these
        Terms of Use ("Terms"). If you do not agree to these Terms, please do
        not use the App.`}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Eligibility</h2>
      <p className="mb-4">You must be at least 13 years old to use this App.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. Account Registration
      </h2>
      <p className="mb-4">
        You must provide accurate information and keep your login credentials
        secure. You’re responsible for all activity on your account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. User Content</h2>
      <p className="mb-4">
        You retain ownership of your notes, labels, profile picture, and cover
        picture. We store this data only to operate the App.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Acceptable Use</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>No unlawful or harmful activities.</li>
        <li>No security breaches or unauthorized access.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Privacy</h2>
      <p className="mb-4">
        Your data is handled in accordance with our{" "}
        <a href="/privacy-policy" className="text-blue-600 underline">
          Privacy Policy
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        6. Modifications and Termination
      </h2>
      <p className="mb-4">
        We may update or discontinue the App, or suspend your access if Terms
        are violated.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Disclaimer</h2>
      <p className="mb-4">
        {`The App is provided "as is" without warranties of any kind.`}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        8. Limitation of Liability
      </h2>
      <p className="mb-4">
        We are not liable for any indirect or consequential damages arising from
        your use of the App.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Governing Law</h2>
      <p className="mb-4">
        These Terms are governed by the laws of [Your Country/State].
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">10. Contact</h2>
      <p>
        Email us at:{" "}
        <a href="mailto:[your email here]" className="text-blue-600 underline">
          [your email here]
        </a>
      </p>
    </div>
  );
};

export default TermsOfUse;

export const metadata = {
  title: "Terms of Use",
  description: "Terms of Use for Personal Notes",
  keywords: "terms, use, personal notes, app, privacy",
  openGraph: {
    title: "Terms of Use",
    description: "Terms of Use for Personal Notes",
    url: "/terms",
    type: "website",
  },
  twitter: {
    title: "Terms of Use",
    description: "Terms of Use for Personal Notes",
    card: "summary_large_image",
  },
};
