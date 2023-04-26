export const formatData = (data: any) => {
  const formattedData = Object.keys(data).map((key) => ({
    x: new Date(data[key].timestamp),
    y: data[key].value,
  }));
  return formattedData;
};

export const dateFormatter = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  console.log(date);
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
