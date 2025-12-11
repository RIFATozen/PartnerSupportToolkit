import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no-code`);
  }

  const supabase = await createSupabaseServerClient();

  // 1) Google'dan dönen code'u session'a dönüştür
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=auth-failed`);
  }

  // 2) Session'daki user'ı çek
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${origin}/login?error=no-user`);
  }

  // 3) Kullanıcının partner_id'sini DB'den çek
  const { data: link } = await supabase
    .from("dashboard_users")
    .select("partner_id")
    .eq("user_id", user.id)
    .single();

  // 4) Eğer partner ID varsa → dashboard’a
  if (link?.partner_id) {
    return NextResponse.redirect(`${origin}/dashboard`);
  }

  // 5) Partner ID yoksa → onboarding’e
  return NextResponse.redirect(`${origin}/onboarding`);
}
