import {memo, useState} from "react"
import Image from "next/image"
import {shimmer, toBase64} from "../../core/utils"

	const remoteLoader = ({src}) => {
		return src
	}

// eslint-disable-next-line react/display-name
export const Logo = memo(({className = "logo", name = "", src}) => {

	const [imageSize, setImageSize] = useState({
		naturalWidth: 100,
		naturalHeight: 100
	})

	const loadComplete = function (imageDimension) {
		setImageSize(imageDimension)
	}

	return (
		<div className={className}>
			<Image
				src={src}
				alt={name}
				loader={remoteLoader}
				layout="responsive"
				blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer("#a6a6a6", imageSize.naturalWidth, imageSize.naturalHeight))}`}
				width={imageSize.naturalWidth}
				height={imageSize.naturalHeight}
				unoptimized
				onLoadingComplete={loadComplete}
				priority
			/>
		</div>
	)
})

// eslint-disable-next-line react/display-name
export const Avatar = memo(({src, name = "", width = 160, height = null, rounded = "rounded", className}) => {

	return (
		<div className={`avatar centered vertical ${rounded} ${className}`}>
			<Image
				src={src}
				alt={name}
				width={width}
				height={height ? height : width}
				placeholder="blur"
				blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer("#a6a6a6", width, height))}`}
				unoptimized
			/>
			{name && <div className="avatar-caption">{name}</div>}
		</div>
	)
})
