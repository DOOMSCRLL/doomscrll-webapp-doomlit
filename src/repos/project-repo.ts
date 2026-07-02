import { API_BASE_URL } from "$env/static/private"

import { error } from "@sveltejs/kit"

import type Category from "models/category"
import type { APIResponse } from "models/internal/api"
import type { ReservationCountsData } from "models/internal/projects"
import type { ProjectRules } from "models/internal/rules"
import type { ProjectPreview } from "models/project"
import DDate from "utils/d-date"

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

export async function getDraft(
	referenceId: string,
	customFetch: typeof fetch = fetch,
): Promise<{ referenceId: string; name: string; status: string; showcaseDate: string; createdAt: string }> {
	const response = await customFetch(`${API_BASE_URL}/projects/drafts/${referenceId}`)
	const result = (await response.json()) as APIResponse<any>

	if (!result.success) {
		throw error(response.status, {
			message: result.error?.message || "Failed to fetch draft.",
			code: result.error?.code || "ERROR",
		})
	}

	return result.data
}
