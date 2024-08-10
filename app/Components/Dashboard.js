"use client";

import React from "react";
import { useCurrentUser } from "../config/useCurrentUser";

function Dashboard() {
  const { isLoading, isAuthorized, username } = useCurrentUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isAuthorized ? (
        <div>
          <h1 className="text-2xl font-bold">Welcome, {username}!</h1>
          <p>You are successfully logged in.</p>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">Unauthorized</h1>
          <p>Please log in to access the dashboard.</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
