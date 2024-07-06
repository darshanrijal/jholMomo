"use client";
import { UserInfo } from "@/components/Userinfo";
import { useCurrentUser } from "@/hooks/usecurrentuser";
import React from "react";

const ClientPage = () => {
  const user = useCurrentUser();
  return <UserInfo user={user} label="Client Component 📱" />;
};

export default ClientPage;
