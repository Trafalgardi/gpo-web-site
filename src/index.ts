import App from "./app";

try{
  new App({
    port: 3000,
    applicationName: 'my system'
  }).run();
} catch (e){
  console.error(e.message);
}