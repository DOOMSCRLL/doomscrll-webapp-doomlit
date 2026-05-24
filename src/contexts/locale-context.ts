import { LOCALE_DEFAULT, type Locale } from "repos/locales"
import ContextProvider from "./context-provider"

const KEY_CONTEXT_LOCALE = "user-lang"

const LocaleContext = new ContextProvider<Locale>(KEY_CONTEXT_LOCALE, LOCALE_DEFAULT)
export default LocaleContext
