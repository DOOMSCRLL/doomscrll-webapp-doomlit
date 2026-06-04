import { LOCALE_DEFAULT } from "const/locales"
import StylisticTimeFormat from "utils/stylistic-time-fmt"
import ContextProvider from "./context-provider"

const KEY_CONTEXT_DATE_FMT = "date-formatter"

const DateFmtContext = new ContextProvider<StylisticTimeFormat>(
	KEY_CONTEXT_DATE_FMT,
	new StylisticTimeFormat(LOCALE_DEFAULT),
)
export default DateFmtContext
