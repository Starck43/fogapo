import Image from 'next/image'

export default function Icon({src, height, width}) {
	return (
		<Image
			src={src}
			//loader={remoteLoader}
			//placeholder={blur}
			alt=""
			className="icon"
			layout="fixed"
			objectFit="contain"
			width={width}
			height={height}
		/>
	)
}
