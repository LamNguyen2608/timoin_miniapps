export type SensorData = {
  sensor: string;
  value: number;
  timestamp: number;
};

export type CameraDataRealtime = {
  img_link: string;
  name: string;
  timestamp: number;
  traffic: number;
};

export type LocationFirestore = {
  address: string;
  current_file: string;
  ggl_map: string;
  traffic: number;
};
