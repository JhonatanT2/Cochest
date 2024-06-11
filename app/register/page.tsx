"use client"
import RegisterForm from "../ui/user/registerForm";
import { useAuth } from "../ui/context/AuthContext";
import { lusitana } from "../ui/fonts";

export default function Register() {
    const { user } = useAuth();
    return (
        <div>
            { user ? (
                <div className="flex justify-center items-center min-h-screen bg-[url('/mount.jpg')] bg-no-repeat bg-cover bg-center">
                    <h1 className={`${lusitana.className} text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary-color`}>
                        BIENVENIDO {user.name}
                    </h1>                
                </div>
                ) : (
                    <>
                        <RegisterForm/>
                    </>
                )
            }
        </div>
    );
}