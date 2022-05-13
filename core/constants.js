import logo from "/public/logo.svg"

export const LOGO = logo
export const SITE_NAME = 'Fogapo'
export const HOME_TITLE = 'Форум гарантированных поставщиков'
export const yandexMetrikaId = '88707408'
export const googleAnalyticsId = 'G-ZBG8YKXFMZ'


const DATA = {
	site_logo: LOGO,
	extra_logo: {
		title: 'Мероприятие в рамках "Бизнес неделя"',
		src: '/logos/business-week-150.png',
		href: '#',
	},
	posts: [
		{
			id: 1,
			slug: '2022',
			logo: '/logo.png',
			page_background: '/wave-bg.svg',
			title: 'Форум гарантированных поставщиков',
			subtitle: '<p><span style="color: #000">для дизайнеров интерьера</span></br><b>возможности и перспективы</b></p>',
			events: [
				{
					id: 1,
					title: '',
					content: '<img src="/logos/igor_kurkin.png" alt=""/><h3><small>специальный гость</small></br><b>ИГОРЬ КУРКИН</b></h3>дизайнер, декоратор,<br/>предметный дизайнер,<br/>член Союза дизайнеров России,<br/>автор проектов для Квартирного вопроса<br/>и Большой переделки',
					event_time: '',
				},
			],
			partners: [
				{id:1, name: 'Салон дверей Porta Nova', logo: '/logos/porta-nova.png', link: 'https://site.ru'},
				{id:2, name: 'салон РИМИ', logo: '/logos/rimi.png', link: 'https://site.ru'},
				{id:3, name: 'Салон Kerama Marazzi Киров', logo: '/logos/cm.png', link: 'https://site.ru'},
				{id:4, name: 'Компания Hi Tech House', logo: '/logos/h-tech.png', link: 'https://site.ru'},
				{id:5, name: 'Декор-центр Арт-сервис', logo: '/logos/art-service.png', link: 'https://site.ru'},
			],
			location: 'БЦ Кристалл EVENT HALL ALMAZ<br/>Большой зал, 2 этаж<br/>Киров, Профсоюзная, 1',
			info: 'Регистрация 8 922 662 58 00',
			date_forum: '2022-05-24T10:00:00.000+03:00',
			appeals_title: 'приглашаем <span class="highlight">всех дизайнеров интерьера</span> посетить специализированный форум поставщиков в Кирове',
			appeals_footer: 'для этого Вам необходимо зарегистрироваться любым удобным способом в контактах ниже или перейти по <a href="/?registration" id="registration" class="link">ссылке</a>' +
				'<br/>' + 'Участие на форуме <span class="highlight">бесплатное</span>',
			appeals: [
				{
					id: 1,
					icon: '/icons/reliability.png',
					text: 'уверенность в поставках материалов, мебели и оборудования для ваших проектов',
				},
				{
					id: 2,
					icon: '/icons/competence.png',
					text: 'легко отвечать на вопросы своих клиентов по комплектации',
				},
				{
					id: 3,
					icon: '/icons/experience.png',
					text: 'обмен ценным опытом работы в новых реалиях',
				},
			],
			description: 'Мероприятие для дизайнеров интерьера, кто хочет увидеть новые возможности и перспективы работы с надежными поставщиками для своих проектов',
			keywords: "форму поставщиков, дизайнеры интерьера, надежные поставщики",
		},
	],
}

export default DATA


export const FORM_DATA = {
	header: 'Заполните анкету для участия в форуме',
	name: {
		title: 'Как Вас зовут (ФИО)',
		type: 'text',
		required: true,
	},
	organization: {
		title: 'Место работы',
		required: true,
		placeholder: 'Название организации/физлицо',
	},
	occupation: {
		title: 'Род деятельности',
		choices: ['дизайнер/декоратор', 'руководитель дизайн студии/арт-директор'],
		type: 'select',
		required: true,
	},
	phone: {
		title: 'Телефон',
		type: 'tel',
		required: true,
	},
	email: {
		title: 'E-mail',
		type: 'email',
		required: true,
	},
	questions: [
		{
			title: 'Изменилось ли количество Ваших клиентов за последнее время?',
			choices: ['нет', 'стало меньше', 'стало больше', {text:'другое'}],
			type: 'radio',
			inline: false,
			required: true,
		},
		{
			title: 'Сколько объектов у Вас сейчас в работе?',
			choices: ['0', '1', '2', 'более 2-х', 'более 5-ти', 'более 10-ти',],
			type: 'select',
			required: true,
			compact: false,
		},
		{
			title: 'Как они распределяются по площади (укажите количество)',
			choices: ['до 80','80 - 150','от 150'],
			type: 'number',
			inline: false,
		},
		{
			title: 'Какие это проекты?',
			choices: ['больше частных','больше общественных','50 на 50'],
			type: 'select',
			required: true,
			compact: false,
		},
		{
			title: 'Изменились ли потребности Ваших клиентов?',
			choices: [
				'нет',
				'Да, клиенты приходят с более масштабными проектами',
				'Да, проекты приходят с менее масштабными проектами',
				'Больше вторичных ремонтов',
				'Больше первичных ремонтов',
				'Есть проекты на часть помещения',
				{text:'другое'},
			],
			type: 'radio',
			required: true,
		},
		{
			title: 'Изменился ли бюджет в текущих проектах?',
			choices: [
				'Клиенты пытаются вписаться в прежние цифры и экономят',
				'Клиенты понимают, что он увеличится и готовы платить',
				{text:'другое'},
			],
			type: 'radio',
			required: true,
		},
		{
			title: 'Возникли ли трудности при комплектации материалами? Если да, то какие',
			choices: [
				'Нет нужного ассортимента',
				'Клиент не готов к изменениям в бюджете',
				'Клиент не готов к изменениям в сроках',
				{text:'другое'},
			],
			type: 'checkbox',
		},
		{
			title: 'Какие дополнительные обучающие семинары/курсы вы хотели бы посетить?',
			choices: [
				'по продвижение услуг дизайна, повышению стоимости своих услуг',
				'по повышению квалификации (какие?)',
				'по работе с персоналом',
				'по повышению экономической грамотности, налогообложению',
				'другое (например, ведение переговоров, ораторское искусство и тп)',
				{text:'другое'},
			],
			type: 'checkbox',
		},
		{
			title: 'На Форуме готовится секция от дизайнеров Кирова по обмену опытом в новой реальности. Ответы на какие вопросы вы хотели бы услышать?',
			type: 'textarea',
			autoComplete: false,
		},
	],
}
