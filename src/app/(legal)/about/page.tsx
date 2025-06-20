import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { APP } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${APP.NAME} - About Us`,
  description: `Learn about ${APP.NAME}, a personal project by ${APP.DEVELOPER_NAME} dedicated to providing effortless, secure, and beautiful note-taking.`,
  keywords:
    "about us, personal notes, note-taking app, single developer, Shivender-Kun, project",
  openGraph: {
    title: `${APP.NAME} - About Us`,
    description: `Learn about ${APP.NAME}, a personal project by ${APP.DEVELOPER_NAME} dedicated to providing effortless, secure, and beautiful note-taking.`,
    url: `${APP.URL}about`,
    type: "website",
    siteName: APP.NAME,
    images: [
      {
        url: `${APP.URL}og-image-about.webp`,
        alt: `${APP.DEVELOPER_NAME} building ${APP.NAME}`,
      },
    ],
  },
  twitter: {
    title: `${APP.NAME} - About Us`,
    description: `Learn about ${APP.NAME}, a personal project by ${APP.DEVELOPER_NAME} dedicated to providing effortless, secure, and beautiful note-taking.`,
    card: "summary_large_image",
    images: {
      url: `${APP.URL}og-image-about.webp`,
      alt: `${APP.DEVELOPER_NAME} building ${APP.NAME}`,
    },
  },
};

const AboutUsPage = () => {
  return (
    <div className="w-full max-w-3xl space-y-10">
      <h1 className="text-4xl font-extrabold text-center drop-shadow-lg">
        About {APP.NAME}
      </h1>

      <div className="flex justify-center">
        <Image
          src="/images/developer.webp"
          alt={`${APP.DEVELOPER_NAME} - Creator of ${APP.NAME}`}
          width={160}
          height={160}
          className="rounded-full border-4 border-indigo-500 shadow-xl"
        />
      </div>

      <p className="text-lg sm:text-xl font-medium text-center text-gray-700 dark:text-gray-300 leading-relaxed">
        {`Hello! I'm ${APP.DEVELOPER_NAME}, the sole developer behind ${APP.NAME}.`}
      </p>

      <div className="space-y-4 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
        <p>
          {APP.NAME} began as a personal quest: I was looking for a note-taking
          app that truly felt effortless, secure, and genuinely pleasant to use,
          without unnecessary clutter or compromising my privacy.
        </p>
        <p>
          This project is driven by a passion for clean design, robust
          functionality, and a strong belief in user privacy. Every line of
          code, every feature, and every design choice in {APP.NAME} is a direct
          reflection of what I value in a personal productivity tool.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-3">Our Vision & Values</h2>
        <ul className="list-disc pl-5 text-base text-gray-600 dark:text-gray-400 space-y-2">
          <li>
            <strong>Simplicity:</strong> Notes should be easy to create,
            organize, and find. No bloat, just clarity.
          </li>
          <li>
            <strong>Security & Privacy:</strong> Your thoughts are yours. We
            prioritize strong encryption and zero data selling.
          </li>
          <li>
            <strong>Reliability:</strong> Your notes should always be there,
            accessible, without a hitch.
          </li>
          <li>
            <strong>Continuous Improvement:</strong> As a personal project,{" "}
            {APP.NAME} evolves based on real needs and feedback.
          </li>
        </ul>
      </div>

      <div className="space-y-4 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
        <h2 className="text-2xl font-bold">Join the Journey</h2>
        <p>
          {`I'm incredibly excited to share ${APP.NAME} with you. If you appreciate
          a tool built with care and a focus on essential functionality, I
          invite you to try it out. Your feedback is invaluable as ${APP.NAME}
          continues to grow.`}
        </p>
        <p>Thank you for considering {APP.NAME}.</p>
      </div>

      <div className="text-center">
        <Link href="/login">
          <Button className="text-base sm:text-lg px-8 py-3 rounded-xl shadow-md border border-indigo-500 hover:bg-indigo-900 hover:text-indigo-200 transition-all duration-300 transform hover:scale-105">
            Start Using {APP.NAME}
          </Button>
        </Link>
      </div>

      <div className="space-y-2 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
        <h2 className="text-2xl font-bold">Contact Me</h2>
        <p>
          For support, feedback, or just to say hello, feel free to reach out:
        </p>
        <p>
          Email:{" "}
          <Link
            href={`mailto:${APP.CONTACT_EMAIL}`}
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {APP.CONTACT_EMAIL}
          </Link>
        </p>
        <p>
          Connect with me:{" "}
          <Link
            href="https://shivender.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            My Portfolio
          </Link>{" "}
          |{" "}
          <Link
            href="https://github.com/Shivender-Kun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            GitHub
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
