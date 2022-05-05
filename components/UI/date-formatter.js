// import { parseISO, format } from 'date-fns'

export default function DateFormatter({datetime}) {
	return <time dateTime={datetime}>
		{datetime.toLocaleDateString("ru", {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		}).replace(' г.','')}
	</time>
}
