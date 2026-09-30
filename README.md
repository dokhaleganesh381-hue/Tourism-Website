# Chhatrapati Sambhajinagar Travel Guide (with photos)

Static website: HTML + CSS + JavaScript. No backend needed.
The 13 place photos are already added in images/places/. All five hotel photos are added.

## Folder structure
```
sambhajinagar-photos/
├── index.html
├── css/style.css
├── js/data.js      phone, places, hotels (edit this)
├── js/app.js
└── images/
    ├── places/     photos of caves, gardens, forts, temples
    └── hotels/     photos of your hotels
```

## How to run
Option 1 (fastest): double-click index.html.
Option 2 (VS Code): File > Open Folder > this folder, install the "Live Server"
extension (Ctrl+Shift+X), right-click index.html > Open with Live Server.
Option 3 (terminal): run `python -m http.server 8000`, open http://localhost:8000

## How photos work
Each card shows a drawn picture first. As soon as a photo with the right name
exists in the images folder, the page shows your photo instead. No code change needed.

1. Open images/places/PUT-PLACE-PHOTOS-HERE.txt to see the exact file names
   (ellora-caves.jpg, siddharth-garden-zoo.jpg, ...).
2. Copy your photos into images/places/ with those names.
3. Do the same for hotels in images/hotels/ (hotel-1.jpg, hotel-2.jpg, ...).
4. Refresh the page.

Tips: use landscape photos, about 1200 x 750 pixels and under 300 KB each so
the site loads fast on mobile data.

## Where to get photos
- Your own photos and your hotels' own photos (best; use only photos you have
  the right to use).
- Free photos: Wikimedia Commons, Unsplash, Pexels. Check the licence and give
  credit where it is required.
- Do not copy photos from Google Images, Instagram or booking websites.

## Add or change hotels and places
Edit js/data.js. Copy one line to add another item and set i:"images/hotels/your-name"
(no extension), then save your photo as images/hotels/your-name.jpg.

## Put it online (free)
Netlify: go to app.netlify.com/drop and drag this whole folder onto the page.
Or use GitHub Pages / Vercel. For a custom domain, add it in Netlify > Domain management.

## Getting here and blog
- Both are in js/data.js: `TRAVEL` (train, airport, road) and `POSTS` (blog).
- The blog posts are samples. Replace the text, dates and titles with your own,
  and copy one line to add a new post.
- Check train and flight details before you publish, because schedules change.

Travel photos are in images/travel/ (train-station, airport, jalgaon-station, road-samruddhi). Replace any of them with a photo of the same name.

Phone and email: set PHONE and EMAIL at the top of js/data.js. They power the WhatsApp, Call and Email buttons and the contact line in the footer.

Front page background photo: images/hero-bibi-ka-maqbara.jpg. Replace it with a larger photo (1600 pixels wide or more) of the same name for a sharper look.

## Detail popup (click a card)
Clicking any place, hotel or "Getting here" card opens a popup with more
information: entry fee, timings, and a "good to know" tip, plus a WhatsApp
button pre-filled with that item's name.

To add or edit these details, open js/data.js and add these to any item:
- e   -> Entry fee, e.g. e:"₹40 Indians, ₹600 foreigners"
- ti  -> Timings, e.g. ti:"9:00 AM to 5:30 PM, closed Tuesday"
- w   -> A short tip, e.g. w:"Go early to avoid the queue."

Leave any of these out and that line is simply not shown in the popup.
