import Image from 'next/image'

export default function CoverImage({src, height, width}) {
	return (
		<Image
			src={src}
			//loader={remoteLoader}
			placeholder={blur}
			alt=""
			className=""
			layout="responsive"
			width={width}
			height={height}
		/>
	)
}
