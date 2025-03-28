import { registerHelper } from "discourse/lib/helpers";

export default registerHelper("gt", function (params) {
  const [a, b] = params;
  return Number(a) > Number(b);
});
