import { API_BASE_URL } from "$env/static/private"
import { error } from "@sveltejs/kit"

export type AuthResponse = {
	success?: boolean
	message?: string
	csrfToken?: string
	error?: string
}

export async function requestOtp(email: string, customFetch: typeof fetch = fetch): Promise<AuthResponse> {
	const response = await customFetch(`${API_BASE_URL}/auth/request`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email }),
	})
	const result = (await response.json()) as AuthResponse

	if (!response.ok) {
		throw error(response.status, { message: result.error || "Failed to request OTP" })
	}

	return result
}

export async function verifyOtp(email: string, code: string, customFetch: typeof fetch = fetch): Promise<AuthResponse> {
	const response = await customFetch(`${API_BASE_URL}/auth/verify`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, code }),
	})

	const result = (await response.json()) as AuthResponse

	if (!response.ok) {
		throw error(response.status, { message: result.error || "Failed to verify OTP" })
	}

	return result
}
export async function getCsrfToken(customFetch: typeof fetch = fetch): Promise<AuthResponse> {
	const response = await customFetch(`${API_BASE_URL}/auth/csrf`)
	const result = (await response.json()) as AuthResponse

	if (!response.ok) {
		throw error(response.status, { message: result.error || "Failed to fetch CSRF token" })
	}

	return result
}


export async function logout(csrfToken: string, customFetch: typeof fetch = fetch): Promise<AuthResponse> {
	const response = await customFetch(`${API_BASE_URL}/auth/logout`, {
		method: "POST",
		headers: {
			"x-csrf-token": csrfToken,
		},
	})
	const result = (await response.json()) as AuthResponse

	if (!response.ok) {
		throw error(response.status, { message: result.error || "Failed to logout" })
	}

	return result
}
