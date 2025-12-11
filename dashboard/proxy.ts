import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "./lib/supabase/server-client";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  const publicRoutes = ["/", "/login", "/signup"];

  // 1) User yoksa → dashboard & onboarding yasak
  if (
    !user &&
    (path.startsWith("/dashboard") || path.startsWith("/onboarding"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Eğer kullanıcı yoksa ve public route ise devam et
  if (!user) return response;

  // 2) User varsa → partner_id kontrolü
  const { data: link } = await supabase
    .from("dashboard_users")
    .select("partner_id")
    .eq("user_id", user.id)
    .single();

  const partnerId = link?.partner_id;

  // 3) User var + partner yok → dashboard'a giremesin → onboarding'e zorla
  if (!partnerId && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  // 4) User var + partner VAR → onboarding'e giremesin → dashboard'a zorla
  if (partnerId && path.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // User var + partner var → public sayfalara giremesin
  if (partnerId && publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}
