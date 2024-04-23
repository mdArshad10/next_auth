"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginPageHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/user/login", user);
      console.log(res.data);
      toast.success(res.data);
      router.push("/profile");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "processing" : "Login"}</h1>

      <label htmlFor="email">Email: </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="email"
        name="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="enter the email"
      />

      <label htmlFor="password">Password: </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        name="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="enter the password"
      />

      <button
        onClick={loginPageHandler}
        disabled={buttonDisable}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {!buttonDisable ? "Login" : "fill the all fields"}
      </button>
      <Link
        href={"/signup"}
        className="p-2 text-sky-800 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Already have an account?
      </Link>
    </div>
  );
};

export default LoginPage;
