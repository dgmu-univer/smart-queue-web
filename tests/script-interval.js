import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');
const successRate = new Rate('successful_bookings');

// Конфигурация
const config = {
  degreeId: 1,
  date: '2026-06-25',
  startTime: '10:00',
  endTime: '12:00',
};

export const options = {
  vus: 1, // 1 пользователь
  duration: '10m', // Тест длится 10 минут (сделает ~10 записей)
  thresholds: {
    errors: ['rate<0.15'],
    successful_bookings: ['rate>0.7'],
  },
};

function generateRandomPhone() {
  const prefixes = ['7988', '7999', '7916', '7926', '7958'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  return `+${prefix}${number}`;
}

function generateRandomTime() {
  const [startHour, startMin] = config.startTime.split(':').map(Number);
  const [endHour, endMin] = config.endTime.split(':').map(Number);
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  const randomMinutes = startMinutes + Math.random() * (endMinutes - startMinutes);
  const hours = Math.floor(randomMinutes / 60);
  const minutes = Math.floor(randomMinutes % 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export default function () {
  const iterationStart = new Date();
  console.log(`\n📌 [${iterationStart.toISOString()}] Начинаем запись #${__ITER + 1}`);

  // Получение свободных слотов
  const slotsUrl = `https://xn--d1aba8al4b0b.xn--c1abz2a.xn--p1ai/backend/api/public/slots?booked=false&degreeId=${config.degreeId}&date=${config.date}`;
  const slotsResponse = http.get(slotsUrl);

  if (slotsResponse.status !== 200) {
    console.error(`❌ Ошибка получения слотов: ${slotsResponse.status}`);
    errorRate.add(1);
    return;
  }

  const availableSlots = slotsResponse.json().slots;
  const filteredSlots = availableSlots.filter(slot =>
    slot >= config.startTime && slot <= config.endTime,
  );

  if (filteredSlots.length === 0) {
    console.error(`❌ Нет слотов в интервале ${config.startTime}-${config.endTime}`);
    errorRate.add(1);
    return;
  }

  const randomSlot = filteredSlots[Math.floor(Math.random() * filteredSlots.length)];
  console.log(`✅ Выбран слот: ${randomSlot}`);

  // Создание записи
  const createResponse = http.post(
    'https://xn--d1aba8al4b0b.xn--c1abz2a.xn--p1ai/backend/api/public/appointments',
    JSON.stringify({
      date: config.date,
      degreeId: config.degreeId,
      time: randomSlot,
      phone: generateRandomPhone(),
    }),
    { headers: { 'Content-Type': 'application/json' } },
  );

  if (createResponse.status !== 200 && createResponse.status !== 201) {
    console.error(`❌ Ошибка создания записи: ${createResponse.status}`);
    errorRate.add(1);
    return;
  }

  const appointmentId = createResponse.body;
  console.log(`✅ Запись создана! ID: ${appointmentId}, Время: ${randomSlot}`);

  // Получение PIN
  const pinResponse = http.get(
    `https://xn--d1aba8al4b0b.xn--c1abz2a.xn--p1ai/backend/api/public/appointments/${appointmentId}`,
  );

  if (pinResponse.status !== 200) {
    console.error(`❌ Ошибка получения PIN: ${pinResponse.status}`);
    errorRate.add(1);
    return;
  }

  const pinCode = pinResponse.json().pin;
  console.log(`✅ Получен PIN: ${pinCode}`);

  // Верификация
  const verificationResponse = http.post(
    'https://xn--d1aba8al4b0b.xn--c1abz2a.xn--p1ai/backend/api/public/appointments/verification',
    JSON.stringify({
      id: parseInt(appointmentId),
      verificationCode: pinCode,
    }),
    { headers: { 'Content-Type': 'application/json' } },
  );

  if (verificationResponse.status === 200 && verificationResponse.json().isVerified === true) {
    const duration = (new Date() - iterationStart) / 1000;
    console.log(`🎉 ВЕРИФИКАЦИЯ УСПЕШНА! Время выполнения: ${duration.toFixed(2)} сек`);
    successRate.add(1);
    errorRate.add(0);
  } else {
    console.error(`❌ Верификация не пройдена`);
    successRate.add(0);
    errorRate.add(1);
  }

  // ГЛАВНОЕ: Ждем ровно 1 минуту (60 секунд) до следующей записи
  const waitTime = 60; // 60 секунд = 1 минута
  console.log(`⏰ Ждем ${waitTime} секунд до следующей записи...`);
  sleep(waitTime);
}
