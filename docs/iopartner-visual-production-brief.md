# IOPartner Visual Production Brief

Date: 2026-05-15
Stage: visual naming and production brief only. Do not generate or wire these visuals in this pass.

## Immediate Product Naming Direction

The current labels are clear internally, but the public navigation can sound more Swiss SME and less generic.

Recommended public labels:

- `Cadrage technique` instead of `Consulting technique`
- `Systèmes & opérations` instead of `Systems & operations` where French copy needs to feel less English
- `Présence web cadrée` instead of `Déploiement standard`

Recommended routes:

- `/cadrage-technique`
- `/systems-operations`
- `/presence-web-cadree`

Internal wording:

- Keep `consulting technique` as secondary/SEO language where useful.
- Keep `déploiement standard` as a delivery mode, not as the main public offer name.
- Keep `standard` out of the primary nav when possible. It can sound template/cheap next to premium consulting.

## Offer Architecture To Reflect Visually

The public offer ladder should become:

1. `Cadrage technique`
   - `60 CHF / 15 min`
   - Then `140 CHF / h` if more work is needed.
   - Purpose: decide, unblock, review, scope.

2. `Systèmes & opérations`
   - `Sur devis`
   - Purpose: reduce operational chaos, clarify infrastructure, workflows, internal tools, continuity.
   - Needs its own page and workflow, not just a pretty architecture graph.

3. `Présence web cadrée`
   - `Pack Essentiel` from `999 CHF`
   - `Pack Public` around `1 500 CHF` for public-codebase delivery.
   - `Build privé` from `2 200 CHF` for custom website with private codebase, deployment and light handoff.
   - The `Modèles` page should become part of this workflow, not a separate marketplace-feeling page.

Pricing-card rule:

- The three pricing cards for Cadrage / Systèmes / Présence web should not contain large decorative icons.
- Use typography, price hierarchy and compact lists there.
- Use visuals around the page, not inside every price card.

## Global Visual Rules

Use:

- light Swiss blueprint surfaces,
- operational diagrams,
- topology fragments,
- service maps,
- thin route lines,
- restrained blue accents,
- plenty of whitespace.

Avoid:

- people,
- laptops,
- stock office photos,
- robot/AI-brain imagery,
- cyberpunk dashboards,
- tool-logo walls,
- giant fake SaaS metrics,
- excessive icons inside commercial cards.

Text rule:

- Avoid baking important text into raster visuals.
- Prefer labels rendered in Astro/HTML so copy can be changed later.
- If a visual needs labels, keep them short and non-salesy.

## Visuals To Create

### 1. Cadrage Technique Page

Route:

- `/cadrage-technique`

Component targets:

- `src/components/iopartner/visuals/IoCadrageDecisionArtifact.astro`
- `src/components/iopartner/visuals/IoCadrageScopeMatrix.astro`
- `src/components/iopartner/visuals/IoCadrageSessionFlow.astro`

Optional exported assets:

- `src/assets/iopartner/visuals/cadrage-decision-artifact.svg`
- `src/assets/iopartner/visuals/cadrage-scope-matrix.svg`
- `src/assets/iopartner/visuals/cadrage-session-flow.svg`

Visual brief:

- Show a technical decision artifact, not a meeting or consultant portrait.
- Represent uncertainty becoming a clear scope.
- Use branches such as `standard`, `systems`, `pause`, `build later`, but render final copy in HTML where possible.
- The emotional message is: `we help you avoid the wrong project`.

Page slots:

- Hero right-side visual: `IoCadrageDecisionArtifact`
- Mid-page proof visual: `IoCadrageScopeMatrix`
- Booking/workflow section: `IoCadrageSessionFlow`

### 2. Systèmes & Opérations Page

Route:

- `/systems-operations`

Component targets:

- `src/components/iopartner/visuals/IoSystemsChaosMap.astro`
- `src/components/iopartner/visuals/IoSystemsOperationalClarityMap.astro`
- `src/components/iopartner/visuals/IoSystemsBeforeAfterFlow.astro`
- `src/components/iopartner/visuals/IoSystemsDomainMap.astro`
- `src/components/iopartner/visuals/IoSystemsConsultationWorkflow.astro`

Optional exported assets:

- `src/assets/iopartner/visuals/systems-chaos-map.svg`
- `src/assets/iopartner/visuals/systems-operational-clarity-map.svg`
- `src/assets/iopartner/visuals/systems-before-after-flow.svg`
- `src/assets/iopartner/visuals/systems-domain-map.svg`
- `src/assets/iopartner/visuals/systems-consultation-workflow.svg`

Core emotional target:

The visitor should think:

> These people reduce operational chaos.

The page must not feel like a feature list, tool list or technical buzzword collection.

Problem-recognition ideas to visualize:

- systems that grew without structure,
- too many disconnected tools,
- nobody knows where things live anymore,
- onboarding depends on oral explanations,
- operations rely on one person,
- the stack works, but nobody trusts it.

Business-pain translation:

- continuity,
- clarity,
- maintainability,
- visibility,
- onboarding,
- reliability,
- operational sanity.

Visual concepts:

`IoSystemsChaosMap`

- A light blueprint map showing fragmented systems and unclear ownership.
- Nodes should look disconnected or partially routed, but still elegant.
- Do not make it look broken or amateur. It should show recognizable operational mess.

`IoSystemsOperationalClarityMap`

- The after-state.
- Same kind of nodes, now routed through clear structure: access, documentation, deployment, monitoring, backups, workflows.
- This becomes the main hero or first major visual.

`IoSystemsBeforeAfterFlow`

- Two-column transformation:
  - before: shared passwords, fragmented SaaS, undocumented systems, random manual processes.
  - after: centralized access, documented workflows, visible infrastructure, maintainable systems.
- Keep copy in HTML; visual shows flow and consolidation.

`IoSystemsDomainMap`

- Four operational domains:
  - operational structure,
  - infrastructure,
  - internal systems,
  - simplification.
- This should be a calm service map, not a cloud vendor architecture diagram.

`IoSystemsConsultationWorkflow`

- Low-pressure workflow:
  - current setup,
  - problem review,
  - scope,
  - implementation,
  - continuity.
- CTA should feel like technical clarity, not sales funnel.

Page slots:

- Hero visual: `IoSystemsOperationalClarityMap`
- Problem-recognition section: `IoSystemsChaosMap`
- Before/after section: `IoSystemsBeforeAfterFlow`
- Domains section: `IoSystemsDomainMap`
- CTA/workflow section: `IoSystemsConsultationWorkflow`

### 3. Présence Web Cadrée Page

Route:

- `/presence-web-cadree`

Component targets:

- `src/components/iopartner/visuals/IoPresenceOfferLadder.astro`
- `src/components/iopartner/visuals/IoPresenceModelSelection.astro`
- `src/components/iopartner/visuals/IoPresencePublicPrivateCodebase.astro`
- `src/components/iopartner/visuals/IoPresenceDeliveryWorkflow.astro`
- `src/components/iopartner/visuals/IoPresencePreviewStack.astro`

Optional exported assets:

- `src/assets/iopartner/visuals/presence-offer-ladder.svg`
- `src/assets/iopartner/visuals/presence-model-selection.svg`
- `src/assets/iopartner/visuals/presence-public-private-codebase.svg`
- `src/assets/iopartner/visuals/presence-delivery-workflow.svg`
- `src/assets/iopartner/visuals/presence-preview-stack.svg`

Visual brief:

- This page should not feel like a cheap template marketplace.
- It should feel like a controlled web-presence workflow.
- The model selection step should be integrated into the delivery path.

Offer ladder to visualize:

- `999 CHF`: Pack Essentiel, fast site, constrained scope.
- `1 500 CHF`: public-codebase option.
- `2 200 CHF+`: private codebase, custom site, deployment, light handoff.

Visual concepts:

`IoPresenceOfferLadder`

- A calm three-tier ladder with scope increasing left to right.
- No oversized price cards.
- Use one technical line through all three offers to show continuity.

`IoPresenceModelSelection`

- Replaces standalone marketplace energy.
- Show choosing a base as a controlled deployment step.
- Avoid colorful template thumbnails. Use minimal layout frames.

`IoPresencePublicPrivateCodebase`

- Explain the difference between public-codebase delivery and private-codebase custom delivery.
- Show source, deploy, handoff, maintenance boundaries.

`IoPresenceDeliveryWorkflow`

- Workflow:
  - choose base / define need,
  - content,
  - deployment,
  - validation,
  - handoff.

`IoPresencePreviewStack`

- Browser/site preview stack.
- Serious, Swiss, restrained.
- No flashy website mockups.

Page slots:

- Hero visual: `IoPresencePreviewStack`
- Offer comparison: `IoPresenceOfferLadder`
- Model selection section: `IoPresenceModelSelection`
- Codebase explanation: `IoPresencePublicPrivateCodebase`
- Workflow section: `IoPresenceDeliveryWorkflow`

### 4. Pricing Page Support Visuals

Component targets:

- `src/components/iopartner/visuals/IoPricingScopeLadder.astro`
- `src/components/iopartner/visuals/IoPricingDecisionRouter.astro`

Optional exported assets:

- `src/assets/iopartner/visuals/pricing-scope-ladder.svg`
- `src/assets/iopartner/visuals/pricing-decision-router.svg`

Visual brief:

- Pricing should clarify scope, not decorate offers.
- Keep commercial cards icon-free.
- Use a separate visual to show:
  - simple web presence,
  - technical decision,
  - operational system.

### 5. Shared Background / Texture Visuals

Component targets:

- `src/components/iopartner/visuals/IoBackgroundTopologyFragments.astro`
- `src/components/iopartner/visuals/IoFooterTopologyTexture.astro`

Optional exported assets:

- `src/assets/iopartner/visuals/background-topology-fragments.svg`
- `src/assets/iopartner/visuals/footer-topology-texture.svg`

Visual brief:

- Very low-opacity blueprint/topology fragments.
- Should never compete with content.
- Use as section background texture only.

## Page Implementation Notes For Later

Header links should eventually become:

- `Cadrage technique` -> `/cadrage-technique`
- `Systèmes & opérations` -> `/systems-operations`
- `Présence web cadrée` -> `/presence-web-cadree`

The legacy routes can remain temporarily, but should not be the visible navigation target:

- `/pricing#pricing-options`
- `/pricing#standard-deployment`
- `/choose-template`

Recommended workflow integration:

- `/choose-template` should either redirect to `/presence-web-cadree#modeles` or become a subsection experience inside that page.
- `/pricing` should remain a concise decision page, not the operational home for every service.
- Each of the three offers needs a real action path:
  - Cadrage: book or submit context for a 15-minute review.
  - Systems: choose a scenario and request a systems cadrage.
  - Présence web: choose offer level, then choose model/base, then onboarding.

## Open Decisions

- Final public label: `Cadrage technique` vs `Arbitrage technique`.
- Final public label: `Présence web cadrée` vs `Site vitrine cadré`.
- Whether `/choose-template` becomes a redirect or remains as a filtered subpage.
- Whether `1 500 CHF` public-codebase option should be shown on pricing immediately or introduced only inside `/presence-web-cadree`.
