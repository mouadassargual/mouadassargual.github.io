# Admin setup — Mouad Assargual website

This short guide explains how to enable the admin dashboard you can use to create and publish blog posts.

Prerequisites
- A Supabase project connected to this app
- Your app's `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` set in `.env.local`

Steps

1) Create or identify an admin Supabase user
- Open Supabase → Authentication → Users and either create a test account or note your existing user.
- Copy the user's `id` (UUID) from the Users panel.

2) Run the SQL in `sql/admin_setup.sql`
- Open the SQL editor in Supabase and run the contents of `sql/admin_setup.sql`.
- Replace `<ADMIN_UUID>` with the user id you copied, or run the `INSERT` statement manually afterwards.

3) Create a Storage bucket for post images
- In Supabase → Storage, create a bucket named `post-images`.
- You can make the bucket public (easier) or keep it private and use signed URLs (more secure). The admin editor code assumes `post-images` exists.

4) Environment variables
- Add a `.env.local` file at the project root with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

5) Run the app locally

```bash
npm install
npm run dev
```

6) Use the admin UI
- Visit `http://localhost:3000/admin`.
- Sign in with the admin email via the magic link. Once signed in, the client will check the `admins` table and show the editor if authorized.

Notes & next steps
- The UI uses Supabase magic-link auth and checks the `admins` table client-side; the RLS policy in `sql/admin_setup.sql` protects the DB server-side.
- For production, do not expose the service role key in the client — only use it in server-side functions.
- If you prefer a richer editor, I can integrate a Markdown editor with preview or a WYSIWYG editor.
