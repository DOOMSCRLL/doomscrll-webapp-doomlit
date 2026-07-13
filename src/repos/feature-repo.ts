import FEATURES from "const/features"
import type Category from "models/category"

export default function getFeaturesFor(category: Category): string[] {
	return FEATURES[category]
}
