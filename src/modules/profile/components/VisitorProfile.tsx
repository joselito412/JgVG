import { AuthGuard } from '@/modules/auth/components/AuthGuard';
import { User as UserIcon } from 'lucide-react';
import { SignOutButton } from '@/modules/auth/components/SignOutButton';
import Link from 'next/link';
import Image from 'next/image';

interface VisitorUserData {
  avatarUrl?: string | null;
  fullName?: string | null;
  role?: string | null;
  occupation?: string | null;
  createdAt?: string | Date | null;
}

// Component receives the user data from the parent page
export function VisitorProfile({ dbUser }: { dbUser: VisitorUserData }) {
  return (
    <AuthGuard requireOnboarding={true}>
      <div className="flex min-h-[80vh] flex-col items-center justify-center p-4">
        {/* Ventana Estilo Windows 95 / Retro */}
        <div className="w-full max-w-2xl bg-[#c0c0c0] win95-raised p-1 shadow-2xl relative">
          
          {/* Barra de Título (Win95 Classic Blue) */}
          <div className="h-6 bg-gradient-to-r from-[#000080] to-[#1084d0] flex items-center justify-between px-1 shadow-sm mb-2">
            <div className="flex items-center gap-1">
              <span className="text-white text-xs font-bold tracking-wide font-sans">
                Carnet_de_Identidad.exe
              </span>
            </div>
            
            {/* Controles de ventana Win95 */}
            <div className="flex gap-0.5">
              <button className="win95-btn w-4 h-4 flex items-center justify-center p-0 min-w-0" aria-label="Minimize">
                <span className="text-black leading-none font-bold text-[10px] mb-1">_</span>
              </button>
              <button className="win95-btn w-4 h-4 flex items-center justify-center p-0 min-w-0" aria-label="Maximize">
                <span className="border border-black w-2.5 h-2.5"></span>
              </button>
              <button className="win95-btn w-4 h-4 flex items-center justify-center p-0 min-w-0" aria-label="Close">
                <span className="text-black font-bold text-[10px]">X</span>
              </button>
            </div>
          </div>

          {/* Contenido Principal (Inner sunken well) */}
          <div className="win95-sunken bg-white p-6 m-1">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              
              {/* Columna Izquierda: Foto */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-32 h-32 win95-sunken bg-gray-200 flex items-center justify-center overflow-hidden">
                  {dbUser?.avatarUrl ? (
                    <Image src={dbUser.avatarUrl} alt="Avatar" width={128} height={128} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-16 h-16 text-gray-500" />
                  )}
                </div>
                <div className="font-[family-name:var(--font-pixel)] text-[10px] text-center bg-[#000080] text-white px-2 py-0.5 pointer-events-none">
                  FOTO OFICIAL
                </div>
              </div>

              {/* Columna Derecha: Datos */}
              <div className="flex-1 space-y-4 w-full text-black font-[family-name:var(--font-pixel)] text-xs md:text-sm">
                
                {/* Tabla de ID Win95 */}
                <div className="border border-black p-2 bg-[#ffffe1]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-left">
                    <div className="flex flex-col border-b border-gray-400 pb-1">
                      <span className="text-gray-600 text-[10px]">Apodo de Red:</span>
                      <span className="font-bold text-lg text-[#000080] uppercase tracking-wide">
                        {dbUser?.fullName || 'Anónimo'}
                      </span>
                    </div>

                    <div className="flex flex-col border-b border-gray-400 pb-1">
                       <span className="text-gray-600 text-[10px]">Estatus / Clase:</span>
                       <span className="font-bold text-black uppercase">
                         {dbUser?.role === 'admin' ? 'SUPER HÉROE' : 'VISITANTE (Lv. 1)'}
                       </span>
                    </div>

                     <div className="flex flex-col border-b md:border-b-0 border-gray-400 pb-1">
                       <span className="text-gray-600 text-[10px]">Ocupación Registrada:</span>
                       <span className="font-bold text-black uppercase">
                          {dbUser?.occupation || 'No Especificada'}
                       </span>
                     </div>
                     
                     <div className="flex flex-col">
                       <span className="text-gray-600 text-[10px]">Fecha de Alta:</span>
                       <span className="font-bold text-black uppercase">
                          {dbUser?.createdAt ? new Date(dbUser.createdAt).toLocaleDateString() : 'Desconocida'}
                       </span>
                     </div>
                  </div>
                </div>

                {/* Gamificación pasiva */}
                <div className="win95-sunken bg-gray-100 p-2 mt-4 text-[10px]">
                  <p className="font-bold mb-1 border-b border-gray-300 pb-1">ESTADO DEL INVENTARIO MISIONES</p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-600">
                     <li>[X] Registrar Identidad en la Base de Datos</li>
                     <li>[ ] Explorar Portafolio de Servicios</li>
                     <li>[ ] Contactar al Desarrollador para un Proyecto</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Acciones de Footer */}
            <div className="pt-6 w-full flex flex-col sm:flex-row justify-end gap-3 mt-6 border-t-2 border-dashed border-gray-300">
               <Link href="/" className="win95-btn px-4 py-2 text-black text-center font-bold text-xs uppercase hover:bg-[#e0e0e0]">
                 Continuar Explorando (Home)
               </Link>
               <SignOutButton />
            </div>

          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
