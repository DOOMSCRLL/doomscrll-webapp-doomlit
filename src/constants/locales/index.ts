import type { Locale } from "models/internal/locale"

import en from "./en"
import tr from "./tr"

export const DICTIONARIES = { en, tr } as const

export const LOCALE_DEFAULT: Locale = "en"
export const LOCALES: Locale[] = Object.keys(DICTIONARIES) as Locale[]
