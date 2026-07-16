import resize from "@jsquash/resize"
import { encode } from "@jsquash/webp"

interface WorkerContext {
	postMessage(message: unknown, transfer?: Transferable[]): void
	addEventListener(
		type: string,
		listener: (this: WorkerContext, ev: MessageEvent) => void,
		options?: boolean | AddEventListenerOptions,
	): void
}

const workerScope = self as unknown as WorkerContext

workerScope.addEventListener("message", async (event: MessageEvent) => {
	const { id, file, type } = event.data as { id: string; file: File; type: "cover" | "screenshot" }

	try {
		const bitmap = await createImageBitmap(file)

		const targetAspectRatio = type === "cover" ? 1 : 9 / 16
		const sourceAspectRatio = bitmap.width / bitmap.height

		let cropWidth = bitmap.width
		let cropHeight = bitmap.height
		let cropX = 0
		let cropY = 0

		if (sourceAspectRatio > targetAspectRatio) {
			cropWidth = bitmap.height * targetAspectRatio
			cropX = (bitmap.width - cropWidth) / 2
		} else if (sourceAspectRatio < targetAspectRatio) {
			cropHeight = bitmap.width / targetAspectRatio
			cropY = (bitmap.height - cropHeight) / 2
		}

		const canvas = new OffscreenCanvas(cropWidth, cropHeight)
		const ctx = canvas.getContext("2d")
		if (!ctx) throw new Error("Could not get 2d context for OffscreenCanvas")

		ctx.drawImage(bitmap, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)
		const imageData = ctx.getImageData(0, 0, cropWidth, cropHeight)

		const targetWidth = 1080
		const targetHeight = Math.round(targetWidth / targetAspectRatio)

		const resizedImageData = await resize(imageData, { width: targetWidth, height: targetHeight })
		const webpBuffer = await encode(resizedImageData)

		workerScope.postMessage({ id, status: "success", buffer: webpBuffer }, [webpBuffer])
	} catch (error) {
		workerScope.postMessage({ id, status: "error", error: error instanceof Error ? error.message : "Unknown error" })
	}
})
