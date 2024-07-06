"use client";

import { useCurrentUser } from "@/hooks/usecurrentuser";
import { signOut } from "next-auth/react";

const Settings = () => {
  const user = useCurrentUser();
  const onClick = () => {
    signOut();
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      <button type="submit" onClick={onClick}>
        Sign Out
      </button>
    </div>
  );
};

export default Settings;
