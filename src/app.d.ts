// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Locale } from "models/internal/locale"

// for information about these interfaces
declare global {
	interface Window {
		createLemonSqueezy?: () => void
		LemonSqueezy?: {
			Setup: (config: any) => void
			Refresh: () => void
			Url: { Open: (url: string) => void }
		}
	}

	namespace App {
		interface Platform {
			env: Env
			ctx: ExecutionContext
			caches: CacheStorage
			cf?: IncomingRequestCfProperties
		}

		interface Error {
			message: string
			code?: string
		}

		interface Locals {
			locale: Locale
		}
		// interface PageData {}
		// interface PageState {}
	}
}

export {}
