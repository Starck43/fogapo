export default function Title(props) {
    const { as: Tag = "h2", title, subTitle, className = "title" } = props

    return (
        <Tag className={`flex-column center gap ${className}`}>
            {title}
            {subTitle ? <span style={{ fontSize: "0.8em" }}>{subTitle}</span> : null}
        </Tag>
    )
}
