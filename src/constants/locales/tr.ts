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
		copy: "DOOMLIT için bir gün seç.",
		calendar: {
			labelPrevious: "Previous month",
			labelNext: "Next month",
		},
		noReservationCopy:
			"Hmm... Görünüşe göre seçtiğin tarihte tüm DOOMLIT'ler alınmış. Takvimden başka bir gün seçebilir, ya da sonra ki aya göz atabilirsin.",
		cta: {
			suffixSlotInfo: "DOOMLIT ayırtıldı.",
			categoryDropdown: {
				label: "Önizleme için bir kategori seç.",
				placeholder: "Bir kategori seç.",
			},
			labelPreview: "Ayırtılan DOOMLIT'lere göz at",
			labelSignin: "DOOMLIT ayırtmak için giriş yap",
			labelReserve: "DOOMLIT ayırt",
		},
		reservationForm: {
			labelProjectName: {
				label: "Projenin ismi",
				placeholder: "Projene bir isim ver.",
			},
			labelCategory: {
				label: "Kategorisi",
				placeholder: "Bir kategori seç.",
			},
			labelPlatform: {
				label: "Yayınlandığı birincil platform",
				placeholder: "Bir platform seç.",
			},
			labelPrimaryUrl: {
				label: "Platform bağlantısı",
				placeholder: "Platformun bağlantısını buraya yapıştır.",
			},
			labelReserve: "Öde ve bir DOOMLIT ayırt.",
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
		tooltipInvalidMessage: "Önizlemek için bir projenin üzerinde dur!",
	},
	auth: {
		meta: {
			title: "Giriş yap | DOOMSCRLL",
			description: "DOOMSCRLL hesabına giriş yap.",
		},
		email: {
			label: "Epostan nedir?",
			placeholder: "Yalnızca eposta lütfen.",
			cta: "Giriş yap",
			subtext: {
				newEmail: "Eğer epostan tanınmazsa, adınıza yeni bir hesap oluşturulacaktır.",
				accountInfo:
					"DOOMSCRLL'u kullanmak için bir hesaba ihtiyacınız yok. Hesaplar yalnızca projelerinize yer ayırtıp onları sergilemek için gerekir.",
			},
		},
		otp: {
			label: "Epostana gönderilen 6 haneli doğrulama kodunu gir",
			placeholder: "******",
			cta: "Doğrula",
		},
	},
	profileMenu: {
		popover: {
			labelAnon: "Giriş Yapılmadı",
			labelSettings: "Hesap Ayarları",
			labelProjects: "Senin DOOMLIT'lerin",
			labelLogout: "Çıkış Yap",
		},
	},
	projectMenu: {},
} satisfies Dictionary
