"use client"
import { lusitana } from "./ui/fonts";
import { useAuth } from "./ui/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth();
  return (
    <main className="h-screen">
      <section className="w-full py-10 md:py-20 lg:py-28 bg-[#FFFFFF]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className={`${lusitana.className} text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary-color`}>
                BIENVENIDO A COCHEST
              </h1>
              <p className="mx-auto max-w-[700px] text-primary-color md:text-xl dark:text-primary-color">
                    Una pagina en la que podras repasar las preguntas mas recientes para obtener el carnet que quieres.
              </p>            
                { user ? (
                  <>
                    <p>Bienvenido {user.name}</p>                    
                  </>
                ) : (
                  <>                       
                    <p>No hay user</p> 
                  </>
                  )
                }
              
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#FFFFFF] dark:bg-[#FFFFFF]">
        <div className="container px-4 md:px-6">
          <div className="h-full grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <Image
              src={`/Test.PNG`}
              alt="Image"
              className="mx-auto overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              height={310}
              width={290}
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#F2F2F2] px-3 py-1 text-sm dark:bg-[#F2F2F2] text-[#003366]">
                  Productos
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#003366]">
                  Explora nuestros productos
                </h2>
                <p className="max-w-[600px] text-[#003366] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-[#003366]">
                  Descubre sobre nuestros servicios, de los que dispondras para repasar y prepararte para el carnet que deseas obtener.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-[#87CEEB] px-8 text-sm font-medium text-[#003366] shadow transition-colors hover:bg-[#87CEEB]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#87CEEB] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#87CEEB] dark:text-[#003366] dark:hover:bg-[#87CEEB]/90 dark:focus-visible:ring-[#87CEEB]"
                  href="/examenes"
                  prefetch={false}
                >
                  Ver Tests
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
