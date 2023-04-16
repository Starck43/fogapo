export function Icon({ name, color="currentColor", fill="transparent", size="100%", className }) {
	return (
		<svg
			className={`icon icon-${name} ${className}`}
			color={color}
			fill={fill}
			stroke={color}
			width={size}
			height={size}
		>
			<use xlinkHref={`#icon-${name}`} />
		</svg>
	)
}
