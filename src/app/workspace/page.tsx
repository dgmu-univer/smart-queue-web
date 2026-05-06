export default function Workspace() {
  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Добро пожаловать!
          </h1>
          <p className="mt-1 text-6xl">
            Workspace
          </p>
        </div>
      </div>
    </div>
  );
}
