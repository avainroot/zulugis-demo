import { useMap } from "@/hooks/useMap";
import { type MapBrowserEvent } from "ol";
import { useEffect } from "react";
import { searchElementsByLayers } from "@/api";
import { Drawer } from "@components";
import { useDetailStore } from "@/store/detailStore";
import { useVectorLayer } from "@/hooks/useVectorLayer";

const MapInteraction = () => {
  const { map, vectorSource } = useMap();
  const { clearVectorLayer, renderObjects } = useVectorLayer();
  const showDetail = useDetailStore((state) => state.showDetail);
  const setPending = useDetailStore((state) => state.setPending);
  const setDetail = useDetailStore((state) => state.setDetail);

  useEffect(() => {
    if (!map) return;

    const handleClick = ({ coordinate }: MapBrowserEvent) => {
      clearVectorLayer();
      showDetail();
      const [Y, X] = coordinate;
      const Scale = map.getView().getResolution();

      searchElementsByLayers({ X, Y, Scale })
        .then((results) => {
          setDetail(results);
          renderObjects(results);
        })
        .catch((error: Error) => {
          console.error("Ошибка поиска:", error);
        })
        .finally(() => {
          setPending(false);
        });
    };

    map.on("click", handleClick);

    return () => {
      map.un("click", handleClick);
    };
  }, [
    clearVectorLayer,
    map,
    renderObjects,
    setDetail,
    setPending,
    showDetail,
    vectorSource,
  ]);

  return <Drawer />;
};

export default MapInteraction;
