import { DICTIONARIES, LOCALE_DEFAULT, LOCALES } from "const/locales"
import type { Dictionary, Locale } from "models/internal/locale"

export function isLocale(value: unknown): value is Locale {
	return typeof value === "string" && LOCALES.includes(value as Locale)
}

export function getDictionaryOf(locale?: Locale): Dictionary {
	if (!locale) return getDefaultDictionary()
	else return DICTIONARIES[locale] || getDefaultDictionary()
}

function getDefaultDictionary(): Dictionary {
	return DICTIONARIES[LOCALE_DEFAULT]
}
