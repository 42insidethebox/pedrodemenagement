# IOPartner Maxxing Plan

Date: 2026-05-13
Stage: Planning only. Product code has not been changed for this pass.

## Current State

IOPartner currently has a strong French homepage positioning around:

- Consulting technique
- Systems & operations
- Sites standardises
- "Le standard quand il suffit. Le sur mesure quand il faut."

The main issue is not lack of content. It is too much visible explanation and too little visual proof.

## 2026-05-16 Adjustment

Direction update after the first funnel cleanup pass:

- `Cadrage technique` should no longer be treated as a single paid entry point.
- Public paid entry should offer:
  - `15 min / 60 CHF`
  - `1 h / 140 CHF`
- The 15-minute format remains the low-friction paid arbitrage.
- The 1-hour format exists for more serious SMEs that already have real stack, workflow, infra, or stakeholder complexity.
- The old language around `choose-template` or `choose a base` remains too marketplace-like.
- The web proof layer should instead behave like:
  - `examples of projects delivered`
  - `what 999 CHF can already look like`
  - `what 1 500 CHF can already look like`

This means the product logic is now:

1. `Cadrage technique`
   - `15 min / 60 CHF`
   - `1 h / 140 CHF`
   - then `140 CHF / h` if the work continues

2. `Systèmes & opérations`
   - scoped after context or paid cadrage

3. `Présence web cadrée`
   - proof-first examples of projects already deliverable at `999 CHF` and `1 500 CHF`
   - not a template marketplace tone

4. `Paliers techniques`
   - `1 500 CHF` stays attached to the standard web funnel
   - `2 000 CHF`, `2 200 CHF`, and `4 500 CHF` should behave like:
     - `select tier`
     - `short intake`
     - `Stripe`
   - `8 000+ CHF` should behave like:
     - `select tier`
     - `short intake`
     - `paid 1 h cadrage`
   - this is both a buyer path and an internal qualification shortcut

The site currently reads like a complete operating model. The target should read like a confident technical consulting firm that only shows the essentials.

## Code Audited

Core public pages:

- `src/pages/iopartner/index.astro`
- `src/pages/iopartner/pricing.astro`
- `src/pages/iopartner/services.astro`
- `src/pages/iopartner/custom-systems.astro`
- `src/pages/iopartner/contact.astro`
- `src/pages/iopartner/choose-template.astro`
- `src/pages/iopartner/onboarding.astro`
- `src/pages/iopartner/offre.astro`
- `src/pages/iopartner/thank-you.astro`
- `src/pages/iopartner/offre-merci.astro`
- `src/pages/iopartner/onboarding-merci.astro`
- `src/pages/iopartner/privacy.md`
- `src/pages/iopartner/terms.md`

Localized public pages:

- `src/pages/iopartner/en/*`
- `src/pages/iopartner/de/*`
- `src/pages/iopartner/it/*`

Tenant and brand plumbing:

- `src/tenants/iopartner/config.ts`
- `src/tenants/iopartner/theme.ts`
- `src/tenants/iopartner/copy.ts`
- `src/tenants/iopartner/Shell.astro`
- `src/tenants/iopartner/router.ts`
- `src/navigation.ts`
- `src/lib/brands.config.ts`
- `src/middleware.ts`

Shared layout/components/assets:

- `src/layouts/PageLayout.astro`
- `src/layouts/Layout.astro`
- `src/components/widgets/Header.astro`
- `src/components/widgets/Hero.astro`
- `src/components/widgets/Content.astro`
- `src/components/widgets/Features.astro`
- `src/components/CustomStyles.astro`
- `src/assets/iopartner/*`
- `src/assets/images/light_minimalist.png`
- `src/assets/images/proprietary_platform.png`
- `src/assets/images/services_automatises.png`

Backend/funnel routes checked:

- `src/pages/api/iopartner/onboarding.ts`
- `src/pages/api/iopartner/lead-offre.ts`
- `src/pages/api/iopartner/count.ts`
- `src/pages/iopartner/*/app/*`

## Main Findings

### What Is Already Working

- The French homepage positioning is coherent and stronger than the older "web agency" positioning.
- The three-entry ladder is useful: consulting, systems & operations, standardized website.
- The pricing anchors are psychologically good: `60 CHF / 15 min`, `140 CHF / h`, `999 CHF`.
- The "standard when enough / custom when needed" idea is the most valuable strategic sentence on the site.
- The Systems & operations direction is stronger than generic AI automation positioning.

### What Is Holding It Back

- Homepage repetition: hero entry cards, "Trois points d'entree", method, parcours, format, stats, FAQ, CTA all repeat the same decision-ladder idea.
- Pricing page is extremely long and becomes a service catalogue instead of a premium decision page.
- Systems & operations is visually not separated enough from the 999 CHF site offer.
- Existing visuals are mostly generated laptop/office images or CSS cards, not proof artifacts.
- Some copy lowers the aura: "WhatsApp cliquable", "Calendly", "support engineering senior", "Formulaire niveau FAANG", emoji/surprise UI.
- There are price inconsistencies: homepage/pricing say `60 CHF / 15 min`, custom systems says `80 CHF / 15 min`, tenant config says `150 CHF / 15 min`.
- French pages are newer and stronger than EN/DE/IT pages. Localized homepages still mostly sell fast websites.
- `src/tenants/iopartner/*` appears to be a stale/parallel concept around "Web systems, Linux, advisory" and is not the active public implementation.
- `/offre` is a direct-response landing page with scarcity/countdown/FB-pixel energy. It conflicts with the premium consulting direction if linked or discovered.
- The language selector stores language but IOPartner clean host does not get the same locale path rewrite logic that TonSiteWeb has.

## Target Direction

IOPartner should become:

Technical decision architecture for Swiss SMEs.

The visual identity should feel like:

- Swiss architecture firm
- Infrastructure consultancy
- Engineering studio
- Systems advisory

It should not feel like:

- Webflow agency
- AI startup
- Fiverr freelancer
- Cyberpunk automation shop
- Generic SaaS landing page

The core design rule:

Reduce visible effort. More silence, stronger hierarchy, fewer explanations, more proof objects.

## Proposed Homepage Structure

Target homepage should be about 35-45 percent shorter than today.

### 1. Hero

Goal: immediate authority.

Copy direction:

```text
Consulting technique
Systems & operations pour PME

Le standard quand il suffit.
Le sur mesure quand il faut.

Décider vite. Construire proprement. Éviter les mauvais chantiers.
```

CTAs:

- `Parler du besoin`
- `Voir les formats`

Visual:

- Large right-side abstract infrastructure topology.
- No laptop photo.
- No humans.
- No stock office.

Current code to replace:

- `src/pages/iopartner/index.astro`, current hero image slot and embedded `tsw-home-hero-*` cards.

### 2. Entry Points

Goal: preserve the strong ladder, but make it compact.

Keep three entries:

- Consulting technique: `Décider vite. Débloquer proprement.`
- Systems & operations: `Infra, backend, workflows, continuité.`
- Déploiement standard: `Présence web cadrée quand le custom est inutile.`

Change wording:

- Replace `Site standardisé` with `Déploiement standard` or `Présence web standardisée`.
- Avoid package-like language in this section.

Visual:

- Three small blueprint icons or mini-line diagrams.
- Prefer CSS/SVG generated in code rather than raster images.

Current code to consolidate:

- `Ce que nous faisons`
- `Trois points d'entrée`
- Hero entry grid
- Repeated `Site standardisé` cards

### 3. Memorable Philosophy Section

Goal: one iconic section that makes the brand distinctive.

Candidate copy:

```text
Le mauvais projet coûte plus cher que le bon arbitrage.

Parfois un site standard suffit.
Parfois il faut une infrastructure dédiée.
Le rôle du consulting est de distinguer les deux rapidement.
```

Layout:

- Oversized statement block.
- High whitespace.
- No card grid.

### 4. Method / Process

Goal: reduce process repetition into one clear diagram.

Structure:

- Diagnostic
- Périmètre
- Build
- Continuité

Visual:

- Horizontal Swiss transport-map style process diagram.
- Can be CSS/SVG, no generated image required.

Current code to consolidate:

- `Méthode`
- `Parcours`
- `Formats d'intervention`

### 5. Systems & Operations Visual Centerpiece

Goal: make the advanced engineering layer feel like a higher level, not a website add-on.

Layout:

- Dark graphite/navy section.
- Sparse copy.
- Large architecture/proof visual.
- Fewer bullets.

Copy direction:

```text
Systems & operations

Quand le site devient système.
Infrastructure, automatisation, backend léger, continuité technique.
```

Include concrete tooling line:

```text
Docker · VPS · DNS · SSL · monitoring · workflows · API · dashboards
```

Visual:

- Large dark architecture panel.

### 6. Proof Artifacts / Example Outcomes

Goal: reduce abstraction with concrete deliverables.

Possible cards:

- Decision map after consulting.
- Infrastructure baseline.
- Workflow map.
- Launch baseline.
- Monitoring/continuity checklist.

This section can start with demo/fake artifacts if no client examples are ready, but they must be presented as internal examples, not fake client proof.

### 7. Standard Deployment Section

Goal: keep 999 CHF commercial offer without lowering perceived sophistication.

Rename:

- Preferred: `Déploiement standard`
- Alternative: `Présence web standardisée`
- Avoid: `site standardisé` as the main label.

Copy direction:

```text
Quand une build privée n'est pas nécessaire.

Un format de lancement cadré pour une présence web propre, rapide et maintenable.
```

Visually:

- Lighter, clean, separate from Systems.
- Do not make it the dominant homepage offer.

### 8. Pricing Anchors

Keep short:

- `60 CHF / 15 min`
- `140 CHF / h`
- `999 CHF`
- `Sur devis`

No large pricing explanations on homepage.

### 9. FAQ

Keep only 4-5 high-signal questions.

FAQ should breathe. No image needed.

### 10. Final CTA

Keep calm:

```text
Commencer par le bon niveau d'intervention.
```

CTAs:

- `Envoyer le contexte`
- `Voir les tarifs`

## Proposed Pricing Page Changes

The pricing page should become a compact decision page, not a long product catalogue.

Current problems:

- Hero + banner + tab shell + three panels + features + process + FAQ + CTA.
- `Features3`, `Steps`, FAQ, and final CTA repeat points already made.
- Website package is too visually close to consulting/systems.

Proposed structure:

1. Hero: `Tarifs de départ`
2. Compact pricing matrix with three columns:
   - Consulting
   - Systems & operations
   - Déploiement standard
3. One advanced dark systems panel.
4. One standard deployment panel.
5. FAQ.
6. CTA.

Specific copy edits:

- Replace `Website building` with `Déploiement standard`.
- Replace `Pack 1 500: Site standard + WhatsApp + Calendly` with `Déploiement standard + rendez-vous intégrés`.
- Replace `WhatsApp cliquable + prise de rendez-vous Calendly` with `Communication & rendez-vous intégrés`.
- Replace `Explication légère et handoff simple` with `Passation courte`.
- Replace `Support engineering senior` with `Support technique avancé`.
- Remove or shorten tooltips where they restate scope.
- Keep the tab mechanism only if it remains elegant. Otherwise use one scrollable matrix.

Remove or merge:

- `Ce que peuvent inclure nos offres`
- `Comment se déroule votre projet`
- Final website-only CTA if it over-dominates consulting.

## Proposed Services Page Changes

Current services page is older and more website/automation oriented.

Options:

1. Best: turn `/services` into a concise capability page with proof artifacts.
2. Acceptable: redirect or simplify it if homepage and pricing carry the positioning.

Recommended structure:

- Consulting technique
- Systems & operations
- Déploiement standard
- Continuity/support
- Example outcomes

Avoid:

- "Nos services" agency wording.
- "automatisation et expertise humaine" as the main line.
- "Design · Contenu · Maintenance" as the hero anchor.

## Proposed Contact Page Changes

Current issue:

- `Formulaire niveau FAANG` is off-brand and sounds gimmicky.
- The form is useful but too product-routing oriented.

New direction:

Hero:

```text
Envoyez le contexte.
On vous indique le bon niveau d'intervention.
```

Subtitle:

```text
Consulting court, systems & operations, ou déploiement standard. Le but est d'éviter le mauvais chantier.
```

Keep the guided form but make it calmer:

- `Votre contexte`
- `Le besoin`
- `Le niveau de complexité`
- `Suite souhaitée`

Remove:

- `FAANG`
- Too many package labels in the hero.

## Proposed Choose-Template / Onboarding Changes

Current issue:

- This flow still feels like a website-package marketplace.
- The dice emoji and "surprise" CTA reduce premium seriousness.
- It uses visible implementation details like WhatsApp and Calendly.

New framing:

- `Choisir une base de déploiement`
- `Sélectionner une direction visuelle`
- `Laisser IOPartner choisir la base adaptée`

Replace:

- `🎲 Laissez-nous choisir` with `Recommandation IOPartner`
- `Template et tenant ne suffisent plus ?` with `Quand le standard ne suffit plus`
- `Site standard + WhatsApp + Calendly` with `Déploiement standard + rendez-vous intégrés`

## Proposed Custom Systems Page Changes

Current issue:

- Strong ladder, but visually feels like a sales menu.
- Price inconsistency with the rest of the site.
- Good content, but should be positioned as systems architecture path.

Recommended:

- Keep the custom ladder.
- Make it more premium and less menu-like.
- Use one architecture visual.
- Confirm final diagnostic price before changes.

Important price conflict:

- Homepage/pricing/contact: `60 CHF / 15 min`
- `custom-systems.astro`: `80 CHF / 15 min`
- `src/tenants/iopartner/config.ts`: `150 CHF / 15 min`
- `src/data/iopartnerPricing.fr.ts`: `80 CHF / 15 min`

Decision needed before implementation:

- Choose one diagnostic price and apply everywhere.

## Proposed `/offre` Handling

Current `/offre` is a direct-response performance landing page:

- countdown timer
- scarcity slots
- Facebook pixel placeholder
- "Payer 999 CHF maintenant"
- refund guarantee
- heavy yellow/blue CTA style

This conflicts with the premium consulting direction.

Recommendation:

- Do not link `/offre` from the main site.
- Either keep it hidden for paid ads only or redesign it as a calm standard-deployment landing page.
- Fix hardcoded TonSiteWeb checkout route and lead source if it remains active.

## Visual Resource Checklist

All generated images should avoid people, laptops, stock offices, handshakes, neon AI brains, robot imagery, and cyberpunk aesthetics.

Preferred style:

- Swiss engineering
- architectural diagrams
- dark graphite/navy
- thin steel-blue/cyan lines
- subtle grid
- large negative space
- no baked-in readable text unless intentionally requested
- no fake brand names
- no humans

### Required Asset 1: Hero Infrastructure Topology

File target:

- `src/assets/iopartner/visuals/hero-topology.png`

Placement:

- Homepage hero, right side on desktop, under copy on mobile.

Aspect:

- 16:10 or 4:3
- Suggested size: 2400 x 1500

Prompt:

```text
Minimal Swiss engineering infrastructure topology, dark graphite and deep navy background, thin steel-blue and cyan connection lines, clean nodes and service blocks arranged like an operational architecture map, subtle grid, high negative space, premium consulting aesthetic, no people, no laptop, no office, no robots, no neon cyberpunk, no readable text, no logos, crisp vector-like rendering, elegant and restrained.
```

Purpose:

- Replace explanatory hero cards with one strong visual anchor.

### Required Asset 2: Systems Architecture Panel

File target:

- `src/assets/iopartner/visuals/systems-architecture.png`

Placement:

- Main visual in the Systems & operations dark section.

Aspect:

- 16:9
- Suggested size: 2400 x 1350

Prompt:

```text
Premium dark technical architecture dashboard, abstract backend infrastructure map with layered services, deployment pipeline, monitoring nodes, API gateway, database blocks, automation routes, subtle grid and blueprint lines, Swiss minimalism, graphite navy black, restrained cyan highlights, crisp interface-like composition, no people, no laptop, no office, no stock photo, no readable text, no logos, no cyberpunk glow.
```

Purpose:

- Make Systems & operations feel elite and distinct from website packages.

### Required Asset 3: Automation Workflow Map

File target:

- `src/assets/iopartner/visuals/automation-workflow.png`

Placement:

- Optional subsection or proof artifact under Systems & operations.

Aspect:

- 3:2 or 16:10
- Suggested size: 1800 x 1200

Prompt:

```text
Clean workflow automation map in Swiss blueprint style, form intake node flowing into CRM, notification, calendar, archive, and dashboard nodes, elegant arrows and modular blocks, light graphite background with muted navy and steel-blue accents, no readable text, no people, no laptop, no office, no robots, restrained professional engineering aesthetic.
```

Purpose:

- Make automation concrete without using saturated AI/no-code visuals.

### Required Asset 4: Monitoring / Continuity Dashboard

File target:

- `src/assets/iopartner/visuals/continuity-monitoring.png`

Placement:

- Continuity/support proof card or pricing systems panel.

Aspect:

- 16:10
- Suggested size: 1800 x 1125

Prompt:

```text
Minimal operational monitoring dashboard, uptime lines, service health indicators, backup cadence, incident timeline, dark graphite interface with muted cyan and slate accents, very sparse and premium, Swiss engineering style, no readable text, no people, no laptop, no office, no logos.
```

Purpose:

- Reinforce stability and support without support-headset imagery.

### Required Asset 5: Standard Deployment Preview

File target:

- `src/assets/iopartner/visuals/standard-deployment-preview.png`

Placement:

- Standard deployment section on homepage and pricing.

Aspect:

- 16:10
- Suggested size: 1800 x 1125

Prompt:

```text
Three elegant minimal website wireframe previews floating in a clean white and light graphite composition, Swiss typography grid feeling, structured sections, precise spacing, calm professional aesthetic, no photos, no people, no colorful agency look, no readable text, no logos, no purple startup gradients.
```

Purpose:

- Keep the 999 CHF offer visually serious, not cheap/template-ish.

### Required Asset 6: Decision Map Artifact

File target:

- `src/assets/iopartner/visuals/decision-map-artifact.png`

Placement:

- Proof artifacts / consulting section.

Aspect:

- 4:3
- Suggested size: 1600 x 1200

Prompt:

```text
Premium technical decision map artifact, structured branching paths and scope boundaries on a clean off-white background, thin graphite lines, restrained navy annotations without readable text, architectural consulting feel, Swiss grid, high whitespace, no people, no laptop, no office, no logos.
```

Purpose:

- Make consulting tangible: arbitrage, scope, decision clarity.

### Optional Asset 7: Footer Technical Texture

File target:

- Prefer CSS/SVG, not raster.
- If raster: `src/assets/iopartner/visuals/footer-topology-texture.png`

Placement:

- Footer or final CTA background at very low opacity.

Prompt:

```text
Subtle technical topology texture, thin graphite and navy lines on transparent or near-white background, minimal nodes, large empty space, Swiss architectural blueprint pattern, no text, no logos.
```

Purpose:

- Add authority texture without visual noise.

## Non-Generated Visuals To Build In Code

These are better as CSS/SVG than generated raster:

- Three entry point icons.
- Process / transport map diagram.
- Pricing matrix separators.
- Small proof cards and labels.
- Standard stack/tool chips.
- Footer grid texture if simple.

## Copy Decisions Needed Before Coding

### Cadrage Decision

Use two public paid entry points:

- `60 CHF / 15 min`
- `140 CHF / 1 h`

Recommendation:

- Keep `15 min / 60 CHF` as the light arbitrage format.
- Keep `1 h / 140 CHF` for more serious SMEs that need a real working session immediately.
- Use `140 CHF / h` as the continuation rate when the work extends beyond the paid entry.

### Naming Decision

Choose final label:

- Preferred: `Déploiement standard`
- Alternative: `Présence web standardisée`
- Avoid as primary: `Site standardisé`

Recommendation:

- Use `Déploiement standard` in navigation/pricing.
- Use `présence web standardisée` in body copy where needed.

### Website Pack Decision

Decide if `1 249 CHF` remains public.

Current code references:

- `essential1249` exists in pricing/onboarding infrastructure.
- Main public pricing currently emphasizes `999` and `1 500`.

Recommendation:

- Hide `1 249 CHF` from the main public positioning unless there is a clear reason.
- Keep backend support if it is used by checkout, but do not make it a primary public tier.

### Language Scope Decision

Choose rollout:

- Phase 1: French only, then sync locales.
- Phase 1: All locales at once.

Recommendation:

- French first. Then translate/adapt EN/DE/IT after visual/content structure stabilizes.

## Technical Implementation Plan

### Phase 0: Lock Direction

Needed before coding:

- Final label for website offer.
- Generated image assets or approval to create coded placeholders first.
- Decision on whether `/offre` stays hidden or gets redesigned.
- Whether booking should use one shared calendar or separate `15 min` and `1 h` booking links.

### Phase 1: Homepage Compression

Files:

- `src/pages/iopartner/index.astro`

Actions:

- Replace hero slot with one topology visual.
- Remove repeated hero cards or convert them into much smaller entry chips.
- Consolidate `Ce que nous faisons`, `Méthode`, `Parcours`, `Formats d'intervention`, and `Repères de départ`.
- Add memorable philosophy section.
- Add Systems & operations dark visual section.
- Add concise Standard deployment section.
- Keep FAQ and CTA shorter.

Expected result:

- Homepage becomes shorter, more visual, more premium.

### Phase 2: Pricing Compression

Files:

- `src/pages/iopartner/pricing.astro`

Actions:

- Reframe the page around decision paths, not pack catalogue.
- Rename website tab/section to `Déploiement standard`.
- Remove catalogue language and implementation details.
- Reduce post-pricing sections.
- Make systems visually dominant but concise.
- Apply final diagnostic price consistently.

Expected result:

- Pricing becomes easier to scan and less cheap-package oriented.

### Phase 3: Services / Custom / Contact Alignment

Files:

- `src/pages/iopartner/services.astro`
- `src/pages/iopartner/custom-systems.astro`
- `src/pages/iopartner/contact.astro`

Actions:

- Align service page with new homepage hierarchy.
- Make custom-systems feel like architecture path, not menu.
- Replace `Formulaire niveau FAANG`.
- Calm down contact routing language.

Expected result:

- The main public site feels like one brand, not three different funnels.

### Phase 4: Funnel Cleanup

Files:

- `src/pages/iopartner/choose-template.astro`
- `src/pages/iopartner/onboarding.astro`
- `src/pages/iopartner/offre.astro`
- `src/pages/api/iopartner/onboarding.ts`
- `src/pages/api/iopartner/lead-offre.ts`

Actions:

- Make choose-template feel like selecting a deployment baseline.
- Reframe choose-template as proof of delivered examples, not template shopping.
- Remove dice/emoji marketplace feel.
- Check whether `/offre` should remain ad-only or be redesigned.
- Fix any hardcoded `tonsiteweb` routes/sources if the page remains active.

Expected result:

- Conversion flow stays commercially useful without weakening premium positioning.

### Phase 5: Localization

Files:

- `src/pages/iopartner/en/*`
- `src/pages/iopartner/de/*`
- `src/pages/iopartner/it/*`
- `src/navigation.ts`
- possibly `src/middleware.ts`

Actions:

- Bring EN/DE/IT pages into parity with French.
- Update navigation labels.
- Decide whether IOPartner needs cookie-based locale rewrite like TonSiteWeb.

Expected result:

- The IOPartner brand does not revert to old "fast website" messaging in other languages.

### Phase 6: Component Extraction

Optional but recommended after structure is stable.

Potential components:

- `src/components/iopartner/IoVisualPanel.astro`
- `src/components/iopartner/IoEntryPoints.astro`
- `src/components/iopartner/IoProcessMap.astro`
- `src/components/iopartner/IoProofArtifact.astro`
- `src/components/iopartner/IoPricingMatrix.astro`

Why:

- Current homepage and pricing have large page-local CSS blocks.
- Extracting components after the design stabilizes will reduce future drift.

### Phase 7: Verification

Commands:

- `npm run check:astro`
- `npm run check:eslint`
- `npm run check:prettier`
- `npm run build`

Manual checks:

- `/iopartner`
- `/iopartner/pricing`
- `/iopartner/services`
- `/iopartner/contact`
- `/iopartner/custom-systems`
- `/iopartner/choose-template`
- `/iopartner/en`
- `/iopartner/de`
- `/iopartner/it`
- Clean host behavior for `iopartner.ch`
- Mobile layout and header language selector

## Detailed To-Do Checklist

### Done In This Planning Pass

- [x] Read the core French homepage code.
- [x] Read the core French pricing code.
- [x] Read services, contact, custom systems, choose-template, onboarding, and offer flow.
- [x] Checked localized IOPartner homepages.
- [x] Checked tenant config/theme/copy/shell/router.
- [x] Checked brand config, navigation, layout, header, middleware.
- [x] Checked current image assets and dimensions.
- [x] Identified pricing inconsistencies.
- [x] Identified homepage repetition points.
- [x] Identified stale/parallel tenant copy system.
- [x] Identified funnel pages that conflict with premium positioning.
- [x] Saved this plan.

### Missing Before Design Implementation

- [ ] Final diagnostic price decision.
- [ ] Final name for website offer.
- [ ] Generated hero topology visual.
- [ ] Generated systems architecture visual.
- [ ] Generated automation workflow visual.
- [ ] Generated monitoring/continuity visual.
- [ ] Generated standard deployment preview visual.
- [ ] Generated decision map artifact visual.
- [ ] Decision on `/offre`: hidden ad funnel, redesign, or retire.
- [ ] Decision on whether to keep public `1 249 CHF`.
- [ ] Decision on whether to update FR only first or all locales at once.

### Product-Code To Do

- [ ] Compress homepage sections.
- [ ] Replace hero explanatory card stack with topology visual.
- [ ] Add memorable philosophy section.
- [ ] Build process diagram.
- [ ] Add Systems & operations dark visual section.
- [ ] Rename and reframe `Site standardisé`.
- [ ] Reduce homepage FAQ/CTA repetition.
- [ ] Compress pricing page.
- [ ] Remove low-aura implementation wording.
- [ ] Align contact page tone.
- [ ] Align services page tone.
- [x] Align custom systems page tone and price.
- [x] Add quick-start custom tier funnel for `2 000 / 2 200 / 4 500 / 8 000+`.
- [ ] Calm choose-template/onboarding UI.
- [ ] Handle `/offre` conflict.
- [ ] Sync EN/DE/IT pages.
- [ ] Clean stale tenant copy/config if no longer used.
- [ ] Verify build and checks.

## Current Maxxing Score

Positioning:

- Current: 7.5/10
- Potential: 9/10

Visual authority:

- Current: 5.5/10
- Potential: 8.5/10

Information density:

- Current: too high
- Target: 35-45 percent less visible explanation

Proof:

- Current: mostly claims and CSS diagrams
- Target: proof artifacts, architecture visuals, operational diagrams

Brand coherence:

- Current: strong in French homepage, weaker across pricing/funnels/locales
- Target: one coherent technical consulting identity

## Implementation Principle

Do not rebuild the brand.

Refine it:

- less explanation
- more visual confidence
- clearer hierarchy
- stronger systems proof
- cleaner separation between consulting and 999 CHF deployment

The goal is not to make IOPartner louder. The goal is to make it quieter and more convincing.

## Implementation Pass Locked Decisions

Date: 2026-05-13
Stage: Implementation requested.

Locked decisions from user:

- Rollout: French public pages first.
- Diagnostic entry price: `60 CHF / 15 min` everywhere.
- Website offer label: `Déploiement standard`.
- `/iopartner/offre`: redesign as a calm standard-deployment landing page, with no countdown, scarcity framing or Facebook-pixel block.
- Visual target: homepage closer to reference image #2, pricing closer to reference images #1 and #3.

Expected future asset names:

- `src/assets/iopartner/visuals/hero-topology.png`
- `src/assets/iopartner/visuals/pricing-layer-diagram.png`
- `src/assets/iopartner/visuals/systems-architecture.png`
- `src/assets/iopartner/visuals/standard-deployment-preview.png`
- `src/assets/iopartner/visuals/decision-map-artifact.png`
- Optional: `src/assets/iopartner/visuals/automation-workflow.png`
- Optional: `src/assets/iopartner/visuals/continuity-monitoring.png`

Implementation note:

- Until the final generated PNGs exist, use coded SVG/CSS proof-object placeholders with the same visual slots. These placeholders should keep the Swiss blueprint / operational architecture direction and be easy to replace with image imports later.

Implementation checklist status:

- [x] Direction locked.
- [x] Asset names specified.
- [x] Coded visual placeholders added.
- [x] French homepage compressed.
- [x] French pricing page rebuilt.
- [x] French services/contact/custom-systems aligned.
- [x] `/iopartner/offre` redesigned calmly.
- [x] Choose-template/onboarding reframed and route-fixed.
- [x] `60 CHF / 15 min` standardized.
- [x] Checks and build run.

Verification status:

- `npm run build` passes.
- `npm run check:astro` was run and is blocked by existing repo-wide type issues outside this pass, including shared config/widget/backend routes and navigation type mismatches.
- `npm run check:eslint` was run and is blocked by existing repo-wide lint issues, including files under `.claude/worktrees`.
- `npm run check:prettier` was run and is blocked by existing repo-wide formatting and parser issues outside this pass.
- Targeted ESLint and Prettier checks pass for the IOPartner files changed in this implementation pass.

## Systems & Operations Page Rebuild Plan

Date: 2026-05-15
Stage: planned, not implemented in this cleanup pass.

Problem:

- `/systems-operations` currently feels like an artifact demo/page graph instead of a public service page.
- It uses a dark full-page treatment while the current IOPartner direction is mostly light, calm, Swiss blueprint style.
- The page needs to explain what systems & operations actually covers, when it is useful, how it is scoped, and what a buyer receives.

Target:

- Rebuild `/systems-operations` as a light-mode public service page.
- Keep one strong architecture visual, but make the page useful without depending on the visual.
- Use the page as the premium technical layer for IOPartner, not a pricing table and not a generic agency service page.

Recommended structure:

1. Hero
   - Title: `Systems & operations pour PME`
   - Short copy: infrastructure, backend, automatisation, monitoring, continuité.
   - CTA: `Demander un cadrage systems`
   - Secondary CTA: `Voir les tarifs`
   - Visual: native architecture diagram using the 02/09/12 icon language.

2. When It Applies
   - Cards for: infrastructure propre, workflow métier, outil interne, migration open-source, continuité technique.
   - Each card gets a real node icon from `IoNodeIcon`.
   - No dark dashboard aesthetic; use light cards with blue technical accents.

3. Scope Explorer
   - Keep the current useful scenario logic, but integrate it into the IOPartner layout and light-mode CSS.
   - Show indicative ranges only as order-of-magnitude, not as productized packages.

4. Deliverables
   - Architecture map.
   - Implementation plan.
   - Server/DNS/SSL/deployment setup when relevant.
   - Monitoring/backups/runbook when relevant.
   - Handoff/passation.

5. Process
   - Use the shared `IoProcessMap` with icons:
     - Diagnostic
     - Périmètre
     - Build
     - Continuité

6. Boundaries
   - Explicitly say what is not included by default: enterprise SLA, 24/7 on-call, large custom software build without separate scope.
   - This keeps trust and avoids over-selling.

7. CTA
   - Route to `/contact?type=systems#form`.
   - Mention `60 CHF / 15 min` for initial technical cadrage.

Implementation checklist:

- [ ] Convert `/systems-operations` from standalone demo HTML into `PageLayout.astro`.
- [ ] Switch from dark global page CSS to the current IOPartner light blueprint background.
- [ ] Reuse `IoNodeIcon`, `IoProcessMap`, and the native systems topology visual.
- [ ] Keep scenario interactivity only if it stays clean and accessible.
- [ ] Remove demo controls like Dark/Light buttons from the public page.
- [ ] Verify header/footer render normally on the page.
- [ ] Verify mobile layout and build.
