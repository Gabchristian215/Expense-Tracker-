import './Box.css'

function Box({ header, children, className = '' }) {
  return (
    <section className={`box ${className}`.trim()}>
      <header className="box__header">
        <h2 className="box__title">{header}</h2>
      </header>
      <div className="box__body">{children}</div>
    </section>
  )
}

export default Box
