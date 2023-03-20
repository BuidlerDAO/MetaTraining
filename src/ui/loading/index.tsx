import { HashLoader } from 'react-spinners';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const spinAnimation = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1000;
`;

const Spinner = styled.div`
  display: inline-block;
  width: 64px;
  height: 64px;

  &:after {
    content: '';
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #fff;
    border-color: #00bfff transparent #00bfff transparent;
    animation: ${spinAnimation} 1.2s linear infinite;
  }
`;

export const LoadingPage = () => (
  <Overlay>
    <Spinner />
  </Overlay>
);

export const Loading = () => {
  return (
    <div className="absolute top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-white bg-opacity-60 dark:bg-gray-800">
      <HashLoader size={60} color="#3182ce" loading={true} />
    </div>
  );
};
