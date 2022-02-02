import { createClient } from "@supabase/supabase-js";

export const client = createClient(
  // eslint-disable-next-line
  process.env.VUE_APP_SUPABASE_DEV_URL!,
  // eslint-disable-next-line
  process.env.VUE_APP_SUPABASE_ANON!
);
