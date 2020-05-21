import App from "./app";

try {
  new App({
    port: 3000,
    applicationName: 'RESS'
  }).run();
} catch (e) {
  console.error(e.message);
}