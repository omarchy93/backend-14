"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handelChange = (email, value) => {
    setForm((form) => ({
      ...form,

      [email]: value,
    }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    // login api call
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-type": "application/json",
        },
      });
      const json = await res.json();

      if (json["status"] === true) {
        router.replace("/dashboard");
      } else {
        alert(json["message"]);
      }
    } catch (error) {
      console.log(error);
    }
    // mail api call
    try {
      const res = await fetch("/api/mail", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-10 rounded-lg bg-slate-300 px-6 py-8 shadow-xl ring-1 ring-slate-900/5">
      <form
        onSubmit={handelSubmit}
        className=" flex flex-col justify-between items-center gap-5"
      >
        <input
          onChange={(e) => {
            handelChange("email", e.target.value);
          }}
          type="email"
          placeholder="email"
          className="border-[1px] py-2 border-emerald-400 rounded-lg p-2  "
        />
        <input
          onChange={(e) => {
            handelChange("password", e.target.value);
          }}
          type="text"
          placeholder="password"
          className="border-[1px] py-2 border-emerald-400 rounded-lg p-2  "
        />
        <button type="submit" className="btn btn-accent">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
