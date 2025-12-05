"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { Tables } from "@/types/supabase";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { FeedbackList } from "@/components/dashboard/feedback-list";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";

type Partner = Tables<"partners">;

type Feedback = Tables<"feedback">;

export default function DashboardPage() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const [loading, setLoading] = useState(true);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(
    null
  );

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      // 1. Auth user alınır
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      setCurrentUser({ email: user.email! });

      // 2. dashboard_users tablosunda user_id -> partner_id eşleşmesi alınır
      const { data: dashboardUser, error: dashboardUserError } = await supabase
        .from("dashboard_users")
        .select("partner_id")
        .eq("user_id", user.id)
        .single<{ partner_id: string }>();

      if (dashboardUserError || !dashboardUser) {
        setError("No partner account found for this user.");
        setLoading(false);
        return;
      }

      const partnerId = dashboardUser.partner_id;

      // 3. partners tablosundan partner bilgisi alınır
      const { data: partnerRow, error: partnerError } = await supabase
        .from("partners")
        .select("*")
        .eq("id", partnerId)
        .single();

      if (partnerError || !partnerRow) {
        setError("Partner not found.");
        setLoading(false);
        return;
      }

      setPartner(partnerRow);

      // 4. feedback tablosunda partner'a ait kayıtlar
      const { data: feedbackRows, error: feedbackError } = await supabase
        .from("feedback")
        .select("*")
        .eq("partner_id", partnerId)
        .order("created_at", { ascending: false });

      if (feedbackError) {
        setError("Unable to load feedback.");
        setLoading(false);
        return;
      }

      setFeedback(feedbackRows ?? []);

      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );

  const uniquePages = new Set(feedback.map((f) => f.page_url)).size;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        partner={{ id: partner!.id, name: partner!.name }}
        user={currentUser!}
      />
      <main className="container mx-auto px-4 py-8">
        <DashboardStats
          feedbackCount={feedback.length}
          uniquePages={uniquePages}
        />
        <div className="mt-8">
          <FeedbackList feedback={feedback} />
        </div>
      </main>
    </div>
  );
}
