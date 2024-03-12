import { createFileRoute } from "@tanstack/react-router";
import { Form, Input, InputNumber, Select } from "antd";
import { queries } from "@/lib/react-query";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

const getCategoriesOptions = queryOptions({
  ...queries.categories.all,
});

export const Route = createFileRoute("/")({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getCategoriesOptions);
  },
  component: IndexPage,
});

export function IndexPage() {
  const categoriesData = useSuspenseQuery(getCategoriesOptions);

  if (categoriesData.data.status !== 200) {
    throw Error("Error fetching categories");
  }

  return (
    <div className="p-2">
      <Form layout="vertical">
        <Form.Item name="name" label="Name">
          <Input placeholder="Transaction name" />
        </Form.Item>

        <Form.Item name="value" label="Value">
          <InputNumber placeholder="Enter value" min={0} />
        </Form.Item>

        <Form.Item name="categories" label="Category">
          <Select
            placeholder="Select category"
            options={categoriesData.data.body.map((c) => ({
              value: c.id,
              label: c.description,
            }))}
          />
        </Form.Item>
      </Form>
    </div>
  );
}
