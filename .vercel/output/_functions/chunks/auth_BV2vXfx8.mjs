import { createClient } from '@supabase/supabase-js';

const supabaseUrl$1 = "https://hnicnupamewtitegifyw.supabase.co";
const supabaseServiceRoleKey = "sb_secret_iFXGoGZLo47x0sWGJy9XXA_y_nFevCS";
const adminClient = createClient(supabaseUrl$1, supabaseServiceRoleKey, {
  auth: { persistSession: false }
});

async function getAgencyContext(user) {
  if (!user?.id) throw new Error("Missing user");
  const { data: agency, error } = await adminClient.from("agencies").select("*").eq("user_id", user.id).single();
  if (error) {
    console.error("Failed to load agency context", error);
    throw error;
  }
  return { agency, user };
}

const supabaseUrl = "https://hnicnupamewtitegifyw.supabase.co";
const supabaseAnonKey = "sb_publishable_ljnYvnf_nSuWE53JUH2iHg_5dHlJiHx";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
function withAuth(handler) {
  return async (context) => {
    const authHeader = context.request.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }
    context.locals.user = data.user;
    return handler(context);
  };
}

export { adminClient as a, getAgencyContext as g, withAuth as w };
