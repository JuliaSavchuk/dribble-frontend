export interface Translations {
  common: {
    or: string
    continue: string
    cancel: string
    close: string
    send: string
    save: string
    saveChanges: string
    toggleAll: string
    website: string
    connect: string
    learnMore: string
    create: string
    login: string
    signUp: string
  }
  nav: {
    categories: string
    community: string
    findJob: string
    findStyle: string
    upload: string
    settings: string
    logout: string
    login: string
    signUp: string
    language: string
    openMenu: string
    closeMenu: string
  }
  footer: {
    forDesigners: string
    blog: string
    about: string
    support: string
    jobs: string
    places: string
    resources: string
    tags: string
    freelancers: string
    designers: string
    cookies: string
    privacy: string
  }
  home: {
    heroLine1: string
    heroLine2: string
    heroLine3: string
    heroSubtitle: string
    badgeShorts: string
    badgeServices: string
    badgeDesigner: string
    popular: string
    filters: string
    feedLoadError: string
    loadMore: string
    signUpToContinue: string
  }
  auth: {
    avatarPicker: {
      sizeHint: string
      formatHint: string
      uploadLabel: string
    }
    login: {
      title: string
      googleButton: string
      emailPlaceholder: string
      passwordPlaceholder: string
      forgotPassword: string
      continue: string
      terms: string
      noAccount: string
      signUp: string
    }
    register: {
      welcomeTitle: string
      welcomeSubtitle: string
      emailPlaceholder: string
      emailInvalid: string
      continue: string
      googleButton: string
      terms: string
      haveAccount: string
      signIn: string
      passwordTitle: string
      confirmPasswordPlaceholder: string
      profileTitle: string
      fullNameLabel: string
      fullNamePlaceholder: string
      locationLabel: string
      locationPlaceholder: string
    }
    recovery: {
      title: string
      emailPlaceholder: string
      emailInvalid: string
      notImplemented: string
      passwordChanged: string
      send: string
      useGoogle: string
      newPasswordTitle: string
      newPasswordPlaceholder: string
      confirmPasswordPlaceholder: string
    }
    newPassword: {
      passwordPlaceholder: string
      confirmPlaceholder: string
      mismatch: string
    }
    otp: {
      title: string
      sentInfo: string
      checkInbox: string
      resend: string
      resendWithCooldown: (seconds: number) => string
      continue: string
      cantFindCode: string
      usePassword: string
      invalidCode: string
    }
  }
  settingsNav: {
    general: string
    editProfile: string
    password: string
    socialProfiles: string
    company: string
    payouts: string
    teams: string
    notifications: string
    privacySecurity: string
  }
  comingSoon: {
    sectionInDevelopment: (title: string) => string
    notCreatedYet: string
  }
  upload: {
    dropzone: {
      heading: string
      dropHint: string
    }
    editing: {
      titlePlaceholder: string
      coverAlt: string
      insertBlockTitle: string
      blockText: string
      blockImages: string
      blockVideo: string
      blockGallery: string
      textBlockLabel: string
      imageBlockLabel: string
      videoBlockLabel: string
      galleryBlockLabel: string
      descriptionPlaceholder: string
      removeBlock: string
      sidebarHint: string
    }
    finalTouches: {
      heading: string
      thumbnailPreview: string
      thumbnailAlt: string
      tagsLabel: string
      tagsPlaceholder: string
      suggestedLabel: string
      feedbackTitle: string
      feedbackDescription: string
      back: string
      publish: string
    }
  }
  settings: {
    presenceHint: string
    general: {
      title: string
      username: string
      voxelUrl: string
      accountEmail: string
      shots: string
      followers: string
      following: string
    }
    company: {
      title: string
      companyName: string
      companyNamePlaceholder: string
      companyLogo: string
      chooseLogo: string
      logoFormatHint: string
      companyUrl: string
      notImplemented: string
    }
    payouts: {
      title: string
      connectMethod: string
      connectDescription: string
      notImplemented: string
    }
    teams: {
      title: string
      createTeam: string
      description: string
      notImplemented: string
    }
    privacy: {
      title: string
      activityPrivacy: string
      activityStatus: string
      activityStatusDescription: string
      readReceipts: string
      readReceiptsDescription: string
      deleteAccount: string
      deleteDescription: string
      deleteButton: string
      notImplemented: string
    }
    notifications: {
      title: string
      browserSection: string
      enableBrowser: string
      emailSection: string
      alertGroup: string
      communications: string
      communicationsDescription: string
      accountActivity: string
      accountActivityDescription: string
      meetupsNearYou: string
      meetupsNearYouDescription: string
      marketingUpdates: string
      marketingUpdatesDescription: string
      accountActivityGroup: string
      collaboratorInvite: string
      collaboratorInviteDescription: string
      comments: string
      commentsDescription: string
      mentions: string
      mentionsDescription: string
      newFollowers: string
      newFollowersDescription: string
      invitationAccepted: string
      invitationAcceptedDescription: string
      likes: string
      likesDescription: string
      newsletterGroup: string
      education: string
      educationDescription: string
      notImplemented: string
    }
    password: {
      title: string
      currentPassword: string
      currentPasswordPlaceholder: string
      newPassword: string
      newPasswordPlaceholder: string
      minLengthHint: string
      confirmPassword: string
      confirmPasswordPlaceholder: string
      save: string
      tooShort: string
      mismatch: string
      changed: string
    }
    editProfile: {
      title: string
      selectImage: string
      noImageSelected: string
      logoFormatHint: string
      bio: string
      bioPlaceholder: string
      bioHint: string
      saveProfile: string
      updated: string
      saveFailed: string
    }
    socialProfiles: {
      title: string
      website: string
      twitter: string
      instagram: string
      linkedin: string
      saved: string
      saveFailed: string
    }
  }
  notFound: {
    title: string
    description: string
    backHome: string
  }
  search: {
    emptyQuery: string
    resultsFor: (query: string) => string
    error: string
    usersHeading: (count: number) => string
    shotsHeading: (count: number) => string
    noShots: string
  }
  shotDetail: {
    notFound: string
    backToFeed: string
    confirmDelete: string
    deleteShot: string
    like: (count: number) => string
    description: string
    noDescription: string
    commentsHeading: (count: number) => string
    addCommentPlaceholder: string
    noComments: string
    deleteComment: string
    tags: string
    noTags: string
  }
  profile: {
    changeAvatarAria: string
    uploadAvatarAria: string
    email: string
    bioPlaceholder: string
    chooseAvatar: string
    avatarFormatHint: string
    photoLabel: string
    followers: string
    changePasswordTitle: string
    newPasswordLabel: string
    confirmNewPasswordLabel: string
    changePasswordButton: string
    passwordTooShort: string
  }
}

export const uk: Translations = {
  common: {
    or: 'або',
    continue: 'Продовжити',
    cancel: 'Скасувати',
    close: 'Закрити',
    send: 'Надіслати',
    save: 'Зберегти',
    saveChanges: 'Зберегти зміни',
    toggleAll: 'Перемкнути всі',
    website: 'Вебсайт',
    connect: 'Підключити',
    learnMore: 'Дізнатися більше',
    create: 'Створити',
    login: 'Увійти',
    signUp: 'Реєстрація',
  },

  nav: {
    categories: 'Категорії',
    community: 'Спільнота',
    findJob: 'Знайти роботу',
    findStyle: 'Знайти стиль',
    upload: 'Опублікувати',
    settings: 'Налаштування',
    logout: 'Вийти',
    login: 'Увійти',
    signUp: 'Реєстрація',
    language: 'Мова',
    openMenu: 'Відкрити меню',
    closeMenu: 'Закрити меню',
  },

  footer: {
    forDesigners: 'Для дизайнерів',
    blog: 'Блог',
    about: 'Про нас',
    support: 'Підтримка',
    jobs: 'Робота',
    places: 'Місця',
    resources: 'Ресурси',
    tags: 'Теги',
    freelancers: 'Фрілансери',
    designers: 'Дизайнери',
    cookies: 'Кукі-файли',
    privacy: 'Конфіденційність',
  },

  home: {
    heroLine1: 'Показуй.',
    heroLine2: 'Надихай.',
    heroLine3: 'Стань поміченим',
    heroSubtitle:
      'Voxel — провідна платформа для показу своїх робіт, спілкування з іншими креативниками та розвитку кар\u02bcєри',
    badgeShorts: 'Відео',
    badgeServices: 'Послуги',
    badgeDesigner: 'Дизайнер',
    popular: 'Популярне:',
    filters: 'Фільтри',
    feedLoadError: 'Не вдалося завантажити стрічку робіт. Будь ласка, спробуйте пізніше.',
    loadMore: 'Завантажити ще',
    signUpToContinue: 'Зареєструватися, щоб продовжити',
  },

  auth: {
    avatarPicker: {
      sizeHint: 'Мінімум 300x300 пікселів',
      formatHint: 'JPG, GIF або PNG. Максимальний розмір 4МБ.',
      uploadLabel: 'Завантажити фото профілю',
    },
    login: {
      title: 'Раді бачити знову',
      googleButton: 'Увійти через Google',
      emailPlaceholder: 'Введіть email адресу',
      passwordPlaceholder: 'Введіть пароль',
      forgotPassword: 'Забули пароль?',
      continue: 'Продовжити',
      terms: 'Продовжуючи, ви погоджуєтесь з нашими Умовами та Політикою конфіденційності.',
      noAccount: 'Немає акаунта?',
      signUp: 'Зареєструватися',
    },
    register: {
      welcomeTitle: 'Ласкаво просимо до Voxel',
      welcomeSubtitle: 'Створіть акаунт і відкрийте для себе дизайн-таланти світового рівня.',
      emailPlaceholder: 'Введіть email адресу',
      emailInvalid: 'Введіть коректну email адресу.',
      continue: 'Продовжити',
      googleButton: 'Увійти через Google',
      terms: 'Продовжуючи, ви погоджуєтесь з нашими Умовами та Політикою конфіденційності.',
      haveAccount: 'Вже маєте акаунт?',
      signIn: 'Увійти',
      passwordTitle: 'Створіть пароль',
      confirmPasswordPlaceholder: 'Підтвердіть пароль',
      profileTitle: 'Розкажіть про себе',
      fullNameLabel: 'Повне ім\u02bcя*',
      fullNamePlaceholder: 'Введіть своє ім\u02bcя',
      locationLabel: 'Місцезнаходження',
      locationPlaceholder: 'Введіть своє місцезнаходження',
    },
    recovery: {
      title: 'Відновлення пароля',
      emailPlaceholder: 'Введіть свій email',
      emailInvalid: 'Введіть коректну email адресу.',
      notImplemented:
        'Функція відновлення пароля поки не підтримується сервером. Зверніться до підтримки або спробуйте пізніше.',
      passwordChanged: 'Пароль успішно змінено. Тепер ви можете увійти.',
      send: 'Надіслати',
      useGoogle: 'Використати Google',
      newPasswordTitle: 'Створіть новий пароль',
      newPasswordPlaceholder: 'Введіть новий пароль',
      confirmPasswordPlaceholder: 'Підтвердіть пароль',
    },
    newPassword: {
      passwordPlaceholder: 'Введіть пароль',
      confirmPlaceholder: 'Підтвердіть пароль',
      mismatch: 'Паролі не співпадають.',
    },
    otp: {
      title: 'Підтвердьте, що це ви',
      sentInfo: 'Ми надіслали вам код підтвердження.',
      checkInbox: 'Перевірте пошту',
      resend: 'Надіслати код повторно',
      resendWithCooldown: (seconds: number) => `Надіслати код повторно (${seconds}с)`,
      continue: 'Продовжити',
      cantFindCode: 'Не бачите код?',
      usePassword: 'Використати пароль',
      invalidCode: 'Введіть усі 7 цифр коду.',
    },
  },

  settingsNav: {
    general: 'Загальне',
    editProfile: 'Редагувати профіль',
    password: 'Пароль',
    socialProfiles: 'Соціальні мережі',
    company: 'Компанія',
    payouts: 'Виплати',
    teams: 'Команди',
    notifications: 'Сповіщення',
    privacySecurity: 'Приватність і безпека',
  },

  comingSoon: {
    sectionInDevelopment: (title: string) => `Розділ «${title}» у розробці`,
    notCreatedYet: 'Ця сторінка ще не створена. Ми додамо її пізніше.',
  },

  upload: {
    dropzone: {
      heading: 'Додайте те, що забажаєте',
      dropHint: 'Завантажте фото, відео або gif (макс. 100МБ)',
    },
    editing: {
      titlePlaceholder: 'Дайте назву',
      coverAlt: "Прев'ю роботи",
      insertBlockTitle: 'Додати блок',
      blockText: 'Текст',
      blockImages: 'Зображення',
      blockVideo: 'Відео',
      blockGallery: 'Галерея',
      textBlockLabel: 'Опис роботи',
      imageBlockLabel: 'Зображення',
      videoBlockLabel: 'Відео',
      galleryBlockLabel: 'Галерея',
      descriptionPlaceholder: 'Розкажіть трохи про вашу роботу, деталі концепту...',
      removeBlock: 'Прибрати блок',
      sidebarHint:
        'Зображення, відео та галерея показані тут для перегляду композиції. На сервері зберігаються обкладинка, назва, опис і теги.',
    },
    finalTouches: {
      heading: 'Останні штрихи',
      thumbnailPreview: "Прев'ю мініатюри",
      thumbnailAlt: 'Мініатюра роботи',
      tagsLabel: 'Теги (максимум 10)',
      tagsPlaceholder: 'Додати теги...',
      suggestedLabel: 'Пропоновані:',
      feedbackTitle: 'Шукаю відгук',
      feedbackDescription: 'Позначте роботу як таку, що потребує фідбеку спільноти',
      back: 'Назад',
      publish: 'Опублікувати',
    },
  },

  settings: {
    presenceHint: 'Налаштуйте свою присутність на Voxel та потреби у найманні',
    general: {
      title: 'Загальне',
      username: 'Ім\u02bcя користувача',
      voxelUrl: 'Ваша URL-адреса Voxel: https://voxel.com/',
      accountEmail: 'Email акаунта',
      shots: 'Робіт',
      followers: 'Підписників',
      following: 'Підписок',
    },
    company: {
      title: 'Компанія',
      companyName: 'Назва компанії',
      companyNamePlaceholder: 'Введіть назву компанії',
      companyLogo: 'Логотип компанії',
      chooseLogo: 'Обрати логотип',
      logoFormatHint: 'JPG, GIF або PNG, максимальний розмір 5МБ',
      companyUrl: 'URL-адреса компанії',
      notImplemented:
        'Розділ «Компанія» ще не підключений до бекенду — ендпоінт для даних компанії поки не реалізований. Зміни не збережуться на сервері.',
    },
    payouts: {
      title: 'Виплати',
      connectMethod: 'Підключіть спосіб виплат',
      connectDescription: 'Підключіть, щоб надсилати пропозиції та безпечно приймати платежі на Voxel',
      notImplemented: 'Підключення способу виплат ще не реалізоване на бекенді — ця дія поки не має ефекту.',
    },
    teams: {
      title: 'Команди',
      createTeam: 'Створити команду',
      description: 'Співпрацюйте з командою, керуйте спільними проєктами та наймайте разом на Voxel.',
      notImplemented: 'Робота з командами ще не реалізована на бекенді — цю дію поки не збережено.',
    },
    privacy: {
      title: 'Приватність і безпека',
      activityPrivacy: 'Приватність активності',
      activityStatus: 'Статус активності',
      activityStatusDescription: 'Дозволити іншим бачити, коли ви активні або коли були активні востаннє',
      readReceipts: 'Підтвердження прочитання',
      readReceiptsDescription:
        'Показувати, коли повідомлення прочитано. Якщо вимкнути, ви також не бачитимете підтвердження прочитання від інших',
      deleteAccount: 'Видалити акаунт Voxel',
      deleteDescription:
        'Видалення акаунта остаточно прибере ваш профіль Voxel і весь пов\u02bcязаний контент. Цю дію неможливо скасувати',
      deleteButton: 'Видалити акаунт',
      notImplemented:
        'Видалення акаунта поки не реалізоване на бекенді — ця дія навмисно нічого не робить, щоб не пошкодити ваші дані.',
    },
    notifications: {
      title: 'Сповіщення',
      browserSection: 'Сповіщення браузера',
      enableBrowser: 'Увімкнути сповіщення в браузері',
      emailSection: 'Інші email-сповіщення',
      alertGroup: 'Сповіщення',
      communications: 'Новини Voxel',
      communicationsDescription: 'Отримуйте новини, анонси та оновлення продукту Voxel',
      accountActivity: 'Активність акаунта',
      accountActivityDescription: 'Важливі сповіщення про вас або пропущену активність',
      meetupsNearYou: 'Зустрічі поруч',
      meetupsNearYouDescription: 'Отримуйте лист, коли поруч з вами організовують зустріч Voxel',
      marketingUpdates: 'Маркетингові оновлення',
      marketingUpdatesDescription: 'Будьте в курсі наших нових продуктів, акцій та спецпропозицій',
      accountActivityGroup: 'Активність акаунта',
      collaboratorInvite: 'Запрошення до співпраці',
      collaboratorInviteDescription: 'Хтось запрошує вас співавтором однієї зі своїх робіт',
      comments: 'Коментарі',
      commentsDescription: 'Хтось коментує одну з ваших робіт',
      mentions: 'Згадування',
      mentionsDescription: 'Хтось згадав вас',
      newFollowers: 'Нові підписники',
      newFollowersDescription: 'Хтось підписався на вас',
      invitationAccepted: 'Запрошення прийнято',
      invitationAcceptedDescription: 'Хтось прийняв ваше запрошення',
      likes: 'Лайки',
      likesDescription: 'Хтось вподобав одну з ваших робіт',
      newsletterGroup: 'Щотижнева розсилка',
      education: 'Навчання',
      educationDescription: 'Понеділок: дизайн-воркшопи та навчальні матеріали для вашої кар\u02bcєри',
      notImplemented:
        'Розділ «Сповіщення» ще не підключений до бекенду — налаштування зберігаються лише локально, в межах цього сеансу.',
    },    password: {
      title: 'Пароль',
      currentPassword: 'Поточний пароль',
      currentPasswordPlaceholder: 'Введіть поточний пароль',
      newPassword: 'Пароль',
      newPasswordPlaceholder: 'Введіть пароль',
      minLengthHint: 'Мінімум 5 символів',
      confirmPassword: 'Підтвердіть пароль',
      confirmPasswordPlaceholder: 'Введіть пароль ще раз',
      save: 'Зберегти',
      tooShort: 'Пароль має містити щонайменше 5 символів.',
      mismatch: 'Нові паролі не співпадають.',
      changed: 'Пароль успішно змінено!',
    },
    editProfile: {
      title: 'Редагувати профіль',
      selectImage: 'Обрати зображення',
      noImageSelected: 'Зображення не обрано',
      logoFormatHint: 'JPG, GIF або PNG, максимальний розмір 5МБ',
      bio: 'Про себе',
      bioPlaceholder: 'Короткий опис для вашого профілю',
      bioHint: 'Короткий опис для вашого профілю.',
      saveProfile: 'Зберегти профіль',
      updated: 'Профіль успішно оновлено!',
      saveFailed: 'Не вдалося зберегти. Спробуйте ще раз.',
    },
    socialProfiles: {
      title: 'Соціальні мережі',
      website: 'Вебсайт',
      twitter: 'Twitter / X',
      instagram: 'Instagram',
      linkedin: 'LinkedIn',
      saved: 'Зміни збережено!',
      saveFailed: 'Не вдалося зберегти. Спробуйте ще раз.',
    },
  },

  notFound: {
    title: 'Сторінку не знайдено',
    description: 'Здається, ця сторінка не існує або була переміщена.',
    backHome: 'Повернутися на головну',
  },

  search: {
    emptyQuery: 'Введіть запит у полі пошуку, щоб знайти роботи або користувачів.',
    resultsFor: (query: string) => `Результати пошуку за запитом «${query}»`,
    error: 'Не вдалося виконати пошук. Спробуйте пізніше.',
    usersHeading: (count: number) => `Користувачі (${count})`,
    shotsHeading: (count: number) => `Роботи (${count})`,
    noShots: 'Робіт за вашим запитом не знайдено.',
  },

  shotDetail: {
    notFound: 'Роботу не знайдено або сталася помилка завантаження.',
    backToFeed: 'Назад до стрічки',
    confirmDelete: 'Ви впевнені, що хочете видалити цей Shot?',
    deleteShot: 'Видалити Shot',
    like: (count: number) => `Лайк (${count})`,
    description: 'Опис',
    noDescription: 'Опис відсутній.',
    commentsHeading: (count: number) => `Коментарі (${count})`,
    addCommentPlaceholder: 'Додати коментар...',
    noComments: 'Коментарів поки немає. Будьте першим!',
    deleteComment: 'Видалити коментар',
    tags: 'Теги роботи',
    noTags: 'Тегів немає.',
  },

  profile: {
    changeAvatarAria: 'Змінити фото профілю',
    uploadAvatarAria: 'Завантажити аватар',
    email: 'Email',
    bioPlaceholder: 'Розкажіть про свої проєкти та досвід...',
    chooseAvatar: 'Обрати',
    avatarFormatHint: 'PNG, JPG, WEBP до 5 MB',
    photoLabel: 'Фото профілю',
    followers: 'Підписники',
    changePasswordTitle: 'Зміна паролю',
    newPasswordLabel: 'Новий пароль',
    confirmNewPasswordLabel: 'Підтвердіть новий пароль',
    changePasswordButton: 'Змінити пароль',
    passwordTooShort: 'Пароль має містити щонайменше 8 символів.',
  },
}