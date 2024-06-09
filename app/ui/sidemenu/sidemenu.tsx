// components/Sidebar.js
"use client";
import Link from 'next/link';
import { lusitana } from '../fonts';
import { PowerIcon,ArrowRightEndOnRectangleIcon,HomeIcon, UserIcon, ClipboardDocumentListIcon} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext';

const links = [
  { name: 'Home', href: '/', icon: HomeIcon  },
  { name: 'Login', href: '/login', icon: UserIcon, },
  { name: 'Register', href: '/register', icon: ArrowRightEndOnRectangleIcon},
  { name: 'Examenes', href: '/examenes', icon: ClipboardDocumentListIcon},
];


export default function Sidebar() {
    const pathname = usePathname();
    const { user, login, logout } = useAuth();
    const filteredLinks = links.filter((link) => {
      // Exclude "Login" and "Register" links if user is logged in
      return !user || (link.name !== 'Login' && link.name !== 'Register');
    });
    return (
      <div className='flex md:h-full md:w-64 max-h-screen flex-col px-3 py-4 md:px-2 backdrop-blur-sm bg-white/30 md:fixed '>
        <Link href={'/'} className='mb-2 flex h-20 items-end justify-start rounded-md bg-primary-color p-4 md:h-40 bg-[url("/cochest.png")] bg-no-repeat bg-cover bg-center' >
            {/* <div className={`${lusitana.className} w-32 text-white md:w-40 h-12`}>
                Coche-TEST
            </div> */}
        </Link>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 ">
            {filteredLinks.map((link) => {
                const LinkIcon = link.icon;
                return (
                <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                        'flex  h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ',
                        {
                          'bg-sky-100 text-blue-600': pathname === link.href,
                        },
                      )}>              
                    <LinkIcon className="w-6" />
                    <p className="hidden md:block">{link.name}</p>
                </Link>
                );
            })}
            <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block">
            </div>
            { user ? (
            <form>
              <button onClick={logout} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                  <PowerIcon className="w-6" />
                  <div className="hidden md:block" >Cerrar Sesión</div>
              </button>
            </form>
            ) : (
              <>
              </>
            )}
        </div>
      </div>
    );
  }
