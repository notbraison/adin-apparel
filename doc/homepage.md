# PROMPT: Transform E-commerce Homepage into Fullscreen Vertical Slider

## OBJECTIVE
Convert my current homepage into a premium Uniqlo-style fullscreen vertical slider (lookbook style) for ADIN Apparel - a Kenyan streetwear brand (est. 2023).

## CURRENT STATE
- Standard navbar (Home, Shop, About) + cart icon
- Featured products section below categories
- Basic scrolling behavior

## TARGET DESIGN
Immersive, fullscreen vertical slider with:
- Each scroll = new full-screen slide
- Scroll-snap behavior (smooth, locked sections)
- Fixed navigation that stays visible across ALL slides
- Adaptive text overlays per slide
- No footer (clean, continuous experience)
- Premium lookbook aesthetic

## TECHNICAL REQUIREMENTS

### 1. LAYOUT ARCHITECTURE (3 Layers)
Layer 1: Background Slides (fullscreen images)

height: 100vh
scroll-snap-align: start
Full-bleed images/videos

Layer 2: Overlay Content (changes per slide)

Positioned absolutely or via grid
Text overlays with headings + subtext
Optional CTAs per slide

Layer 3: Fixed UI (ALWAYS visible)

Navbar with logo + nav links
Cart/search icons
position: fixed
z-index: 50+
Semi-transparent background with backdrop-blur


### 2. SCROLL BEHAVIOR
Use CSS scroll-snap:
```css
.slider-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

.slide {
  scroll-snap-align: start;
  height: 100vh;
  scroll-snap-stop: always;
}
```

### 3. NAVIGATION (CRITICAL)
Must remain visible on every slide:
```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

**Navbar Links:**
- Home
- Shop (primary CTA)
- About
- Cart icon (always visible, right side)

**Adaptive Icons:**
Add gradient overlay to images so white icons are always visible:
```css
.slide::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent);
  z-index: 1;
}
```

### 4. SLIDE STRUCTURE & IMAGE MAPPING

**IMAGE BASE PATH:** `app/public/productimg/`

**Total Slides: 9**

#### Slide 1: HERO
- **Image Path:** `app/public/productimg/Walk With Confidence.JPG`
- **Description:** Male person wearing black hoodie at scenic overlook with valley and hills, blue sky
- **Text:** 
  - Heading: "Walk With Confidence"
  - Subtext: "ADIN Apparel — Est. 2023"
- **Position:** Center or lower-third
- **Text Color:** White (image has dark subject, bright background)

#### Slide 2: LIFESTYLE
- **Image Path:** `app/public/productimg/moviescene2.jpg`
- **Description:** Male person facing camera at waterfall overlook with sunglasses and dark hoodie
- **Text:**
  - Heading: "Everyday Essentials"
  - Subtext: "Designed for the journey"
- **Position:** Upper-left or center-left
- **Text Color:** White

#### Slide 3: SHOP BY CATEGORY
- **Layout:** Grid overlay (2x2 on mobile, 4 columns on desktop)
- **Background:** Dark subtle gradient or `app/public/productimg/logo.jpeg` (blurred)
- **Categories with Image Paths:**
  1. **Hoodies**
     - Image: `app/public/productimg/grayHoodie.jpeg`
     - Description: Gray hoodie with logo and "Walk With Confidence" text
     - Item count: "6 items"
     
  2. **Sweatpants**
     - Image: `app/public/productimg/brownmatching sweatpants.jpeg`
     - Description: Dark hoodie and sweatpants set on wooden surface
     - Item count: "8 items"
     
  3. **Jackets**
     - Image: `app/public/productimg/Studio portrait.jpg`
     - Description: Black and white varsity jacket, terracotta backdrop
     - Item count: "4 items"
     
  4. **Sets**
     - Image: `app/public/productimg/burgundy set.jpeg`
     - Description: Burgundy/maroon hoodie and sweatpants set
     - Item count: "5 items"

- **Text:** "Shop by Category" heading (centered, above grid)
- **Each tile:** Clickable overlay with category name + item count

#### Slide 4: PRODUCT DETAIL (Hoodies)
- **Image Path:** `app/public/productimg/grayHoodie.jpeg`
- **Description:** Close-up of gray hoodie showing logo and "Walk With Confidence" text
- **Text:**
  - Heading: "Premium Comfort"
  - Subtext: "Signature hoodie collection"
- **CTA:** "Shop Hoodies" button
- **Position:** Right side
- **Text Color:** Dark (light gray background)

#### Slide 5: COLLECTION SHOWCASE
- **Image Path:** `app/public/productimg/brownmatching sweatpants.jpeg`
- **Description:** Dark brown/chocolate hoodie and sweatpants set laid flat
- **Text:**
  - Heading: "Complete Sets"
  - Subtext: "Coordinated comfort"
- **Position:** Upper-left
- **Text Color:** White (dark background)

#### Slide 6: COLOR VARIETY
- **Image Path:** `app/public/productimg/navy blue set.jpeg`
- **Description:** Navy blue hoodie and sweatpants set
- **Alternative:** `app/public/productimg/burgundy set.jpeg` (if you prefer burgundy)
- **Text:**
  - Heading: "Find Your Color"
  - Subtext: "Multiple styles available"
- **Position:** Center-right
- **Text Color:** White

#### Slide 7: STUDIO SHOT
- **Image Path:** `app/public/productimg/Studio portrait.jpg`
- **Description:** Person seated on white cube, black and white varsity jacket, terracotta backdrop
- **Text:**
  - Heading: "Varsity Collection"
  - Subtext: "Classic meets modern"
- **Position:** Upper-right or center-left
- **Text Color:** Dark or white depending on placement (warm terracotta bg)

#### Slide 8: WINTER LIFESTYLE (Alternative: BRANDING)
- **Option A - Winter Scene:**
  - **Image Path:** `app/public/productimg/Outdoor winter scene.jpg`
  - **Description:** Person in blue/white varsity jacket, snow-covered ground
  - **Text:**
    - Heading: "All Season Ready"
    - Subtext: "Built to last"
  - **Text Color:** Dark (bright snowy background)

- **Option B - Branding (Recommended):**
  - **Image Path:** `app/public/productimg/logo.jpeg`
  - **Description:** Close-up of circular "a" logo on black fabric with "est. 2023"
  - **Text:**
    - Heading: "Custom Branding"
    - Subtext: "Make it yours"
  - **CTA:** "Learn More" button
  - **Text Color:** White (dark background)

#### Slide 9: FINAL CTA
- **Image Path:** `app/public/productimg/ADIN KENYA est 2023.jpeg`
- **Description:** Black and white jacket with ADIN KENYA shopping bag
- **Text:**
  - Heading: "Shop the Collection"
  - CTA: Large "Explore Now" button
- **Position:** Center
- **Text Color:** White or dark depending on final composition
- **Optional Elements:**
  - Instagram QR: `app/public/productimg/Instagram QR.jpg` (small, bottom-right corner)
  - Instagram handle: "@ADIN_APPARELS"

---

## ALTERNATIVE IMAGES (Available but not in main flow):

### Reserve/Secondary Images:
- `app/public/productimg/waterfall.JPG` - Person on railing overlooking waterfall
- `app/public/productimg/moviescene.jpg` - Person from behind at waterfall (back view)
- `app/public/productimg/OLOONONGOT CRATER POINT.jpg` - Person at crater viewpoint with sign
- `app/public/productimg/brownmatching sweatpants2.jpeg` - Same brown set, different angle
- `app/public/productimg/white shopping bag.jpeg` - Shopping bag with coffee drinks (lifestyle)
- `app/public/productimg/Indoor mirror selfie.jpeg` - Mirror selfie (too casual for main flow)

**Note:** These can be used for:
- About page
- Blog/lifestyle section
- Alternative slide variations
- Mobile-specific slides

---

### 5. TYPOGRAPHY
```css
--font-display: 'Libre Baskerville', serif; /* For headings */
--font-body: 'Work Sans', sans-serif; /* For body text */

h1 { 
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.subtext {
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 300;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
```

### 6. COLOR SYSTEM
```css
:root {
  --primary-dark: #0a0a0a;
  --primary-light: #f8f8f8;
  --accent: #2d2d2d;
  --text-dark: rgba(10, 10, 10, 0.9);
  --text-light: rgba(248, 248, 248, 0.95);
}
```

### 7. ANIMATIONS
```css
/* Slide content fade-in on scroll */
.slide-content {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 0.2s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger text animations */
.slide h1 { animation-delay: 0.3s; }
.slide p { animation-delay: 0.5s; }
.slide .cta { animation-delay: 0.7s; }
```

### 8. RESPONSIVE BEHAVIOR
- Desktop (1024px+): Full effect with all animations
- Tablet (768px-1023px): Simplified overlays, larger touch targets
- Mobile (< 768px): 
  - Reduce text size
  - Stack category grid to 2x2
  - Simplified animations
  - Adjust image cropping for portrait orientation

### 9. IMAGE HANDLING
All images should be:
- High resolution (min 1920x1080)
- Optimized (WebP format preferred, fallback to JPG/JPEG)
- object-fit: cover
- Centered and cropped appropriately

```css
.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Specific adjustments per slide */
.slide-1 .slide-image { object-position: center 30%; } /* Focus on person */
.slide-2 .slide-image { object-position: center center; }
.slide-7 .slide-image { object-position: center 40%; } /* Studio portrait */
```

### 10. CRITICAL UX ELEMENTS
- Scroll indicator on first slide (downward arrow, animated bounce)
- Smooth scroll polyfill for older browsers
- Prevent horizontal scroll completely (`overflow-x: hidden`)
- Skip to content for accessibility
- Keyboard navigation support (arrow keys to navigate slides)
- Touch/swipe support for mobile

---

## IMAGE OPTIMIZATION NOTES

**Before deploying:**
1. Convert all JPG/JPEG to WebP (use tool like Squoosh or Sharp)
2. Create multiple sizes for responsive loading:
   - Desktop: 1920x1080
   - Tablet: 1024x768
   - Mobile: 750x1334
3. Implement lazy loading for slides below fold
4. Use `loading="lazy"` attribute
5. Add proper alt text for accessibility

**Example:**
```html
<picture>
  <source srcset="app/public/productimg/Walk With Confidence.webp" type="image/webp">
  <img src="app/public/productimg/Walk With Confidence.JPG" 
       alt="Person wearing ADIN black hoodie at scenic overlook"
       loading="lazy">
</picture>
```

---

## BRAND VOICE
- Confident, aspirational
- Minimal, clean copy
- African (Kenyan) pride subtle undertones
- Quality over quantity messaging
- Adventure + everyday wear positioning

## WHAT NOT TO DO
❌ Don't use placeholder images - only real ADIN product photos from paths provided
❌ Don't add footer to homepage (breaks immersion)
❌ Don't use generic e-commerce UI patterns
❌ Don't overcomplicate - keep text SHORT (6-10 words max per heading)
❌ Don't make navbar disappear - it must stay fixed
❌ Don't use images not listed in the slide structure above

## DELIVERABLES
1. Single-page component (React/Next.js component or HTML file)
2. Embedded CSS or separate stylesheet with all styles
3. Vanilla JavaScript for scroll effects (or React hooks if using React)
4. Commented code explaining each section
5. Mobile-responsive breakpoints
6. All images properly referenced with correct paths

## FILE STRUCTURE EXPECTATION
app/
├── public/
│   └── productimg/
│       ├── Walk With Confidence.JPG
│       ├── moviescene2.jpg
│       ├── grayHoodie.jpeg
│       ├── brownmatching sweatpants.jpeg
│       ├── Studio portrait.jpg
│       ├── burgundy set.jpeg
│       ├── navy blue set.jpeg
│       ├── logo.jpeg
│       ├── ADIN KENYA est 2023.jpeg
│       └── Instagram QR.jpg

## TESTING CHECKLIST
- [ ] Navbar visible on every slide
- [ ] Smooth scroll-snap behavior works
- [ ] All images load from correct paths
- [ ] Text is readable on all backgrounds (check contrast)
- [ ] CTAs are clearly visible and clickable
- [ ] Mobile responsive (test on actual device)
- [ ] Cart icon functional
- [ ] "Shop" link navigates correctly
- [ ] Category grid tiles are clickable
- [ ] Animations trigger on scroll
- [ ] No horizontal scroll on any viewport size

## NICE-TO-HAVE (Optional Enhancements)
- Parallax effect on background images
- Mouse-scroll progress indicator (dots on right side)
- Keyboard shortcuts (↑↓ arrows to navigate)
- Lazy loading for images below fold
- Smooth scrolling with custom easing
- Preload first 2 slides for instant display

---

Build this with a focus on PERFORMANCE and AESTHETICS. The site should feel premium, load fast, and showcase ADIN Apparel as a serious streetwear brand.