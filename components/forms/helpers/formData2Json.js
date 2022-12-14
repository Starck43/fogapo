export const formData2Json = (form) => {
	const formData = new FormData(form)
	const data = Object.fromEntries(formData)
	const REGEX = /questions[0-9]*/
	let json = {}, text = "", num = 1, curQuestion, prevQuestion = null

	//console.log('form data:', data)

	Object.keys(data).forEach(key => {
		if (key.startsWith("questions")) {
			curQuestion = key.match(REGEX) // извлечем вопрос из названия вопроса или подвопроса
			const type = form.querySelector(`input[name="${key}"]`)?.type //определим тип input
			const subQuestionLabel = form.querySelector(`label[for="${key}"]`)?.innerText || ""

			if (!prevQuestion || curQuestion[0] !== prevQuestion[0]) {
				const questionLabel = form.querySelector(`label[for="${curQuestion}"]`)?.innerText || ""
				text += prevQuestion ? "\n\n" : ""
				text += `Вопрос ${num}: ${questionLabel}\nОтвет: `
				if (questionLabel === subQuestionLabel) {
					text += `${data[key]}\n`
				} else if (data[key]) {
					text += (type === "checkbox")
						? `\n✅ ${data[key]}`
						: `[${subQuestionLabel}] - ${data[key]}`
					num--
				}
			} else {
				text += (data[key])
					? (type === "checkbox"
						? `\n\n✅ ${data[key]}`
						: `, [${subQuestionLabel}] - ${data[key]}`)
					: ""
			}

			num++
			prevQuestion = curQuestion // сохраним ключ-вопрос
		} else {
			json[key] = data[key]
		}
	})
	json["questionnaire"] = text

	return json
}
