import { MultivariateLinearRegression } from "ml-regression";
let regression = new MultivariateLinearRegression();

export function TrainingModel(inputs, outputs) {
  regression = new MultivariateLinearRegression(inputs, outputs);
  regression.train();
}

const newInputs = [
  /* new input array */
];
export function MakingPrediction() {
  regression.predict(newInputs);
}
