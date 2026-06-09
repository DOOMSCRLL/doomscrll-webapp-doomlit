import type Category from "models/category"
import type Platform from "models/platform"
import type { PlatformName } from "models/platform"

export const PLATFORMS = {
	//#region Games
	appStore: { name: "Apple App Store", slug: "app-store", isBadge: true },
	epicGames: { name: "Epic Games Store", slug: "egs" },
	gog: { name: "GOG", slug: "gog" },
	humbleBundle: { name: "Humble Bundle", slug: "humble-bundle" },
	itchio: { name: "itch.io", slug: "itchio" },
	playStore: { name: "Google Play Store", slug: "google-play", isBadge: true },
	playstation: { name: "PlayStation", slug: "playstation" },
	questStore: { name: "Meta Quest Store", slug: "meta" },
	steam: { name: "Steam", slug: "steam" },
	switch: { name: "Nintendo Switch", slug: "switch" },
	xbox: { name: "Xbox", slug: "xbox" },
	//#endregion

	//#region Tabletop
	amazon: { name: "Amazon", slug: "amazon", isBadge: true },
	driveThru: { name: "DriveThruRPG", slug: "drivethrurpg", isBadge: true },
	gameCrafter: { name: "The Game Crafter", slug: "tgc" },
	//#endregion

	//#region Software & Tools
	fdroid: { name: "F-Droid", slug: "fdroid" },
	github: { name: "GitHub", slug: "github" },
	gitlab: { name: "GitLab", slug: "gitlab" },
	productHunt: { name: "Product Hunt", slug: "product-hunt" },
	//#endregion

	//#region Digital Assets
	artstation: { name: "ArtStation", slug: "artstation" },
	cgtrader: { name: "CGTrader", slug: "cgtrader" },
	cults3d: { name: "Cults3D", slug: "cults3d" },
	fab: { name: "Fab", slug: "fab" },
	figma: { name: "Figma Community", slug: "figma" },
	gumroad: { name: "Gumroad", slug: "gumroad" },
	printables: { name: "Printables", slug: "printables" },
	sketchfab: { name: "Sketchfab", slug: "sketchfab" },
	superhive: { name: "Superhive", slug: "superhive" },
	thingiverse: { name: "Thingiverse", slug: "thingiverse" },
	unityAssetStore: { name: "Unity Asset Store", slug: "unity" },
	//#endregion

	//#region Publishing
	appleBooks: { name: "Apple Books", slug: "apple-books" },
	audible: { name: "Audible", slug: "audible", isBadge: true },
	googlePlayBooks: { name: "Google Play Books", slug: "play-books" },
	medium: { name: "Medium", slug: "medium" },
	royalRoad: { name: "Royal Road", slug: "royal-road" },
	substack: { name: "Substack", slug: "substack" },
	tapas: { name: "Tapas", slug: "tapas" },
	wattpad: { name: "Wattpad", slug: "wattpad" },
	webtoon: { name: "Webtoon", slug: "webtoon" },
	//#endregion

	//#region Audio
	appleMusic: { name: "Apple Music", slug: "apple-music" },
	bandcamp: { name: "Bandcamp", slug: "bandcamp", isBadge: true },
	beatstars: { name: "Beatstars", slug: "beatstars" },
	soundcloud: { name: "SoundCloud", slug: "soundcloud" },
	spotify: { name: "Spotify", slug: "spotify" },
	//#endregion

	//#region Video
	nebula: { name: "Nebula", slug: "nebula" },
	vimeo: { name: "Vimeo", slug: "vimeo" },
	//#endregion

	//#region Goods
	amazonHandmade: { name: "Amazon Handmade", slug: "amazon-handmade", isBadge: true },
	bigCartel: { name: "Big Cartel", slug: "big-cartel" },
	etsy: { name: "Etsy", slug: "etsy" },
	redBubble: { name: "Redbubble", slug: "redbubble" },
	society6: { name: "Society6", slug: "society6" },
	//#endregion

	//#region Socials (Internal)
	bsky: { name: "Bluesky", slug: "bsky" },
	discord: { name: "Discord", slug: "discord" },
	instagram: { name: "Instagram", slug: "instagram" },
	kick: { name: "Kick", slug: "kick" },
	kofi: { name: "Ko-fi", slug: "kofi" },
	linkedin: { name: "LinkedIn", slug: "linkedin" },
	linktree: { name: "Linktree", slug: "linktree" },
	mailList: { name: "Mailing List", slug: "mail-list" },
	mastodon: { name: "Mastodon", slug: "mastodon" },
	patreon: { name: "Patreon", slug: "patreon" },
	reddit: { name: "Reddit", slug: "reddit" },
	threads: { name: "Threads", slug: "threads" },
	tiktok: { name: "TikTok", slug: "tiktok" },
	tumblr: { name: "Tumblr", slug: "tumblr" },
	twitch: { name: "Twitch", slug: "twitch" },
	twitter: { name: "X", slug: "twitter" },
	web: { name: "Website", slug: "web" },
	youtube: { name: "YouTube", slug: "youtube" },
	//#endregion

	//#region Crowdfunding (Internal)
	backerkit: { name: "BackerKit", slug: "backerkit", isBadge: true },
	crowdSupply: { name: "Crowd Supply", slug: "crowd-supply" },
	gamefound: { name: "Gamefound", slug: "gamefound" },
	indiegogo: { name: "Indiegogo", slug: "indiegogo", isBadge: true },
	kickstarter: { name: "Kickstarter", slug: "kickstarter" },
	//#endregion
} as const satisfies { [key in string]: Platform }

export const PLATFORM_MAP = {
	"Video Games": [
		"appStore",
		"epicGames",
		"gog",
		"humbleBundle",
		"itchio",
		"playStore",
		"playstation",
		"questStore",
		"steam",
		"switch",
		"xbox",
	],
	Tabletop: ["amazon", "driveThru", "gameCrafter", "itchio"],
	"Software & Tools": ["appStore", "fdroid", "github", "gitlab", "playStore", "productHunt"],
	"Digital Assets": [
		"artstation",
		"cgtrader",
		"cults3d",
		"fab",
		"figma",
		"gumroad",
		"itchio",
		"printables",
		"sketchfab",
		"superhive",
		"thingiverse",
		"unityAssetStore",
	],
	Publishing: [
		"appleBooks",
		"audible",
		"googlePlayBooks",
		"medium",
		"royalRoad",
		"spotify",
		"substack",
		"tapas",
		"wattpad",
		"webtoon",
	],
	Audio: ["appleMusic", "bandcamp", "beatstars", "soundcloud", "spotify"],
	Video: ["nebula", "vimeo"],
	Goods: ["amazonHandmade", "bigCartel", "etsy", "redBubble", "society6"],
	Food: ["web"],
	Local: ["web"],
	Internal_Socials: [
		"bsky",
		"discord",
		"instagram",
		"kick",
		"kofi",
		"linkedin",
		"linktree",
		"mailList",
		"mastodon",
		"patreon",
		"reddit",
		"threads",
		"tiktok",
		"tumblr",
		"twitch",
		"twitter",
		"web",
		"youtube",
	],
	Internal_Crowdfunding: ["backerkit", "crowdSupply", "gamefound", "indiegogo", "kickstarter"],
} satisfies Record<Category, PlatformName[]>
