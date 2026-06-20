// TODO: Implement help dialogs and relevant strings for each section. And maybe one FAQ dialog
export default {
	reservation: {
		meta: {
			title: "DOOMSCRLL",
			description: "Reserve a day to DOOMLIT your project for 24 hours.",
		},
		profile: {
			labelAnon: "Not signed in.",
			menu: {
				labelProfile: "Profile",
				labelDoomlits: "DOOMLITs",
				labelSignout: "Sign out",
			},
		},
		copy: "Reserve a day to DOOMLIT your project.",
		cta: {
			suffixSlotInfo: "DOOMLITs reserved for this date.",
			labelPreview: "Preview reserved DOOMLITs",
			labelSignin: "Sign in to reserve a DOOMLIT",
			labelReserve: "Reserve your DOOMLIT",
		},
		noReservationCopy:
			"Hmm... It seems that all the DOOMLITs have been reserved for selected date. You can choose another date from the calendar, or take a look at next month.",
		reservationForm: {
			labelProjectName: {
				prefix: "Name of the project is",
				suffix: ".",
				placeholder: "Give it a name.",
			},
			labelCategory: {
				prefix: "It's a",
				suffix: "project.",
				placeholder: "Choose one:",
			},
			labelPlatform: {
				prefix: "Project is on",
				suffix: "platform.",
				placeholder: "Choose one:",
			},
			labelPrimaryUrl: {
				prefix: "URL is",
				suffix: ".",
				placeholder: "Paste here.",
			},
			labelReserve: "Pay & reserve a DOOMLIT",
		},
		disclaimer: {
			infoEdit: "A DOOMLIT can be edited before it's airing date.",
			infoExpiration: "If it's fee isn't paid, a reserved DOOMLIT will expire after 15 minutes.",
		},
		doomlitMenu: {
			copy: "Select a DOOMLIT to update:",
			labelClose: "Close",
		},
	},
	preview: {
		labelReservedSuffix: "DOOMLITs reserved",
		labelClose: "Close",
	},
	auth: {
		labelEmail: "What is your email?",
		placeholderEmail: "Just your email, please.",
		ctaSignin: "Sign in",
		textInfo: "(If your email isn't recognized, a new account will be created.)",
		labelOtp: "Write the 6-digit OTP here:",
		ctaVerify: "Verify",
	},
	profileMenu: {
		// TODO: Write strings for profile settings screen
	},
	projectMenu: {
		// TODO: Write strings for project details screen
	},
}
