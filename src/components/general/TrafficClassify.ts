import * as tf from "@tensorflow/tfjs";

function loadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.crossOrigin = "anonymous";
    img.src = src;
  });
}

export async function TrafficClassifier(imageUrl: string) {
  const model: tf.LayersModel = await tf.loadLayersModel(
    `https://firebasestorage.googleapis.com/v0/b/delaynt-31feb.appspot.com/o/traffic_model%2Ftraffic_classifier%2Fmodel.json?alt=media&token=39c1b8ff-81e3-4b67-a7f8-860460cbfb5f`
  );
  // Create an image element
  const img = await loadImage(imageUrl);
  // Set the source of the image to the Firebase storage URL

  const tensor = tf.browser
    .fromPixels(img as HTMLImageElement)
    .resizeBilinear([64, 64])
    .mean(2)
    .expandDims(0)
    .expandDims(-1);

  // Normalize the pixel values
  const normalized = tensor.toFloat().div(tf.scalar(255));

  // Run the image through the model
  const output = model.predict(normalized) as tf.Tensor;
  const probability = tf.sigmoid(output) as tf.Tensor;

  // Get the predicted class index
  console.log(probability);
  const index = output.argMax(1).dataSync()[0];

  // Get the class label from the index
  const classes = ["Normal Traffic", "Heavy Traffic"];
  const label = classes[index];
  console.log(label);
  return label;
}
