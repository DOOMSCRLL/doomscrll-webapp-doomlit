import type { Dictionary } from "models/internal/locale"
import ctsr, { MARKER_NEWLINE } from "utils/condense-string"

export default {
	common: {
		labelCloseMenu: "Kapat",
		labelReturnHome: "Geri Dön",
		labelExternalIconSuffix: "platformunun logosu.",
		navbar: {
			ariaLabelLangSelect: "DOOMSCRLL'da kullanmak için bir dil seçin.",
			ariaLabelHelp: "Yardım menüsünü aç.",
			suffixReservationProgress: "DOOMLIT ayırtıldı.",
			labelActiveDraftWarning: "Aktif Taslakları Gör",
		},
		copyableText: {
			ariaLabelCopy: "Sorgu kodunu kopyalamak için buraya tıkla.",
			status: {
				labelCopied: "Metin panona kopyalandı.",
				labelFailed: "Metin kopyalanamadı.",
			},
			labelInstructions: "Metni panona kopyalamak için buraya tıkla.",
		},
		labelTooltip: "Fareni bu düğmenin üzerine getirerek bağlı araç ipuçlarını görebilirsin.",
		dataChips: {
			tagChip: {
				labelRemove: "Seçili etiketi projeden kaldırmak için tıkla.",
			},
			platformChip: {
				labelRemove: "Seçili platformu projeden kaldırmak için tıkla.",
			},
			featureChip: {
				labelRemove: "Seçili özelliği projeden kaldırmak için tıkla.",
			},
		},
		headerSpinnerModal: ctsr`Projen güncelleniyor, lütfen bu pencereyi kapatma.${MARKER_NEWLINE}Yalnızca birkaç saniye alacak!`,
	},
	errorPage: {
		header: "Aha, bir hata yakaladın!",
		labelReturn: "Ana sayfaya dön",
	},
	reservation: {
		meta: {
			title: "DOOMSCRLL",
			description: "Projeni 24 saat sergilemek için bir DOOMLIT ayırt.",
		},
		copy: "DOOMLIT için bir gün seç.",
		calendar: {
			labelPrevious: "Önceki ay",
			labelNext: "Sonraki ay",
			textNotInteractiveWarn: "DOOMLIT ayırtma formu açıkken, seçilen tarihi değiştiremezsin.",
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
			inputProjectName: {
				label: "Projenin ismi",
				placeholder: "Projene bir isim ver.",
			},
			inputCategory: {
				label: "Kategorisi",
				placeholder: "Bir kategori seç.",
			},
			inputPlatform: {
				label: "Yayınlandığı birincil platform",
				placeholder: "Bir platform seç.",
			},
			inputPrimaryUrl: {
				label: "Platform bağlantısı",
				placeholder: "Platformun bağlantısını buraya yapıştır.",
			},
			labelReserve: "Taslağı kaydet",
			labelCancel: "Vazgeç",
		},
		activeDraftWarning: {
			title: "Halihazırda bekleyen bir DOOMLIT taslağın var!",
			body: ctsr`Bir DOOMLIT ayırttın fakat o, ücreti ödenene kadar onaylanmayacak. DOOMLIT taslakları 15 dakika sonra silinir.
        &NewLine;İstersen taslağı iptal ederek onu silebilirsin, ya da onay sayfasına devam edebilirsin. Orada DOOMLIT taslağını
        inceleyebilir ve ödemesini yapabilirsin.`,
			labelCancel: "İptal et ve taslağı sil",
			labelProceed: "İnceleme ve ödeme sayfasına git",
			postExpiration: {
				title: "Ah! Taslağının süresi doldu...",
				body: ctsr`Her DOOMLIT taslağı, ücreti ödenmediği takdirde, 15 dakika sonra sistemden silinir.
        ${MARKER_NEWLINE}Bu bildirimi kapatarak ana sayfaya dönebilirsin.`,
				labelReturn: "Ana sayfaya dön",
			},
		},
		reservationSuccessModal: {
			title: "DOOMLIT rezervasyonun onaylandı!",
			body: ctsr`DOOMLIT rezervasyonun ve ödemen onaylandı.${MARKER_NEWLINE}Gösterim tarihine kadar, DOOMLIT'ini
          inceleyebilir ve güncelleyebilirsin. Bunun için hesap menüsünden DOOMLIT'lerim bölümünü tıklayabilirsin.
          ${MARKER_NEWLINE}Ayrıca, DOOMLIT'inin gösterime hazır olduğundan emin olmak için eksik kalan bilgileri
          doldurmayı unutma.`,
		},
		disclaimer: {
			infoEdit: "DOOMLIT'in yayınlanacağı tarihe kadar düzenlenebilir.",
			infoExpiration: "Eğer ücreti ödenmemişse, ayırtılan bir DOOMLIT 15 dakika sonra silinecektir.",
		},
		labelHelpButton: "Buradan, DOOMSCRLL projesi ve DOOMLIT'ler hakkında bilgi edinebilirsiniz.",
		doomlitMenu: {
			title: "Düzenlemek için bir DOOMLIT seç:",
			copy: "DOOMLIT yönetim sayfasından DOOMLIT'lerini görebilir ve düzenleyebilir, ayrıntılarını güncelleyebilir, referans tanımlayıcısını öğrenebilir, ya da gösterimi iptal edebilirsin.",
			noProjectsCopy:
				"Görünüşe göre hiç DOOMLIT'in yok. Eğer bekleyen bir taslağın varsa, süresi dolmadan önce ödemesini yaptığından emin ol. Sonrasında onu burada görebilirsin.",
			labelClose: "Kapat",
		},
		statusAlerts: {
			labelClose: "Bildirimi Kapat",
			cancellation: {
				success: {
					title: "İptal Başarılı",
					body: "DOOMLIT taslağını başarıyla iptal ettin. Bu bildirimi kapatabilirsin.",
				},
				failure: { title: "İptal Başarısız" },
				error: { title: "İptal Sırasında Bir Hata Oluştu", bodyPrefix: "Hata:" },
			},
			reservation: {
				failure: { title: "Yer Ayırtma Başarısız" },
				error: { title: "Yer Ayırtırken Bir Hata Oluştu" },
			},
		},
	},
	payment: {
		meta: {
			titlePrefix: "Reservasyon Onayı",
			description: "Buradan, DOOMLIT'in için yaptığın rezervasyonu, rezervasyon ücretini ödeyerek tamamlayabilirsin.",
		},
		copy: ctsr`Buradan DOOMLIT taslağınızı inceleyebilirsin. Her şey olması gerektiği gibiyse, ödeme ekranına geçebilirsin.
        ${MARKER_NEWLINE}Ödemesini yaptıktan sonra DOOMLIT'ini güncellemek için hesap menüsünden DOOMLIT menüsünü ziyaret edebilirsin.`,
		copyExpiration: "Taslağın süresi doldu. Ana sayfaya dönmek için aşağıdaki düğmeyi kullanabilirsin.",
		details: {
			labelReservationDate: "Gösterim Tarihi",
			labelProjectName: "Proje Adı",
			labelCategory: "Kategori",
			labelAuthor: "Yaratıcısı",
			labelRefId: "Referans ID",
		},
		actions: {
			labelCancel: "Cancel",
			labelProceed: "Proceed to payment",
			labelReturn: "Geri dön",
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
	doomlits: {
		meta: { description: "Bu sayfadan, ayırttığın DOOMLIT'i görüntüleyebilir ve düzenleyebilirsin." },
		projectStatusLabels: {
			incomplete: "Eksik",
			ready: "Gösterime hazır",
		},
		manage: {
			label: "Yönet",
			actions: {
				labelReschedule: "Tarih Değiştir",
				labelRefund: "İptal ve İade",
				labelSupport: "Desteğe Ulaş",
			},
		},
		statusModals: {
			inProgress: {
				header: "Projen güncelleniyor",
				body: "Bir kaç saniye ver...",
			},
			complete: {
				headerError: "Bir şeyler ters gitti...",
				headerSuccess: "Güncelleme tamamlandı!",
			},
			cta: {
				success: "Kapat",
				fail: "Geri dön",
			},
		},
		projectForm: {
			labelCtaUpdate: "Güncelle",
			name: {
				label: "Projenin adı",
				placeholder: "Projene bir isim ver!",
			},
			refId: {
				label: "Sorgu kodu",
			},
			category: {
				label: "Proje kategorisi",
				placeholder: "Proje için bir kategori seçmelisin.",
			},
			tags: {
				label: {
					text: "Proje etiketleri",
					placeholder: "Bir etiket ara.",
					instructions: "max. 5",
				},
				tooltip: ctsr`• Seçtiğin etiketler, kullanıcıların projeni bulmasına yardımcı olur.
          ${MARKER_NEWLINE}• Kullanıcılar, etiketleri kullanarak projeleri süzebilir ve tür, özellik ya da temalarına göre arama ayırabilir.
          ${MARKER_NEWLINE}• Bir proje en fazla 5 etikete sahip olabilir.`,
				dropdown: {
					labelTagGroup: "Etiketler",
					labelEmptyQuery: "Hiçbir etiket bulunamadı.",
				},
			},
			platforms: {
				label: {
					text: "Hangi platformlarda yayında?",
					placeholder: "Platform seç",
				},
				tooltip: ctsr`• Buradan, kullanıcıların projene ulaşabileceği platformları ekleyebilirsin.
          ${MARKER_NEWLINE}• Seçtiğin kategoriye ait bir platform, ya da bir sosyal medya veya kitle fonlaması platformu ekleyebilirsin.
          ${MARKER_NEWLINE}• Bir platform eklemek için, o platformdan projene ulaşılabilecek bir bağlantı girmelisin.
          ${MARKER_NEWLINE}• Kullanıcılar proje sayfasında bu bağlantılara erişebilirler.`,
				errorMessages: {
					invalidPlatformUrl: "The platform URL is invalid.",
				},
				dropdown: {
					label: "Projenin yayınlandığı platform",
					placeholder: "Kullanıcıların projene ulaşabileceği bir platform seç.",
					labelPlatformGroup: {
						social: "Sosyal Medya",
						crowdfunding: "Halk Fonlaması",
					},
					labelEmptyQuery: "Hiçbir platform bulunamadı.",
				},
				urlInput: {
					label: "Platform bağlantısını buraya yaz",
					placeholder: "https://s.team/a/",
				},
				cta: "Ekle",
			},
			features: {
				label: {
					text: "Projene ait özellikleri seç",
					placeholder: "Bir özellik ara.",
				},
				tooltip: ctsr`• Seçenekler arasından, projenin sahip olduğu özellikleri seçebilirsin.
          ${MARKER_NEWLINE}• Kullanıcılar özellikleri kullanarak projeleri süzebilir.
          ${MARKER_NEWLINE}• Özellikler proje sayfasında görünür.`,
				dropdown: {
					labelFeatGroup: "Özellikler",
					labelEmptyQuery: "Hiçbir özellik bulunamadı.",
				},
			},
			allImgSelectStatus: {
				fileTooLarge: "Seçtiğin görüntü çok büyük! (maks. 10MB)",
				tooManyFiles: "Çok fazla görüntü seçtin. Yalnızca ilk 8 görüntü yüklenecek.",
				internalError: "Görüntülerini işleyemiyoruz... Lütfen yeniden yüklemeyi dene.",
			},
			coverImg: {
				label: "Bir kapak fotoğrafı yükle",
				placeholder: "En boy oranı kare olan bir görüntü yükle. Bu görüntü, projenin kapağında görünecek.",
				instructions: "1:1, max. 10MB",
				tooltip: ctsr`• Kapak fotoğrafı, proje akışında görünecektir.
          ${MARKER_NEWLINE}• Seçilen kapak fotoğrafı 1:1 en-boy oranında olmalı, değilse kırpılacaktır.
          ${MARKER_NEWLINE}• Görüntünün en ve boyu ideal olarak 1080x1080 ya da daha fazla olmalı. Gerektiğinde fotoğraf yeniden boyutlandırılacaktır.
          ${MARKER_NEWLINE}• Görüntünün dosya boyutu 10MB'dan az olmalı.
          ${MARKER_NEWLINE}• Görüntü sunucuya yüklenmeden önce sıkıştırılacak, bu görüntü kalitesini etkilemeyecektir.`,
			},
			description: {
				label: "Projeni anlat",
				placeholder: "Dünyaya projeni anlat!",
				instructions: "max. 256 karakter",
				errorMessages: {
					descTooLong: "Açıklama çok uzun. (maks. 256 karakter)",
				},
			},
			video: {
				label: "YouTube'dan tanıtım videosu",
				placeholder: "Videonun bağlantısını buraya yapıştır!",
				instructions: "YouTube bağl.",
				status: {
					invalidUrl: "Girdiğin adres geçerli bir YouTube bağlantısı değil.",
					unavailable: "Video bulunamadı. Lütfen girdiğin adresi kontrol et.",
					internalError: "Bir hata oluştu. Lütfen girdiğin adresi kontrol et.",
				},
			},
			screenshots: {
				label: "Bir kaç ekran görüntüsü ekle",
				placeholder: "Proje ile ilgili görüntüler ekle; ekran görüntüleri, hikayeler, pazarlama görselleri...",
				instructions: "9:16, max 10MB, max. 8 gör.",
				tooltip: ctsr`• Ekran görüntüleri proje bilgileri ekranında görünecektir.
          ${MARKER_NEWLINE}• Seçilen ekran görüntüleri 9:16 en-boy oranında olmalı, değilse kırpılacaklar.
          ${MARKER_NEWLINE}• Görüntülerin en ve boyu ideal olarak 1080x1920 ya da daha fazla olmalı. Gerektiğinde fotoğraflar yeniden boyutlandırılacaktır.
          ${MARKER_NEWLINE}• Görüntülerin dosya boyutu 10MB'dan az olmalı.
          ${MARKER_NEWLINE}• Görüntüler sunucuya yüklenmeden önce sıkıştırılacak, bu görüntü kalitesini etkilemeyecektir.`,
			},
		},
		imgPreview: {
			cta: {
				expand: "Buraya tıklayarak görüntüyü tam boyutlu olarak görebilirsin.",
				remove: "Buraya tıklayarak görüntüyü projeden silebilirsin.",
			},
			coverImg: {
				alt: "Projenin kapak görüntüsü.",
			},
			ssImg: {
				alt: "Projenin ekran görüntülerinden biri.",
			},
			modal: {
				title: "Buradan seçtiğin görüntünün önizlemesini tam boyutlu olarak görebilirsin.",
				imgAlt: "Seçilen görüntünün tam boyutlu önizlemesi",
				labelClose: "Önizlemeyi kapat",
			},
		},
		videoPreview: {
			tooltip: ctsr`Projeni gösteren bir video yüklemek için videoyu öncelikle YouTube'a yükleyip, sonra bağlantısını
          buraya yapıştırmalısın.${MARKER_NEWLINE}Video liste dışı ya da herkese açık olabilir.`,
			altThumbnail: "Seçtiğin YouTube videosunun önizleme görseli.",
			labelYoutubeAnchor: "İlgili videoyu yeni sekmede aç.",
		},
	},
	doomlitReschedule: {
		meta: {
			titlePrefix: "Yeniden Planla",
			description: "Bu sayfadan, projenin gösterim tarihini gelecekteki bir tarihle değiştirebilirsin.",
		},
		labelPrevDate: "Mevcut gösterim tarihi",
		labelSuffixReserv: "DOOMLIT ayırtıldı.",
		actions: {
			labelBack: "İptal et",
			labelInvalid: "Geçersiz tarih",
			labelValid: "Yeniden Planla",
		},
		statusMsg: {
			success: {
				title: "Yeniden planlama başarılı!",
				body: "Projenin gösterim tarihi başarıyla güncellendi. Aşağıdaki düğmeye tıklayarak proje sayfasına dönebilirsin.",
			},
			fail: {
				title: "Yeniden planlama başarısız",
				body: "Projenin gösterim tarihi güncellenemedi. Lütfen tarihi kontrol et ve geçerli bir tarih seçtiğinden emin ol.",
			},
			error: {
				title: "Beklenmedik hata",
				body: "Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar dene.",
			},
			action: {
				labelClose: "Kapat",
				labelReturn: "Geri dön",
			},
		},
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
		settings: {
			username: {
				label: "Kullanıcı Adı",
				placeholder: "Bir kullanıcı adı seç.",
			},
			description: {
				label: "Hakkımda (isteğe bağlı)",
				placeholder: "Kendinden bahset, projelerinden bahset... (İsteğe bağlı)",
			},
			url: {
				label: "Websiten (isteğe bağlı)",
				placeholder: "Websiteni, sosyal medyanı, ne istersen onu yaz. (İsteğe bağlı)",
			},
			labelCta: "Hesabını güncelle",
			subtext: {
				infoValidUpdates:
					"Kullanıcı adını, hakkımda metnini ve website bağlantını güncelleyebilirsin; fakat epostanı değiştiremezsin.",
				infoUsername: "Hesabın yeniyse, kendine bir kullanıcı adı seçmen gerekiyor.",
			},
		},
	},
	helpMenu: {
		title: "Yardım Konuları",
		body: "DOOMSCRLL projesi hakkında daha fazla şey öğrenebilir, SSS'ye bakabilirsin.",
		topics: [
			{
				label: "DOOMSCRLL nedir?",
				body: ctsr`DOOMSCRLL®, her türden bağımsız yaratıcının (bağımsız geliştiriciler, sanatçılar, özgür yazılım geliştiricileri,
          yerel işletmeler vb.) projelerini bir algoritma olmadan doğrudan kendi kitlesine sergileyebileceği bir platformdur.
          Yaratıcıların projelerini sergilemesi için günlük yuvalar olan DOOMLIT'ler ile çalışır.`,
			},
			{
				label: "DOOMSCRLL®'ü kim geliştiriyor? Ve neden geliştirdin?",
				body: ctsr`DOOMSCRLL® ve ilgili tüm yazılımlar, markalama ve marka varlıkları benim tarafımdan, Yakup Murat Çaylak tarafından
          tasarlanıp geliştiriliyor. Şarkıları, filmleri ve oyunları benim yerime seçen bir algoritmanın olmadığı,
          sponsorlukların ve reklamların tercihlerimin ve zevklerimin önüne geçmediği bir platforma ihtiyaç duydum. Ayrıca,
          bahsedilen bu sorun göz önüne alındığında, her türden bağımsız yaratıcının işlerini sergileyecek bir platforma ihtiyacı
          var ve bu tür projeleri keşfetmek isteyen bir kitle de mevcut. Bu yüzden DOOMSCRLL®'ü, şirketlerin saçmalıklarına bağlı
          kalmadan bağımsız projeleri keşfetmek isteyen bir kitle ve bağımsız yaratıcılar için kurdum (kuruyorum). Bu platformu
          ve ilgili projeleri sürdürmek ve geliştirmek için elimden geleni yapacağım.`,
			},
			{
				label: "DOOMLIT nedir?",
				body: ctsr`Bir DOOMLIT®, projen için 24 saatlik bir vitrindir. Her gün için, izleyici uygulamasında her projenin görünürlük
          kazanmasını sağlayan sınırlı sayıda DOOMLIT (günde 256 adet) mevcuttur. Bir DOOMLIT rezerve edilebilir ve ödeme ile
          onaylandıktan sonra sergilenme tarihinden önce güncellenebilir. Her DOOMLIT® geçicidir, yani sergilendiği günün
          ardından sunuculardan silinirler. Kötüye kullanımı önlemek amacıyla DOOMSCRLL®, platformda sergilenen projelere yönelik
          kuralları uygulamak için bir arşiv sistemi kullanır: Birincisi, bir yaratıcı iki haftada bir DOOMLIT rezerve edebilir,
          yani ayda en fazla iki DOOMLIT. İkincisi, bir proje iki hafta boyunca tekrar rezerve edilemez. Bu aynı zamanda
          bir projenin ayda en fazla iki kez sergilenebileceği anlamına gelir.`,
			},
			{
				label: "DOOMSCRLL ücretsiz mi?",
				body: ctsr`DOOMSCRLL® web sitesi ve ilgili uygulamaları, kendi alanlarındaki bağımsız projeleri keşfetmek isteyen kullanıcılar
          için KULLANIMI ÜCRETSİZDİR ve kullanmak için bir hesap gerektirmez. Yaratıcılar için ise, rezervasyon sayfasında
          belirtildiği gibi bir DOOMLIT rezerve etmenin küçük bir ücreti vardır.`,
			},
			{
				label: "Kullanmak için bir hesaba ihtiyacım var mı?",
				body: ctsr`Hayır. Sergilenen projeleri görüntülemek ve keşfetmek için DOOMSCRLL® web sitesini ve uygulamalarını ücretsiz
          olarak, bir hesap olmadan kullanabilirsin.`,
			},
			{
				label: "DOOMSCRLL® üzerinde projeleri nasıl keşfedebilirim?",
				body: ctsr`DOOMSCRLL® üzerinde her gün sınırlı sayıda DOOMLIT® yuvası (günde 256 adet) bulunur, bu da her gün reklamların,
          sponsorların veya algoritmaların müdahalesi olmadan karşına çıkan yeni projeler göreceğin anlamına gelir. Ve her
          DOOMLIT®'in bir kategorisi ve ilgili "etiketleri" vardır, böylece filtreleme yaparak aradığını bulabilirsin.
          Aksi takdirde, seçili kategori altındaki projeler sana rastgele sıralanmış bir seçki olarak sunulur.`,
			},
			{
				label: "DOOMSCRLL® projeleri nasıl derliyor?",
				body: ctsr`Aslında derlemiyor! DOOMSCRLL® üzerinde sergilenen projeler, sadece yaratıcısının seçtiği günde 24 saat boyunca
          gösterilir. Her gün, o günün tüm projelerini rastgele oluşturulmuş bir akışta görebilirsin. Ayrıca favori ilgi
          alanların, özellikler veya platformlar için etiketleri kullanarak filtreleme yapabilirsin.`,
			},
			{
				label: "DOOMSCRLL keşifleri/derlemeleri yönlendirmek için bir algoritma kullanıyor mu?",
				body: "Hayır! Keşfine veya projelerinin görünürlüğüne müdahale edecek hiçbir şey yok.",
			},
			{
				label: "Projemi DOOMSCRLL'de nasıl sergilerim?",
				body: ctsr`Eğer bir yaratıcıysan, seçtiğin bir günde sadece 1$ karşılığında 24 saatliğine bir DOOMLIT rezerve edebilirsin.
          Her gün için sınırlı sayıda yuva (günde 256 adet) mevcuttur.`,
			},
			{
				label: "DOOMLIT rezervasyonu nasıl çalışıyor?",
				body: ctsr`Kayıt olup DOOMLIT® panelinden (doomlit.doomscrll.com) yaratıcı hesabına giriş yaptıktan sonra, takvimden bir gün
          seçebilir, her gün için müsait yuvalara bakabilir ve hatta daha önce rezerve edilmiş projeleri önizleyebilirsin.
          Bir gün seçip, projenle ilgili temel bilgileri (kategori, isim, ana platform ve platform bağlantısı) girerek bir
          rezervasyon taslağı oluşturduktan sonra, projen için bir yuva ayırtmış olursun. Rezervasyon ücreti ödendikten sonra
          taslak tamamlanacak ve bilgilerini görüp güncelleyebileceksin. Projenin sergilenmeye hazır olması için profilindeki
          DOOMLIT'ler sayfasından ek bilgiler eklemen gerekecek. DOOMLIT'in sergilenme tarihine kadar yönetilebilir ve
          güncellenebilir. Son olarak, rezervasyon ücreti 15 dakika içinde ödenmezse, rezervasyon taslağın silinir.`,
			},
			{ label: "Bir DOOMLIT rezervasyonunun ücreti nedir?", body: "Sadece 1$." },
			{
				label: "DOOMLIT rezervasyonlarının kuralları nelerdir?",
				body: ctsr`Birincisi, bir profil iki haftada bir DOOMLIT® rezerve edebilir. Yani bir yaratıcı ayda en fazla iki proje
          sergileyebilir. İkincisi, bir proje DOOMLIT® tarihinden itibaren iki hafta boyunca tekrar sergilenemez. Bu kurallar,
          sunucudaki bir arşiv sistemi tarafından uygulanır. Ve son olarak, bir DOOMLIT® yasa dışı veya ahlak dışı materyalleri
          sergilemek için kullanılamaz. DOOMSCRLL® üzerinde rezerve edilen şeyler manuel olarak izlenir ve denetlenir.`,
			},
			{
				label: "DOOMLIT rezervasyonları için hangi ödeme yöntemlerini kullanabilirim?",
				body: ctsr`Şu an için bir DOOMLIT rezerve etmek amacıyla kredi kartını kullanabilirsin. Faturan, rezervasyon için kullandığın
          e-posta adresine gönderilecek.`,
			},
			{
				label: "Rezervasyonumdan sonra faturamı nerede bulabilirim?",
				body: "Rezervasyon için kullandığın e-posta adresine gönderilecek.",
			},
			{
				label: "Rezervasyondan sonra bir DOOMLIT®'i güncelleyebilir miyim?",
				body: ctsr`Bir DOOMLIT®'in ayrıntılarını güncelleyebilir, iptal edebilir veya ertelenmesini talep edebilirsin. Sana yardım
          etmekten her zaman mutluluk duyarız.`,
			},
			{
				label: "Bir DOOMLIT'i iptal edebilir miyim?",
				body: "Evet. Herhangi bir DOOMLIT'i sergilenme tarihinden önce iptal edebilirsin.",
			},
			{
				label: "DOOMSCRLL'de ne tür projeler sergileyebilirim?",
				body: ctsr`Şu anda DOOMSCRLL; 'Video Oyunları, Masa Oyunları, Yazılım ve Araçlar, Dijital Varlıklar, Yayıncılık, Ses, Video,
          Ürünler, Yiyecek ve Yerel İşletmeler' proje kategorilerini, her kategori için geniş bir platform yelpazesini ve sosyal
          ile kitle fonlaması platformlarını desteklemektedir. DOOMSCRLL® üzerinde başka türde bir proje görmek istersen,
          lütfen bize bildir!`,
			},
			{
				label: "Bir yaratıcı olarak profilimi nasıl yönetirim?",
				body: "Üst kısımdaki avatarından profil menüsüne girerek profil ayarları sayfasını ziyaret edebilirsin.",
			},
			{
				label: "DOOMSCRLL hangi platformları destekliyor?",
				body: ctsr`DOOMSCRLL®, her kategori için geniş bir platform yelpazesini destekler ve bağlantıların ilgili platformun logosuyla
          markalanır.`,
			},
			{
				label: "Verilerim nasıl işleniyor ve saklanıyor?",
				body: ctsr`İzleyiciler için tasarlanan web sitesi ve uygulamalar kullanmak için bir hesap gerektirmez ve DOOMSCRLL® senden
          veya cihazından başka hiçbir bilgi toplamaz; ayrıca reklam göstermez veya sponsorluk almayız. Yaratıcılara gelince,
          profilini ve projelerini tanımlamak için gereken bilgiler dışında hiçbir şey sunucularda saklanmaz. Projeler için
          ise, kuralları uygulamak ve DOOMSCRLL® kurallarının kötüye kullanımını önlemek amacıyla arşivde yalnızca benzersiz
          tanımlayıcı bilgiler saklanır. Profilinin silinmesini istersen lütfen bizimle iletişime geç. Yardımcı olmaktan
          mutluluk duyarız.`,
			},
			{
				label: "Sizinle nasıl iletişime geçebilirim?",
				body: "Bize hello@doomscrll.com adresinden e-posta gönderebilirsin.",
			},
			{
				label: "Hizmet Şartları'nı nerede bulabilirim?",
				body: "Lütfen şu adresi ziyaret et: doomscrll.com/legal.txt",
			},
		],
		footer: {
			contentContactPrefix: "Herhangi bir sorunuz varsa, bize ulaşmaktan çekinmeyin:",
			contentLegalPrefix: "Yasal bilgilendirme ve marka tescilleri için şu adresi ziyaret edin:",
		},
	},
} satisfies Dictionary
