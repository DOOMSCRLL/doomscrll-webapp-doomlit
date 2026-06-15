import KEYS_COOKIE from "const/cookies"
import type CookieType from "models/internal/cookie"

function isWindowAvailable(): boolean {
	return typeof window !== "undefined"
}

function isCookiesEnabled(): boolean {
	if (typeof navigator === "undefined" || !isWindowAvailable()) return false
	else return navigator.cookieEnabled
}

function storeCookie(key: string, value: string): void {
	if (!isWindowAvailable() || !isCookiesEnabled()) return
	else localStorage.setItem(key, value)
}

function readCookie<T>(key: string): T | null {
	if (!isWindowAvailable() || !isCookiesEnabled()) return null
	const cookie = localStorage.getItem(key)
	return cookie ? (cookie as T) : null
}

function getCookieKeyFor(cookie: CookieType): string {
	return KEYS_COOKIE[cookie]
}

export function storeCookieFor(cookie: CookieType, value: string): void {
	storeCookie(getCookieKeyFor(cookie), value)
}

export function readCookieFor<T>(cookie: CookieType): T | null {
	return readCookie<T>(getCookieKeyFor(cookie))
}
