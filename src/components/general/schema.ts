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

export type UserCommuteData = {
  AQI: string;
  actual_travel_time: string;
  bike: string;
  departure: string;
  destination: string;
  distance: string;
  end_time: string;
  expected_time: string;
  expected_travel_time: string;
  late: string;
  motorbike: string;
  name: string;
  rush_hour: string;
  speed: string;
  start_time: string;
  timestamp: string;
  traffic: string;
  traffic_lights: string;
  transportation: string;
  travel_date: string;
  weather: string;
};

export type HistoryData = {
  actual: number;
  estimate: number;
  late: number;
  weather: number;
  start_time: number;
  rush_hour: number;
  traffic: number;
  AQI: number;
  speed: number;
  distance: number;
};

export type InsightData = {
  max: {
    distance: number;
    estimate: number;
  };
  min: {
    distance: number;
    estimate: number;
  };
  sumSpeed: number;
  validRecords: number;
};

export type UserData = {
  age: number;
  first_name: string;
  last_name: string;
  background: any;
  metrics: any;
  relationships: any[];
};
