import Link from "next/link";
import Image from "next/image";

type ExamenCardProps = {
    titulo: string;
    contenido: string;
    imagenUrl: string;
    tipo: string;
  };
  
  export default function ExamenCard({ titulo, contenido, imagenUrl, tipo }: ExamenCardProps) {
    return (
      <Link href={`examenes/${tipo}`} 
      className="w-full max-w-80 rounded-md overflow-hidden bg-white relative h-72 shadow-xl dark:hover:shadow-gray-700 hover:shadow-blue-400 m-6"
      >
        <div className="h-[50%] w-full overflow-hidden">
          <Image src={imagenUrl} 
          alt="titulo" width={300} height={300} 
          className="bg-cover h-full w-full transform hover:scale-110 transition duration-300 hover:opacity-75"
          priority={true} 
          style={{objectFit: "contain"}}
          />
        </div>
        <div className="h-full w-full px-5 py-2 dark:bg-slate-700">
          <h1 className="text-xl font-bold text-blue-500">{titulo}</h1>
          <p className="text-gray-700 dark:text-gray-200">{contenido}</p>
        </div>
        <button className="w-full font-extrabold uppercase h-10 text-white bg-blue-600 absolute bottom-0 left-0">Accede a los test!</button>
      </Link>
    );
  }