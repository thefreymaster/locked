export const generateDbKey = ({ lat, lng }: { lat: number; lng: number }) => {
  const key =
    lng.toString().replace("-", "").substring(0, 4).replace(".", "") +
    lat.toString().replace("-", "").substring(0, 4).replace(".", "");
  return key;
};
