import { client } from "@/api-contract";
import { createQueryKeyStore } from "@lukemorales/query-key-factory";

// if you prefer to declare everything in one file
export const queries = createQueryKeyStore({
  categories: {
    all: {
      queryKey: null,
      queryFn: async () => {
        return client.getCategories.query();
      },
    },
  },
  // users: {
  //   all: null,
  //   detail: (userId: string) => ({
  //     queryKey: [userId],
  //     queryFn: () => api.getUser(userId),
  //   }),
  // },
  // todos: {
  //   detail: (todoId: string) => [todoId],
  //   list: (filters: TodoFilters) => ({
  //     queryKey: [{ filters }],
  //     queryFn: (ctx) => api.getTodos({ filters, page: ctx.pageParam }),
  //     contextQueries: {
  //       search: (query: string, limit = 15) => ({
  //         queryKey: [query, limit],
  //         queryFn: (ctx) => api.getSearchTodos({
  //           page: ctx.pageParam,
  //           filters,
  //           limit,
  //           query,
  //         }),
  //       }),
  //     },
  //   }),
  // },
});
