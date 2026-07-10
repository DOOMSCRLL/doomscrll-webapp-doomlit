export interface PresignedUrlPair {
	uploadUrl: string
	publicUrl: string
}

export interface UploadUrlsResponse {
	cover: PresignedUrlPair
	screenshots: PresignedUrlPair[]
}

export interface ImageUploadTask {
	uploadUrl: string
	blob: Blob
}

export async function getUploadUrls(
	referenceId: string,
	screenshotCount: number,
	customFetch: typeof fetch = fetch
): Promise<UploadUrlsResponse> {
	const response = await customFetch(`/api/projects/${referenceId}/upload-urls`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ screenshotCount }),
	})

	const json = await response.json()

	if (!response.ok) {
		throw new Error(json.error?.message || "Failed to fetch presigned URLs")
	}

	return json.data as UploadUrlsResponse
}

export async function uploadImageToCDN(uploadUrl: string, blob: Blob): Promise<void> {
	const response = await fetch(uploadUrl, {
		method: "PUT",
		headers: {
			"Content-Type": "image/webp",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
		body: blob,
	})

	if (!response.ok) {
		throw new Error("Failed to upload image to the CDN bucket.")
	}
}

export async function uploadMultipleImagesToCDN(tasks: ImageUploadTask[]): Promise<void> {
	await Promise.all(tasks.map((task) => uploadImageToCDN(task.uploadUrl, task.blob)))
}
