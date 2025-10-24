import { useDetailStore } from "@/store/detailStore";
import { ScrollArea, Tabs, Text } from "@radix-ui/themes";
import { InfoTable } from "@components";
import { LayersName } from "@/lib/constants";

const Info = () => {
  const data = useDetailStore((state) => state.detail);

  if (!data.length)
    return (
      <Text as="div" color="orange" size="2" className="text-center py-6">
        Ничего не найдено
      </Text>
    );

  const defaultValue = data[0]?.Layer;

  return (
    <Tabs.Root
      className="flex flex-col overflow-hidden"
      defaultValue={defaultValue}
    >
      <Tabs.List>
        {data.map(({ Layer }) => (
          <Tabs.Trigger
            key={`tab-${Layer}`}
            value={Layer}
            className="!cursor-pointer"
          >
            {LayersName[Layer]}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div className="flex-1 min-h-0">
        <ScrollArea className="flex-1 min-h-0">
          {data.map(({ Layer, Records: { Record } }) => (
            <Tabs.Content
              key={`content-${Layer}`}
              className="pt-4"
              value={Layer}
            >
              <InfoTable data={Record} />
            </Tabs.Content>
          ))}
        </ScrollArea>
      </div>
    </Tabs.Root>
  );
};

export default Info;
