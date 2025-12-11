"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

export function LogoutButton() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <Button variant="ghost" className="cursor-pointer" onClick={handleLogout}>
      Logout
    </Button>
  );
}
