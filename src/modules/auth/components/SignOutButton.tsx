'use client';

import { Button } from '@/components/ui/button';
import { signOut } from '@/modules/auth/actions';

export function SignOutButton() {
  return (
    <Button 
      variant="destructive" 
      onClick={() => signOut()}
      className="font-press-start text-[10px] rounded-none border-2 border-t-white border-l-white border-r-[#400000] border-b-[#400000]"
    >
      Desconectar Sistema
    </Button>
  );
}
