'use client';

import { type PropsWithChildren } from 'react';
import Link from 'next/link';
import {
  ArchiveIcon,
  BarChart3Icon,
  CalendarDaysIcon,
  ClipboardCheckIcon,
  FilesIcon,
  FileTextIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UserCogIcon,
  UsersIcon,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import ProfileDropdown from './dropdown-profile';

const DashboardShell = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-dvh w-full">
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Основное</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard">
                        <LayoutDashboardIcon />
                        <span>Панель управления</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/applications">
                        <FileTextIcon />
                        <span>Заявки на поступление</span>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuBadge className="bg-primary/10 rounded-full">12</SidebarMenuBadge>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Управление</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/applicants">
                        <UsersIcon />
                        <span>База абитуриентов</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/specialties">
                        <GraduationCapIcon />
                        <span>Направления и квоты</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/exams">
                        <ClipboardCheckIcon />
                        <span>Вступительные испытания</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/documents">
                        <FilesIcon />
                        <span>Проверка документов</span>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuBadge className="bg-destructive/10 text-destructive rounded-full">3</SidebarMenuBadge>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Инструменты и отчеты</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/calendar">
                        <CalendarDaysIcon />
                        <span>График приема</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/analytics">
                        <BarChart3Icon />
                        <span>Статистика приема</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/archive">
                        <ArchiveIcon />
                        <span>Архив прошлых лет</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Система</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/users">
                        <UserCogIcon />
                        <span>Сотрудники ПК</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/settings">
                        <SettingsIcon />
                        <span>Настройки портала</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Система</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/users">
                        <UserCogIcon />
                        <span>Сотрудники ПК</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/settings">
                        <SettingsIcon />
                        <span>Настройки портала</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="bg-card sticky top-0 z-50 border-b">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="[&_svg]:size-5!" />
                <Separator orientation="vertical" className="hidden h-4! sm:block" />
                <Breadcrumb className="hidden sm:block">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Free</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="flex items-center gap-1.5">
                <ProfileDropdown
                  trigger={(
                    <Button variant="ghost" size="icon" className="size-9.5">
                      <Avatar className="size-9.5 rounded-md">
                        <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  )}
                />
              </div>
            </div>
          </header>
          <main className="mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
              {/* Statistics Cards */}
              <Card className="col-span-full w-full py-0">
                {children}
              </Card>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardShell;
