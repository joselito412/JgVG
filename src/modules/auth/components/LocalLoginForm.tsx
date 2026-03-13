'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { signInWithEmail, signUpWithEmail } from '@/modules/auth/actions';
import { useToast } from '@/hooks/use-toast';

export function LocalLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = activeTab === 'login' 
        ? await signInWithEmail(email, password)
        : await signUpWithEmail(email, password);
      
      if (res?.error) {
        toast({
          title: `Error en ${activeTab === 'login' ? 'Inicio de Sesión' : 'Registro'}`,
          description: res.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: activeTab === 'signup' ? 'Cuenta creada exitosamente' : 'Sesión iniciada',
          description: 'Accediendo al sistema...',
        });
        if (res?.onboarded === false) {
           router.push('/onboarding');
        } else {
           router.push('/');
        }
        router.refresh();
      }
    } catch {
      toast({
        title: 'Error de Red',
        description: 'No se pudo conectar al sistema.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-zinc-700 w-full max-w-xs mx-auto">
      <p className="text-[10px] text-zinc-500 font-mono text-center mb-4 leading-tight">
        [DEV MODE]<br/>
        ACCESO LOCAL DIRECTO
      </p>

      {/* Tabs */}
      <div className="flex mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('login')}
          className={`flex-1 font-press-start text-[8px] py-2 border-t-2 border-l-2 border-r-2 ${activeTab === 'login' ? 'bg-zinc-800 text-green-400 border-zinc-600 border-b-transparent z-10' : 'bg-black text-zinc-500 border-transparent border-b-zinc-600'}`}
        >
          LOG_IN
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('signup')}
          className={`flex-1 font-press-start text-[8px] py-2 border-t-2 border-l-2 border-r-2 ${activeTab === 'signup' ? 'bg-zinc-800 text-blue-400 border-zinc-600 border-b-transparent z-10' : 'bg-black text-zinc-500 border-transparent border-b-zinc-600'}`}
        >
          SIGN_UP
        </button>
      </div>

      <form onSubmit={handleAuth} className="space-y-3 p-4 bg-zinc-800 border-2 border-zinc-600 border-t-transparent -mt-5">
        <div className="mt-2">
          <input 
            type="email" 
            placeholder="correo@ejemplo.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-black text-white font-mono text-xs p-2 border border-zinc-600 focus:border-white outline-none"
          />
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Tu contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-black text-white font-mono text-xs p-2 border border-zinc-600 focus:border-white outline-none"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading || !email || !password}
          className={`w-full font-press-start text-[8px] rounded-none border border-zinc-600 mt-2 ${activeTab === 'login' ? 'bg-black hover:bg-zinc-900 text-green-400' : 'bg-black hover:bg-zinc-900 text-blue-400'}`}
        >
          {isLoading ? '...' : activeTab === 'login' ? '> EJECUTAR LOGIN' : '> CREAR CUENTA'}
        </Button>
      </form>
    </div>
  );
}
