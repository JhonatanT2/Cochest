import ExamenCard from "./examenCard"


export default function Test() {
    return (
        <div className="min-h-screen">
            <div className="flex flex-col md:flex-row items-center z-20">
                <ExamenCard 
                    titulo="Tipo B" 
                    contenido="Recopilacion de los test mas frecuentes del tipo B" 
                    imagenUrl="/turismo1.png"
                    tipo="B" 
                />
                <ExamenCard 
                    titulo="Tipo AM" 
                    contenido="Recopilacion de los test mas frecuentes del tipo AM" 
                    imagenUrl="/3398604.jpg"
                    tipo="AM" 
                />
            </div>
        </div>
    )
}