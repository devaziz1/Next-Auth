"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SigninPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login success", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("login failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div
        style={{
          backgroundImage:
            'url("https://tailwindadmin.netlify.app/dist/images/login-new.jpeg"), url("http://bit.ly/2gPLxZ4")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="h-screen font-sans login bg-cover"
      >
        <div className="container mx-auto h-full flex flex-1 justify-center items-center">
          <div className="w-full max-w-lg">
            <div className="leading-loose">
              <form className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">
                <p className="text-black font-medium text-center text-lg">
                  {loading ? "Processing" : "Login"}
                </p>

                <div className="">
                  <label className="block text-sm text-black" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    placeholder="Enter email"
                    aria-label="email"
                    required
                  />
                </div>
                <div className="mt-2">
                  <label className="block  text-sm text-black">Password</label>
                  <input
                    className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    placeholder="Enter password"
                    arial-label="password"
                    required
                  />
                </div>
                <div className="flex w-full justify-center ">
                  <a
                    onClick={onSignin}
                    className="cursor-pointer relative inline-flex items-center justify-center p-2 px-3 py-1 mt-2 overflow-hidden font-medium text-[#36454F] transition duration-300 ease-out border-2 border-[#36454F] rounded-full shadow-md group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#36454F] group-hover:translate-x-0 ease">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">
                      Login
                    </span>
                    <span className="relative invisible">Button Text</span>
                  </a>
                </div>
                <div className="text-center flex justify-center w-full">
                  <span className="mr-1 font-semibold">
                    Dont have an account?{" "}
                  </span>
                  <Link
                    href="/signup"
                    className="inline-block right-0 align-baseline font-light text-sm text-500  items-center justify-center mt-1 cursor-pointer"
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
