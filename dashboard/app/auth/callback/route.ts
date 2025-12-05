import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // Eğer "next" parametresi varsa oraya, yoksa dashboard'a yönlendir
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {

    // Callback rotasında cookie'leri MANUEL olarak yöneten client oluşturuyoruz.
    // Çünkü burada cookie SET etmemiz gerekiyor (Oturum açma işlemi).
    const supabase = await createSupabaseServerClient();

    // Google'dan gelen "code"u alıp session'a çeviriyoruz
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Başarılı olursa kullanıcıyı asıl gitmek istediği yere yönlendiriyoruz
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Hata varsa login sayfasına geri gönder
  return NextResponse.redirect(`${origin}/login?error=auth-code-error`);
}