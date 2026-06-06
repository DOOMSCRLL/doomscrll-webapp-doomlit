import type Category from "models/category"
import type { Locale } from "models/locale"

export const CATEGORIES = [
	"Video Games",
	"Tabletop",
	"Software & Tools",
	"Digital Assets",
	"Publishing",
	"Audio",
	"Video",
	"Goods",
	"Food",
	"Local",
	"Internal_Socials",
	"Internal_Crowdfunding",
] as const

export const CATEGORY_LABELS: Record<Category, Record<Locale, string>> = {
	"Video Games": { en: "Video Games", tr: "Oyunlar" },
	Tabletop: { en: "Tabletop Games", tr: "Kutu Oyunları" },
	"Software & Tools": { en: "Software & Tools", tr: "Yazılım ve Araçlar" },
	"Digital Assets": { en: "Digital Assets", tr: "Eklenti ve Bileşenler" },
	Publishing: { en: "Publishing", tr: "Yayımlar" },
	Audio: { en: "Audio", tr: "Ses ve Müzik" },
	Video: { en: "Video", tr: "Film ve Video" },
	Goods: { en: "Physical Goods", tr: "Fiziksel Ürünler" },
	Food: { en: "Foods", tr: "Yiyecek ve İçecek" },
	Local: { en: "Local Businesses", tr: "Yerel İşletmeler" },
	Internal_Socials: { en: "Social Platforms", tr: "Sosyal Platformlar" },
	Internal_Crowdfunding: { en: "Crowdfunding Platforms", tr: "Kitle Fonlama Platformları" },
}
