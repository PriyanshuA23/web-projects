import { requestHandler } from "./app.js";

const main = () => {
  Deno.serve({ port: 8000 }, requestHandler);
};

main();
