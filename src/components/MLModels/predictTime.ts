import * as tf from "@tensorflow/tfjs";

export async function CommuteTimePredictor(inputData: number[]) {
  const model: tf.LayersModel = await tf.loadLayersModel(
    "https://firebasestorage.googleapis.com/v0/b/delaynt-31feb.appspot.com/o/predict%2FuserId%2Fmodel.json?alt=media&token=add724e4-81c7-4957-8a7c-8f969192435f"
  );

  //Scale: y = (x - min) / (max - min)
  if (localStorage.getItem("minEstimation")) {
    let minEst = parseFloat(localStorage.getItem("minEstimation"));
    let maxEst = parseFloat(localStorage.getItem("maxEstimation"));
    let minDist = parseFloat(localStorage.getItem("minDistance"));
    let maxDist = parseFloat(localStorage.getItem("maxDistance"));

    inputData[0] = (inputData[0] - minEst) / (maxEst - minEst);
    inputData[1] = (inputData[1] - minDist) / (maxDist - minDist);
  } else {
    inputData[0] = inputData[0] / 30;
    inputData[1] = inputData[1] / 10;
  }

  const input = tf.tensor2d([inputData]);
  const output = model.predict(input) as tf.Tensor;
  const outputArray = await output.array();
  return outputArray[0][0];
}
