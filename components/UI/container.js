export default function Container({ children, className='', style={} }) {
  return <div className={`container mx-auto ${className}`} style={style}>{children}</div>
}
