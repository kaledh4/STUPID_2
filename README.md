# NEON SPLASH: 4v4 Procedural Water Warfare

## Project Overview

**NEON SPLASH** is a 4v4 procedural arena shooter featuring a unique "wetness" mechanic where players shoot enemies to increase their wetness. When a player reaches 100% wetness, they freeze temporarily instead of dying. The game features vaporwave/neon pool party aesthetics with procedurally generated maps based on seeds.

### Core Features
- **Non-violent gameplay**: Players freeze instead of die
- **Procedural maps**: Generated from seeds for infinite replayability
- **Vaporwave aesthetic**: Neon lights and water-themed visuals
- **Wetness system**: Fill enemy meter to freeze them
- **Team-based gameplay**: 4v4 matches with first to 50 freezes winning

## Project Structure

```
STUPID_2/
├── blueprint.md              # Game design document
├── market.md                 # Market analysis
├── project.md                # Project analysis & case studies
├── study.md                  # Development study path
├── README.md                 # This file
├── Arabic/                   # Arabic translations
│   ├── blueprint.md
│   ├── market.md
│   ├── project.md
│   └── study.md
├── docs/                     # Website documentation hub
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
└── .github/
    └── workflows/
        └── deploy.yml
```

## Documentation

### English Documentation
- [Blueprint](blueprint.md) - Core game design and mechanics
- [Market Analysis](market.md) - Target audience and market opportunity
- [Project Analysis](project.md) - Case studies and validation
- [Study Path](study.md) - 8-week development roadmap

### Arabic Documentation
All documentation is available in Arabic in the `Arabic/` directory with corresponding filenames.

## Development Hub

The `docs/` directory contains a web-based dashboard for accessing all project documentation. The dashboard features:

- Authentication system
- Language switching (English/Arabic)
- Document viewer
- Task checklist
- Quick links to resources

## Technologies Used

- **Game Engine**: Unity
- **Networking**: Mirror Networking
- **Procedural Generation**: Seeded randomization
- **Web Technologies**: HTML, CSS, JavaScript (for documentation hub)

## Getting Started

1. Clone the repository
2. Access documentation through the web dashboard in `docs/index.html`
3. Follow the development roadmap in `study.md`
4. Review the game design in `blueprint.md`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please read the documentation to understand the project vision before contributing.

## Acknowledgments

- Inspired by Splatoon's non-violent competitive gameplay
- Vaporwave aesthetic influenced by synthwave music culture
- Procedural generation techniques from roguelike games