# IOPartner Asset Manifest

Date: 2026-05-13
Stage: Asset planning. No product code has been changed.

## Destination

All web visuals should go here:

```text
src/assets/iopartner/visuals/
```

Recommended structure if the folder grows:

```text
src/assets/iopartner/visuals/hero/
src/assets/iopartner/visuals/systems/
src/assets/iopartner/visuals/process/
src/assets/iopartner/visuals/consulting/
src/assets/iopartner/visuals/deployment/
src/assets/iopartner/visuals/ops/
src/assets/iopartner/visuals/icons/
src/assets/iopartner/visuals/nodes/
src/assets/iopartner/visuals/fragments/
src/assets/iopartner/visuals/backgrounds/
src/assets/iopartner/visuals/print/
```

For the first implementation pass, use the flat folder or a simple grouped folder. Do not over-engineer until the chosen assets are stable.

## Priority Decision

Do not generate or implement all assets at once.

The full list is useful, but the first redesign only needs 6-8 strong assets. Too many visuals will recreate the current problem: too much visible effort.

## Must-Have For V1

These are the assets needed to make the homepage and pricing page materially stronger.

- [ ] `hero_topology_primary.png`
- [ ] `systems_architecture_panel.png`
- [ ] `process_transport_map.png`
- [ ] `consulting_decision_map.png`
- [ ] `deployment_standard_preview.png`
- [ ] `ops_monitoring_dashboard.png`
- [ ] `bg_footer_topology.png`

If only five assets are generated first, use:

- [ ] `hero_topology_primary.png`
- [ ] `systems_architecture_panel.png`
- [ ] `process_transport_map.png`
- [ ] `consulting_decision_map.png`
- [ ] `deployment_standard_preview.png`

## Selection Variants

These are not all meant to ship. Generate variants only to choose the strongest one.

### Hero / Topology

Primary use:

- [ ] `hero_topology_primary.png`

Useful variants:

- [ ] `hero_topology_minimal.png`
- [ ] `hero_topology_dark.png`
- [ ] `hero_topology_light.png`
- [ ] `hero_topology_asymmetric.png`
- [ ] `hero_topology_gridless.png`

Implementation rule:

Use one hero image only. Keep the others as source variants or archive. Do not rotate them randomly.

Recommended winner criteria:

- Strong asymmetry.
- Works on dark and light page surroundings.
- No readable text baked into the image.
- Clear topology feeling at small sizes.
- Does not look like generic AI/cybersecurity art.

### Systems Visuals

Primary use:

- [ ] `systems_architecture_panel.png`

Possible alternates:

- [ ] `systems_architecture_dark.png`
- [ ] `systems_architecture_enterprise.png`
- [ ] `systems_backend_topology.png`
- [ ] `systems_infrastructure_map.png`
- [ ] `systems_operational_layers.png`
- [ ] `systems_monitoring_cluster.png`

Implementation rule:

Use one large dark systems visual on homepage. Use at most one extra smaller ops visual on pricing/custom systems.

Recommended winner criteria:

- Feels like architecture, not a SaaS dashboard.
- Has enough density to imply engineering.
- Still readable as a composition without text.
- Fits graphite/navy/cyan palette.

### Process / Flow

Primary use:

- [ ] `process_transport_map.png`

Possible alternates:

- [ ] `process_deployment_flow.png`
- [ ] `process_intervention_path.png`
- [ ] `process_delivery_pipeline.png`
- [ ] `process_scope_sequence.png`

Implementation rule:

This should probably become SVG/CSS in final form. PNG is acceptable for initial design exploration.

Recommended winner criteria:

- Swiss transport map energy.
- Very clean.
- Easy to understand in a 4-step process section.
- No fake labels baked in.

### Consulting Visuals

Primary use:

- [ ] `consulting_decision_map.png`

Possible alternates:

- [ ] `consulting_scope_artifact.png`
- [ ] `consulting_architecture_notes.png`
- [ ] `consulting_delivery_map.png`
- [ ] `consulting_system_layers.png`

Implementation rule:

Use one visual to make consulting tangible. This asset should support the "avoid the wrong project" philosophy section.

Recommended winner criteria:

- Feels like a decision artifact.
- Not too decorative.
- Shows boundaries, branches, or tradeoffs.

### Standard Deployment

Primary use:

- [ ] `deployment_standard_preview.png`

Possible alternates:

- [ ] `deployment_standard_wireframes.png`
- [ ] `deployment_standard_stack.png`
- [ ] `deployment_standard_layouts.png`
- [ ] `deployment_standard_browser.png`

Implementation rule:

Use one restrained deployment preview. Do not make this section look like a cheap template marketplace.

Recommended winner criteria:

- Serious, clean, Swiss layout feeling.
- No colorful agency mockups.
- No over-detailed browser chrome.

### Monitoring / Ops

Primary use:

- [ ] `ops_monitoring_dashboard.png`

Possible alternates:

- [ ] `ops_continuity_panel.png`
- [ ] `ops_uptime_visual.png`
- [ ] `ops_incident_map.png`
- [ ] `ops_service_health.png`

Implementation rule:

Useful for pricing, custom systems, or continuity/support proof. Do not overuse on homepage unless the systems section needs a second proof object.

## Icons

These should become SVG eventually. PNG is okay only as temporary exploration.

### Entry Icons

- [ ] `icon_consulting_technique.png`
- [ ] `icon_systems_operations.png`
- [ ] `icon_deploiement_standard.png`
- [ ] `icon_continuite_technique.png`

Final target:

- `icon_consulting_technique.svg`
- `icon_systems_operations.svg`
- `icon_deploiement_standard.svg`
- `icon_continuite_technique.svg`

Use:

- Entry point cards.
- Services page capability list.

Style:

- Monoline.
- Blueprint/technical.
- No filled colorful SaaS icons.

### Process Icons

- [ ] `icon_cadrage.png`
- [ ] `icon_deploiement.png`
- [ ] `icon_mise_en_ligne.png`
- [ ] `icon_suivi.png`

Final target:

- SVG.

Use:

- Method/process diagram if the process map needs icon markers.

### Small Trust Icons

- [ ] `icon_facturation_suisse.png`
- [ ] `icon_paiement_securise.png`
- [ ] `icon_livraison_rapide.png`

Final target:

- SVG or simple CSS/iconify icons.

Use:

- Pricing/funnel pages only.
- Avoid homepage unless needed for conversion.

## Infrastructure Nodes

These are useful only if we build a reusable visual system.

- [ ] `node_dns.png`
- [ ] `node_api.png`
- [ ] `node_backup.png`
- [ ] `node_monitoring.png`
- [ ] `node_crm.png`
- [ ] `node_vps.png`
- [ ] `node_automation.png`
- [ ] `node_website.png`

Recommendation:

Do not generate these as PNG unless they will be reused in many places. Better final format is SVG symbols or CSS cards.

Potential use:

- Systems architecture diagram.
- Topology fragments.
- Custom systems page.

## Topology Fragments

These are important for visual consistency, but not all are needed in V1.

- [ ] `topology_fragment_corner.png`
- [ ] `topology_fragment_vertical.png`
- [ ] `topology_fragment_horizontal.png`
- [ ] `topology_fragment_cluster.png`
- [ ] `topology_fragment_nodes.png`
- [ ] `topology_fragment_grid.png`
- [ ] `topology_fragment_routes.png`

Implementation use:

- Section backgrounds.
- Transition blocks.
- Footer.
- Empty-state textures.

Recommendation:

Make these as SVG or CSS where possible. PNG fragments can create scaling/artifact problems.

Most useful first:

- [ ] `topology_fragment_cluster.png`
- [ ] `topology_fragment_routes.png`
- [ ] `topology_fragment_corner.png`

## Backgrounds / Textures

- [ ] `bg_grid_subtle.png`
- [ ] `bg_blueprint_texture.png`
- [ ] `bg_graphite_gradient.png`
- [ ] `bg_dark_topology_texture.png`
- [ ] `bg_footer_topology.png`

V1 priority:

- [ ] `bg_footer_topology.png`
- [ ] `bg_dark_topology_texture.png`

Implementation rule:

Keep opacity low. These are background texture, not hero visuals.

Preferred final approach:

- CSS gradients and SVG masks instead of large raster files, unless the raster is visually superior.

## Brochure / Print

These are not needed for website implementation.

- [ ] `flyer_front_v1.png`
- [ ] `flyer_back_v1.png`
- [ ] `brochure_spread_dark.png`
- [ ] `brochure_spread_light.png`
- [ ] `print_architecture_layout.png`

Use later for:

- PDF offer sheet.
- One-page consulting flyer.
- Local Swiss SME outreach.
- Print/download section.

Do not block the website redesign on these.

## Generation Rules

All image generations should follow these constraints:

- No people.
- No stock office.
- No smiling teams.
- No handshakes.
- No generic laptops unless explicitly requested for a deployment/browser preview.
- No AI robot, brain, neural-glow cliche.
- No cyberpunk.
- No purple SaaS gradients.
- No readable text baked into the image.
- No fake client logos.
- No "IOPartner" text inside image unless explicitly requested.
- High whitespace.
- Restrained graphite/navy/steel-blue palette.
- Swiss architectural/engineering feel.

## Suggested Generation Order

1. Generate hero variants.
2. Select one hero winner.
3. Generate systems architecture variants.
4. Select one systems winner.
5. Generate process and consulting visuals.
6. Generate standard deployment preview.
7. Generate ops/monitoring.
8. Only then generate icons/fragments/textures if the layout needs them.

## Implementation Mapping

### Homepage

- Hero: `hero_topology_primary.png`
- Entry points: SVG icons or temporary entry icons.
- Philosophy/proof: `consulting_decision_map.png`
- Method: `process_transport_map.png`
- Systems section: `systems_architecture_panel.png`
- Standard deployment: `deployment_standard_preview.png`
- Footer/CTA: `bg_footer_topology.png`

### Pricing

- Pricing matrix: no raster needed.
- Systems tier: `systems_architecture_panel.png` or `ops_monitoring_dashboard.png`
- Deployment tier: `deployment_standard_preview.png`
- Trust row: SVG trust icons.

### Services

- Consulting: `consulting_decision_map.png`
- Systems: `systems_architecture_panel.png`
- Process: `process_transport_map.png`

### Custom Systems

- Main visual: `systems_backend_topology.png` or `systems_operational_layers.png`
- Optional support visual: `ops_service_health.png`

### Contact

- Prefer no major image.
- Use subtle background fragment only.

### Choose Template / Onboarding

- Use `deployment_standard_wireframes.png` or `deployment_standard_browser.png` only if the page needs a visual anchor.
- Avoid making the flow look like a marketplace.

## Current Status

Assets supplied as names only:

- [x] Full filename inventory received.
- [x] Prioritized for V1.
- [x] Mapped to implementation locations.
- [x] Flagged SVG candidates.
- [x] Flagged optional/variant assets.

Assets still missing:

- [ ] Actual image files in `src/assets/iopartner/visuals/`.
- [ ] Final selected hero image.
- [ ] Final selected systems visual.
- [ ] Final selected deployment preview.
- [ ] Final selected consulting/process visuals.
