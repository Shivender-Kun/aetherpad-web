import Link from "next/link";
import SigninForm from "./_components/SigninForm";

const Signin = () => {
  return (
    <div className="mx-auto flex h-fit w-full max-w-md flex-col items-center justify-center gap-4 rounded-2xl border bg-white/60 p-6 shadow-xl backdrop-blur-md dark:bg-black/50">
      <h2 className="text-xl font-medium">Sign in</h2>

      <SigninForm />

      <p className="text-center text-sm text-gray-500">
        {"By signing in, you agree to our "}
        <Link href="/terms" className="text-blue-600 hover:text-blue-500">
          Terms of Use
        </Link>
        {" and "}
        <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
          Privacy Policy
        </Link>
      </p>

      <p className="text-center text-sm text-gray-500">
        {"Don't have an account? "}
        <Link href="signup" className="text-blue-600 hover:text-blue-500">
          {"Sign up "}
        </Link>
        now.
      </p>
    </div>
  );
};

export default Signin;
