import type { Dictionary } from "models/internal/locale"

export default {
	common: {
		labelCloseMenu: "Kapat",
		labelReturnHome: "Geri Dön",
		navbar: {
			ariaLabelLangSelect: "DOOMSCRLL'da kullanmak için bir dil seçin.",
			suffixReservationProgress: "DOOMLIT ayırtıldı.",
		},
	},
	reservation: {
		meta: {
			title: "DOOMSCRLL",
			description: "Projeni 24 saat sergilemek için bir DOOMLIT ayırt.",
		},
		profile: {
			labelAnon: "Giriş yapılmadı",
			menu: {
				labelProfile: "Hesap",
				labelDoomlits: "DOOMLIT'ler",
				labelSignout: "Çıkış yap",
			},
		},
		copy: "DOOMLIT için bir gün seç.",
		noReservationCopy:
			"Hmm... Görünüşe göre seçtiğin tarihte tüm DOOMLIT'ler alınmış. Takvimden başka bir gün seçebilir, ya da sonra ki aya göz atabilirsin.",
		cta: {
			suffixSlotInfo: "DOOMLIT ayırtıldı.",
			labelPreview: "Ayırtılan DOOMLIT'lere göz at",
			labelSignin: "DOOMLIT ayırtmak için giriş yap",
			labelReserve: "DOOMLIT ayırt",
		},
		reservationForm: {
			labelProjectName: {
				prefix: "Projenin adı",
				suffix: ".",
				placeholder: "Ona bir isim ver.",
			},
			labelCategory: {
				prefix: "Bu bir",
				suffix: "projesi.",
				placeholder: "Birini seç:",
			},
			labelPlatform: {
				prefix: "Projen",
				suffix: "platformunda.",
				placeholder: "Birini seç:",
			},
			labelPrimaryUrl: {
				prefix: "Bağlantısı",
				suffix: ".",
				placeholder: "Buraya yapıştır.",
			},
			labelReserve: "Öde ve bir DOOMLIT ayırt",
		},
		disclaimer: {
			infoEdit: "DOOMLIT'in yayınlanacağı tarihe kadar düzenlenebilir.",
			infoExpiration: "Eğer ücreti ödenmemişse, ayırtılan bir DOOMLIT 15 dakika sonra silinecektir.",
		},
		helpModal: {
			title: "Yardım",
			body: "Buradan, DOOMSCRLL projesi ve DOOMLIT'ler hakkında bilgi edinebilirsiniz.",
			footerPrefix: "Bir sorunuz varsa, ya da desteğe ihtiyacınız varsa, ulaşmaktan çekinmeyin:",
			topics: [{ title: "", body: "" }],
		},
		doomlitMenu: {
			copy: "Düzenlemek için bir DOOMLIT seç:",
			labelClose: "Kapat",
		},
	},
	preview: {
		meta: {
			titlePrefix: "DOOMLIT Önizlemesi",
			description: "Seçilen tarihte gösterilecek olan DOOMLIT'lerin önizlemesi.",
		},
		labelReservedSuffix: "DOOMLIT ayırtıldı",
		labelClose: "Kapat",
	},
	auth: {
		labelEmail: "Epostan nedir?",
		placeholderEmail: "Yalnızca epostan, lütfen.",
		ctaSignin: "Giriş yap",
		textInfo: "(Eğer epostanı tanınmıyorsa, yeni bir hesap oluşturulacaktır.)",
		labelOtp: "6-haneli doğrulama kodunu gir:",
		ctaVerify: "Doğrula",
	},
	profileMenu: {
		// TODO: Write strings for profile settings screen
	},
	projectMenu: {
		// TODO: Write strings for project details screen
	},
} satisfies Dictionary
