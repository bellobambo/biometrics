"use client";

import { useState, useEffect } from "react";
import Passage from "@passageidentity/passage-elements/passage-auth";

export const useCurrentUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const passage = new Passage(passageConfig.appId);
        const user = await passage.getCurrentUser();

        if (user) {
          setIsAuthorized(true);
          setUsername(user.email);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { isLoading, isAuthorized, username };
};
