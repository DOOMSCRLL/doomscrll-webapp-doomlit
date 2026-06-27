// TODO: Implement help dialogs and relevant strings for each section. And maybe one FAQ dialog
export default {
	common: {
		labelCloseMenu: "Close",
		labelReturnHome: "Return",
		navbar: {
			ariaLabelLangSelect: "Choose a language to use DOOMSCRLL in.",
			suffixReservationProgress: "DOOMLITs reserved",
		},
	},
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
		calendar: {
			labelPrevious: "Previous month",
			labelNext: "Next month",
		},
		cta: {
			suffixSlotInfo: "DOOMLITs reserved for this date.",
			categoryDropdown: {
				label: "Select a category to preview.",
				placeholder: "Select a category.",
			},
			labelPreview: "Preview DOOMLITs",
			labelSignin: "Sign in to reserve a DOOMLIT",
			labelReserve: "Reserve your DOOMLIT",
		},
		noReservationCopy:
			"Hmm... It seems that all the DOOMLITs have been reserved for selected date. You can choose another date from the calendar, or take a look at next month.",
		reservationForm: {
			labelProjectName: {
				label: "Project's name is",
				placeholder: "Give it a name.",
			},
			labelCategory: {
				label: "It's category is",
				placeholder: "Choose a category.",
			},
			labelPlatform: {
				label: "It's primary platform is",
				placeholder: "Choose a platform.",
			},
			labelPrimaryUrl: {
				label: "It's URL is",
				placeholder: "Paste platform's URL here.",
			},
			labelReserve: "Pay & reserve a DOOMLIT",
		},
		disclaimer: {
			infoEdit: "A DOOMLIT can be edited before it's airing date.",
			infoExpiration: "If it's fee isn't paid, a reserved DOOMLIT will expire after 15 minutes.",
		},
		helpModal: {
			title: "Help",
			body: "You can find learn more about DOOMLITs and DOOMSCRLL project here.",
			footerPrefix: "If you have any questions or facing problems, don't hesitate to reach out:",
			topics: [{ title: "", body: "" }],
		},
		doomlitMenu: {
			copy: "Select a DOOMLIT to update:",
			labelClose: "Close",
		},
	},
	preview: {
		meta: {
			titlePrefix: "DOOMLIT Preview",
			description: "Preview of DOOMLITs that will be shown on the selected date.",
		},
		labelReservedSuffix: "DOOMLITs reserved",
		labelClose: "Close",
		tooltipInvalidMessage: "Hover over a project to preview it!",
	},
	auth: {
		meta: {
			title: "Log in | DOOMSCRLL",
			description: "Login to your DOOMSCRLL account.",
		},
		email: {
			label: "What is your email?",
			placeholder: "Just your email, please.",
			cta: "Log in",
			subtext: {
				newEmail: "If your email isn't recognized, a new account will be created.",
				accountInfo: "You don't need an account to use DOOMSCRLL, only to reserve and showcase projects.",
			},
		},
		otp: {
			label: "Type the 6-digit OTP that is sent to your email",
			placeholder: "******",
			cta: "Verify",
		},
	},
	profileMenu: {
		// TODO: Write strings for profile settings screen
	},
	projectMenu: {
		// TODO: Write strings for project details screen
	},
}
