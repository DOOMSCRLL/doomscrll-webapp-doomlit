import type Category from "models/category"
import type Platform from "models/platform"
import type { PlatformKey } from "models/platform"

export const PLATFORMS = {
	//#region Games
	appStore: { name: "Apple App Store", isBadge: true },
	epicGames: { name: "Epic Games Store" },
	gog: { name: "GOG" },
	humbleBundle: { name: "Humble Bundle" },
	itchio: { name: "itch.io" },
	playStore: { name: "Google Play Store", isBadge: true },
	playstation: { name: "PlayStation" },
	questStore: { name: "Meta Quest Store" },
	steam: { name: "Steam" },
	switch: { name: "Nintendo Switch" },
	xbox: { name: "Xbox" },
	//#endregion

	//#region Tabletop
	amazon: { name: "Amazon", isBadge: true },
	driveThru: { name: "DriveThruRPG", isBadge: true },
	gameCrafter: { name: "The Game Crafter" },
	//#endregion

	//#region Software & Tools
	fdroid: { name: "F-Droid" },
	github: { name: "GitHub" },
	gitlab: { name: "GitLab" },
	productHunt: { name: "Product Hunt" },
	//#endregion

	//#region Digital Assets
	artstation: { name: "ArtStation" },
	cgtrader: { name: "CGTrader" },
	cults3d: { name: "Cults3D" },
	fab: { name: "Fab" },
	figma: { name: "Figma Community" },
	gumroad: { name: "Gumroad" },
	printables: { name: "Printables" },
	sketchfab: { name: "Sketchfab" },
	superhive: { name: "Superhive" },
	thingiverse: { name: "Thingiverse" },
	unityAssetStore: { name: "Unity Asset Store" },
	//#endregion

	//#region Publishing
	appleBooks: { name: "Apple Books" },
	audible: { name: "Audible", isBadge: true },
	googlePlayBooks: { name: "Google Play Books" },
	medium: { name: "Medium" },
	royalRoad: { name: "Royal Road" },
	substack: { name: "Substack" },
	tapas: { name: "Tapas" },
	wattpad: { name: "Wattpad" },
	webtoon: { name: "Webtoon" },
	//#endregion

	//#region Audio
	appleMusic: { name: "Apple Music" },
	bandcamp: { name: "Bandcamp", isBadge: true },
	beatstars: { name: "Beatstars" },
	soundcloud: { name: "SoundCloud" },
	spotify: { name: "Spotify" },
	//#endregion

	//#region Video
	nebula: { name: "Nebula" },
	vimeo: { name: "Vimeo" },
	//#endregion

	//#region Goods
	amazonHandmade: { name: "Amazon Handmade", isBadge: true },
	bigCartel: { name: "Big Cartel" },
	etsy: { name: "Etsy" },
	redBubble: { name: "Redbubble" },
	society6: { name: "Society6" },
	//#endregion

	//#region Socials (Internal)
	bsky: { name: "Bluesky" },
	discord: { name: "Discord" },
	instagram: { name: "Instagram" },
	kick: { name: "Kick" },
	kofi: { name: "Ko-fi" },
	linkedin: { name: "LinkedIn" },
	linktree: { name: "Linktree" },
	mailList: { name: "Mailing List" },
	mastodon: { name: "Mastodon" },
	patreon: { name: "Patreon" },
	reddit: { name: "Reddit" },
	threads: { name: "Threads" },
	tiktok: { name: "TikTok" },
	tumblr: { name: "Tumblr" },
	twitch: { name: "Twitch" },
	twitter: { name: "X" },
	web: { name: "Website" },
	youtube: { name: "YouTube" },
	//#endregion

	//#region Crowdfunding (Internal)
	backerkit: { name: "BackerKit", isBadge: true },
	crowdSupply: { name: "Crowd Supply" },
	gamefound: { name: "Gamefound" },
	indiegogo: { name: "Indiegogo", isBadge: true },
	kickstarter: { name: "Kickstarter" },
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
} satisfies Record<Category, PlatformKey[]>
