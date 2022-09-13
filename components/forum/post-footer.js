import Partners from "./partners"
import Container from '../UI/container'


export default function PostFooter({partners}) {
	return (
		<footer className="post-footer bg-white">
			<Container>
				<Partners className="partner-logos" partners={partners} fields={['logo']}/>
			</Container>
		</footer>
	)
}
