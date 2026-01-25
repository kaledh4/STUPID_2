# Study Path: Building "Neon Splash"

**User:** Unity Developer (2D/WebGL background).
**Goal:** Build a 4v4 3D Networked Shooter with Procedural Generation in 8 Weeks.
**Focus:** High Velocity. Only learn what is needed.

---

## Week 1: The Transition to 3D & Mirror Basics
**Objective:** A moving capsule that sees other moving capsules over the network.
*   **Concept 1: The Character Controller.**
    *   *Resource:* Unity Starter Assets (Third Person) OR "Kinematic Character Controller".
    *   *Task:* Get a character moving in a blank 3D scene.
*   **Concept 2: Mirror Networking Hello World.**
    *   *Resource:* [Dapper Dino Mirror Tutorials](https://www.youtube.com/playlist?list=PLQb5vSH2QO7WZn6yH-zLq6qJqH3s-pS9_).
    *   *Task:* Import Mirror. Add `NetworkIdentity` and `NetworkTransform` to your Player.
    *   *Deliverable:* Build .exe. Run 2 copies. See movement sync.

## Week 2: The "Wetness" Mechanic (SyncVar & Shooting)
**Objective:** Shooting a beam that updates a variable on the enemy.
*   **Concept 1: Raycasting & Beams.**
    *   *Task:* Create a script that fires a Raycast from the camera center.
    *   *Visuals:* Use a `LineRenderer` for the beam. Don't worry about pretty shaders yet.
*   **Concept 2: State Synchronization.**
    *   *Task:* Creates `[SyncVar] float wetness;`.
    *   *Logic:* When Hitler (Client) -> CmdHit(Enemy) -> Server increases Enemy.wetness -> Syncs to all Clients.
    *   *Deliverable:* Shoot a player, see a debug UI text change "Wetness: 50%".

## Week 3: Procedural Map Logic (The Chunks)
**Objective:** Generate a random map based on a seed number.
*   **Concept 1: Prefab Management.**
    *   *Task:* Build 3 basic "Chunks" (10x10m floor with different blocks). Make them into Prefabs.
*   **Concept 2: Seeded Randomness.**
    *   *Code:* `Random.InitState(seed);`
    *   *Task:* Write a loop that instantiates 10 chunks in a row.
    *   *Networking:* Ensure Server generates the map and tells Clients *which* chunks to spawn (or syncs the seed).
    *   *Deliverable:* Enter "123" in UI -> Map A loads. Enter "999" -> Map B loads.

## Week 4: The Visual Juice (Shaders & Colors)
**Objective:** Implement the "Neon/Vaporwave" aesthetic.
*   **Concept 1: Shader Graph.**
    *   *Resource:* [Brackeys Shader Graph Intro](https://www.youtube.com/watch?v=Ar9eIn4z6XE).
    *   *Task:* Create a "Neon" material. Expose "Emission Color" as a property.
*   **Concept 2: Global Material Properties.**
    *   *Task:* Write a script that takes the Map Seed -> Converts to HSV Color -> Sets `Shader.SetGlobalColor("_TeamColor", color)`.
    *   *Deliverable:* The entire map changes color theme based on the seed.

## Week 5: The Weapon FX (Client-Side Prediction)
**Objective:** Make the gun feel "Good" (Hiding latency).
*   **Concept: Dummy Projectiles.**
    *   *Problem:* Waiting for the server to say "You shot" feels laggy.
    *   *Solution:* When you click Fire, *immediately* play the beam animation and sound locally. Then tell the server.
    *   *Task:* Polish the Water Beam. Add a scrolling texture to the LineRenderer so it implies "flow". Add a splash particle on impact.

## Week 6: The Game Loop (Lobby & Rules)
**Objective:** Win/Loss conditions.
*   **Concept: GameManager (Server Only).**
    *   *Task:* Track scores. Team A vs Team B.
    *   *Logic:* `if (wetness >= 100) FreezePlayer(); AddScore();`
    *   *Task:* Add a Timer. Reset map when game ends.
    *   *Deliverable:* A full match loop.

## Week 7: Art Integration (Synty Assets)
**Objective:** Stop using capsules/cubes.
*   **Task:** Import Synty (or similar) Low Poly assets.
*   **Task:** Replace Chunks with nice Pool models.
*   **Task:** Replace Player with a Diver character. Sync animations (Idle, Run, Shoot) using `NetworkAnimator`.

## Week 8: Polish & Steam Integration
**Objective:** Get it ready for friends.
*   **Task:** FizzySteamworks integration (Invite friends via Steam).
*   **Task:** Sound Design (Splash, beam hum, soundtrack).
*   **Deliverable:** A shipped prototype ready for the Steam Store page trailer.
