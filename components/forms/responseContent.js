
export default function ResponseContent ({data, className=""}) {
	const date = new Date(data['date'])
	return (
		<div className={`container ${className}`}>
			<p>
				Вы подали заявку на мероприятие <b>"{data['forum']}"</b><br/>
				Мероприятие пройдет {date.toLocaleDateString("ru")} по адресу:<br/>
				{data['location']}
			</p>
			<p>
				Статус регистрации: <span className={`status status-${data['status']}`}>{data['status_message']}</span><br/>
				<i>Ждите уведомление о подтверждении регистрации в ближайшие часы. Если уведомление не придет, то позвоните на указанный на сайте контактный телефон.</i>
			</p>

			<small>
				<div className="meta-block">
					Ваше имя: <b>{data['user_name']}</b><br/>
					Место работы: <b>{data['organisation']}</b><br/>
					Род деятельности: <b>{data['occupation']}</b><br/>
					Email адрес: <b>{data['email']}</b><br/>
					Контактный телефон: <b>{data['phone']}</b><br/>
				</div>
				<div className="questionnaire-block">
					<h4 className="title">Анкетные данные</h4>
					<pre>{data['questionnaire']}</pre>
				</div>
			</small>
		</div>
	)
}