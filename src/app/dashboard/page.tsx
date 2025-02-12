import * as React from "react";
import { LayoutDashboard, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "./components/ui/sidebar";
type Props = {};

export default function Dashboard({}: Props) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader>
            <h2 className="px-4 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
              Kainonia Tickets
            </h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#eventos">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Meus eventos
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#perfil">
                    <User className="mr-2 h-4 w-4" />
                    Perfil
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center border-b px-4">
            <SidebarTrigger />
            <h1 className="ml-4 text-xl font-bold ">Dashboard</h1>
          </header>
          <main className="p-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                <h3 className="font-semibold">Total de Eventos</h3>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                <h3 className="font-semibold">Eventos Esta Semana</h3>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                <h3 className="font-semibold">Participantes</h3>
                <p className="text-2xl font-bold">156</p>
              </div>
              <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                <h3 className="font-semibold">Receita Total</h3>
                <p className="text-2xl font-bold">R$ 5.230</p>
              </div>
            </div>
            <div className="mt-8 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Próximos Eventos</h2>
              <ul className="space-y-2">
                <li>Workshop de React - 15/03/2024</li>
                <li>Conferência de UX/UI - 22/03/2024</li>
                <li>Meetup de Desenvolvedores - 05/04/2024</li>
              </ul>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
