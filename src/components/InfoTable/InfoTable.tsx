import type { TRecord } from "@/types";
import { Table, Tabs, Text } from "@radix-ui/themes";

const TableFragment = ({ data }: { data: TRecord }) => {
  return (
    <Table.Root size="1">
      <Table.Body>
        {data.Field.map(({ Name, UserName, Value }) =>
          Value ? (
            <Table.Row key={Name}>
              <Table.Cell className="!pl-0">
                <Text as="div" weight="medium" color="gray" size="1">
                  {UserName}
                </Text>
              </Table.Cell>
              <Table.Cell className="!px-0">
                <Text as="div" size="1">
                  {Value}
                </Text>
              </Table.Cell>
            </Table.Row>
          ) : null
        )}
      </Table.Body>
    </Table.Root>
  );
};

const InfoTable = ({ data }: { data: TRecord | TRecord[] }) => {
  const multiple = Array.isArray(data);
  return multiple ? (
    <Tabs.Root className="flex flex-col overflow-hidden" defaultValue="0">
      <Tabs.List>
        {data.map((_, i) => (
          <Tabs.Trigger
            key={`tab-${i}`}
            value={String(i)}
            className="!cursor-pointer"
          >
            {i}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {data.map((data, i) => (
        <Tabs.Content key={`content-${i}`} value={String(i)}>
          <TableFragment {...{ data }} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  ) : (
    <TableFragment {...{ data }} />
  );
};

export default InfoTable;
