import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Кастомные метрики
const errorRate = new Rate('errors');
const successRate = new Rate('successful_bookings');

export const options = {
  stages: [
    { duration: '1m', target: 10 }, // разогрев до 10 VU
    { duration: '1m', target: 50 }, // плавный рост до 30 VU
    { duration: '3m', target: 50 }, // нагрузка 30 VU в течение 3 минут
    { duration: '30s', target: 0 }, // спад
  ],
  thresholds: {
    errors: ['rate<0.15'],
    successful_bookings: ['rate>0.7'],
    http_req_duration: ['p(95)<2000'], // опционально: 95% запросов быстрее 2 сек
  },
};

// Генерация рандомного номера телефона
function generateRandomPhone() {
  const prefixes = ['7988', '7999', '7916', '7926', '7958'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  return `+${prefix}${number}`;
}

// Форматирование даты в yyyy-MM-dd
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Генерация рандомной даты в рамках periodSettings
function generateRandomDate(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  const randomDate = new Date(randomTime);
  return formatDate(randomDate);
}

function logSuccess(message, data = null) {
  console.log(`✅ [SUCCESS] ${message}`);
  if (data) console.log(`   📦 Data:`, JSON.stringify(data, null, 2));
}

function logError(message, error = null) {
  console.error(`❌ [ERROR] ${message}`);
  if (error) console.error(`   🔥 Details:`, error);
}

function logInfo(message, data = null) {
  console.log(`📌 [INFO] ${message}`);
  if (data) console.log(`   ℹ️  Data:`, data);
}

export default function () {
  const vuId = __VU;
  const iterationId = __ITER;

  logInfo(`VU ${vuId} - Итерация ${iterationId} - Начинаем процесс записи`);

  // Шаг 1: Получение списка образовательных программ
  logInfo(`VU ${vuId} - Шаг 1/6: Загрузка списка образовательных программ`);
  const degreeProgramsResponse = http.get(
    'https://xn--d1aba8al4b0b.xn--c1abz2a.xn--p1ai/backend/api/public/degree-programs',
  );

  check(degreeProgramsResponse, {
    'GET degree-programs status 200': r => r.status === 200,
  }) || errorRate.add(1);

  if (degreeProgramsResponse.status !== 200) {
    logError(`VU ${vuId} - Не удалось получить список программ`, {
      status: degreeProgramsResponse.status,
      body: degreeProgramsResponse.body,
    });
    errorRate.add(1);
    return;
  }

  const responseBody = degreeProgramsResponse.json();
  const degreePrograms = responseBody.degreePrograms || responseBody;

  if (!degreePrograms || degreePrograms.length === 0) {
    logError(`VU ${vuId} - Список программ пуст`);
    errorRate.add(1);
    return;
  }

  const randomDegree = degreePrograms[Math.floor(Math.random() * degreePrograms.length)];
  logSuccess(`VU ${vuId} - Выбрана программа: "${randomDegree.name}" (ID: ${randomDegree.id})`);

  // Шаг 2: Генерация даты
  const { start_date, end_date } = randomDegree.periodSettings;
  const selectedDate = generateRandomDate(start_date, end_date);
  logInfo(`VU ${vuId} - Шаг 2/6: Сгенерирована дата записи: ${selectedDate}`);

  // Шаг 3: Получение слотов
  logInfo(`VU ${vuId} - Шаг 3/6: Запрос свободных слотов`);
  const slotsUrl = `https://xn--d1aba8al4b0b.xn--c1abz2a.xn--p1ai/backend/api/public/slots?booked=false&degreeId=${randomDegree.id}&date=${selectedDate}`;
  const slotsResponse = http.get(slotsUrl);

  check(slotsResponse, {
    'GET slots status 200': r => r.status === 200,
  }) || errorRate.add(1);

  if (slotsResponse.status !== 200) {
    logError(`VU ${vuId} - Не удалось получить слоты`, {
      degreeId: randomDegree.id,
      date: selectedDate,
      status: slotsResponse.status,
    });
    errorRate.add(1);
    return;
  }

  const slotsData = slotsResponse.json();
  const availableSlots = slotsData.slots;

  if (!availableSlots || availableSlots.length === 0) {
    logError(`VU ${vuId} - Нет свободных слотов на дату ${selectedDate}`);
    errorRate.add(1);
    return;
  }

  const randomSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
  logSuccess(`VU ${vuId} - Выбран слот: ${randomSlot}`);

  // Шаг 4: Создание записи (исправленный блок)
  logInfo(`VU ${vuId} - Шаг 4/6: Отправка запроса на создание записи`);
  const phoneNumber = generateRandomPhone();
  const appointmentPayload = {
    date: selectedDate,
    degreeId: randomDegree.id,
    time: randomSlot,
    phone: phoneNumber,
  };

  const createAppointmentResponse = http.post(
    'https://xn--d1aba8al4b0b.xn--c1abz2a.xn--p1ai/backend/api/public/appointments',
    JSON.stringify(appointmentPayload),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );

  // ИСПРАВЛЕНО: принимаем статусы 200 и 201 как успех
  const isSuccess = createAppointmentResponse.status === 200 || createAppointmentResponse.status === 201;

  if (isSuccess) {
    let appointmentId;
    const responseText = createAppointmentResponse.body;

    // Пытаемся распарсить ответ (может быть число, строка или объект)
    try {
      const parsedBody = createAppointmentResponse.json();
      appointmentId = parsedBody.id || parsedBody;
    } catch (e) {
      // Если ответ не JSON, возможно это просто число/строка с ID
      appointmentId = responseText;
    }

    logSuccess(`VU ${vuId} - Запись создана! ID: ${appointmentId} (статус: ${createAppointmentResponse.status})`);

    // Шаг 5: Получение PIN-кода
    logInfo(`VU ${vuId} - Шаг 5/6: Получение PIN-кода`);
    const getAppointmentResponse = http.get(
      `https://xn--d1aba8al4b0b.xn--c1abz2a.xn--p1ai/backend/api/public/appointments/${appointmentId}`,
    );

    if (getAppointmentResponse.status === 200) {
      let pinCode;
      try {
        const appointmentData = getAppointmentResponse.json();
        pinCode = appointmentData.pin;
      } catch (e) {
        logError(`VU ${vuId} - Не удалось распарсить ответ с PIN`);
        errorRate.add(1);
        return;
      }

      logSuccess(`VU ${vuId} - Получен PIN-код: ${pinCode}`);

      // Шаг 6: OTP-верификация
      logInfo(`VU ${vuId} - Шаг 6/6: OTP-верификация`);
      const verificationResponse = http.post(
        'https://xn--d1aba8al4b0b.xn--c1abz2a.xn--p1ai/backend/api/public/appointments/verification',
        JSON.stringify({
          id: parseInt(appointmentId),
          verificationCode: pinCode,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (verificationResponse.status === 200) {
        const verifiedData = verificationResponse.json();
        if (verifiedData.isVerified === true) {
          logSuccess(`VU ${vuId} - ВЕРИФИКАЦИЯ УСПЕШНА! 🎉`);
          successRate.add(1);
          errorRate.add(0);
        } else {
          logError(`VU ${vuId} - Верификация не пройдена: isVerified = ${verifiedData.isVerified}`);
          successRate.add(0);
          errorRate.add(1);
        }
      } else {
        logError(`VU ${vuId} - Ошибка верификации`, {
          status: verificationResponse.status,
          body: verificationResponse.body,
        });
        successRate.add(0);
        errorRate.add(1);
      }
    } else {
      logError(`VU ${vuId} - Не удалось получить PIN`, {
        status: getAppointmentResponse.status,
        body: getAppointmentResponse.body,
      });
      errorRate.add(1);
    }
  } else {
    logError(`VU ${vuId} - Не удалось создать запись`, {
      payload: appointmentPayload,
      status: createAppointmentResponse.status,
      body: createAppointmentResponse.body,
    });
    errorRate.add(1);
    successRate.add(0);
  }

  sleep(Math.random() * 3 + 1);
}
