export default function Title(props) {
    const { as: Tag = "h2", title, subTitle, href, className = "center gap" } = props

    if (!title && !subTitle) return null

    let content = title
    if (href) {
        content = (
            <a href={href} target="_blank">
                {title}
            </a>
        )
    }

    return (
        <Tag className={`title flex-column ${className}`}>
            {content}
            {subTitle ? (
                <span style={{ fontSize: "0.8em", fontWeight: "normal" }}>{subTitle}</span>
            ) : null}
        </Tag>
    )
}
