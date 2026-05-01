import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Профиль — ДГМУ',
};

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Профиль</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Информация о вашем аккаунте
        </p>
      </div>
    </div>
  );
}
