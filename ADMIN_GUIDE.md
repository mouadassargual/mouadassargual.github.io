# Admin Dashboard Guide

## Overview

Your website now includes a complete admin dashboard for managing blog posts with full CRUD (Create, Read, Update, Delete) operations. The dashboard is protected by email/password authentication using Supabase Auth.

## Setup Instructions

### 1. Database Setup

1. Go to your Supabase project dashboard: https://app.supabase.com/project/rqrcvgnxpfbcjfrxgleg
2. Navigate to **SQL Editor** in the left sidebar
3. Open the `supabase-schema.sql` file in this project
4. Copy all the SQL code and paste it into the SQL Editor
5. Click **Run** to execute the schema
6. This will create:
   - `blog_posts` table with all necessary fields
   - `contact_messages` table for contact form submissions
   - Row Level Security (RLS) policies for authentication
   - 6 sample blog posts

### 2. Create Admin User

1. In your Supabase dashboard, go to **Authentication** > **Users**
2. Click **Add User** or **Invite User**
3. Enter your email address (e.g., mouad@example.com)
4. Create a secure password
5. Click **Create User** or **Send Invite**
6. The user is automatically created with the `authenticated` role, giving them admin access

### 3. Access the Admin Dashboard

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to: http://localhost:3000/admin/login

3. Enter the email and password you created in step 2

4. Click **Sign In**

5. You'll be redirected to the admin dashboard at: http://localhost:3000/admin

## Admin Dashboard Features

### Dashboard Overview (`/admin`)

The main dashboard displays all your blog posts in a table format with:

- **Title & Excerpt**: Quick preview of each post
- **Slug**: The URL-friendly identifier for the post
- **Status**: Published (green) or Draft (yellow) - click to toggle
- **Date**: When the post was created
- **Actions**:
  - **Edit**: Modify the post
  - **Delete**: Remove the post (with confirmation)

### Creating a New Post (`/admin/posts/new`)

1. Click the **+ New Post** button on the dashboard
2. Fill in the required fields:
   - **Title**: The post title (required)
   - **Slug**: Auto-generated from title, but you can edit it (required)
   - **Excerpt**: Brief description shown in previews (required)
   - **Content**: Full post content - Markdown supported (required)
   - **Image URL**: Optional featured image URL
   - **Published**: Check to publish immediately, or leave unchecked to save as draft
3. Click **Create Post**
4. You'll be redirected back to the dashboard

### Editing a Post (`/admin/posts/[id]`)

1. From the dashboard, click **Edit** on any post
2. The form will be pre-filled with the current post data
3. Make your changes
4. Click **Save Changes**
5. You'll be redirected back to the dashboard

### Deleting a Post

1. From the dashboard, click **Delete** on any post
2. Confirm the deletion in the popup
3. The post will be permanently removed from the database

### Publishing/Unpublishing

1. From the dashboard, click the status badge (Published/Draft)
2. The status will toggle immediately
3. Only published posts are visible on the public blog page

### Logging Out

1. Click **Logout** in the top-right corner of the dashboard
2. You'll be redirected to the login page
3. Your session will be cleared

## Security Features

### Route Protection

- All `/admin/*` routes (except `/admin/login`) are protected by middleware
- If you're not logged in, you'll be automatically redirected to the login page
- Authentication tokens are stored in secure cookies

### Row Level Security (RLS)

The database uses Supabase RLS policies:

- **Public users**: Can only view published blog posts
- **Authenticated users** (admin): Can perform all CRUD operations on blog posts
- **Anyone**: Can submit contact form messages
- **Authenticated users** (admin): Can view contact messages

### Session Management

- Sessions expire after 1 hour (3600 seconds)
- After expiration, you'll need to log in again
- The middleware checks for a valid session on every admin page request

## File Structure

```
app/
├── admin/
│   ├── page.tsx              # Main dashboard (list all posts)
│   ├── login/
│   │   └── page.tsx          # Login page
│   └── posts/
│       ├── new/
│       │   └── page.tsx      # Create new post
│       └── [id]/
│           └── page.tsx      # Edit existing post
lib/
├── supabase.ts               # Supabase client & types
└── auth.ts                   # Authentication utilities
middleware.ts                 # Route protection
supabase-schema.sql           # Database schema
```

## Environment Variables

Make sure your `.env.local` file contains:

```env
NEXT_PUBLIC_SUPABASE_URL=https://rqrcvgnxpfbcjfrxgleg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_S0kwhOI4_vkwKwbw1m-jGg_4iV-XaPX
```

## Troubleshooting

### Can't Login

- Verify the admin user was created in Supabase Dashboard > Authentication > Users
- Check that the email and password are correct
- Ensure the Supabase credentials in `.env.local` are correct
- Try clearing your browser cookies and cache

### Posts Not Showing on Public Blog

- Check that the post is marked as "Published" (green status)
- The RLS policy only allows public users to see published posts
- Check the Supabase table to confirm the `published` column is `true`

### "Failed to load post" Error

- Verify the post ID in the URL is correct
- Check your Supabase connection in the browser console
- Ensure the RLS policies were created correctly

### Middleware Redirect Loop

- Clear browser cookies
- Delete the `sb-access-token` cookie manually
- Log out and log back in

## Next Steps

### Recommended Enhancements

1. **Rich Text Editor**: Install a Markdown editor like `react-markdown-editor-lite` or `@uiw/react-md-editor` for better content editing
2. **Image Upload**: Integrate Supabase Storage for direct image uploads instead of URLs
3. **Contact Messages**: Create a page at `/admin/contacts` to view submitted contact forms
4. **User Management**: Add ability to create multiple admin users with different roles
5. **Post Categories**: Add tags/categories to organize blog posts
6. **Search & Filters**: Add search functionality to find posts quickly
7. **Analytics**: Track page views and engagement on blog posts

## Support

If you encounter any issues:

1. Check the browser console for errors
2. Check the Supabase logs in your project dashboard
3. Verify all environment variables are set correctly
4. Ensure the database schema was executed successfully

---

**Admin Dashboard URL**: http://localhost:3000/admin/login

**Important**: Never commit your `.env.local` file or Supabase credentials to version control!
