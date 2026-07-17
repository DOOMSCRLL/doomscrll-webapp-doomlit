export type APIErrorDetails = {
	code: string
	message: string
	details: Record<string, unknown>
}

export type APIResponse<T> = { success: true; data: T; message: string } | { success: false; error: APIErrorDetails }
