import { UserInfo } from "@/components/Userinfo";
import { currentUser } from "@/lib/auth";
import React from "react";

const Serverpage = async () => {
  const user = await currentUser();
  return <UserInfo user={user} label="Server Component 💻" />;
};

export default Serverpage;
