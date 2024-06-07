import { createServerClient } from "@supabase/ssr";

type Context = {
  req: Request;
  res: Response;
};

const supabaseClientFn = (context: Context) =>
  createServerClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    {
      auth: {
        flowType: "pkce",
      },
      cookies: {
        get: (key) => {
          const cookies = context.req.headers.get("cookie");
          //   const cookies = context.req.cookies;
          const cookie = cookies[key] ?? "";
          return decodeURIComponent(cookie);
        },
        set: (key, value, options) => {
          if (!context.res) return;
          context.res.cookie(key, encodeURIComponent(value), {
            ...options,
            sameSite: "Lax",
            httpOnly: true,
          });
        },
        remove: (key, options) => {
          if (!context.res) return;
          context.res.cookie(key, "", { ...options, httpOnly: true });
        },
      },
    },
  );

export default supabaseClientFn;
