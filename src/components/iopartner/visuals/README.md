# IOPartner Astro Visuals

Live conversions:

- `Io01PremiumGridBlueprintArcs.astro`: alias for the live homepage hero topology.
- `IoHeroTopology.astro`: Astro-native `01_premium_grid_blueprint_arcs` counterpart expanded to the full IOPartner hero topology: DNS, CRM, VPS, Automations, Website, Monitoring, Backup, and API.
- `Io02SvgLinesPathsCurves.astro`: alias for the live systems topology.
- `IoSystemsTopology.astro`: Astro-native port of `src/assets/iopartner/svgs/02_svg_lines_paths_curves`, with static SVG paths instead of client-side route generation.

Astro counterparts present but not wired:

- `Io03NodeCardsIconChips.astro`
- `Io04DecisionEntryMap.astro`
- `Io05ConsultingScopeArtifact.astro`
- `Io06DeploymentStandardPreview.astro`
- `Io07PricingOfferLayers.astro`
- `Io08ProcessDeliveryPipeline.astro`
- `Io09OpsServiceHealth.astro`
- `Io10ExtensionsModuleStack.astro`
- `Io11TrustIconSet.astro`
- `Io12NodeIconLibrary.astro`
- `Io13BackgroundTopologyFragments.astro`
- `Io14IopartnerVisualKit.astro`

The `03` through `14` counterparts wrap the existing source HTML/CSS/JS as isolated frames so they can be reviewed or mounted without leaking lesson CSS into production pages. Convert them to fully native markup one by one when each visual gets a concrete production placement.
