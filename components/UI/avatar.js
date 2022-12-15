import {memo, useState} from "react"
import Image from "next/image"
import {shimmer, toBase64} from "../../core/utils"

const remoteLoader = ({src}) => {
	return src
}

// eslint-disable-next-line react/display-name
export const Logo = memo((props) => {
	const {
		as = "div",
		src,
		href = undefined,
		name = "",
		className = "logo",
	} = props

	const [imageSize, setImageSize] = useState({
		naturalWidth: 100,
		naturalHeight: 100
	})

	const loadComplete = function (imageDimension) {
		setImageSize(imageDimension)
	}

	const Tag = as

	const content = (
		<Image
			src={src}
			alt={name}
			loader={remoteLoader}
			layout="intrinsic"
			blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer("#a6a6a6", imageSize.naturalWidth, imageSize.naturalHeight))}`}
			width={imageSize.naturalWidth}
			height={imageSize.naturalHeight}
			unoptimized
			onLoadingComplete={loadComplete}
			priority
		/>
	)

	return (
		href
			? <Tag href={href}><a className={className}>{content}</a></Tag>
			: <Tag className={className}>{content}</Tag>
	)
})

// eslint-disable-next-line react/display-name
export const Avatar = memo((props) => {
	const {
		as = "div",
		src,
		href = undefined,
		name = "",
		width = 160,
		height = null,
		rounded = "rounded",
		className = undefined,
	} = props

	const Tag = as


	const content = (
		<>
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
		</>
	)

	return (
		href
			? <Tag href={href}><a className={`avatar centered vertical ${rounded} ${className}`}>{content}</a></Tag>
			: <Tag className={`avatar centered vertical ${rounded} ${className}`}>{content}</Tag>
	)
})
