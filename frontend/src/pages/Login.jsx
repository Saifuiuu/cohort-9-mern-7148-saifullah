import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* ================= LEFT SIDE ================= */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-950">

        {/* Background glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center px-16 lg:px-24 max-w-2xl">

          {/* Logo */}
          <div className="mb-12">
            <h1 className="text-2xl font-bold tracking-tight">
              Note<span className="text-indigo-400">Nest</span>
            </h1>
          </div>


          {/* Main heading */}
          <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
            Your thoughts,
            <br />

            <span className="text-indigo-400">
              organized.
            </span>
          </h2>


          <p className="mt-6 text-slate-400 text-lg leading-8 max-w-lg">
            Your ideas are waiting for you.
            Sign in and continue capturing the things
            that matter.
          </p>


          {/* Thought card */}
          <div className="mt-10 space-y-4">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">

              <p className="text-slate-400 text-sm mb-3">
                ✦ Today's thought
              </p>

              <p className="text-slate-100 text-lg">
                "The smallest idea can become something
                meaningful when you write it down."
              </p>

            </div>


            {/* Feature cards */}
            <div className="flex gap-4">

              <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4">

                <p className="text-indigo-400 text-xl mb-2">
                  ✎
                </p>

                <p className="font-medium">
                  Capture
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Never lose an idea
                </p>

              </div>


              <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4">

                <p className="text-indigo-400 text-xl mb-2">
                  ⌁
                </p>

                <p className="font-medium">
                  Organize
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Keep your thoughts together
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ================= RIGHT SIDE ================= */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">


          {/* Mobile logo */}
          <div className="md:hidden mb-10">

            <h1 className="text-2xl font-bold">
              Note<span className="text-indigo-400">
                Nest
              </span>
            </h1>

          </div>


          {/* Heading */}
          <div className="mb-8">

            <h2 className="text-3xl font-bold">
              Welcome back
            </h2>

            <p className="text-slate-400 mt-2">
              Sign in to continue to your notes.
            </p>

          </div>


          {/* ================= FORM ================= */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >


            {/* Email */}
            <div>

              <label className="block text-sm text-slate-300 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                  w-full
                  bg-slate-900
                  border border-slate-800
                  rounded-xl
                  px-4 py-3
                  text-white
                  placeholder:text-slate-600
                  outline-none
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-500/20
                  transition
                "
              />

            </div>


            {/* Password */}
            <div>

              <div className="flex justify-between items-center mb-2">

                <label className="text-sm text-slate-300">
                  Password
                </label>

                {/* Future feature */}
                <button
                  type="button"
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  Forgot password?
                </button>

              </div>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="
                  w-full
                  bg-slate-900
                  border border-slate-800
                  rounded-xl
                  px-4 py-3
                  text-white
                  placeholder:text-slate-600
                  outline-none
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-500/20
                  transition
                "
              />

            </div>


            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm">
                {error}
              </p>
            )}


            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-indigo-600
                hover:bg-indigo-500
                disabled:opacity-50
                disabled:cursor-not-allowed
                py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              {loading ? "Signing in..." : "Login"}
            </button>

          </form>


          {/* ================= DIVIDER ================= */}
          <div className="flex items-center gap-4 my-6">

            <div className="h-px bg-slate-800 flex-1" />

            <span className="text-xs text-slate-500">
              OR CONTINUE WITH
            </span>

            <div className="h-px bg-slate-800 flex-1" />

          </div>


          {/* ================= GOOGLE ================= */}
          <button
            type="button"
            className="
              w-full
              border border-slate-800
              hover:bg-slate-900
              py-3
              rounded-xl
              flex items-center justify-center gap-3
              transition
            "
          >

            <span className="font-bold text-lg">
              G
            </span>

            <span>
              Continue with Google
            </span>

          </button>


          {/* ================= SIGNUP ================= */}
          <p className="text-center text-sm text-slate-400 mt-8">

            Don't have an account?{" "}

            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="
                text-indigo-400
                hover:text-indigo-300
                font-medium
              "
            >
              Sign up
            </button>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;