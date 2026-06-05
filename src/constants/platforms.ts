import type { CategoryName } from "models/category"
import type Platform from "models/platform"
import type { PlatformName } from "models/platform"

export const PLATFORMS = {
	// #region Games
	steam: { name: "Steam", slug: "steam" },
	epicGames: { name: "Epic Games Store", slug: "egs" },
	itchio: { name: "itch.io", slug: "itch-io" },
	gog: { name: "GOG", slug: "gog" },
	appStore: { name: "Apple App Store", slug: "app-store" },
	playStore: { name: "Google Play Store", slug: "play-store" },
	switch: { name: "Nintendo Switch", slug: "switch" },
	playstation: { name: "PlayStation", slug: "ps" },
	xbox: { name: "Xbox", slug: "xbox" },
	questStore: { name: "Meta Quest Store", slug: "quest-store" },
	// #endregion
	// #region Tabletop
	driveThru: { name: "DriveThruRPG", slug: "drivethrurpg" },
	gameCrafter: { name: "The Game Crafter", slug: "the-game-crafter" },
	amazon: { name: "Amazon", slug: "amazon" },
	// #endregion
	// #region Software & Tools
	github: { name: "GitHub", slug: "github" },
	gitlab: { name: "GitLab", slug: "gitlab" },
	productHunt: { name: "Product Hunt", slug: "product-hunt" },
	fdroid: { name: "F-Droid", slug: "f-droid" },
	appsumo: { name: "AppSumo", slug: "appsumo" },
	// #endregion
	// #region Digital Assets
	gumroad: { name: "Gumroad", slug: "gumroad" },
	artstation: { name: "ArtStation", slug: "artstation" },
	figma: { name: "Figma Community", slug: "figma" },
	fab: { name: "Fab", slug: "fab" },
	unityAssetStore: { name: "Unity Asset Store", slug: "unity-as" },
	printables: { name: "Printables", slug: "printables" },
	thingiverse: { name: "Thingiverse", slug: "thingiverse" },
	makerworld: { name: "MakerWorld", slug: "makerworld" },
	myminifac: { name: "MyMiniFactory", slug: "myminifactory" },
	thangs: { name: "Thangs", slug: "thangs" },
	sketchfab: { name: "Sketchfab", slug: "sketchfab" },
	turbosquid: { name: "TurboSquid", slug: "turbosquid" },
	cgtrader: { name: "CGTrader", slug: "cgtrader" },
	// #endregion
	// #region Publishing
	substack: { name: "Substack", slug: "substack" },
	amazonKdp: { name: "Amazon KDP", slug: "amazon-kdp" },
	webtoon: { name: "Webtoon", slug: "webtoon" },
	tapas: { name: "Tapas", slug: "tapas" },
	medium: { name: "Medium", slug: "medium" },
	royalRoad: { name: "Royal Road", slug: "royal-road" },
	wattpad: { name: "Wattpad", slug: "wattpad" },
	// #endregion
	// #region Audio
	appleMusic: { name: "Apple Music", slug: "apple-music" },
	bandcamp: { name: "Bandcamp", slug: "bandcamp" },
	beatstars: { name: "Beatstars", slug: "beatstars" },
	soundcloud: { name: "SoundCloud", slug: "soundcloud" },
	spotify: { name: "Spotify", slug: "spotify" },
	// #endregion
	// #region Video
	vimeo: { name: "Vimeo", slug: "vimeo" },
	nebula: { name: "Nebula", slug: "nebula" },
	// #endregion
	// #region Goods
	etsy: { name: "Etsy", slug: "etsy" },
	amazonHandmade: { name: "Amazon Handmade", slug: "amazon-handmade" },
	indieMade: { name: "IndieMade", slug: "indiemade" },
	society6: { name: "Society6", slug: "society6" },
	bigCartel: { name: "Big Cartel", slug: "big-cartel" },
	redBubble: { name: "Redbubble", slug: "redbubble" },
	// #endregion

	// #region Socials (Internal)
	bsky: { name: "Bluesky", slug: "bsky" },
	discord: { name: "Discord", slug: "discord" },
	instagram: { name: "Instagram", slug: "ig" },
	kick: { name: "Kick", slug: "kick" },
	kofi: { name: "Ko-fi", slug: "ko-fi" },
	mailList: { name: "Mailing List", slug: "mail-list" },
	web: { name: "Website", slug: "web" },
	linkedin: { name: "LinkedIn", slug: "linkedin" },
	linktree: { name: "Linktree", slug: "linktree" },
	mastodon: { name: "Mastodon", slug: "mastodon" },
	matrix: { name: "Matrix", slug: "matrix" },
	patreon: { name: "Patreon", slug: "patreon" },
	reddit: { name: "Reddit", slug: "reddit" },
	threads: { name: "Threads", slug: "threads" },
	tiktok: { name: "TikTok", slug: "tiktok" },
	tumblr: { name: "Tumblr", slug: "tumblr" },
	twitch: { name: "Twitch", slug: "twitch" },
	twitter: { name: "X", slug: "twitter" },
	youtube: { name: "YouTube", slug: "YouTube" },
	// #endregion
	// #region Crowdfunding (Internal)
	kickstarter: { name: "Kickstarter", slug: "kickstarter" },
	indiegogo: { name: "Indiegogo", slug: "indiegogo" },
	backerkit: { name: "BackerKit", slug: "backerkit" },
	gamefound: { name: "Gamefound", slug: "gamefound" }, // Focused on table-top games
	crowdSupply: { name: "Crowd Supply", slug: "crowd-supply" }, // Focused on hardware
	// #endregion
} as const satisfies { [key in string]: Platform }

export const PLATFORM_MAP: { [key in CategoryName]: PlatformName[] } = {
	"Video Games": [
		"steam",
		"epicGames",
		"itchio",
		"gog",
		"appStore",
		"playStore",
		"switch",
		"playstation",
		"xbox",
		"questStore",
	],
	Tabletop: ["driveThru", "gameCrafter", "amazon", "itchio"],
	"Software & Tools": ["github", "gitlab", "productHunt", "fdroid", "appsumo", "appStore", "playStore"],
	"Digital Assets": [
		"gumroad",
		"artstation",
		"figma",
		"fab",
		"unityAssetStore",
		"printables",
		"thingiverse",
		"makerworld",
		"myminifac",
		"thangs",
		"sketchfab",
		"turbosquid",
		"cgtrader",
		"itchio",
	],
	Publishing: ["substack", "amazonKdp", "webtoon", "tapas", "medium", "royalRoad", "wattpad"],
	Audio: ["appleMusic", "bandcamp", "beatstars", "soundcloud", "spotify"],
	Video: ["vimeo", "nebula"],
	Goods: ["etsy", "amazonHandmade", "indieMade", "society6", "bigCartel", "redBubble"],
	Food: ["web"],
	Local: ["web"],
	Internal_Socials: [
		"bsky",
		"discord",
		"instagram",
		"kick",
		"kofi",
		"mailList",
		"web",
		"linkedin",
		"linktree",
		"mastodon",
		"matrix",
		"patreon",
		"reddit",
		"threads",
		"tiktok",
		"tumblr",
		"twitch",
		"twitter",
		"youtube",
	],
	Internal_Crowdfunding: ["kickstarter", "indiegogo", "backerkit", "gamefound", "crowdSupply"],
} as const
