import { Popup } from "react-mapbox-gl";
import { useMapState } from "../../../../providers/MapContext";
import RackPopup from "../../Popup";

export const PopupRenderer = () => {
  const { popup } = useMapState();

  if (!popup.visible) {
    return null;
  }
  return (
    // @ts-ignore
    <Popup anchor="bottom" coordinates={popup.coordinates} offset={8}>
      <RackPopup />
    </Popup>
  );
};
