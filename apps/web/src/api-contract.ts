import { initQueryClient } from "@ts-rest/react-query";
import { contract } from "@repo/api-contract";

export const client = initQueryClient(contract, {
  baseUrl: "http://localhost:3000",
  baseHeaders: {},
});
