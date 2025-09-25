import {
  // LayoutDashboard,
  // Building2,
  // UserPlus,
  Scale,
  // Box,
  // RefreshCcw,
  // Banknote,
  // Tags,
  Users,
  // ShieldCheck,
  // Database,
  ClipboardList,
  Coins,
  Tags,
  
} from 'lucide-react'

// export const sidebarItemsMaster = [
//   { title: 'Comparador', url: '/dashboard/Comparador', icon: Scale, roles: ['master'] },
//   { title: 'Usuarios', url: '/dashboard/Users', icon: Users, roles: ['master', 'colaborador'] },
//   { title: 'Historial Comparador', url: '/dashboard/HistorialComparador', icon: ClipboardList, roles: ['master'] },
//   { title: 'Comision', url: '/dashboard/Comision', icon: Coins , roles: ['master'] },
// ]
  
//   export const sidebarItemsColaborator = [
//   { title: 'Comparador', url: '/dashboard/Comparador', icon: Scale, roles: ['master'] },
// ]

export const sidebarItems = [
{ title: 'Comparador', url: '/dashboard/Comparador', icon: Scale, roles: ['Master', 'Colaborador'] },
{ title: 'Usuarios', url: '/dashboard/Users', icon: Users, roles: ['Master'] },
{ title: 'Historial Comparador', url: '/dashboard/HistorialComparador', icon: ClipboardList, roles: ['Master'] },
{ title: 'Comision', url: '/dashboard/Comision', icon: Coins , roles: ['Master'] },
{ title: 'Tarifas', url: '/dashboard/Tarifas', icon: Tags, roles: ['Master'] },
// { title: 'Inicio', url: '/dashboard', icon: LayoutDashboard, roles: ['master', 'colaborador'] },
// { title: 'Delegación', url: '/dashboard/Delegacion', icon: Building2, roles: ['master'] },
// { title: 'Alta Rápida', url: '/dashboard/AltaRapida', icon: UserPlus, roles: ['master'] },
// { title: 'Servicios', url: '/dashboard/Servicios', icon: Box, roles: ['master', 'colaborador'] },
// { title: 'Renovación', url: '/dashboard/Renovacion', icon: RefreshCcw, roles: ['master'] },
// { title: 'Liquidaciones', url: '/dashboard/Liquidaciones', icon: Banknote, roles: ['master'] },
// { title: 'Portal Colaboradores', url: '/dashboard/PortalColaboradores', icon: Users, roles: ['master', 'colaborador'] },
// { title: 'ADMIN', url: '/dashboard/Admin', icon: ShieldCheck, roles: ['master'] },
// { title: 'SIPS', url: '/dashboard/Sips', icon: Database, roles: ['master'] },
]