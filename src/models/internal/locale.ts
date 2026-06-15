import type { DICTIONARIES } from "const/locales"
import type en from "const/locales/en"

export type Dictionary = typeof en
export type Locale = keyof typeof DICTIONARIES
