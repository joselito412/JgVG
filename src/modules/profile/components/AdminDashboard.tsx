import { getAdminStats, getRecentVisitors } from '@/modules/database/admin-actions';
import { Terminal, Users, Database, Clock, RefreshCcw, LogOut, ChevronRight, Hash } from 'lucide-react';
import { SignOutButton } from '@/modules/auth/components/SignOutButton';
import Link from 'next/link';

export async function AdminDashboard() {
  // Las llamadas a DB tiran error si no es admin, así que esta vista es 100% segura
  const stats = await getAdminStats();
  const visitors = await getRecentVisitors(50);

  return (
    <div className="flex flex-col min-h-[85vh] p-2 md:p-6 bg-black text-green-500 font-mono">
      {/* Header Estilo Terminal */}
      <div className="border border-green-800 p-4 mb-4 relative">
        <div className="absolute top-0 left-4 -mt-3 bg-black px-2 text-xs">
          SYS_ADMIN_TERMINAL_v1.0
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2 text-green-400">
              <Terminal className="w-6 h-6" /> root@superhero:~#
            </h1>
            <p className="text-sm text-green-600 mt-1">Conexión Segura ✓ | Modo: Omnisciente</p>
          </div>
          
          <div className="flex items-center gap-3">
             <Link href="/" className="px-3 py-1.5 border border-green-600 text-green-400 hover:bg-green-900/40 text-xs transition-colors">
               cd /home
             </Link>
             <SignOutButton />
          </div>
        </div>
      </div>

      {/* Grid de Stats Generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border border-green-800 p-4 flex items-start gap-4 hover:border-green-500 transition-colors">
          <Users className="w-8 h-8 text-green-600" />
          <div>
            <p className="text-xs text-green-600 uppercase">Usuarios DB</p>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </div>
        </div>
        
        <div className="border border-green-800 p-4 flex items-start gap-4 hover:border-green-500 transition-colors">
           <Database className="w-8 h-8 text-green-600" />
           <div>
             <p className="text-xs text-green-600 uppercase">Estado DB</p>
             <p className="text-2xl font-bold pt-1">{stats.dbConnection}</p>
           </div>
        </div>
        
        <div className="border border-green-800 p-4 flex items-start gap-4 hover:border-green-500 transition-colors">
           <Clock className="w-8 h-8 text-green-600" />
           <div>
             <p className="text-xs text-green-600 uppercase">Último Sync</p>
             <p className="text-base font-bold pt-1">
               {new Date().toLocaleTimeString()}
             </p>
           </div>
        </div>
      </div>

      {/* Tabla de Usuarios */}
      <div className="border border-green-800 flex-1 flex flex-col relative min-h-[400px]">
        <div className="absolute top-0 left-4 -mt-3 bg-black px-2 text-xs">
          TABLE_VISITORS_LOG
        </div>
        
        <div className="p-4 border-b border-green-900 flex justify-between items-center bg-green-900/10">
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Hash className="w-4 h-4" /> REGISTROS RECIENTES (LIMIT 50)
          </h2>
          <button className="text-green-600 hover:text-green-400 flex items-center gap-1 text-xs">
            <RefreshCcw className="w-3 h-3" /> refetch()
          </button>
        </div>

        <div className="flex-1 p-4 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-green-800 text-xs text-green-600">
                <th className="py-2 px-2 font-normal">ROL</th>
                <th className="py-2 px-2 font-normal">EMAIL (FULL ACCES)</th>
                <th className="py-2 px-2 font-normal">ALIAS / NOMBRE</th>
                <th className="py-2 px-2 font-normal">OCUPACIÓN</th>
                <th className="py-2 px-2 font-normal text-right">FECHA REGISTRO</th>
              </tr>
            </thead>
            <tbody>
              {visitors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-green-800">No data found in relation.</td>
                </tr>
              ) : (
                visitors.map((v, i) => (
                  <tr key={v.id} className="border-b border-green-900/50 hover:bg-green-900/20 transition-colors text-sm">
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 text-[10px] uppercase border ${v.role === 'admin' ? 'border-red-500 text-red-500' : 'border-green-700 text-green-600'}`}>
                        {v.role}
                      </span>
                    </td>
                    <td className="py-3 px-2 font-bold">{v.email}</td>
                    <td className="py-3 px-2">{v.fullName || 'N/A'}</td>
                    <td className="py-3 px-2 truncate max-w-[150px]">{v.occupation || <span className="text-green-800">Pendiente</span>}</td>
                    <td className="py-3 px-2 text-right text-xs text-green-600">
                      {v.createdAt ? new Date(v.createdAt).toLocaleDateString() : 'Desconocido'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
