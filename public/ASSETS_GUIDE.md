# Assets Guide

This guide explains where to place your image assets for the website.

## Required Images

### 1. Logo
**Location:** `/public/logo.png`
**Dimensions:** 48x48px (or higher resolution with same aspect ratio)
**Format:** PNG with transparent background recommended
**Usage:** Appears in the header/navbar

### 2. Profile Photo
**Location:** `/public/profile.jpg`
**Dimensions:** Square aspect ratio (e.g., 800x800px, 1000x1000px)
**Format:** JPG or PNG
**Usage:** Appears in the Hero section on the homepage

### 3. Client Logos
**Location:** `/public/clients/`
**Files needed:**
- `client1.png`
- `client2.png`
- `client3.png`
- `client4.png`
- Add more as needed (client5.png, client6.png, etc.)

**Dimensions:** Flexible, but logos should be similar heights (recommend 200-400px height)
**Format:** PNG with transparent background recommended
**Usage:** Displayed in the Clients section with grayscale effect (color on hover)

## How to Add Your Assets

1. **Create the clients folder:**
   ```bash
   mkdir -p public/clients
   ```

2. **Copy your images:**
   - Place `logo.png` in `/public/`
   - Place `profile.jpg` in `/public/`
   - Place client logos in `/public/clients/`

3. **File naming:**
   - Keep filenames lowercase
   - Use PNG for images requiring transparency
   - Use JPG for photos

## Adding More Client Logos

To add more than 4 client logos, edit `/app/page.tsx` and duplicate the client logo block:

```tsx
{/* Client Logo 5 */}
<div className="bg-secondary border border-border-color rounded-lg p-8 flex items-center justify-center hover:border-accent transition-all group">
  <div className="relative w-full h-24 grayscale group-hover:grayscale-0 transition-all duration-500">
    <Image
      src="/clients/client5.png"
      alt="Client 5"
      fill
      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      className="object-contain"
    />
  </div>
</div>
```

## Next.js Image Optimization

All images are automatically optimized by Next.js:
- Automatic format conversion (WebP when supported)
- Responsive image sizes
- Lazy loading (except hero image which uses `priority`)
- On-demand optimization

## Example Directory Structure

```
public/
├── logo.png
├── profile.jpg
└── clients/
    ├── client1.png
    ├── client2.png
    ├── client3.png
    ├── client4.png
    └── client5.png (optional)
```
