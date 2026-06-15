import { LOCALE_DEFAULT } from "const/locales"
import type { Locale } from "models/internal/locale"
import ContextProvider from "./stateful-context.svelte"

const KEY_CONTEXT_LOCALE = "user-lang"

const LocaleContext = new ContextProvider<Locale>(KEY_CONTEXT_LOCALE, LOCALE_DEFAULT)
export default LocaleContext
