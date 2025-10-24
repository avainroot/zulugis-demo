import { Drawer as VD } from "vaul";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useDetailStore } from "@/store/detailStore";
import { Info } from "@components";
import { Spinner, Text, Theme } from "@radix-ui/themes";
import { useVectorLayer } from "@/hooks/useVectorLayer";

const Drawer = () => {
  const { clearVectorLayer } = useVectorLayer();
  const open = useDetailStore((state) => state.open);
  const pending = useDetailStore((state) => state.pending);
  const setOpen = useDetailStore((state) => state.setOpen);
  const closeDetail = useDetailStore((state) => state.closeDetail);

  return (
    <VD.Root
      open={open}
      onOpenChange={setOpen}
      direction="right"
      dismissible={false}
      container={document.getElementById("theme")}
    >
      <VD.Portal>
        <VD.Overlay className="fixed inset-0 bg-black/10" />
        <VD.Content
          asChild
          className="bg-gray-100 flex flex-col fixed bottom-0 top-0 right-0 outline-none w-96"
        >
          <Theme>
            <div className="p-4 bg-white rounded-t-[10px] flex flex-col flex-1 overflow-hidden">
              <div className="max-w-md">
                <VD.Title className="font-medium mb-4 text-gray-900 flex items-center gap-2">
                  <VD.Close
                    className="cursor-pointer"
                    onClick={() => {
                      clearVectorLayer();
                      closeDetail();
                    }}
                  >
                    <ArrowRightIcon className="size-6" />
                  </VD.Close>
                  <span>Данные объекта</span>
                </VD.Title>
                <VD.Description asChild>
                  <Text as="div" weight="medium" align="center">
                    Доступные слои:
                  </Text>
                </VD.Description>
              </div>
              {pending ? (
                <div className="flex-1 flex items-center justify-center">
                  <Spinner size="3" />
                </div>
              ) : (
                <Info />
              )}
            </div>
          </Theme>
        </VD.Content>
      </VD.Portal>
    </VD.Root>
  );
};

export default Drawer;
