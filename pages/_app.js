import App from 'next/app'
import {IconContext} from "react-icons"
import Loading from "../components/loading"

import "../styles/vendors.scss"
import "../styles/main.sass"


export default class MyApp extends App {
	state = {
		loading: true
	}

	componentDidMount() {
		this.setState({loading: false})
	}

	render() {
		const {Component, pageProps} = this.props

		return this.state.loading ? (
			<Loading/>
		) : (
			<IconContext.Provider value={{className: "react-icons"}}>
				<Component {...pageProps} />
			</IconContext.Provider>
		)
	}
}
