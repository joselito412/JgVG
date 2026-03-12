'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { updateUserOnboarding } from '@/modules/database/user-actions';
import { createClient } from '@/modules/database/client';

export default function OnboardingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    username: '',
    occupation: '',
    interest: 'services' // default
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error("No user found");

      await updateUserOnboarding(user.id, formData);

      toast({
        title: 'Perfil Completado',
        description: 'Bienvenido al sistema.',
      });

      router.push('/');
      router.refresh();
      
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error de Red',
        description: 'No pudimos guardar tus datos, intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#000080] border-4 border-[#c0c0c0] p-6 sm:p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.5)] relative">
        <div className="text-center text-white mb-6">
           <h2 className="text-xl font-press-start mb-2 title-shadow text-yellow-400">
             INITIAL SETUP
           </h2>
           <p className="text-xs font-mono text-[#c0c0c0]">
             Configure sus datos de usuario
           </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-press-start text-white">Nombre de Usuario alias</label>
            <input 
              required
              type="text" 
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full font-mono p-2 bg-white text-black border-2 border-black border-t-gray-500 border-l-gray-500 outline-none"
              placeholder="Ejem: CyberRonin99"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-press-start text-white">Ocupación / Rol</label>
            <input 
              required
              type="text" 
              value={formData.occupation}
              onChange={(e) => setFormData({...formData, occupation: e.target.value})}
              className="w-full font-mono p-2 bg-white text-black border-2 border-black border-t-gray-500 border-l-gray-500 outline-none"
              placeholder="Ejem: Abogado, CEO, Dev..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-press-start text-white">Interés Principal</label>
            <div className="relative">
              <select 
                value={formData.interest}
                onChange={(e) => setFormData({...formData, interest: e.target.value})}
                className="w-full font-mono p-2 bg-white text-black border-2 border-black border-t-gray-500 border-l-gray-500 outline-none appearance-none"
              >
                <option value="legal">Servicios y Asesoría Legal</option>
                <option value="dev">Desarrollo de Software Web</option>
                <option value="ai">Automatizaciones e IA</option>
                <option value="all">Sinergia Legal-Tech (Consultoría)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black bg-[#c0c0c0] border-l-2 border-l-white border-t-2 border-t-white border-r-2 border-r-black border-b-2 border-b-black">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2">
             <Button 
                type="submit"
                disabled={isLoading}
                className="win95-btn bg-[#c0c0c0] text-black font-press-start text-xs rounded-none border-t-white border-l-white border-r-gray-800 border-b-gray-800 hover:bg-[#d0d0d0]"
             >
                {isLoading ? 'GUARDANDO...' : 'CONFIRMAR [OK]'}
             </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
