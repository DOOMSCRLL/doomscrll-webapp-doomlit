import { DICTIONARIES, LOCALE_DEFAULT } from "const/locales"
import type { Dictionary, Locale } from "models/locale"

export function getDictionaryOf(locale: Locale): Dictionary {
	return DICTIONARIES[locale] || getDefaultDictionary()
}

function getDefaultDictionary(): Dictionary {
	return DICTIONARIES[LOCALE_DEFAULT]
}
