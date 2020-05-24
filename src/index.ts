import App from "./app";
import readline from 'readline'

/*
Функция InputDatabaseConfig позволяет ввести в консоль даные от базы данных для подключения
Функция CreateApp создает экземляр приложения и запускает его
Для удобства разработки можно использовать CreateApp напрямую
Крайне не рекомендуется включать в релизную сборку данные от БД
*/
//Start program
//InputDatabaseConfig(); // Либо InputDatabaseConfig, либо CreateApp !!! Необходимо оставить только одно
CreateApp("localhost", "RecommendationSystem", "usrgpo", "PhyGyisHNs}{2DU") // Можно использовать только для дебага. Для релиза необходимо удалить данную строку

//functions
function InputDatabaseConfig() {
  const rl: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Enter host: ", function (host) {
    rl.question("Enter database: ", function (database) {
      rl.question("Enter user: ", function (user) {
        rl.question("Enter password: ", function (password) {
          CreateApp(host, database, user, password);
          rl.close();
        })
      })
    })

  });
}

function CreateApp(host: string, database: string, user: string, password: string) {
  console.log("")
  try {
    new App({
      port: 3000,
      applicationName: 'RESS',
      host: host,
      database: database,
      user: user,
      password: password,
    }).run();

  } catch (e) {
    console.error(e.message);
  }
}



