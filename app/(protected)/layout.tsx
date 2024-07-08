import { SessionProvider } from "next-auth/react";
import { Navbar } from "./_components/Navbar";
import { auth } from "@/auth";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen w-screen flex flex-col gap-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 bg-white">
        <Navbar />
        <div className="w-full max-w-2xl p-4">{children}</div>
      </div>
    </SessionProvider>
  );
}

export default ProtectedLayout;
``;
