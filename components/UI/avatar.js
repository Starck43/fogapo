import { memo, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"

import { shimmer, toBase64 } from "/core/utils"

const remoteLoader = ({ src }) => {
    return src
}

// eslint-disable-next-line react/display-name
export const Logo = memo((props) => {
    const {
        as: Tag = "div",
        src = undefined,
        href = undefined,
        title = "",
        className = "logo",
    } = props

    const [imageSize, setImageSize] = useState({
        naturalWidth: 100,
        naturalHeight: 100,
    })

    const loadComplete = useMemo((imageDimension) => {
        setImageSize(imageDimension)
    }, [])

    const content = src ? (
        <Image
            src={src}
            alt={title}
            // loader={remoteLoader}
            fill
            objectFit="contain"
            sizes="(max-width: 768px) 50vw, 100vw"
            // width={imageSize?.naturalWidth || 100}
            // height={imageSize?.naturalHeight || 100}
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer("#a6a6a6", imageSize?.naturalWidth, imageSize?.naturalHeight),
            )}`}
            unoptimized
            priority
            onLoadingComplete={loadComplete}
        />
    ) : (
        title
    )

    return href ? (
        <Link href={href}>
            <Tag className={className}>{content}</Tag>
        </Link>
    ) : (
        <Tag className={className}>{content}</Tag>
    )
})

// eslint-disable-next-line react/display-name
export const Avatar = memo((props) => {
    const {
        as = "div",
        src,
        href = undefined,
        alt = "",
        title = "",
        width = 160,
        height = null,
        rounded = true,
        shadowed = true,
        bordered = true,
        className = "flex-column center",
    } = props

    if (!src) return null

    let Tag = href ? "a" : as
    let content = title
    if (typeof title === "string") {
        content = <figcaption className="avatar-title">{title}</figcaption>
    }

    return (
        <Tag href={href} target="_blank" className={`avatar ${className}`}>
            <figure
                className={`avatar-wrapper ${rounded ? "rounded" : ""} ${
                    shadowed ? "shadow" : ""
                } ${bordered ? "bordered" : ""}`}
            >
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height ? height : width}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer("#a6a6a6", width, height),
                    )}`}
                    unoptimized
                />
            </figure>
            {content}
        </Tag>
    )
})
