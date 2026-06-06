import type { CATEGORIES } from "const/categories"

type Category = (typeof CATEGORIES)[number]

export type { Category as default }
