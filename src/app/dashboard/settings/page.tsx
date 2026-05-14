import DashboardPageHeader from '@/components/dashboard/dashboard-page-header';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { ExludedSlots, MainSettings, SlotSettings, Weekends } from '@/features/dashboard';
import { adminSettingApi } from '@/features/dashboard/api/admin-setting';

export default async function Page() {
  const [periods, slotSettings] = await Promise.all([
    adminSettingApi.getMainSettings(),
    adminSettingApi.getSlotSettings(),
    adminSettingApi.getNonWorkingDays(),
    adminSettingApi.getExcluedeSlotsSetting(),
  ]);
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
          <MainSettings values={periods} />
        </TabsContent>
        <TabsContent value="slot">
          <SlotSettings values={slotSettings} />
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
