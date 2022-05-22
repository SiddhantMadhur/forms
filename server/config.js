import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export const logInWithGithub = async () => {
  const user = supabase.auth.user();
  if (user === null) {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "github",
    });
  }
};
