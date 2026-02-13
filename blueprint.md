# NEON SPLASH: Game Design Document

## Overview
**Project:** NEON SPLASH  
**Genre:** 4v4 Procedural Arena Shooter  
**Aesthetic:** Vaporwave / Neon Pool Party  
**Core Mechanic:** Wetness System (Shoot enemies to freeze them)  
**Development Status:** Pre-production  

---

## Table of Contents
1. [Core Concept](#core-concept)
2. [Gameplay Loop](#gameplay-loop)
3. [Gameplay Mechanics](#gameplay-mechanics)
4. [Technical Architecture](#technical-architecture)
5. [Asset Requirements](#asset-requirements)
6. [Development Roadmap](#development-roadmap)

---

## Core Concept

### Vision Statement
Create a non-violent, competitive multiplayer shooter that emphasizes visual spectacle, fast-paced gameplay, and social interaction over traditional combat mechanics.

### Key Features
- **Wetness System:** Replace health with a "wetness" meter that freezes players at 100%
- **Procedural Maps:** Seed-based map generation for infinite replayability
- **Dynamic Color Palette:** Each match has unique colors based on the seed
- **Family-Friendly:** No violence, death, or gore - only fun and humor

### Unique Selling Points
- **Non-Toxic Competition:** Players are frozen rather than killed, reducing frustration
- **Visual Novelty:** Every match has different colors and aesthetics
- **Fast-Paced Gameplay:** Instant respawn and quick rounds
- **Social Elements:** Seed sharing and community building

---

## Gameplay Loop

### Match Flow
```
Lobby (Vote on Seed) → Map Generation → Team Deathmatch (First to 50 Freezes) → Victory Splash Screen
```

### Session Structure
1. **Lobby Phase:** Players join and vote on map seed
2. **Loading Phase:** Map generates based on selected seed
3. **Match Phase:** 4v4 team battle until one team reaches 50 freezes
4. **Results Phase:** Victory screen with stats and seed sharing option

---

## Gameplay Mechanics

### Wetness System (Health Replacement)
- **Meter Range:** 0% (Dry) to 100% (Soaked)
- **Damage Application:** Hitscan Water Beam adds +15% Wetness per second of sustained contact
- **Passive Drying:** -5% per second when not hit for 3 seconds
- **Active Drying:** Towel Stations at bases instantly reset to 0%
- **Freeze State:** At 100%, players become ice sculptures for 4 seconds
- **Team Support:** Allies can unfreeze teammates with "Warm Air" secondary fire

### Shooting Mechanics (No-Lag Solution)
- **Weapon Type:** High-Pressure Water Gun
- **Technology:** Client-Side Visual Beam + Server-Side Raycast
- **Visual Effect:** Cylinder mesh with scrolling water texture connecting gun to aim point
- **Hit Detection:** Server performs raycast; client plays immediate feedback
- **Feel:** Instant, snappy response similar to "Ghostbusters proton pack"

### Procedural Map System
- **Structure:** Linear "lane" composed of 10 chunks
- **Layout:** `[Team A Base] - [Chunk 1] - [Chunk 2] ... [Chunk 8] - [Team B Base]`
- **Chunk Types:**
  - *The Lazy River:* Curved path with water cover
  - *The Cabana:* Verticality with roof jumping opportunities
  - *The Slide:* Slippery slope that boosts movement speed
  - *The Deep End:* Open area with strategic risk/reward
- **Symmetry Mode:** Seeds mirror chunk placement for competitive fairness

### Seeded Color System
- **Algorithm:** Each match generates a unique color palette based on `MapSeed`
- **Primary Color:** HSV(Seed % 360, 100, 100) for LEDs and highlights
- **Secondary Color:** Complementary color for water effects
- **Fog Color:** Desaturated version of secondary color
- **Result:** Infinite visual variety with combinations like "Gold & Purple" or "Cyberpunk Pink & Blue"

---

## Technical Architecture

### Networking Framework
- **Library:** Mirror Networking for Unity
- **Architecture:** Client-server with authoritative server
- **Prediction:** Client-side prediction with server reconciliation

### Player Components
- **NetworkTransform:** Sync position and rotation
- **PlayerStats (SyncVar):** Track `currentWetness` and update UI/materials
- **WeaponController:** Handle raycasting and beam visual effects
- **Animation Controller:** Sync movement and shooting animations

### Visual Effects
- **Beam Rendering:** LineRenderer with scrolling water texture
- **Impact Effects:** Particle systems for water splashes
- **Freeze Effects:** Ice shader and animation for frozen players
- **UI Updates:** Real-time wetness meter and status indicators

### Procedural Generation
- **Server-Side Generation:**
  - Initialize random state with seed
  - Instantiate chunk prefabs in sequence
  - Sync seed to all clients via NetworkRoomManager
- **Client-Side Application:**
  - Receive seed and apply color algorithm
  - Set global shader properties (`Shader.SetGlobalColor`)

---

## Asset Requirements

### 3D Models (Low-Poly Style)
- **Characters:** 4 variations (Diver, Lifeguard, Swimmer, Duck Floatie)
- **Weapons:** Pistol, Super Soaker, Sniper (Pressure Washer)
- **Environment:** Pool tiles, palm trees, neon tubes, plastic furniture
- **Props:** Towel stations, floating platforms, decorative elements

### Audio Assets
- **Sound Effects:**
  - High-pitch water squirt
  - Heavy splash sounds
  - "Crack" sound for freezing
  - "Hair dryer" sound for unfreezing
- **Music:** Energetic Synthwave/Vaporwave tracks for background

### UI Elements
- **HUD:** Wetness meters, score display, timer
- **Menus:** Main menu, lobby, settings, victory screen
- **Icons:** Weapon selection, status indicators, navigation

---

## Development Roadmap

### Phase 1: Core Systems (Months 1-2)
- **Month 1: Foundation**
  - Week 1-2: Mirror setup, player controller, network synchronization
  - Week 3-4: Basic shooting mechanics, wetness system, freeze state
  - Deliverable: Graybox with 2 players freezing each other
- **Month 2: Procedural Generation**
  - Week 1-2: Build 4 chunk prefabs, implement map generator
  - Week 3-4: Seeded color system, UI integration
  - Deliverable: Playable matches on randomly generated maps

### Phase 2: Art & Polish (Months 3-4)
- **Month 3: Visual Polish**
  - Week 1-4: Import low-poly assets, create master shaders, integrate audio
  - Deliverable: Game looks visually distinct and "Steam-ready"
- **Month 4: Game Loop & UI**
  - Week 1-4: Main menu, lobby system, scoreboard, timer, towel stations
  - Deliverable: Complete match flow from lobby to victory

### Phase 3: Content & Launch (Months 5-6)
- **Month 5: Content Expansion**
  - Week 1-4: 6 additional chunk types (total 10), 2 more weapon types, unlockables
  - Deliverable: Rich content for extended gameplay
- **Month 6: Polish & Launch**
  - Week 1-3: Closed beta testing, balancing, bug fixes
  - Week 4: **Official Launch**
  - Deliverable: Public release on Steam

---
