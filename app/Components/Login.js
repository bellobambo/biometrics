"use client";

import React, { useState, useEffect } from "react";
import "@passageidentity/passage-elements/passage-auth";

function Login() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPassage = async () => {
      await require("@passageidentity/passage-elements/passage-auth");
      setIsLoading(false);
    };
    loadPassage();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {isLoading ? (
        <span className="loading loading-bars loading-lg"></span>
      ) : (
        <passage-auth app-id="1ARdA3uWrOiBBc1vL7l4EQQV"></passage-auth>
      )}
    </div>
  );
}

export default Login;
