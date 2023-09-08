"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const logOut = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "GET",
        body: JSON.stringify(),
        headers: {
          "Content-type": "application/json",
        },
      });
      const json = await res.json();

      if (json["status"] === true) {
        router.replace("/");
      } else {
        alert(json["message"]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>dashboard</h1>
      <button onClick={logOut} type="submit" className="btn btn-accent">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
