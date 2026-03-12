import { AuthButton } from '@/modules/auth/components/AuthButton';
import { LocalLoginForm } from '@/modules/auth/components/LocalLoginForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border-4 border-zinc-700 p-8 shadow-2xl relative">
        <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-700 flex items-center px-2 shadow-inner">
          <span className="text-white text-xs font-press-start tracking-tighter title-shadow">
            LOGIN.EXE
          </span>
          <div className="ml-auto flex gap-1">
            <div className="w-3 h-3 bg-zinc-400 border border-zinc-900 shadow-sm" />
            <div className="w-3 h-3 bg-zinc-400 border border-zinc-900 shadow-sm" />
            <div className="w-3 h-3 bg-red-500 border border-zinc-900 shadow-sm" />
          </div>
        </div>
        
        <div className="mt-6 text-center text-white mb-8">
          <h2 className="text-xl font-press-start mb-4 text-blue-400 title-shadow">
            Identificación
          </h2>
          <p className="text-sm text-zinc-400 font-sans">
            Por favor, inicie sesión para acceder a las funciones avanzadas del sistema.
          </p>
        </div>

        <div className="flex flex-col items-center mt-8">
          <AuthButton />
          
          {/* Fallback de Email para Bypass en Modo Desarrollo */}
          <LocalLoginForm />
        </div>
        
        <div className="mt-8 pt-4 border-t border-zinc-800 text-center">
           <p className="text-xs text-zinc-500 font-mono">
            &copy; {new Date().getFullYear()} JvGV OS
           </p>
        </div>
      </div>
    </div>
  );
}
