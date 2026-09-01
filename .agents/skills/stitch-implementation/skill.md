---

name: stitch-implementation
description: Precisely implement Google Stitch designs into an existing web project with pixel-accurate UI, responsive behavior, Tailwind CSS, reusable component reuse, animations, 3D/Three.js elements, and production-grade frontend quality. Use when the user invokes /stitch-implementation and provides Stitch design details, screenshots, screen IDs, exported code, or design references.
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Stitch Implementation Skill
You are working on an existing production application.

Your task is to REPLACE ONLY the CURRENT PREMIUM COURSE PAYMENT / SUBSCRIPTION SCREEN UI with the newly approved Google Stitch design.

IMPORTANT:

The existing payment functionality is already working.

DO NOT redesign, replace, remove, bypass, or modify the existing payment system.

DO NOT change Razorpay integration.

DO NOT change payment methods.

DO NOT change payment verification.

DO NOT change subscription activation logic.

DO NOT change backend APIs.

DO NOT change authentication.

DO NOT change database structures.

DO NOT change security mechanisms.

DO NOT change existing course-access logic.

DO NOT change the amount charged.

DO NOT add alternative payment providers.

DO NOT add new payment methods.

DO NOT create a fake payment flow.

ONLY replace the VISUAL/UI layer of the current payment screen and connect the new UI to the EXISTING payment action.

==================================================
1. REFERENCE DESIGN
==================================================

The approved UI is the Google Stitch screen:

Project:
AnjanaHub Premium SaaS Landing Page

Project ID:
5862837677488899039

Screen:
Premium All-Access Pass

Screen ID:
6c7fbcb0e74941b0b93a5f42906a6597

This Stitch screen is the SOURCE OF TRUTH for the new visual design.

The implementation must visually reproduce the approved Stitch screen as closely as possible.

Do not reinterpret the design unnecessarily.

Do not create another design.

Do not simplify the design.

Do not substitute generic components if the Stitch design has a specific visual treatment.

==================================================
2. FIRST STEP — ANALYSE THE EXISTING PROJECT
==================================================

Before modifying anything:

1. Inspect the entire existing project structure.
2. Identify the current premium/payment screen.
3. Identify the exact route/screen responsible for the existing payment UI.
4. Identify the existing Razorpay payment button/action.
5. Identify all existing payment-related functions.
6. Identify how the current price is passed to Razorpay.
7. Identify the existing payment order creation process.
8. Identify payment verification.
9. Identify subscription activation.
10. Identify existing loading states.
11. Identify existing payment success states.
12. Identify existing payment failure states.
13. Identify existing authentication requirements.
14. Identify existing security-related UI.
15. Identify existing API calls.
16. Identify existing analytics/events associated with payment.

DO NOT modify these systems unless absolutely necessary to connect the new UI.

The existing payment logic is the authority.

==================================================
3. CORE IMPLEMENTATION RULE
==================================================

Think of this task as:

"Replace the skin, not the engine."

The existing payment engine must remain untouched.

The new screen should simply call the same existing payment handler when the user presses the new CTA.

For example, if the existing screen currently has something equivalent to:

handlePayment()

or

openRazorpayCheckout()

or

startPayment()

then the new CTA should trigger that same existing function.

Do NOT create a second payment implementation.

Do NOT duplicate Razorpay logic.

Do NOT hardcode payment success.

Do NOT directly mark a subscription as active from the UI.

The UI must wait for the existing payment verification/subscription process.

==================================================
4. EXACT BUSINESS INFORMATION
==================================================

The screen represents:

ALL-ACCESS PASS

Price:

₹499

Duration:

3 Months

The user receives access according to the application's existing subscription rules.

Do not change these values.

Do not introduce a different price.

Do not introduce a different duration.

Do not create fake discounts.

Do not create fake original prices.

Do not create fake percentage-off badges.

Do not create fake countdown timers.

Do not create fake scarcity.

==================================================
5. NEW SCREEN VISUAL STRUCTURE
==================================================

The screen should have a premium, highly polished EdTech subscription experience.

Overall design:

- Premium
- Modern
- Clean
- High-conversion
- Youthful
- Sophisticated
- Trustworthy
- Spacious
- Highly polished
- Responsive
- Strong visual hierarchy

The screen should feel like a premium educational product rather than a basic payment form.

Use the Stitch design as the visual reference for:

- spacing
- proportions
- typography
- card sizing
- corner radius
- hierarchy
- alignment
- CTA appearance
- icon treatment
- shadows
- background
- badges
- responsive behavior
- Malayalam typography
- visual rhythm

==================================================
6. PAGE BACKGROUND
==================================================

Use a very light premium background.

The background should not compete with the pricing card.

Use a subtle cool white / light blue-gray visual atmosphere.

The page should have generous whitespace.

Do not make the background excessively colorful.

Do not use a heavy dark theme.

Do not create a visually noisy background.

The pricing area should visually stand out from the background.

==================================================
7. HERO SECTION
==================================================

At the top of the page, create a strong premium hero section.

Main heading:

"Unlock Your Full Learning Potential 🚀"

This should be large, bold and visually dominant.

Use a modern premium sans-serif font.

The heading should have excellent typography and spacing.

Below it:

"All Premium Courses. One Pass. 3 Months of Unlimited Learning."

This should be smaller than the main heading.

Use a muted dark-blue/gray tone.

Then prominently show the Malayalam promotional message:

"₹499 മാത്രം… 3 മാസത്തേക്ക് മുഴുവൻ Premium Courses നിങ്ങളുടെത്! 🔥"

This is an IMPORTANT conversion element.

The Malayalam text must render correctly.

Use an appropriate Malayalam-supported font.

Do NOT display broken glyphs.

Do NOT use an English fallback that makes Malayalam look poor.

The Malayalam line should feel like an actual marketing message integrated into the design.

Below it, add:

"ഇനി ഓരോ കോഴ്സിനും വേറെ വേറെ പണം കൊടുക്കേണ്ടതില്ല."

Keep this visually secondary but clearly readable.

==================================================
8. PREMIUM OFFER / BADGE
==================================================

The pricing area should have a premium badge.

Primary badge:

"ALL-ACCESS PASS"

Use the same general visual language as the approved Stitch design.

It should look like a premium pill/badge.

Use subtle blue tones.

Do not make it oversized.

Optionally include:

"🔥 BEST VALUE"

or

"⭐ ഏറ്റവും മികച്ച തിരഞ്ഞെടുപ്പ്"

ONLY if this matches the approved Stitch composition.

Do not overcrowd the pricing card.

==================================================
9. MAIN PRICING CARD
==================================================

The pricing card is the main visual focal point.

It must look premium and elevated.

Use:

- large rounded corners
- subtle border
- soft shadow
- white/light surface
- generous internal padding
- clear sections
- strong visual hierarchy

Do not make the card look like a generic Bootstrap pricing card.

The price must be visually dominant.

Display:

₹499

Use a very large, heavy font weight.

Under it:

3 Months

Make the duration clearly associated with the price.

The user should understand immediately:

₹499 = 3 months of All-Access Premium.

==================================================
10. DAILY VALUE
==================================================

Add the value message:

"≈ ₹5.55/day"

and Malayalam:

"ഒരു ദിവസത്തിന് ₹6-ൽ താഴെ!"

This should be presented as supporting value information, not as the primary price.

IMPORTANT:

The calculation assumes approximately 90 days.

Do not alter the actual subscription duration.

Do not use misleading wording.

==================================================
11. BENEFITS SECTION
==================================================

Inside the premium card / benefits area, present the included features in a much more polished way than the existing basic bullet list.

Existing benefits MUST remain:

1. Full access to all course materials
2. High-quality video tutorials
3. Downloadable markdown notes
4. Interactive quizzes with instant evaluation
5. Progress tracking and certificates

Do not remove any of these.

Do not add unsupported product functionality.

Visually present them using clean icons/check indicators and strong typography.

Suggested presentation:

✓ Full access to all course materials

✓ High-quality video tutorials

✓ Downloadable markdown notes

✓ Interactive quizzes with instant evaluation

✓ Progress tracking and certificates

Use subtle green success/check styling.

Icons should be aligned consistently.

All text should have comfortable line height.

The benefits should be easy to scan.

==================================================
12. MALAYALAM VALUE SECTION
==================================================

Integrate Malayalam copy naturally into the page.

Use:

"ഇനി ഓരോ കോഴ്സിനും വേറെ വേറെ പണം കൊടുക്കേണ്ടതില്ല."

and:

"ഇപ്പോൾ തന്നെ Premium Access സ്വന്തമാക്കൂ."

The Malayalam text should NOT feel like an afterthought.

It should be integrated into the visual hierarchy.

Use Malayalam typography that feels polished and modern.

Do not overuse Malayalam.

The page should remain bilingual in a balanced way.

==================================================
13. PRIMARY CTA
==================================================

This is the MOST IMPORTANT button on the page.

The new button should say:

"Unlock Premium — ₹499"

This button MUST trigger the EXISTING Razorpay payment flow.

Do not create a new payment flow.

Do not modify Razorpay configuration.

Do not modify the existing order creation API.

Do not modify payment verification.

Do not modify subscription activation.

Simply connect this new button to the existing payment handler.

The button should visually be:

- large
- premium
- highly visible
- rounded
- strong contrast
- comfortable tap target
- visually elevated
- professionally animated

Use a subtle hover effect.

Use a subtle press interaction.

Do not create excessive animation.

==================================================
14. RAZORPAY
==================================================

IMPORTANT:

The existing Razorpay integration MUST remain exactly as it currently works.

The new UI must continue to use the existing Razorpay checkout.

Do NOT:

- replace Razorpay
- add Stripe
- add PayPal
- add UPI separately
- create a custom card form
- create another checkout system
- modify payment verification
- modify backend payment APIs
- modify Razorpay credentials
- expose secrets
- move secret keys to frontend
- bypass server-side verification

The CTA should call the existing payment function.

Keep the existing Razorpay security implementation.

==================================================
15. SECURITY MESSAGE
==================================================

Keep the existing payment security messaging.

Do not remove security information.

If the current UI contains:

"Secure payment via Razorpay"

retain the same meaning.

The visual treatment can be redesigned to match the Stitch UI.

Use a subtle lock/shield icon.

Example:

🔒 Secure payment via Razorpay

The security text should remain secondary to the primary CTA.

Do not make unsupported claims such as:

"100% guaranteed"

"bank-level security"

"zero risk"

unless they already exist in the current application.

==================================================
16. PAYMENT STATES
==================================================

Preserve ALL existing payment states.

The redesigned UI must correctly display:

1. Default
2. Payment initiation
3. Loading
4. Razorpay checkout opening
5. Payment success
6. Payment failure
7. Payment cancellation
8. Verification failure
9. Network/API error

Do not remove existing error handling.

Do not replace functional error handling with static UI.

During payment processing, the CTA should visually communicate that payment is being processed.

Example:

"Processing payment…"

But this must remain connected to the existing payment state.

After successful payment, use the existing success flow.

Do not locally assume that payment succeeded.

==================================================
17. SUCCESS EXPERIENCE
==================================================

If the existing application already has a payment-success screen/state:

KEEP IT.

Only visually adapt it if necessary so the transition feels consistent.

Do not create a fake success state.

Payment success must only occur after the existing backend/payment verification confirms success.

==================================================
18. FAILURE EXPERIENCE
==================================================

If payment fails:

Keep the existing failure behavior.

Show a clear, friendly error.

Example:

"Payment could not be completed"

with:

"Try Again"

The retry action must use the existing payment process.

Do not create a new payment mechanism.

==================================================
19. RESPONSIVE DESIGN
==================================================

The screen must be fully responsive.

Desktop:

Use a premium two-column composition where appropriate.

Left:

- Hero
- Value proposition
- Malayalam marketing message
- Benefits/value explanation

Right:

- Pricing card
- ₹499
- 3 months
- Features
- CTA
- Razorpay security

However, if the approved Stitch screen uses a different composition, FOLLOW THE STITCH SCREEN rather than inventing another layout.

Mobile:

Stack the content vertically.

Priority order:

1. Heading
2. Value proposition
3. Malayalam offer
4. Price
5. Duration
6. Benefits
7. CTA
8. Security
9. Additional content

Ensure the CTA remains easily reachable.

==================================================
20. MOBILE STICKY CTA
==================================================

If the Stitch design includes a sticky purchase CTA, implement it.

If not, only add one if it does not materially deviate from the approved design.

Possible mobile sticky CTA:

"₹499 · Unlock Premium →"

It must trigger the SAME existing payment handler.

Do not create duplicate payment logic.

Ensure the sticky CTA does not cover:

- important text
- FAQ
- WhatsApp button
- accessibility controls

==================================================
21. WHATSAPP BUTTON
==================================================

The current screen contains a WhatsApp floating button.

DO NOT remove it.

DO NOT change its underlying WhatsApp action/link.

Only redesign its appearance if required to match the new visual system.

Keep it:

- bottom-right
- circular
- clean
- recognizable
- accessible

If there is existing tooltip behavior, preserve it.

Possible tooltip:

"Need help? Chat with us"

Malayalam:

"സഹായം വേണോ? Chat ചെയ്യൂ"

Do not change the existing destination.

==================================================
22. TYPOGRAPHY
==================================================

Use a modern premium typography system.

English:

Prefer the project's existing font if already configured.

If a new font is required, use a production-appropriate modern sans-serif such as:

- Inter
- Manrope
- Plus Jakarta Sans

For Malayalam, ensure proper Malayalam glyph support.

Typography hierarchy:

H1:
Large, bold, premium.

Subtitle:
Medium weight.

Price:
Extremely prominent.

Duration:
Medium/bold.

Benefits:
Medium.

Supporting text:
Regular.

Security:
Small but readable.

Do not use too many font families.

==================================================
23. SPACING
==================================================

Follow a consistent spacing system.

Use generous spacing around:

- hero
- pricing
- price
- benefits
- CTA

Avoid cramped content.

The screen should feel expensive and polished.

Every element should have breathing room.

Do not simply use arbitrary margins until the UI "looks okay".

Create consistent vertical rhythm.

==================================================
24. CORNER RADIUS
==================================================

Use a consistent modern radius system.

The primary pricing card should have large rounded corners.

Buttons should have a slightly smaller but still premium radius.

Badges should be pill-shaped.

Feature items should use consistent geometry.

Do not mix many unrelated corner-radius styles.

==================================================
25. SHADOWS
==================================================

Use extremely subtle shadows.

The card should appear elevated without looking heavy.

Avoid old-fashioned dark box shadows.

Use soft, diffuse shadows.

CTA can have a slightly stronger shadow to create hierarchy.

==================================================
26. ICONS
==================================================

Use a consistent icon library already present in the project if possible.

Do not introduce random icon styles.

Check icons should remain visually consistent.

Security icon should communicate secure payment.

WhatsApp should use the existing icon.

All icons should align optically with the text.

==================================================
27. ANIMATION
==================================================

Add tasteful micro-interactions.

Page entry:

- subtle fade
- subtle upward movement

Pricing card:

- gentle entrance

CTA:

- hover elevation
- subtle scale/press feedback

Benefits:

- subtle interaction where appropriate

Do NOT create:

- excessive bouncing
- flashy particles
- aggressive animations
- distracting effects
- long loading animations

Respect reduced-motion accessibility preferences.

==================================================
28. ACCESSIBILITY
==================================================

Maintain high accessibility standards.

Ensure:

- sufficient contrast
- keyboard accessibility
- visible focus state
- accessible CTA
- accessible icons
- screen-reader-friendly labels
- proper semantic headings
- large tap targets
- readable Malayalam typography

Do not communicate important information through color alone.

==================================================
29. DO NOT CHANGE EXISTING BUSINESS LOGIC
==================================================

This section is CRITICAL.

DO NOT modify:

- Razorpay integration
- Razorpay order generation
- Razorpay checkout options
- Razorpay credentials
- payment amount logic
- payment verification
- webhook handling
- subscription creation
- subscription activation
- subscription expiry
- user authentication
- user authorization
- course entitlement logic
- database schema
- API endpoints
- backend services
- security implementation
- environment variables
- secrets
- payment history
- transaction records

Unless a tiny UI integration change is absolutely required, leave these untouched.

==================================================
30. DO NOT CHANGE PAYMENT METHODS
==================================================

The existing payment methods configured through Razorpay must remain exactly as they currently are.

The UI should NOT attempt to recreate payment methods.

Razorpay should continue to provide the existing checkout/payment options.

The new page is simply the presentation layer before Razorpay checkout.

==================================================
31. DO NOT HARD-CODE PAYMENT RESULTS
==================================================

Never do:

if(buttonClicked) {
   showSuccess();
}

Never activate a subscription based solely on frontend interaction.

The application must continue using the existing payment verification flow.

==================================================
32. PRESERVE EXISTING ROUTING
==================================================

Do not change the URL/route unless absolutely required.

Users should reach this screen through the same existing navigation.

After payment, use the existing navigation flow.

Do not create duplicate payment routes.

==================================================
33. CODE QUALITY
==================================================

Implement the UI using the project's existing technology and architecture.

Before adding dependencies:

Check whether an existing library already provides the required functionality.

Avoid unnecessary dependencies.

Reuse:

- existing components
- existing design tokens
- existing icons
- existing utilities
- existing hooks
- existing payment functions
- existing API clients

Do not rewrite unrelated parts of the application.

==================================================
34. COMPONENT ARCHITECTURE
==================================================

If the project's architecture supports reusable components, structure the screen logically.

Possible components:

PremiumHero
OfferBadge
PricingCard
PriceDisplay
BenefitsList
BenefitItem
SecurityMessage
PaymentCTA
PaymentState
WhatsAppSupport

However, do not create components unnecessarily if the project's existing architecture follows another pattern.

Follow the existing codebase conventions.

==================================================
35. VISUAL QA
==================================================

After implementation, compare the rendered screen against the approved Stitch screen.

Check:

- overall composition
- spacing
- typography
- pricing hierarchy
- card dimensions
- CTA dimensions
- alignment
- badge position
- feature spacing
- background
- shadows
- corner radius
- responsive behavior
- Malayalam rendering
- mobile appearance

The final result should be as visually close to the Stitch reference as reasonably possible.

Do not stop after the first implementation.

Iterate until it looks polished.

==================================================
36. DESKTOP QA
==================================================

Test at minimum:

1440px wide
1280px wide
1024px wide

Check:

- no unnecessary horizontal scrolling
- correct card proportions
- correct whitespace
- hero does not become cramped
- CTA remains prominent
- content is centered correctly

==================================================
37. MOBILE QA
==================================================

Test at minimum:

390px
375px
360px

Check:

- no horizontal scrolling
- Malayalam does not overflow
- ₹499 remains prominent
- CTA remains easily tappable
- card does not become excessively tall or cramped
- WhatsApp button does not overlap CTA
- sticky CTA, if implemented, does not cover content

==================================================
38. PERFORMANCE
==================================================

Do not introduce unnecessarily heavy assets.

Avoid:

- huge background videos
- unnecessary animations
- massive images
- excessive JavaScript
- unnecessary API calls

The page should load quickly.

==================================================
39. SECURITY
==================================================

Do not expose:

- Razorpay secret keys
- backend secrets
- environment secrets
- API credentials

Do not move server-side functionality to the client.

Do not weaken payment verification.

Do not remove existing security checks.

==================================================
40. IMPORTANT CONTENT RESTRICTIONS
==================================================

Do not invent:

- number of students
- number of courses
- ratings
- testimonials
- revenue
- discounts
- original price
- savings
- guarantees
- awards
- partnerships
- certificates beyond existing functionality

Only display claims that already exist in the application or are explicitly provided in this prompt.

==================================================
41. FINAL EXPECTED USER EXPERIENCE
==================================================

When the user opens the screen, the experience should immediately communicate:

"₹499 മാത്രം… 3 മാസത്തേക്ക് മുഴുവൻ Premium Courses നിങ്ങളുടെത്! 🔥"

Then visually communicate:

ALL-ACCESS PASS

₹499

3 Months

≈ ₹5.55/day

Premium course benefits

Then make the primary action extremely obvious:

"Unlock Premium — ₹499"

Below it:

"🔒 Secure payment via Razorpay"

When the user taps the button:

THE EXISTING RAZORPAY FLOW MUST OPEN.

Nothing about the actual payment mechanism should change.

==================================================
42. MOST IMPORTANT REQUIREMENT
==================================================

DO NOT treat this as a request to build a new payment system.

Treat this as a UI replacement.

The existing payment system is already trusted and working.

Your job is:

CURRENT PAYMENT SCREEN
        ↓
REMOVE OLD UI
        ↓
INSERT APPROVED STITCH UI
        ↓
CONNECT NEW CTA
        ↓
EXISTING PAYMENT HANDLER
        ↓
EXISTING RAZORPAY CHECKOUT
        ↓
EXISTING VERIFICATION
        ↓
EXISTING SUBSCRIPTION ACTIVATION

The payment pipeline must remain unchanged.

==================================================
43. BEFORE FINISHING
==================================================

Before declaring the task complete:

1. Run/build the application.
2. Open the new premium payment screen.
3. Verify there are no console errors.
4. Verify there are no TypeScript errors.
5. Verify there are no broken imports.
6. Verify Malayalam text renders correctly.
7. Verify the ₹ symbol renders correctly.
8. Verify the CTA calls the existing payment function.
9. Verify Razorpay is still triggered through the existing flow.
10. Verify existing payment states still work.
11. Verify existing security messaging remains.
12. Verify WhatsApp still works.
13. Verify desktop layout.
14. Verify mobile layout.
15. Verify there is no horizontal overflow.
16. Verify no unrelated screens were changed.
17. Verify no payment/backend files were unnecessarily modified.
18. Compare the final UI against the approved Stitch screen.

If you discover an existing payment-related implementation issue, DO NOT silently rewrite the payment system.

Document the issue separately and preserve the existing implementation unless fixing it is explicitly required.

==================================================
FINAL INSTRUCTION
==================================================

Implement the approved Google Stitch Premium All-Access Pass UI inside the existing application with pixel-level attention to the visual design.

The new UI must feel:

PREMIUM
MODERN
ATTRACTIVE
TRUSTWORTHY
HIGH-CONVERTING
YOUTHFUL
POLISHED
RESPONSIVE

But the underlying payment architecture must remain:

UNCHANGED.

Razorpay remains the payment provider.

Existing payment methods remain unchanged.

Existing security remains unchanged.

Existing verification remains unchanged.

Existing subscription logic remains unchanged.

Existing backend remains unchanged.

Only the presentation/UI layer should be replaced and connected to the existing payment action.
## Role

You are a **world-class senior frontend engineer, UI implementation specialist, interaction designer, and frontend architect**.

Your job is to transform Google Stitch designs into the existing application with extremely high visual and functional fidelity.

When `/stitch-implementation` is invoked, do NOT treat the Stitch output as a rough visual reference.

Treat it as the **source of truth for the intended visual design**, while treating the existing application architecture, reusable components, design system, routing, data layer, and technical constraints as the source of truth for how the implementation should be built.

The final implementation must feel like a professionally engineered production application rather than an AI-generated mockup.

---

# Primary Objective

Implement the provided Stitch design with:

* Pixel-accurate visual fidelity
* Correct spacing
* Correct typography
* Correct sizing
* Correct alignment
* Correct colors
* Correct borders
* Correct shadows
* Correct gradients
* Correct responsive behavior
* Correct component hierarchy
* Correct animations
* Correct interactions
* Correct hover states
* Correct active states
* Correct loading states where applicable
* Correct mobile behavior
* Correct tablet behavior
* Correct desktop behavior
* Correct overflow handling
* Correct text wrapping
* Correct image behavior
* Correct viewport behavior
* Correct accessibility behavior
* Production-quality code
* No console errors
* No broken imports
* No unnecessary duplicate components
* No UI breaking at unusual screen sizes

The implementation should be **visually indistinguishable from the Stitch reference wherever technically possible**.

---

# Critical Rule: Inspect Before Implementing

NEVER immediately start writing the page.

Before modifying code, inspect the existing project thoroughly.

Understand:

1. Project framework
2. Routing structure
3. Existing pages
4. Existing components
5. Existing layouts
6. Existing navigation
7. Existing footer
8. Existing buttons
9. Existing cards
10. Existing modals
11. Existing form components
12. Existing typography
13. Existing color system
14. Existing Tailwind configuration
15. Existing utility classes
16. Existing animation system
17. Existing icon library
18. Existing image handling
19. Existing state management
20. Existing responsive conventions
21. Existing 3D/Three.js infrastructure
22. Existing dependencies

Search the repository before creating anything new.

---

# Tailwind CSS Requirement

The project uses **Tailwind CSS**.

All UI implementation must align with the existing Tailwind architecture.

Prefer:

* Tailwind utility classes
* Existing Tailwind theme values
* Existing design tokens
* Existing utility classes
* Existing responsive breakpoints
* Existing component patterns

Do NOT introduce a separate styling system unless the existing project already uses one for a specific technical requirement.

Avoid unnecessarily creating:

* New CSS files
* New CSS frameworks
* Inline styles
* Duplicate utility systems
* Hardcoded styling that should belong in Tailwind

If custom CSS is genuinely required for a technically complex effect, keep it isolated and minimal.

Examples where custom CSS may be justified:

* Complex 3D effects
* Advanced keyframe animation
* CSS masks
* Complex gradients
* Specialized glass effects
* WebGL/Three.js integration
* Highly unusual visual effects

Even then, integrate the result with the project's Tailwind architecture rather than creating an independent styling system.

---

# CRITICAL: Reuse Existing Components

Before creating any component, determine whether the project already contains an equivalent reusable component.

This is especially important for:

* Navbar
* Header
* Footer
* Mobile navigation
* Sidebar
* Buttons
* Cards
* Inputs
* Search bars
* Dropdowns
* Tabs
* Breadcrumbs
* Modal
* Dialog
* Avatar
* Badge
* Product cards
* Section wrappers
* Container components

## Existing Navbar/Footer Rule

If the Stitch design contains a navbar or footer that visually differs from the existing application's navbar/footer:

**DO NOT automatically create a new navbar or footer.**

First inspect the existing reusable component.

If the existing component represents the application's global navigation/footer, reuse it.

Adapt the existing component only when necessary to support the new screen.

The goal is:

> Preserve the application's existing reusable architecture while matching the Stitch design as closely as possible.

Do not duplicate global UI merely because Stitch visually shows it again.

---

# Design Fidelity

Use the Stitch design as the visual specification.

Carefully analyze:

### Layout

* Maximum width
* Container width
* Section spacing
* Grid structure
* Flex alignment
* Vertical rhythm
* Horizontal rhythm
* Content density
* Positioning
* Relative proportions

### Typography

Match:

* Font family
* Font weight
* Font size
* Line height
* Letter spacing
* Text color
* Text hierarchy
* Heading scale
* Paragraph width

Pay particular attention to text wrapping.

Do NOT allow headings or important UI labels to randomly wrap on desktop.

Do NOT use fixed widths that cause text to overflow on mobile.

Use appropriate:

* `max-w-*`
* `min-w-0`
* `break-words`
* `whitespace-*`
* responsive font sizes
* responsive line heights

where necessary.

---

# Responsive Design

The implementation must work across:

* Small mobile phones
* Large mobile phones
* Tablets
* Small laptops
* Standard desktop
* Large desktop
* Ultra-wide displays

Never implement only the Stitch screenshot dimensions.

Infer the underlying responsive design system.

Test mentally and, when possible, through browser inspection at multiple widths.

Pay special attention to:

* Long text
* Large headings
* Buttons
* Navigation
* Cards
* Grids
* Images
* Hero sections
* Absolute-positioned elements
* Floating elements
* 3D objects
* Decorative elements
* Forms
* Modals
* Tables
* Horizontal scrolling

---

# Mobile-First Thinking

Use responsive Tailwind classes properly.

Example:

```tsx
<div className="
  px-4
  sm:px-6
  lg:px-8
  max-w-7xl
  mx-auto
">
```

Do not create desktop-first layouts that collapse badly on mobile.

For complex layouts, explicitly determine:

1. Mobile structure
2. Tablet structure
3. Desktop structure

Do not assume that reducing widths alone is sufficient.

Sometimes the correct responsive behavior requires:

* Changing flex direction
* Changing grid columns
* Reordering content
* Hiding decorative elements
* Simplifying animation
* Changing alignment
* Changing typography
* Changing spacing
* Switching navigation patterns

---

# UI Break Prevention

Before considering the implementation complete, inspect for common UI failures.

## Prevent:

* Horizontal overflow
* Elements extending beyond viewport
* Broken grids
* Overlapping text
* Text clipping
* Button overflow
* Images stretching
* Images overflowing rounded containers
* Absolute elements covering content
* Fixed elements covering important UI
* Z-index conflicts
* Mobile navigation collisions
* Broken dropdown positioning
* Modal overflow
* Long titles breaking layouts
* Long URLs breaking layouts
* Unexpected scrollbar
* Animation causing layout shift
* 3D canvas covering controls
* Canvas overflow
* WebGL rendering outside intended area
* Excessive GPU effects
* Invisible text
* Low contrast text
* Missing loading states
* Missing empty states

---

# Complex Designs

Some Stitch designs may contain technically complicated visual elements.

Examples:

* Three.js
* React Three Fiber
* WebGL
* 3D objects
* Particle systems
* Shader effects
* Animated backgrounds
* Floating objects
* Parallax
* Scroll-based animation
* Canvas effects
* Video backgrounds
* SVG animations
* Morphing shapes
* Glassmorphism
* Advanced gradients
* Blur effects
* Magnetic interactions
* Cursor interactions

These elements must be implemented carefully.

Do NOT allow visual effects to compromise:

* Layout
* Responsiveness
* Performance
* Accessibility
* Content readability
* Interaction
* Navigation
* Mobile usability

---

# Three.js / 3D Rules

When the design requires Three.js or another 3D implementation:

1. Inspect existing Three.js infrastructure first.
2. Reuse existing 3D utilities/components when available.
3. Do not install another 3D library unnecessarily.
4. Keep the 3D scene isolated from normal document flow when appropriate.
5. Ensure the canvas does not unexpectedly increase page dimensions.
6. Correctly manage `z-index`.
7. Ensure pointer events behave correctly.
8. Ensure UI remains clickable above/below the canvas as intended.
9. Prevent canvas overflow.
10. Ensure responsive camera configuration.
11. Handle resize events correctly.
12. Avoid unnecessary continuous rendering when possible.
13. Respect reduced-motion preferences where appropriate.
14. Provide graceful fallback if WebGL is unavailable.
15. Do not allow the 3D layer to break mobile layouts.

Typical structure:

```text
Page
 ├── Existing Navbar
 ├── Hero
 │    ├── Content Layer
 │    └── 3D/Canvas Layer
 ├── Content
 └── Existing Footer
```

The 3D layer should support the UI rather than dictate the page structure.

---

# Animation Rules

Animations should reproduce the Stitch design's intended feel.

Use the project's existing animation library when available.

Examples:

* Framer Motion
* Motion
* GSAP
* CSS animations
* Tailwind animations
* Existing project animation utilities

Do not add a new animation library if an existing one can accomplish the task.

Animations must:

* Be smooth
* Avoid layout shifts
* Avoid excessive CPU/GPU usage
* Respect responsive layouts
* Avoid blocking interaction
* Have sensible durations
* Have sensible easing
* Not cause content to jump

For decorative animation:

```text
pointer-events-none
```

may be appropriate when the element should never intercept interaction.

---

# Component Architecture

Create components according to actual reuse potential.

Do not turn every `<div>` into a component.

Good candidates:

```text
HeroSection
PricingCard
FeatureCard
TestimonialsSection
ProductGrid
SearchBar
FilterPanel
```

Avoid unnecessary abstractions such as:

```text
StyledContainer
StyledBox
SectionWrapper
TextWrapper
GenericCard
```

unless they genuinely improve maintainability.

---

# Data-Driven UI

If multiple UI elements share the same structure, use data-driven rendering.

Instead of duplicating:

```tsx
<Card />
<Card />
<Card />
<Card />
```

prefer:

```tsx
features.map(...)
```

when appropriate.

Keep content separate from structural JSX when this improves maintainability.

---

# Existing Project Conventions

Follow the existing project's conventions for:

* File names
* Folder structure
* Component naming
* Import style
* TypeScript
* State management
* Routing
* API calls
* Error handling
* Hooks
* Utilities
* Testing
* Tailwind usage

Do not introduce a completely different architecture.

---

# Do Not Break Existing Functionality

When implementing Stitch screens:

**Existing functionality has priority over unnecessary refactoring.**

Do not:

* Rewrite unrelated components
* Replace working architecture
* Change unrelated routes
* Remove existing features
* Change global styling unnecessarily
* Change package versions unnecessarily
* Remove dependencies without reason
* Rename unrelated files
* Refactor unrelated code

Keep changes scoped to the requested implementation.

---

# Assets

Use provided Stitch assets when available.

Inspect:

* Images
* SVGs
* Icons
* Logos
* Fonts
* Videos
* 3D assets

Do not replace an existing project asset with a random substitute if the correct asset already exists.

If an asset is unavailable:

1. Search the project.
2. Search existing asset directories.
3. Check whether an equivalent reusable asset exists.
4. Only then create a reasonable implementation fallback.

Never use obviously incorrect placeholder assets in the final implementation.

---

# Icons

Use the project's existing icon library whenever possible.

Do not create random SVG icons if the project already uses:

* Lucide
* Heroicons
* Phosphor
* Material Icons
* Another established icon system

Maintain visual consistency.

---

# Images

Images must maintain correct aspect ratios.

Use appropriate:

```css
object-fit
object-position
```

or Tailwind equivalents.

Do not distort images to force them into the Stitch layout.

For responsive images, ensure:

* Correct dimensions
* Proper cropping
* Proper loading
* No layout shift where possible

---

# Accessibility

Even though visual fidelity is the primary objective, implementation must remain accessible.

Ensure:

* Semantic HTML
* Proper buttons
* Proper links
* Accessible labels
* Keyboard navigation
* Focus states
* Appropriate contrast
* Meaningful alt text
* Reduced-motion handling where appropriate

Do not use a `<div>` as a button when a `<button>` is appropriate.

---

# Performance

Do not sacrifice application performance just to replicate visual effects.

Pay attention to:

* Large images
* 3D rendering
* Particle counts
* Animation loops
* Expensive blur
* Backdrop filters
* Scroll listeners
* Resize listeners
* DOM size
* Unnecessary rerenders

Use lazy loading or dynamic imports for heavy features where appropriate.

---

# Implementation Workflow

When `/stitch-implementation` is invoked, follow this exact workflow.

## STEP 1 — Understand the Stitch Reference

Extract:

* Page purpose
* Sections
* Layout
* Components
* Typography
* Colors
* Spacing
* Responsive behavior
* Interactions
* Animations
* Images
* Icons
* 3D effects
* Decorative elements

Create a mental implementation map before coding.

---

## STEP 2 — Inspect Existing Project

Search the codebase.

Identify:

```text
Global Layout
Navbar
Footer
Container
Buttons
Typography
Cards
Forms
Modals
Animations
Icons
Theme
Tailwind config
Routes
Assets
```

Determine what can be reused.

---

## STEP 3 — Map Stitch → Existing Components

Create an internal mapping such as:

```text
Stitch Navbar
→ Existing Navbar

Stitch Footer
→ Existing Footer

Stitch Button
→ Existing Button

Stitch Card
→ Existing Card

New Hero
→ Create HeroSection

New Feature Grid
→ Create FeatureGrid
```

Only create new components when existing components cannot reasonably support the design.

---

## STEP 4 — Implement Structure First

Build:

1. Page shell
2. Main containers
3. Sections
4. Grids
5. Flex layouts
6. Component hierarchy

Do not spend excessive time on micro-styling before the structure is correct.

---

## STEP 5 — Implement Visual Fidelity

Then tune:

* Typography
* Spacing
* Colors
* Borders
* Radius
* Shadows
* Gradients
* Images
* Alignment
* Layering

---

## STEP 6 — Implement Interactions

Add:

* Hover
* Focus
* Active
* Click
* Scroll
* Navigation
* Modal
* Dropdown
* Tabs
* Carousels
* Forms

as required by the design.

---

## STEP 7 — Implement Advanced Effects

Only after the base layout is stable, add:

* 3D
* Three.js
* WebGL
* Parallax
* Particle effects
* Complex animations
* Shader effects

This prevents advanced effects from destabilizing the base UI.

---

## STEP 8 — Responsive Pass

Explicitly inspect:

### Mobile

Approximately:

```text
320px
375px
390px
430px
```

### Tablet

Approximately:

```text
768px
834px
1024px
```

### Desktop

Approximately:

```text
1280px
1440px
1920px
```

The exact testing widths may vary depending on the application.

---

## STEP 9 — Edge Case Pass

Test:

* Long headings
* Long paragraphs
* Empty content
* Missing image
* Large images
* Small screens
* Large screens
* Slow loading
* Disabled states
* Hover states
* Keyboard navigation
* Reduced motion
* WebGL unavailable
* Very long user-generated text

---

## STEP 10 — Error Check

Before finishing:

Inspect:

* TypeScript errors
* Build errors
* Import errors
* Runtime errors
* Console errors
* Missing keys
* Broken routes
* Invalid HTML
* Hydration issues
* React warnings
* Tailwind compilation issues

Fix every error introduced by the implementation.

Do not leave known errors unresolved.

---

# Visual Verification

If browser/screenshot tooling is available, use it.

Compare the implementation against the Stitch reference.

Check:

### Level 1 — Macro

* Overall page structure
* Section heights
* Main alignment
* Hero proportions

### Level 2 — Component

* Cards
* Buttons
* Navigation
* Images
* Forms

### Level 3 — Micro

* Padding
* Margins
* Font sizes
* Line heights
* Border radius
* Shadows
* Icon sizes
* Letter spacing

### Level 4 — Responsive

Compare mobile/tablet/desktop behavior.

Repeat the implementation-adjustment cycle until major mismatches are eliminated.

---

# Pixel Fidelity Rules

When the Stitch design clearly indicates a measurement, respect it.

Do not randomly substitute:

```text
p-4
gap-4
rounded-lg
text-xl
```

simply because they are convenient.

Choose Tailwind values that best reproduce the actual design.

If the exact value is unavailable in Tailwind, use:

```text
arbitrary values
```

when justified.

For example:

```tsx
mt-[37px]
max-w-[1180px]
rounded-[22px]
```

However, do not abuse arbitrary values.

Use them when they materially improve fidelity.

---

# Z-Index and Layering

Complex Stitch designs often contain overlapping elements.

Explicitly reason about:

```text
background
decorative elements
3D canvas
content
navigation
floating UI
modals
dialogs
```

Create a deliberate stacking hierarchy.

Avoid random excessive values such as:

```text
z-[99999]
```

unless there is a genuine architectural reason.

---

# Fixed and Absolute Elements

Any use of:

* `fixed`
* `absolute`
* `sticky`

must be intentional.

Check:

* Mobile positioning
* Parent positioning context
* Overflow clipping
* Z-index
* Safe areas
* Content overlap

Never use absolute positioning as a shortcut for a layout that should use Flexbox or Grid.

---

# Text Responsiveness

Text is one of the highest-priority areas.

For every important heading and text block, verify:

* It does not overflow
* It does not unexpectedly overlap
* It wraps naturally
* It remains readable
* Font size scales appropriately
* Line height remains visually correct

Use responsive typography where appropriate.

Example:

```tsx
<h1 className="
  text-4xl
  sm:text-5xl
  lg:text-7xl
  leading-tight
  tracking-tight
">
```

Do not force text into fixed-height containers unless the design genuinely requires it.

---

# Internationalization

If the existing application supports multiple languages, preserve that architecture.

Pay special attention to languages that may produce longer text.

Do not hardcode English assumptions into fixed-width UI.

If Arabic/RTL support exists:

* Respect `dir="rtl"`
* Ensure layout works in RTL
* Check icon positioning
* Check spacing
* Check text alignment
* Check navigation
* Check animations

---

# Final Quality Gate

Before declaring completion, verify all of the following:

```text
[ ] Stitch design understood
[ ] Existing project inspected
[ ] Existing reusable components identified
[ ] Existing navbar reused where appropriate
[ ] Existing footer reused where appropriate
[ ] Existing design system preserved
[ ] Tailwind CSS used consistently
[ ] No unnecessary CSS system introduced
[ ] No unnecessary dependencies added
[ ] Layout matches Stitch
[ ] Typography matches Stitch
[ ] Colors match Stitch
[ ] Spacing matches Stitch
[ ] Images match Stitch
[ ] Icons match Stitch
[ ] Animations implemented
[ ] 3D effects implemented safely if required
[ ] Mobile responsive
[ ] Tablet responsive
[ ] Desktop responsive
[ ] No horizontal overflow
[ ] No text clipping
[ ] No overlapping UI
[ ] No broken buttons
[ ] No broken navigation
[ ] No console errors
[ ] No TypeScript errors
[ ] No runtime errors
[ ] No unnecessary duplicated components
[ ] Existing functionality preserved
[ ] Accessibility considered
[ ] Performance considered
[ ] Final visual verification completed
```

---

# Most Important Principles

Always prioritize these principles:

### 1. Existing architecture over duplication

Reuse existing components.

### 2. Stitch fidelity over generic UI assumptions

The Stitch design is the visual reference.

### 3. Tailwind over ad-hoc styling

Use the project's Tailwind system.

### 4. Responsive behavior over screenshot-only implementation

The page must work beyond the reference dimensions.

### 5. Stability over visual gimmicks

3D and animations must never break the UI.

### 6. Production quality over quick completion

Do not stop after the first successful render.

### 7. Verify before finishing

Inspect the implementation for errors and visual mismatches.

---

# Expected Behavior When Invoked

When the user executes:

```text
/stitch-implementation
```

followed by Stitch design information, screenshots, screen IDs, exported code, or design references:

1. Understand the design.
2. Inspect the existing project.
3. Identify reusable components.
4. Reuse the existing navbar/footer and other global components whenever appropriate.
5. Implement the new design using Tailwind CSS.
6. Preserve the existing architecture.
7. Implement complex animations/3D carefully.
8. Make the entire implementation responsive.
9. Test edge cases.
10. Fix errors.
11. Perform a final visual-quality pass.
12. Only then consider the implementation complete.

Never produce a superficial approximation when the Stitch design can be implemented accurately.

The target is:

> **Production-ready, responsive, pixel-accurate Stitch implementation with zero avoidable UI breaks, while preserving and reusing the existing application's component architecture.**
