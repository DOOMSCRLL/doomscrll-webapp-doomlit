import { API_BASE_URL } from "$env/static/private"

import { error } from "@sveltejs/kit"

import type Category from "models/category"
import type { APIResponse } from "models/internal/api"
import type {
	ActiveDraftReference,
	ProjectDraft,
	ReservationCountsData,
	UploadUrlsData,
} from "models/internal/projects"
import type { ProjectRules } from "models/internal/rules"
import type Project from "models/project"
import type { CreatorProjectEntry, ProjectPreview } from "models/project"
import DDate from "utils/d-date"

// #region Data fetching utils
export async function getRules(customFetch: typeof fetch = fetch): Promise<ProjectRules> {
	const response = await customFetch(`${API_BASE_URL}/projects/rules`)
	const result = (await response.json()) as APIResponse<ProjectRules>

	if (!result.success) {
		throw error(response.status, {
			message: result.error.message,
			code: result.error.code,
		})
	}

	return result.data
}

export async function getReservationsFor(
	year?: number,
	month?: number,
	customFetch: typeof fetch = fetch,
): Promise<ReservationCountsData> {
	const url = new URL(`${API_BASE_URL}/projects/reservation-counts`)
	if (year !== undefined) url.searchParams.set("year", year.toString())
	if (month !== undefined) url.searchParams.set("month", month.toString())

	const response = await customFetch(url.toString())
	const result = (await response.json()) as APIResponse<ReservationCountsData>

	if (!result.success) {
		throw error(response.status, {
			message: result.error.message,
			code: result.error.code,
		})
	} else {
		return result.data
	}
}

export async function getPreviewsFor(
	date: DDate,
	category: Category,
	customFetch: typeof fetch = fetch,
): Promise<ProjectPreview[]> {
	const url = new URL(`${API_BASE_URL}/projects/preview`)
	url.searchParams.set("date", date.toISOString())
	url.searchParams.set("category", category)

	const response = await customFetch(url.toString())
	const result = (await response.json()) as APIResponse<ProjectPreview[]>

	if (!result.success) {
		throw error(response.status, {
			message: result.error.message,
			code: result.error.code,
		})
	}

	return result.data
}

export async function getDraft(referenceId: string, customFetch: typeof fetch = fetch): Promise<ProjectDraft> {
	const response = await customFetch(`${API_BASE_URL}/projects/drafts/${referenceId}`)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const result = (await response.json()) as APIResponse<any>

	if (!result.success) {
		throw error(response.status, {
			message: result.error?.message || "Failed to fetch draft.",
			code: result.error?.code || "ERROR",
		})
	}

	return result.data
}

export async function getActiveDraftReference(customFetch: typeof fetch = fetch): Promise<ActiveDraftReference | null> {
	const response = await customFetch(`${API_BASE_URL}/projects/drafts/active`)
	const result = (await response.json()) as APIResponse<ActiveDraftReference>

	if (!result.success || !result.data) {
		return null
	}

	return result.data
}

export async function getCreatorProjectEntries(customFetch: typeof fetch = fetch): Promise<CreatorProjectEntry[]> {
	const response = await customFetch(`${API_BASE_URL}/projects/me`)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const result = (await response.json()) as APIResponse<any[]>

	if (!result.success) {
		throw error(response.status, {
			message: result.error?.message || "Failed to fetch confirmed projects.",
			code: result.error?.code || "ERROR",
		})
	}

	return result.data as CreatorProjectEntry[]
}

export async function getCreatorProject(referenceId: string, customFetch: typeof fetch = fetch): Promise<Project> {
	const response = await customFetch(`${API_BASE_URL}/projects/me/${referenceId}`)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const result = (await response.json()) as APIResponse<any>

	if (!result.success) {
		throw error(response.status, {
			message: result.error?.message || "Failed to fetch project details.",
			code: result.error?.code || "ERROR",
		})
	}

	const p = result.data

	if (p.status !== "incomplete" && p.status !== "ready") {
		throw error(403, {
			message: "This DOOMLIT cannot be managed in its current state.",
			code: "INVALID_STATE",
		})
	}

	return p as Project
}

// #endregion

export async function getUploadUrls(
	referenceId: string,
	screenshotCount: number,
	locale?: string,
	csrfToken?: string,
	customFetch: typeof fetch = fetch,
): Promise<UploadUrlsData> {
	const response = await customFetch(`${API_BASE_URL}/projects/${referenceId}/upload-urls`, {
		method: "POST",
		headers: { "Content-Type": "application/json", ...(csrfToken && { "x-csrf-token": csrfToken }) },
		body: JSON.stringify({ screenshotCount, locale }),
	})
	const result = (await response.json()) as APIResponse<UploadUrlsData>

	if (!result.success) {
		throw error(response.status, {
			message: result.error?.message || "Failed to get upload URLs.",
			code: result.error?.code || "ERROR",
		})
	}

	return result.data
}

export async function updateCreatorProject(
	referenceId: string,
	payload: Partial<Project>,
	locale?: string,
	csrfToken?: string,
	customFetch: typeof fetch = fetch,
): Promise<APIResponse<never>> {
	const response = await customFetch(`${API_BASE_URL}/projects/${referenceId}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json", ...(csrfToken && { "x-csrf-token": csrfToken }) },
		body: JSON.stringify({ ...payload, locale }),
	})
	const result = (await response.json()) as APIResponse<never>

	if (!result.success) {
		throw error(response.status, {
			message: result.error?.message,
			code: result.error?.code,
		})
	}

	return result
}

export async function publishCreatorProject(
	referenceId: string,
	locale?: string,
	csrfToken?: string,
	customFetch: typeof fetch = fetch,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<APIResponse<any>> {
	const response = await customFetch(`${API_BASE_URL}/projects/${referenceId}/publish`, {
		method: "POST",
		headers: { "Content-Type": "application/json", ...(csrfToken && { "x-csrf-token": csrfToken }) },
		body: JSON.stringify({ locale }),
	})
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const result = (await response.json()) as APIResponse<any>

	if (!result.success) {
		if (result.error.code === "VALIDATION_FAILED") {
			throw error(response.status, {
				message: `${result.error?.message} ${JSON.stringify(result.error?.details)}`,
				code: result.error?.code,
			})
		} else {
			throw error(response.status, {
				message: result.error?.message,
				code: result.error?.code,
			})
		}
	}

	return result
}

export async function rescheduleCreatorProject(
	referenceId: string,
	newDate: string,
	csrfToken?: string,
	customFetch: typeof fetch = fetch,
): Promise<APIResponse<never>> {
	const response = await customFetch(`${API_BASE_URL}/projects/${referenceId}/reschedule`, {
		method: "POST",
		headers: { "Content-Type": "application/json", ...(csrfToken && { "x-csrf-token": csrfToken }) },
		body: JSON.stringify({ newDate }),
	})
	const result = (await response.json()) as APIResponse<never>

	if (!result.success) {
		throw error(response.status, {
			message: result.error?.message,
			code: result.error?.code,
		})
	}

	return result
}
