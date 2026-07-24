import "./Hero.css"

export function HeroSection() {
  return (
    <section className="hero-section">
      
      {/* 1. Objeto Flutuante Superior (Grimório/Ilustração) */}
      <div className="floating-grimoire">
        <img src="./src/assets/images/grimoire_icon.png" alt="Grimório" />
      </div>

      {/* 2. Conteúdo Textual Centralizado */}
      <div className="hero-content">
        <p className="hero-quote">
          "Cada história escrita no grimório guarda um fragmento de quem a viveu."
        </p>
        <span className="hero-author">— O Autor</span>
      </div>

      {/* 3. Nuvens na parte inferior da tela */}
      <div className="clouds-wrapper">
        <img src="./src/assets/images/.png" alt="Nuvens" className="cloud-layer" />
      </div>

    </section>
  )
}