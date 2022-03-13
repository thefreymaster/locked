import React from "react";
import { Popup } from "react-mapbox-gl";
import { useParams } from "react-router-dom";
import firebaseApi from "../../../../api/firebase";
import { useMapState } from "../../../../providers/MapContext";
import { useGlobalState } from "../../../../providers/root";
import RackPopup from "../../Popup";

export const PopupRenderer = () => {
  const { meta } = useGlobalState();
  const { id }: any = useParams();
  const { popup, dispatch: mapDispatch } = useMapState();

  React.useLayoutEffect(() => {
    // if (id) {
    //   firebaseApi.db.openSingleItmeDbConnection({
    //     dbKey: meta.dbKey,
    //     id,
    //     showPopup: true,
    //     mapDispatch,
    //   });
    // }
  });

  if (!popup.visible) {
    return null;
  }
  return (
    <Popup anchor="bottom" coordinates={popup.coordinates} offset={8}>
      <RackPopup />
    </Popup>
  );
};
