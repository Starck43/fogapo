import {useState} from "react"
import Image from 'next/image'
import placeholder from "~/public/placeholder.png"


export const Logo = ({className = 'logo', name = '', src}) => {

	const remoteLoader = ({ src }) => {
		return src
}
	const [imageSize, setImageSize] = useState({
		naturalWidth: 100,
		naturalHeight: 100
	})

	const loadComplete = function (imageDimension) {
		//console.log(imageDimension)
		setImageSize(imageDimension)
	}

	const shimmer = (color, w, h=null) => `
		<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<defs>
		<linearGradient id="g">
		<stop stop-color="${color}" offset="20%" />
		<stop stop-color="#ccc" offset="50%" />
		<stop stop-color="${color}" offset="70%" />
		</linearGradient>
		</defs>
		${ h==null
			? `<circle fill="${color}" cx="${w/2}" cy="${w/2}" r="${w/2}"/><circle id="c" fill="url(#g)" cx="${w/2}" cy="${w/2}" r="${w/2}"/>`
			: `<rect width="${w}" height="${h}" fill="${color}" /><rect id="r" width="${w}" height="${h}" fill="url(#g)" />`
		}
		<animate xlink:href="#c" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"/>
		</svg>`

	const toBase64 = (str) => (
		typeof window === 'undefined'
			? Buffer.from(str).toString('base64')
			: window.btoa(str)
	)

	return (
		<div className={className}>
			<Image
				src={src}
				loader={remoteLoader}
				layout="intrinsic"
				blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer('#a6a6a6', imageSize.naturalWidth, imageSize.naturalHeight))}`}
				placeholder="blur"
				width={imageSize.naturalWidth}
				height={imageSize.naturalHeight}
				unoptimized={true}
				alt={name}
				onLoadingComplete={loadComplete}
			/>
		</div>
	)
}

export const Avatar = ({src, name = '', width = 160, height = null, rounded="rounded"}) => {

	return (
		<div className="avatar centered vertical">
			<Image
				className={rounded}
				src={src}
				width={width}
				height={height ? height : width}
				blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer('#a6a6a6', width, height))}`}
				placeholder="blur"
				alt={name}
			/>
			<div className="avatar-caption">{name}</div>
		</div>
	)
}
