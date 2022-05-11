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

	return (
		<div className={className}>
			<Image
				src={src}
				loader={remoteLoader}
				placeholder={placeholder}
				//placeholder="blur"
				layout="intrinsic"
				width={imageSize.naturalWidth}
				height={imageSize.naturalHeight}
				unoptimized={true}
				alt={name}
				onLoadingComplete={loadComplete}
			/>
		</div>
	)
}

export const Avatar = ({name = '', width = 160, height = 160, src}) => {
	return (
		<div className="avatar centered vertical">
			<Image
				className="rounded"
				src={src}
				width={width}
				height={height}
				placeholder="blur"
				alt={name}
			/>
			<div className="avatar-caption">{name}</div>
		</div>
	)
}
