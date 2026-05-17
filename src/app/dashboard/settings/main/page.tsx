import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';

export default function Page() {
  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Основные настройки</CardTitle>
      </CardHeader>
      <form className="flex size-full flex-col gap-6">
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FieldSet>
              <FieldLegend>Приемная коммисия</FieldLegend>
              <FieldGroup className="flex flex-col md:flex-row">
                <Field data-invalid={false}>
                  <FieldLabel htmlFor="start">Начало</FieldLabel>
                  <DatePicker
                    calendarProps={{
                      id: 'start',
                    }}
                    aria-invalid={false}
                  />
                  {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={false} loading={false} type="submit">Сохранить</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
