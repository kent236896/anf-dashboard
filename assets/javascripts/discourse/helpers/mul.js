import { registerHelper } from "discourse/lib/helpers";

export default registerHelper("mul", function (params) {
  const [a, b] = params;
  return Number(a) * Number(b);
});
