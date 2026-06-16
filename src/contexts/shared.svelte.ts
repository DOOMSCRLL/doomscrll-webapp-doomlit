import type { Locale } from "models/internal/locale"
import type StylisticTimeFormat from "utils/stylistic-time-fmt"
import StatefulContext from "./stateful-context.svelte"

export const LocaleContext = new StatefulContext<Locale>()
export const DateFmtContext = new StatefulContext<StylisticTimeFormat>()
