import ctsr, { MARKER_NEWLINE } from "utils/condense-string"

export default {
	common: {
		labelCloseMenu: "Close",
		labelReturnHome: "Return",
		navbar: {
			ariaLabelLangSelect: "Choose a language to use DOOMSCRLL in.",
			suffixReservationProgress: "DOOMLITs reserved",
			labelActiveDraftWarning: "See Active Drafts",
		},
		copyableText: {
			status: {
				labelCopied: "Text copied to clipboard.",
				labelFailed: "Failed to copy the text.",
			},
			labelInstructions: "Click to copy this text to your clipboard.",
		},
	},
	errorPage: {
		header: "Hey, you found an error!",
		labelReturn: "Return home",
	},
	reservation: {
		meta: {
			title: "DOOMSCRLL",
			description: "Reserve a day to DOOMLIT your project for 24 hours.",
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
			inputProjectName: {
				label: "Project's name is",
				placeholder: "Give it a name.",
			},
			inputCategory: {
				label: "It's category is",
				placeholder: "Choose a category.",
			},
			inputPlatform: {
				label: "It's primary platform is",
				placeholder: "Choose a platform.",
			},
			inputPrimaryUrl: {
				label: "It's URL is",
				placeholder: "Paste platform's URL here.",
			},
			labelReserve: "Reserve a draft",
			labelCancel: "Cancel",
		},
		activeDraftWarning: {
			title: "You have a DOOMLIT draft waiting!",
			body: ctsr`You have reserved a DOOMLIT, but it won't be confirmed until it's fee is paid. DOOMLIT drafts expire after 15 minutes.
        ${MARKER_NEWLINE}You can either cancel this draft to remove it, or you can proceed to the confirmation page, where you can preview details of
        your draft and pay it's fee.`,
			labelCancel: "Cancel & remove the draft",
			labelProceed: "Proceed to review and payment",
		},
		disclaimer: {
			infoEdit: "A DOOMLIT can be edited before it's airing date.",
			infoExpiration: "If it's fee isn't paid, a reserved DOOMLIT will expire after 15 minutes.",
		},
		labelHelpButton: "You can find learn more about DOOMLITs and DOOMSCRLL project here.",
		doomlitMenu: {
			copy: "Select a DOOMLIT to update:",
			labelClose: "Close",
		},
	},
	payment: {
		meta: {
			titlePrefix: "Confirm Reservation For",
			description: "From here, you can complete your DOOMLIT reservation by completing it's payment.",
		},
		copy: "You can review your DOOMLIT's details here. If everything looks fine, you can proceed with your payment.\nAfter the payment you can update your DOOMLIT from the profile menu to add more information regarding it.",
		details: {
			labelReservationDate: "Showcase Date",
			labelProjectName: "Project Name",
			labelCategory: "Category",
			labelAuthor: "Created By",
			labelRefId: "Reference ID",
		},
		actions: {
			labelCancel: "Cancel",
			labelProceed: "Proceed to payment",
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
		popover: {
			labelAnon: "Not signed in.",
			labelSettings: "Profile Settings",
			labelProjects: "Your DOOMLITs",
			labelLogout: "Log out",
		},
		settings: {
			username: {
				label: "Username",
				placeholder: "Choose an username.",
			},
			description: {
				label: "Description (optional)",
				placeholder: "Write a description for your profile. (Optional)",
			},
			url: {
				label: "Website (optional)",
				placeholder: "Paste your website, social links, whatever. (Optional)",
			},
			labelCta: "Update your profile",
			subtext: {
				infoValidUpdates: "You can update your user name, description or website; but can't update your email.",
				infoUsername: "If your account is new, you need to choose an user name for yourself.",
			},
		},
	},
	projectMenu: {
		// TODO: Write strings for project details screen
	},
	helpMenu: {
		title: "Help Topics",
		body: "You can learn more about the DOOMSCRLL project, and find FAQ.",
		topics: [
			{
				label: "What is DOOMSCRLL?",
				body: ctsr`The DOOMSCRLL® is a platform for independent creators of all kinds (indie devs, artists, FOSS devs,
          local businesses, etc.) to showcase their projects, to an audience of their own, without an algorithm. It works
          with DOOMLITs, which are daily slots for creators to showcase their project on.`,
			},
			{
				label: "Who is building DOOMSCRLL®? And why did you built it?",
				body: ctsr`DOOMSCRLL®, and all related software, branding, brand assets are designed and built by me, Yakup Murat Çaylak.
          I felt the need of a platform, where I can explore without an algorithm picking songs, movies and games for me
          , and sponsorships and ads taking priority over my preferences and tastes. Also, considering mentioned issue,
          independent creators of all kinds need a platform to showcase their work, and there is an audience that want to
          explore such projects. So I built(ing) DOOMSCRLL®, for independent creators, and an audience that wants to explore
          independent projects, without being bound by corporate non-sense. I will do my best to maintain and develop this
          platform, and related projects.`,
			},
			{
				label: "What is a DOOMLIT?",
				body: ctsr`A DOOMLIT® is a 24-hour showcase for your project. For each day, there is a limited amount of DOOMLITs
          available (256 per day) for each day, ensuring that each project gets visibility on audience app. A DOOMLIT can
          be reserved, and after reservation is confirmed by payment, can be updated before it's showcase date.
          Each DOOMLIT® is ephemeral, meaning after the showcase day, they get removed from the servers. To prevent abuse, DOOMSCRLL®
          uses an archive system, which it uses to enforce given rules for projects showcased on DOOMSCRLL®: First, a creator
          can reserve one DOOMLIT per two weeks, meaning at most two DOOMLITs per month. Second, a project can not be reserved
          again for two weeks. This also means that a project can be showcased at most for two times per month.`,
			},
			{
				label: "Is DOOMSCRLL free?",
				body: ctsr`DOOMSCRLL® website and related apps are FREE TO USE for users who want to explore indie projects in
          their niche, and doesn't require an account to use. As for creators, reserving a DOOMLIT has a small fee, noted
          on the reservation page.`,
			},
			{
				label: "Do I need an account to use it?",
				body: "No. You can use DOOMSCRLL® website and apps for free, without an account, to view and explore showcased projects.",
			},
			{
				label: "How do I explore projects on DOOMSCRLL®?",
				body: ctsr`On DOOMSCRLL®, each day has a limited amount of DOOMLIT® slots (256 per day), meaning that each day
          you will see new projects, brought to you without interference of ads, sponsors, algorithm, etc. And each DOOMLIT®
          has a category, and related "tags", so you can find what you are looking for by filtering. Otherwise, you will
          be presented with a randomly ordered selection of projects under the selected category.`,
			},
			{
				label: "How does DOOMSCRLL® curate projects?",
				body: ctsr`Well, it doesn't! projects showcased on DOOMSCRLL® are only shown for 24-hours, on the day their creator
          chooses. For each day, you will be able to see all the projects of that day, in a randomized feed. You can also use
          tags for filtering for your favorite niches, features or platforms.`,
			},
			{
				label: "Does DOOMSCRLL use an algorithm to drive exploration/curations?",
				body: "No! There is nothing to intervene with your exploration, or with visibility of your projects.",
			},
			{
				label: "How do I showcase my project on DOOMSCRLL?",
				body: ctsr`If you are a creator, you can reserve a DOOMLIT for 24-hours, in a day you choose, just for 1$. Each
          day has limited slots (256 per day) available.`,
			},
			{
				label: "How does DOOMLIT reservation work?",
				body: ctsr`Once registered and logged in to your creator account from DOOMLIT® panel (doomlit.doomscrll.com),
          you can choose a day from the calendar, look at the available slots for each day, and even preview already reserved
          projects. After choosing a day, and creating a reservation draft by entering the primary information regarding your
          project (category, name, primary platform, and platform URL), you reserve a slot for your project. After the reservation
          fee is paid, draft will be completed, and you will be able to see and update it's information. For your project to
          be ready to showcase, you will need to add further information from DOOMLITs page of your profile. Your DOOMLIT
          can be managed and updated until it's showcase date. Lastly, if reservation fee isn't paid in 15 minutes, your
          reservation draft will be deleted.`,
			},
			{ label: "What is the price of a DOOMLIT reservation?", body: "Only 1$." },
			{
				label: "What are the rules of DOOMLIT reservations?",
				body: ctsr`First, a profile can reserve one DOOMLIT® per two-weeks. Meaning at most, a creator can showcase two projects
          per month. Second, a project can not be showcased for two-weeks after it's DOOMLIT® date. These rules are enforced
          by an archive system on the server. And last, a DOOMLIT® can not be used to showcase material that is illegal, or immoral.
          What is being reserved on the DOOMSCRLL® is observed and maintained manually.`,
			},
			{
				label: "What payment methods I can use for DOOMLIT reservations?",
				body: "Right now, you can use your credit card to reserve a DOOMLIT. Your receipt will be delivered to the email address you used for reservation.",
			},
			{
				label: "Where can I find my receipt after my reservation?",
				body: "It will be delivered to the email you used for reservation.",
			},
			{
				label: "Can I update a DOOMLIT® after reservation?",
				body: "You can update details a DOOMLIT®, cancel it, or ask for it to be delayed. We will always be happy to help you.",
			},
			{ label: "Can I cancel a DOOMLIT?", body: "Yes. You can cancel any DOOMLIT before it's showcase date." },
			{
				label: "What types of projects can I showcase on DOOMSCRLL?",
				body: ctsr`Right now, DOOMSCRLL supports these categories of projects, with support for a wide array of platforms for
          each category, and social and crowdfunding platforms: "Video Games, Tabletop Games, Software & Tools, Digital Assets
          Publishing, Audio, Video, Goods, Food, and Local Businesses". If you would like to see another kind of project
          on DOOMSCRLL®, please let us know!`,
			},
			{
				label: "How do I manage my profile as a creator?",
				body: "You can visit profile settings page by going into the profile menu from your avatar at top.",
			},
			{
				label: "Which platforms DOOMSCRLL supports?",
				body: "DOOMSCRLL® supports a wide array of platforms for each category, where your links will be branded with platform's logo.",
			},
			{
				label: "How is my data handled and stored?",
				body: ctsr`Website and apps designed for the audience doesn't require an account to use, and DOOMSCRLL® doesn't collect
          any other information from you or your device, and we don't show ads, or take sponsorships. As for creators, nothing
          besides the information required to identify your profile and projects are stored on the servers. And for project,
          only the uniquely identifying information is stored on the archive, to enforce rules and prevent abuse of DOOMSCRLL® rules.
          If you want your profile to be removed, please reach out. We are happy to help.`,
			},
			{ label: "How do I contact you?", body: "You can email us at hello@doomscrll.com" },
			{
				label: "Where can I find the Terms of Service?",
				body: "Please refer to this address: doomscrll.com/legal.txt",
			},
		],
		footer: {
			contentContactPrefix: "If you have any questions, don't hesitate to reach out:",
			contentLegalPrefix: "For legal information, and trademarks, refer to:",
		},
	},
}
