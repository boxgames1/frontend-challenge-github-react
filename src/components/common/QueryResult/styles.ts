import { styled } from '@mui/system';

export const LoadingRoot = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(0 0 0 / 30%);
  height: 100vh;
  width: 100vw;
`;
export const LoadingInner = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
