// types.ts
export interface Applicant {
  pinCode: string;
}

export interface AdmissionSlot {
  id: number;  
  start: Date;
  end: Date;
  applicants: Applicant[];
  applicantsCount: number;
  title: string;
}

// slotsGenerator.ts
import { AdmissionSlot, Applicant } from './types';

// Генерация PIN-кодов для примера
const generateRandomPin = () => Math.floor(1000 + Math.random() * 9000).toString();

export function generateTodaySlots(): AdmissionSlot[] {
  const slots: AdmissionSlot[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const WORK_START = 9;
  const WORK_END = 18;
  const LUNCH_START = 12;
  const LUNCH_END = 13;
  
  let slotId = 1;
  
  for (let hour = WORK_START; hour < WORK_END; hour++) {
    // Пропускаем обед
    if (hour >= LUNCH_START && hour < LUNCH_END) continue;
    
    for (let minute = 0; minute < 60; minute += 15) {
      const startTime = new Date(today);
      startTime.setHours(hour, minute, 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setMinutes(startTime.getMinutes() + 15);
      
      // Генерируем случайное количество записавшихся (0-10)
      const applicantsCount = Math.floor(Math.random() * 11);
      
      // Генерируем массив PIN-кодов
      const applicants: Applicant[] = [];
      for (let i = 0; i < applicantsCount; i++) {
        applicants.push({ pinCode: generateRandomPin() });
      }
      
      // Формируем краткий title для fallback
      let title = '';
      if (applicantsCount === 0) {
        title = 'Свободно';
      } else if (applicantsCount === 1) {
        title = applicants[0].pinCode;
      } else {
        title = `${applicants[0].pinCode} +${applicantsCount - 1}`;
      }
      
      slots.push({
        id: slotId++,
        start: startTime,
        end: endTime,
        applicants,
        applicantsCount,
        title,
      });
    }
  }
  
  return slots;
}