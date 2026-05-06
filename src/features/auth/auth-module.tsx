'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { AdminForm } from './components/admin-form';
import { OparatorForm } from './components/oparator-form';

export const AuthModule = () => {
  return (
    <Card className="bg-background/80 w-full max-w-md border-0 shadow-xl backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Авторизация</CardTitle>
        <CardDescription>Выберите способ входа в систему</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="table" className="w-full">
          <TabsList className="mb-6 w-full">
            <TabsTrigger value="table" className="flex-1">
              Панель оператора
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex-1">
              Панель администратора
            </TabsTrigger>
          </TabsList>

          <TabsContent value="table">
            <OparatorForm />
          </TabsContent>

          <TabsContent value="admin">
            <AdminForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
