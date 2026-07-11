const REGEX_URL_YOUTUBE =
	/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/watch\?(?:\S*&)?v=)([\w-]{11})(?:\S+)?$/i

type ValidatedYoutubeURL =
	| {
			isValid: false
	  }
	| {
			isValid: true
			videoId: string
	  }

function validateYoutubeURL(url: string): ValidatedYoutubeURL {
	const match = url.match(REGEX_URL_YOUTUBE)

	if (!match) return { isValid: false }
	else return { isValid: true, videoId: match[1] }
}

type YoutubeVideoDetails = {
	videoId: string
	title: string
	authorName: string
	thumbnailUrl: string
}

type YoutubeOEmbedURL = `https://www.youtube.com/oembed?url=${string}&format=json`

async function fetchYoutubeVideoDetails(url: string): Promise<YoutubeVideoDetails> {
	const validationResult = validateYoutubeURL(url)
	if (!validationResult.isValid) throw Error("URL is not a valid YouTube URL.")

	const videoId = validationResult.videoId
	const safeVideoUrl = encodeURIComponent(url)
	const oEmbedUrl: YoutubeOEmbedURL = `https://www.youtube.com/oembed?url=${safeVideoUrl}&format=json`

	try {
		const response = await fetch(oEmbedUrl)
		if (!response.ok) throw Error(`YouTube API returned status: ${response.status}`)

		const data = await response.json()
		return {
			videoId,
			title: data.title,
			authorName: data.author_name || "YouTube",
			thumbnailUrl: data.thumbnail_url.replace("hqdefault.jpg", "mqdefault.jpg"),
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw Error(`API returned an error for the given URL: ${error.message}`, { cause: error })
	}
}

export default fetchYoutubeVideoDetails
