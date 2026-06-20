import { API_BASE_URL } from "$env/static/private"
import { error } from "@sveltejs/kit"
import type Profile from "models/profile"

export type ProfileResponse = {
	success?: boolean
	profile?: Profile
	message?: string
	error?: string
}

export async function getMe(customFetch: typeof fetch = fetch): Promise<Profile | null> {
	const response = await customFetch(`${API_BASE_URL}/profile/me`)
	if (response.status === 401 || response.status === 404) return null

	const result = (await response.json()) as ProfileResponse
	if (!response.ok) throw error(response.status, { message: result.error || "Failed to fetch profile" })
	return result.profile || null
}

export async function getPublicProfile(username: string, customFetch: typeof fetch = fetch): Promise<Profile | null> {
	const response = await customFetch(`${API_BASE_URL}/profile/${username}`)
	if (response.status === 404) return null

	const result = (await response.json()) as ProfileResponse
	if (!response.ok) throw error(response.status, { message: result.error || "Failed to fetch public profile" })
	return result.profile || null
}

export async function updateMe(
	updates: { username?: string; description?: string; url?: string },
	csrfToken: string,
	customFetch: typeof fetch = fetch,
): Promise<ProfileResponse> {
	const response = await customFetch(`${API_BASE_URL}/profile/me`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"x-csrf-token": csrfToken,
		},
		body: JSON.stringify(updates),
	})

	const result = (await response.json()) as ProfileResponse

	if (!response.ok) {
		throw error(response.status, { message: result.error || "Failed to update profile" })
	}

	return result
}

export async function deleteMe(csrfToken: string, customFetch: typeof fetch = fetch): Promise<ProfileResponse> {
	const response = await customFetch(`${API_BASE_URL}/profile/me`, {
		method: "DELETE",
		headers: {
			"x-csrf-token": csrfToken,
		},
	})

	const result = (await response.json()) as ProfileResponse

	if (!response.ok) {
		throw error(response.status, { message: result.error || "Failed to delete profile" })
	}

	return result
}
