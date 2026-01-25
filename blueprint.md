# Blueprint: NEON SPLASH (4v4 Procedural Water Warfare)

## 1. Core Concept
**Genre:** 4v4 Procedural Arena Shooter.
**Aesthetic:** Vaporwave / Neon Pool Party.
**Main Mechanic:** Shoot enemies to increase their **Wetness**. At 100% Wetness, they **Freeze**. No death.
**Visuals:** High-contrast Neon LEDs + Water aesthetics. Seed-based colors.

## 2. The Loop
`Lobby (Vote on Seed)` -> `Map Generation` -> `Team Deathmatch (First to 50 Freezes)` -> `Victory Splash Screen`

## 3. Gameplay Mechanics

### A. The Wetness System (Health Replacement)
*   **Meter:** 0% (Dry) to 100% (Soaked).
*   **Getting Hit:** Hitscan Water Beam adds +15% Wetness per second of sustained contact.
*   **Drying Off:**
    *   Passive: -5% per second when not hit for 3 seconds.
    *   Towel Station (Base): Instantly resets to 0%.
*   **Freeze State (100%):**
    *   Player model turns into an Ice Sculpture (or bright blue static mesh).
    *   Cannot move or shoot for **4 seconds**.
    *   Counts as a "Point" for the enemy team.
    *   Teammates can shoot "Warm Air" (secondary fire) to unfreeze faster.

### B. Shooting Mechanics (The "No Lag" Solution)
*   **Weapon:** High-Pressure Water Gun.
*   **Tech:** **Client-Side Visual Beam + Server-Side Raycast.**
    *   *Visual:* A cylinder mesh with a scrolling water texture connects Gun to Aim Point instantly.
    *   *Logic:* Mirror performs a Raycast. If it hits an enemy, `CmdHitEnemy()` is called.
    *   *Feel:* Instant, snappy, "Ghostbusters proton pack" feel. No slow projectiles.

### C. Procedural Map System
The map is a linear "Lane" composed of **10 Chunks**.
*   **Structure:** `[Team A Base] - [Chunk 1] - [Chunk 2] ... [Chunk 8] - [Team B Base]`
*   **Chunk Prefabs (10x10m):**
    *   *The Lazy River:* Curved path with water cover.
    *   *The Cabana:* Verticality, roof jumping.
    *   *The Slide:* Slippery slope boosting speed.
    *   *The Deep End:* Open area, risky.
*   **Symmetry Mode:** To ensure competitive fairness, the seed Mirrors the chunks. `Chunk 1` is same prefab as `Chunk 8`.

### D. The Seeded Color System
Every match has a generated color palette based on the `MapSeed`.
*   **Algorithm:**
    *   `PrimaryColor` (LEDs) = HSV(Seed % 360, 100, 100).
    *   `SecondaryColor` (Water) = Complementary of Primary.
    *   `FogColor` = Desaturated Secondary.
*   **Result:** Infinite visual variety. "Gold & Purple", "Cyberpunk Pink & Blue", "Toxic Green & Orange".

---

## 4. Technical Architecture (Mirror)

### Player Setup
*   `NetworkTransform`: Sync position/rotation.
*   `PlayerStats (SyncVar)`: `currentWetness` (float). Hook updates UI and Material Glossiness.
*   `WeaponController`: Handles Raycasting and Beam VFX.

### The "Faux-Projectile" Beam
Do NOT spawn 1000 water particles.
1.  **On Fire:** Enable LineRenderer or CylinderMesh.
2.  **Texture:** Scroll noise texture along UVs to simulate flowing water.
3.  **Impact:** Spawn localized particle splash at raycast hit point.

### Procedural Generation
*   **Server-Side:**
    *   Take `int seed`.
    *   Random.InitState(seed).
    *   Instantiate Chunk Prefabs in a line.
    *   Sync `seed` to all Clients via `NetworkRoomManager`.
*   **Client-Side:**
    *   Receive `seed`.
    *   Apply Color Algorithm to global Shader variables (`Shader.SetGlobalColor`).

---

## 5. Asset Requirements

### 3D Models (Synty / Low Poly)
*   **Characters:** 4 Variations (Diver, Lifeguard, Swimmer, Duck-Floatie).
*   **Weapons:** Pistol, Super Soaker, Sniper (Pressure Washer).
*   **Environment:** Pool tiles, palm trees, neon tubes, plastic chairs.

### Audio
*   **SFX:** High-pitch squirt, heavy splash, "crack" (freeze), "hairdryer" (unfreeze).
*   **Music:** Energetic Synthwave / Vaporwave loop.

---

## 6. Six-Month Roadmap (Solo Dev)

### Month 1: Core Systems (The Toy)
*   **Week 1-2:** Mirror Setup, Player Controller, "Wetness" Sync.
*   **Week 3-4:** The Gun. Visual Beam Shader. Raycast hit detection. Freeze State.
*   **Result:** Graybox where 2 players can freeze each other.

### Month 2: The Generator (The Tech)
*   **Week 1-2:** Build 4 Chunk Prefabs. Write `MapGenerator.cs`.
*   **Week 3-4:** Implement "Seeded Color" script. Integrate UI to show Seed.
*   **Result:** Playable matches on random maps with crazy colors.

### Month 3: Art & Vibe (The Look)
*   **Week 1-4:** Import Synty assets. Create the "Neon Pool" Master Shader. Sound Design integration.
*   **Result:** The game looks distinct and "Steam-ready".

### Month 4: Game Loop & UI
*   **Week 1-4:** Main Menu, Lobby, Scoreboard, Timer, Victory Screen. Towel Stations.

### Month 5: Content Expansion
*   **Week 1-4:** Create 6 more Chunk Types (Total 10). Add 2 more Gun Types. Unlockables system.

### Month 6: Polish & Launch
*   **Week 1-3:** Closed Beta testing. Balancing. Bug fixes.
*   **Week 4:** **LAUNCH.**
