import DashboardPageHeader from '@/components/dashboard/dashboard-page-header';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { ExludedSlots, MainSettings, Weekends } from '@/features/dashboard';

export default function Page() {
  return (
    <>
      <DashboardPageHeader title="Настройки" />
      <Tabs defaultValue="main">
        <TabsList>
          <TabsTrigger value="main">Основное</TabsTrigger>
          <TabsTrigger value="slot">Настройка слота</TabsTrigger>
          <TabsTrigger value="weekend">Нерабочие дни</TabsTrigger>
          <TabsTrigger value="exluded">Исключенные слоты</TabsTrigger>
        </TabsList>
        <TabsContent value="main">
          <MainSettings />
        </TabsContent>
        <TabsContent value="slot">
          dfdsfsdf
        </TabsContent>
        <TabsContent value="weekend">
          <Weekends />
        </TabsContent>
        <TabsContent value="exluded">
          <ExludedSlots />
        </TabsContent>
      </Tabs>
    </>
  );
}
