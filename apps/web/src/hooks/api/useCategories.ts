import { client } from "@/api-contract";
import { queries } from "@/lib/react-query";

type UseCategoriesOptions = Parameters<typeof client.getCategories.useQuery>[2];

export default function useCategories(options?: UseCategoriesOptions) {
  return client.getCategories.useQuery(
    queries.categories.all.queryKey,
    undefined,
    options,
  );
}
