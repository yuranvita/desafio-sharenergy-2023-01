import Lottie from "lottie-react";

type ILottieProps = {
  animation: Object;
  width: number;
  height: number;
};

function LottieAnimation({ animation, width, height }: ILottieProps) {
  const styles = {
    height: height,
    width: width,
  };

  return <Lottie animationData={animation} style={styles} />;
}

export { LottieAnimation };
