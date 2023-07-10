import styled, { keyframes } from "styled-components";
import { fadeInDown, fadeInRight, Animation, fadeInLeft } from "react-animations";

type Props = {
  children: any;
  duration?: number;
  animation?: Animation;
};

const SlideDiv = styled.div<{ animation: Animation; duration: number }>`
  animation: ${({ duration }) => duration}s ${({ animation }) => keyframes`${animation}`};
`;

function TransitionWrapper({ children, animation, duration }: Props) {
  return (
    <SlideDiv duration={duration!} animation={animation!}>
      {children}
    </SlideDiv>
  );
}

TransitionWrapper.defaultProps = {
  duration: 0.5,
  animation: fadeInRight,
};
export default TransitionWrapper;
