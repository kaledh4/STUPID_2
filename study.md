# NEON SPLASH: Development Study Path

## Overview
- **Developer Background:** Unity Developer (2D/WebGL experience)
- **Project Goal:** Build a 4v4 3D Networked Shooter with Procedural Generation
- **Timeline:** 8-Week Development Sprint
- **Methodology:** High velocity learning, focused on essential skills

---

## Table of Contents
1. [Development Philosophy](#development-philosophy)
2. [Weekly Schedule](#weekly-schedule)
3. [Learning Resources](#learning-resources)
4. [Risk Management](#risk-management)
5. [Success Metrics](#success-metrics)

---

## Development Philosophy

### High-Velocity Learning
- Focus only on skills directly needed for project completion
- Build functional prototypes early and iterate quickly
- Prioritize working systems over perfect code
- Learn by implementing, not just studying

### Minimal Viable Learning
- Acquire just enough knowledge to implement required features
- Avoid over-engineering solutions
- Use established frameworks and tools when possible
- Focus on core mechanics before polish

---

## Weekly Schedule

### Week 1: 3D Fundamentals & Network Foundation
**Objective:** Establish basic 3D movement and network synchronization

#### Learning Goals
- Transition from 2D to 3D Unity development
- Understand Mirror networking basics
- Implement basic player movement

#### Key Concepts
1. **Character Controller Implementation**
   - Resource: Unity Starter Assets (Third Person) or Kinematic Character Controller
   - Task: Implement smooth 3D character movement with physics
   - Outcome: Player can move freely in 3D space

2. **Mirror Networking Foundation**
   - Resource: [Dapper Dino Mirror Tutorials](https://www.youtube.com/playlist?list=PLQb5vSH2QO7WZn6yH-zLq6qJqH3s-pS9_)
   - Task: Import Mirror, configure basic network objects
   - Implementation: Add `NetworkIdentity` and `NetworkTransform` to player
   - Deliverable: Two-player movement synchronization in standalone build

#### Success Criteria
- Standalone build with two players moving simultaneously
- Network synchronization working without major desync issues

---

### Week 2: Core Gameplay Mechanics
**Objective:** Implement the wetness system and shooting mechanics

#### Learning Goals
- Understand raycasting for hit detection
- Implement networked state synchronization
- Create basic weapon system

#### Key Concepts
1. **Raycasting & Visual Feedback**
   - Task: Create script for raycasting from camera center
   - Visuals: Implement `LineRenderer` for beam effect
   - Note: Focus on functionality over visual polish initially

2. **State Synchronization**
   - Task: Implement `[SyncVar] float wetness;` on player object
   - Logic: Client sends hit command → Server updates wetness → Syncs to all clients
   - Implementation: `CmdHit(Enemy)` increases enemy wetness value
   - Deliverable: Shooting one player updates their wetness percentage in UI

#### Success Criteria
- Players can shoot each other and see wetness values change
- Network synchronization maintains consistent state across clients

---

### Week 3: Procedural Generation
**Objective:** Create seed-based map generation system

#### Learning Goals
- Understand procedural generation principles
- Implement seeded randomness
- Create modular chunk system

#### Key Concepts
1. **Prefab Management**
   - Task: Design 3-4 basic chunk prefabs (10x10m areas with different layouts)
   - Design: Include cover, pathways, and elevation changes
   - Organization: Set up prefab workflow for easy instantiation

2. **Seeded Randomness Implementation**
   - Code: `Random.InitState(seed);` for reproducible results
   - Task: Write algorithm to instantiate 10 chunks in sequence
   - Networking: Server generates map, communicates chunk order to clients
   - Deliverable: Different seed inputs produce different map layouts

#### Success Criteria
- Entering seed "123" consistently produces the same map
- Entering seed "999" produces a different but consistent map
- Both server and clients display identical maps

---

### Week 4: Visual Polish & Aesthetics
**Objective:** Implement the neon/vaporwave visual style

#### Learning Goals
- Learn Shader Graph basics
- Implement dynamic color systems
- Create atmospheric effects

#### Key Concepts
1. **Shader Graph Implementation**
   - Resource: [Brackeys Shader Graph Intro](https://www.youtube.com/watch?v=Ar9eIn4z6XE)
   - Task: Create emissive neon materials
   - Parameter: Expose "Emission Color" for runtime adjustment

2. **Dynamic Color System**
   - Task: Script to convert map seed to HSV color values
   - Implementation: `Shader.SetGlobalColor("_TeamColor", color)` for global effects
   - Algorithm: Primary color from seed, complementary secondary, desaturated fog
   - Deliverable: Full map color theme changes based on seed

#### Success Criteria
- Map colors dynamically change based on seed value
- Visual style matches neon/vaporwave aesthetic
- Colors are vibrant and visually appealing

---

### Week 5: Advanced Networking & Responsiveness
**Objective:** Implement client-side prediction for responsive gameplay

#### Learning Goals
- Understand client-server architecture challenges
- Implement latency hiding techniques
- Optimize player experience

#### Key Concepts
1. **Client-Side Prediction**
   - Problem: Network latency makes actions feel unresponsive
   - Solution: Process actions locally immediately, then validate on server
   - Implementation: Play beam effects locally before server confirms hit
   - Benefit: Immediate feedback regardless of network conditions

2. **Weapon Effect Enhancement**
   - Task: Improve water beam visual quality
   - Enhancement: Add scrolling texture to LineRenderer for flow effect
   - Addition: Particle systems for impact splash effects
   - Result: More polished and satisfying shooting experience

#### Success Criteria
- Shooting feels responsive with minimal perceived latency
- Visual effects provide satisfying feedback
- Server validation prevents cheating while maintaining responsiveness

---

### Week 6: Game Loop & Rules
**Objective:** Implement complete match flow and scoring

#### Learning Goals
- Design game state management
- Implement win/loss conditions
- Create match flow structure

#### Key Concepts
1. **Game Manager Implementation**
   - Task: Create server-only GameManager object
   - Functionality: Track team scores, manage match state
   - Logic: `if (wetness >= 100) FreezePlayer(); AddScore();`
   - Integration: Connect to existing player systems

2. **Complete Match Flow**
   - Task: Add game timer and automatic map reset
   - Components: Score display, win condition checking, match restart
   - Delivery: Fully playable matches from start to finish
   - Deliverable: Complete game loop with win/loss states

#### Success Criteria
- Matches start, progress, and end automatically
- Teams can win by reaching target freeze count
- Game properly resets for new matches

---

### Week 7: Asset Integration
**Objective:** Replace placeholder assets with final art

#### Learning Goals
- Integrate purchased/created assets
- Implement animation networking
- Polish visual presentation

#### Key Concepts
1. **Art Asset Integration**
   - Task: Import Synty or similar low-poly assets
   - Implementation: Replace placeholder geometry with styled models
   - Areas: Player characters, environment, props, UI elements

2. **Animation System**
   - Task: Replace basic movement with animated characters
   - Networking: Use `NetworkAnimator` for synchronized animations
   - States: Idle, run, shoot, freeze animations
   - Deliverable: Professional-looking game with polished visuals

#### Success Criteria
- Game no longer uses placeholder cubes/capsules
- Character animations sync correctly across network
- Visual quality meets "Steam-ready" standards

---

### Week 8: Final Polish & Distribution
**Objective:** Prepare for release and distribution

#### Learning Goals
- Implement platform integration
- Add audio design
- Prepare for distribution

#### Key Concepts
1. **Platform Integration**
   - Task: Implement Steamworks integration (FizzySteamworks)
   - Features: Friend invites, achievements, cloud saves
   - Testing: Verify all integrations work properly

2. **Audio Design**
   - Task: Add sound effects (water sounds, freeze effects, UI)
   - Implementation: Spatial audio for immersion
   - Music: Vaporwave/synthwave soundtrack
   - Deliverable: Complete game ready for initial release

#### Success Criteria
- Game builds successfully for target platform
- All systems integrated and tested
- Ready for Steam store page and trailer

---

## Learning Resources

### Essential Tutorials
- [Mirror Networking Documentation](https://mirror-networking.com/docs/)
- [Unity Scripting Reference](https://docs.unity3d.com/ScriptReference/)
- [Shader Graph Manual](https://docs.unity3d.com/Packages/com.unity.shadergraph@latest)

### Recommended Channels
- Dapper Dino (Mirror Networking)
- Brackeys (General Unity concepts)
- Sebastian Lague (Game development theory)

### Asset Sources
- Unity Asset Store (Synty, Easy Water, etc.)
- Freepik (UI elements)
- OpenGameArt (Sound effects)

---

## Risk Management

### Technical Risks
- **Networking Complexity:** Mitigate by using Mirror framework and starting simple
- **Performance Issues:** Monitor frame rate and optimize early
- **Cross-Platform Compatibility:** Test builds regularly

### Schedule Risks
- **Scope Creep:** Stick to essential features only
- **Learning Curve:** Build buffer time for complex concepts
- **Asset Pipeline:** Plan for time to integrate purchased assets

### Quality Risks
- **Polish Deficiency:** Focus on core experience first
- **Bug Accumulation:** Test regularly and fix issues immediately
- **Balance Problems:** Plan for post-release adjustments

---

## Success Metrics

### Weekly Milestones
- Week 1: Networked movement demo
- Week 2: Shooting and wetness system
- Week 3: Procedural map generation
- Week 4: Dynamic color system
- Week 5: Responsive weapon system
- Week 6: Complete game loop
- Week 7: Polished visuals
- Week 8: Distributable build

### Final Deliverables
- Functional 4v4 multiplayer shooter
- Procedural map generation with seed system
- Wetness/freeze mechanic
- Neon/vaporwave aesthetic
- Steam-ready build

---

## Conclusion

This 8-week study path provides a structured approach to developing Neon Splash while learning essential skills. By focusing on high-velocity learning and minimal viable implementation, the project can be completed within the timeline while maintaining quality standards. Regular milestone achievement will ensure steady progress toward the final goal of a distributable game.
