
export default function ResponseContent ({data, className=""}) {
	const date = new Date(data['date'])
	return (
		data && <div className={className}>
			<h3 className="title">{data['forum']}</h3>
			<small>Дата проведения: <b>{date.toLocaleDateString("ru")}</b></small>
			<div className="meta-block">
				<p>Ваше имя: <b>{data['user_name']}</b></p>
				<p>Место работы: <b>{data['organisation']}</b></p>
				<p>Род деятельности: <b>{data['occupation']}</b></p>
				<p>Email адрес: <b>{data['email']}</b></p>
				<p>Контактный телефон: <b>{data['phone']}</b></p>
			</div>
			<div className="questionnaire-block">
				<h4 className="title">Анкетные данные</h4>
				<pre>{data['questionnaire']}</pre>
			</div>
			<p>Статус регистрации: <b className={`status status-${data['status']}`}>{data['status_message']}</b></p>
		</div>
	)
}