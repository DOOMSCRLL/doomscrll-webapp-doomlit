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
		const cookies = event.cookies.getAll()
		const cookieString = cookies.map((c) => `${c.name}=${c.value}`).join("; ")
		if (cookieString) request.headers.set("cookie", cookieString)
	}

	const response = await fetch(request)

	if (request.url.startsWith(API_BASE_URL)) {
		const setCookies = response.headers.getSetCookie()
		for (const cookieStr of setCookies) {
			const parts = cookieStr.split(";").map((p) => p.trim())
			if (parts.length === 0) continue

			const [nameValue, ...directives] = parts
			const eqIdx = nameValue.indexOf("=")
			if (eqIdx === -1) continue

			const name = nameValue.substring(0, eqIdx)
			const value = nameValue.substring(eqIdx + 1)

			const options: {
				path: string
				httpOnly?: boolean
				secure?: boolean
				sameSite?: "lax" | "strict" | "none"
				expires?: Date
				maxAge?: number
			} = {
				path: "/",
				secure: request.url.startsWith("https://"),
			}

			for (const directive of directives) {
				const [k, ...vArr] = directive.split("=")
				const v = vArr.join("=")
				const key = k.toLowerCase()

				if (key === "path") options.path = v
				else if (key === "httponly") options.httpOnly = true
				else if (key === "secure") options.secure = true
				else if (key === "samesite") options.sameSite = v.toLowerCase() as "lax" | "strict" | "none"
				else if (key === "expires") options.expires = new Date(v)
				else if (key === "max-age") options.maxAge = parseInt(v, 10)
			}

			event.cookies.set(name, value, options)
		}
	}

	return response
}
