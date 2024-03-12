import { Table } from "antd";
import type { TableProps } from "antd";
import { FC, useMemo } from "react";

type Transaction = {
  id: number;
  name: string;
  cents: number;
  category: string;
};

const columns: TableProps<Transaction>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Value",
    dataIndex: "cents",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
];

export const TableTest: FC<{ transactions: Transaction[] }> = ({
  transactions: rawTransactions,
}) => {
  const transactions = useMemo(() => {
    return rawTransactions.map((t) => ({ ...t, key: t.id }));
  }, [rawTransactions]);

  return <Table dataSource={transactions} columns={columns} />;
};
