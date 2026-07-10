export type ImageType = "cover" | "screenshot"

interface Job {
	resolve: (blob: Blob) => void
	reject: (error: Error) => void
}

class ImageProcessorService {
	private worker: Worker | null = null
	private jobs = new Map<string, Job>()
	private jobIdCounter = 0

	private initWorker() {
		if (!this.worker) {
			this.worker = new Worker(new URL("../workers/image-worker.ts", import.meta.url), { type: "module" })
			this.worker.addEventListener("message", this.handleMessage.bind(this))
			this.worker.addEventListener("error", this.handleError.bind(this))
		}
	}

	private handleMessage(event: MessageEvent) {
		const { id, status, buffer, error } = event.data
		const job = this.jobs.get(id)

		if (job) {
			if (status === "success") {
				const blob = new Blob([buffer], { type: "image/webp" })
				job.resolve(blob)
			} else {
				job.reject(new Error(error))
			}

			this.jobs.delete(id)
		}
	}

	private handleError(error: ErrorEvent) {
		console.error("Image Worker crashed:", error)

		for (const job of this.jobs.values()) {
			job.reject(new Error("Background worker crashed during image processing."))
		}

		this.jobs.clear()
		this.worker?.terminate()
		this.worker = null
	}

	/**
	 * Processes a raw image file, resizing and converting it to an optimized WebP.
	 * @param file The raw File object from an HTML input
	 * @param type The target format: 'cover' (1:1) or 'screenshot' (9:16)
	 * @returns A Promise resolving to the highly compressed WebP Blob
	 */
	public async process(file: File, type: ImageType): Promise<Blob> {
		this.initWorker()

		const id = `job_${this.jobIdCounter++}`

		return new Promise((resolve, reject) => {
			this.jobs.set(id, { resolve, reject })
			this.worker?.postMessage({ id, file, type })
		})
	}
}

export const ImageService = new ImageProcessorService()
