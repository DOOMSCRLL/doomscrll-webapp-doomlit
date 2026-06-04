import { DICTIONARIES, LOCALE_DEFAULT } from "const/locales"
import type { Locale } from "models/locale"

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

export function getUserLocale(): Locale {
	const localeCode = navigator.language.split("-")[0]
	const resolvedLocale = isLocale(localeCode) ? localeCode : LOCALE_DEFAULT
	return resolvedLocale
}
