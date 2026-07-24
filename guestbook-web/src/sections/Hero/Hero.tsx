import "./Hero.css"

export function HeroSection() {
    return (
        <section className="hero-section">

            <h1 className="hero-title">Grimoire Of Messages</h1>


            <div className="floating-grimoire">
                <img src="./src/assets/images/grimoire_icon.png" alt="Grimório" />
            </div>

            <div className="hero-content">
                <p className="hero-quote">
                    "Este grimório permaneceu perdido por séculos. Dizem que cada viajante que nele escreve deixa também um fragmento de si gravado para sempre.
                    Se chegou até aqui, talvez o livro também tenha escolhido você."
                </p>
                <span className="hero-author">— Dos céus</span>
            </div>



            <div className="hero-cta-wrapper">
                <img
                    src="./src/assets/images/arrow.png"
                    alt="Seta Esquerda"
                    className="cta-arrow arrow-right"
                />

                <button className="cta-button">Abrir Grimório</button>

                <img
                    src="./src/assets/images/arrow.png"
                    alt="Seta Direita"
                    className="cta-arrow arrow-left"
                />
            </div>

            <div className="clouds-wrapper">
                {/* Nuvem do fundo (mais suave e lenta) */}
                <img
                    src="./src/assets/images/cloudRemake3.png"
                    alt="Nuvem Traseira"
                    className="cloud-layer cloud-back"
                />


                <div className="crusader-knight-wrapper">
                    <img
                        src="./src/assets/images/crusader-knight.png"
                        alt="Crusader Knight"
                        className="crusader-knight"
                    />
                </div>

                <div className="saint-maria-wrapper">
                    <img
                        src="./src/assets/images/saint-maria.png"
                        alt="Saint Maria"
                        className="saint-maria"
                    />
                </div>



                {/* Nuvem da frente (espelhada e mais rápida) */}
                <img
                    src="./src/assets/images/cloudRemake3.png"
                    alt="Nuvem Frontal"
                    className="cloud-layer cloud-front"
                />
            </div>





        </section>
    )
}