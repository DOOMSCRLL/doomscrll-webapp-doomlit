import en from "./en"
import tr from "./tr"

export const DICTIONARIES = { en, tr } as const

export type Dictionary = typeof en
export type Locale = keyof typeof DICTIONARIES

export const LOCALE_DEFAULT: Locale = "en"
export const LOCALES: Locale[] = Object.keys(DICTIONARIES) as Locale[]

function isLocale(value: unknown): value is Locale {
	return typeof value === "string" && value in DICTIONARIES
}

export function getLocaleName(locale: Locale): string {
	switch (locale) {
		case "en":
			return "English"
		case "tr":
			return "Türkçe"
	}
}

export function getLocaleFlag(locale: Locale): string {
	switch (locale) {
		case "en":
			return "🇺🇸"
		case "tr":
			return "🇹🇷"
	}
}

export function getDictionaryOf(locale: Locale): Dictionary {
	return DICTIONARIES[locale] || getDefaultDictionary()
}

function getDefaultDictionary(): Dictionary {
	return DICTIONARIES[LOCALE_DEFAULT]
}

export function getUserLocale(): Locale {
	const localeCode = navigator.language.split("-")[0]
	const resolvedLocale = isLocale(localeCode) ? localeCode : LOCALE_DEFAULT
	return resolvedLocale
}
