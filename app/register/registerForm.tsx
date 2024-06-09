'use client';
import { useState } from 'react';
import Link from 'next/link';
import { registerUser } from './reegisterHandler';
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();
   
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        setError('');
        setSuccess('');
        const user = {
            name,
            email,
            password,
        };
        try {
            const data = await registerUser(user);
            setSuccess('Registro exitoso');
            alert("Tu cuenta ha sido registrada!! Ve a tu correo para verificarla")
            router.push('/login')                   
        } catch (error) {
            setError(''+error);
            console.error('Error en el registro:', error);
        }
    };
    return (
        <div className="flex justify-center min-h-screen bg-[url('/mount.jpg')] bg-no-repeat bg-cover bg-center">
            <div className="px-8 py-6 mt-4 text-left bg-white/70 shadow-lg h-3/5">
                <h3 className="text-2xl font-bold text-center">Únete a nosotros</h3>
                <p className="text-gray-500 dark:text-gray-400">Ingresa tus datos para crear una cuenta.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <div>
                            <label className="block" htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Nombre"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block" htmlFor="email">Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block" htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Contraseña"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block" htmlFor="confirmPassword">Confirmar contraseña</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirmar contraseña"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                        </div>
                        {error && <p className="mt-2 text-center text-red-600">{error}</p>}
                        {success && <p className="mt-2 text-center text-green-600">{success}</p>}
                        <div className="flex items-baseline justify-center ">
                            <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Registrarse</button>
                        </div>
                        <div className="text-center text-sm mt-2">
                            ¿Ya tienes una cuenta?
                            <Link className="underline ml-1" href="/login">
                                Inicia sesión
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
