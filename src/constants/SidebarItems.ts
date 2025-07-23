import {
  LayoutDashboard,
  Building2,
  UserPlus,
  Scale,
  Box,
  RefreshCcw,
  Banknote,
  Tags,
  Users,
  ShieldCheck,
  Database,
} from 'lucide-react'

export const sidebarItems = [
  { title: 'Inicio', url: '/dashboard', icon: LayoutDashboard, roles: ['master', 'colaborador'] },
  { title: 'Delegación', url: '/dashboard/Delegacion', icon: Building2, roles: ['master'] },
  { title: 'Alta Rápida', url: '/dashboard/AltaRapida', icon: UserPlus, roles: ['master'] },
  { title: 'Comparador', url: '/dashboard/Comparador', icon: Scale, roles: ['master'] },
  { title: 'Servicios', url: '/dashboard/Servicios', icon: Box, roles: ['master', 'colaborador'] },
  { title: 'Renovación', url: '/dashboard/Renovacion', icon: RefreshCcw, roles: ['master'] },
  { title: 'Liquidaciones', url: '/dashboard/Liquidaciones', icon: Banknote, roles: ['master'] },
  { title: 'Tarifas', url: '/dashboard/Tarifas', icon: Tags, roles: ['master'] },
  { title: 'Portal Colaboradores', url: '/dashboard/PortalColaboradores', icon: Users, roles: ['master', 'colaborador'] },
  { title: 'ADMIN', url: '/dashboard/Admin', icon: ShieldCheck, roles: ['master'] },
  { title: 'SIPS', url: '/dashboard/Sips', icon: Database, roles: ['master'] },
]