import ExamenCard from "../ui/test/examenCard"
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
                <div className="md:ml-5 border-4 bg-primary-color rounded-xl h-36 flex items-center p-6 text-white transform w-80 hover:bg-blue-800 transition duration-500 hover:scale-125 justify-center">
                    <p className="">Pronto añadiremos Tests de más tipos!!</p>
                </div>
            </div>
        </div>
    )
}