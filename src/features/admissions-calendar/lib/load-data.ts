export const loadData = () => new Promise((resolve, reject) => {
  console.log('Загрузка данных...');

  setTimeout(() => {
    const success = true; // Меняй на false, чтобы увидеть ошибку

    if (success) {
      const data = {
        users: [
          { id: 1, name: 'Анна', age: 25 },
          { id: 2, name: 'Борис', age: 30 },
          { id: 3, name: 'Виктор', age: 28 },
        ],
        total: 3,
        timestamp: new Date().toISOString(),
      };
      resolve(data);
    } else {
      reject('Ошибка загрузки данных!');
    }
  }, 2000); // Задержка 2 секунды
});
