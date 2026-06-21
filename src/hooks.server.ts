import { API_BASE_URL } from "$env/static/private"

import type { Handle, HandleFetch } from "@sveltejs/kit"

import KEYS_COOKIE from "const/cookies"
import { LOCALE_DEFAULT } from "const/locales"

import type { Locale } from "models/internal/locale"
import { isLocale } from "repos/locale-repo"

export const handle: Handle = async ({ event, resolve }) => {
	let locale = event.cookies.get(KEYS_COOKIE.Locale) as string | undefined
	if (locale && !isLocale(locale)) locale = undefined

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

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	if (request.url.startsWith(API_BASE_URL)) {
		const cookieHeader = event.request.headers.get("cookie")
		if (cookieHeader) request.headers.set("cookie", cookieHeader)
	}

	const response = await fetch(request)

	if (request.url.startsWith(API_BASE_URL)) {
		const cookieStr = response.headers.get("set-cookie")
		if (cookieStr) {
			event.setHeaders({ "set-cookie": cookieStr })
		}
	}

	return response
}
