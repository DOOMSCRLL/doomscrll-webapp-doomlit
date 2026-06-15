import type { Handle } from "@sveltejs/kit"
import { LOCALE_DEFAULT } from "const/locales"
import type { Locale } from "models/internal/locale"
import { readCookieFor } from "repos/cookie-repo"
import { isLocale } from "repos/locale-repo"

export const handle: Handle = async ({ event, resolve }) => {
	let locale = readCookieFor<string>("Locale")

	if (!locale) {
		const acceptLang = event.request.headers.get("accept-language")
		if (acceptLang) {
			const normalized = acceptLang.split(",")[0].split("-")[0].toLowerCase()
			if (isLocale(normalized)) locale = normalized
		}
	}

	locale ??= LOCALE_DEFAULT
	event.locals.locale = locale as Locale

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace("%lang%", locale),
	})
}
