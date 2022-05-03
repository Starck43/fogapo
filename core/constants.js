export const SITE_NAME = 'Fogapo'
export const HOME_TITLE = 'Форум гарантированных поставщиков'

const DATA = {
	site_logo: '/logo.png',
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
			meta: {
				title: HOME_TITLE,
				description: 'Мероприятие для дизайнеров интерьера, кто хочет увидеть новые возможности и перспективы работы с надежными поставщиками для своих проектов',
				keywords: "форму поставщиков, дизайнеры интерьера, надежные поставщики",
			},
		},
	],
	yandexMetrikaId: '00000000',
	googleAnalyticsId: 'G-000000000',
}

export default DATA