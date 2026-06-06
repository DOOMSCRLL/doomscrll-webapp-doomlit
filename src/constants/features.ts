import type Category from "models/category"

const FEATURES: { [key in Category]: string[] } = {
	"Video Games": [
		// Access & Pricing Models
		"Early Access",
		"Free to Play",
		"Demo Available",
		"Open Playtest",
		"Crowdfunded",
		"Episodic",

		// Player Modes & Multiplayer
		"Singleplayer",
		"Multiplayer",
		"Online Co-op",
		"Local Co-op",
		"Online PvP",
		"Local PvP",
		"Split Screen",
		"Cross-Platform Multiplayer",
		"MMO",

		// Technical & Platform Support
		"Full Controller Support",
		"Partial Controller Support",
		"VR Supported",
		"VR Only",
		"Playable in Browser", // Extremely important for indie platforms (itch.io relies heavily on this)
		"Mobile Friendly",
		"Mac Supported",
		"Linux Supported",

		// Game Ecosystem & Progression
		"Achievements",
		"Cloud Saves",
		"Leaderboards",
		"Modding Support",
		"Level Editor",
		"Workshop Support",
		"In-App Purchases",
		"Procedural Generation",

		// Accessibility
		"Colorblind Mode",
		"Text-to-Speech",
		"Remappable Controls",
		"Subtitles Available",
	],
	Tabletop: [
		// Delivery & Format
		"Print and Play",
		"Digital PDF",
		"Print on Demand", // Very common for DriveThruRPG
		"VTT Integrated", // Virtual Tabletop support (Roll20, Foundry, etc.)
		"Audio Accompaniment",

		// Product Function
		"Core Rulebook", //
		"Adventure Module",
		"Campaign Setting",
		"Character Sheets Included",
		"Maps Included", //
		"System Agnostic", // Can be played with any rule system
		"Requires Base Game",

		// Play Style
		"GM-Less",
		"Solo Playable", //
		"Cooperative",
		"Competitive",
		"One-Shot",
		"Campaign Oriented",
	],
	"Software & Tools": [
		// Platform & Execution
		"Windows Compatible",
		"Mac Compatible",
		"Linux Compatible",
		"Browser Based",
		"Mobile App Available",
		"Command Line Interface (CLI)",
		"GUI Interface",
		"Offline Use",

		// Technical Architecture
		"Open Source",
		"API Access",
		"Plugin Architecture", // Allows community modding
		"Cloud Sync",
		"Self-Hostable",
		"Hardware Accelerated",
	],
	"Digital Assets": [
		// Licensing & Usage
		"Commercial Use Allowed",
		"Royalty Free",
		"CC0 / Public Domain",
		"Requires Attribution",
		"No AI Generated Content", // Extremely important tag for indie assets right now

		// Asset Readiness
		"Source Files Included",
		"Game Engine Ready",
		"Seamless Textures",
		"Animated",
		"Rigged",
		"Low Poly",
		"Vector Based",
		"Modular", // Important for tilesets and 3D environment packs
		"Tileable",
	],
	Publishing: [
		// Digital Formats
		"PDF Included",
		"EPUB Included",
		"MOBI Included",
		"Interactive Elements",
		"Audiobook Version Included",

		// Print & Structure
		"Print on Demand",
		"Full Color",
		"Black and White",
		"Serialized",
		"Anthology",
		"Illustrated",
	],
	Audio: [],
	Video: [],
	Goods: [],
	Food: [],
	Local: [],
	Internal_Socials: [],
	Internal_Crowdfunding: [],
} as const

export default FEATURES
