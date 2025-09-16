import Link from "next/link";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="mx-auto flex h-fit w-full max-w-md flex-col items-center justify-center gap-4 rounded-2xl border bg-white/70 p-6 shadow-xl backdrop-blur-md dark:bg-black/50">
      <h2 className="text-xl font-medium">Forgot Password</h2>

      <ForgotPasswordForm />

      <div className="flex flex-col gap-2">
        <p className="mt-4 text-center text-sm text-gray-500">
          Remembered your password?{" "}
          <Link href="/signin" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>

        <p className="text-center text-sm text-gray-500">
          {`Don't`} have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
