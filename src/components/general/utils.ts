export const formatData = (data: any) => {
  const formattedData = Object.keys(data).map((key) => ({
    x: new Date(data[key].timestamp),
    y: data[key].value,
  }));
  return formattedData;
};
