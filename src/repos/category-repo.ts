import { CATEGORIES, CATEGORY_LABELS } from "const/categories"
import { LOCALE_DEFAULT } from "const/locales"
import type Category from "models/category"
import type { Locale } from "models/internal/locale"

export function getCategoryLabelFor(category: Category, locale?: Locale): string {
	return CATEGORY_LABELS[category][locale ?? LOCALE_DEFAULT]
}

export function getCategories(): Category[] {
	return [...CATEGORIES]
}
