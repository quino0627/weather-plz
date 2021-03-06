import React from 'react';
import styled from 'styled-components';
import ErrorIcon from '../library/icons/error.svg';

const ErrorContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 50px;
  justify-content: center;
  align-items: center;
  div {
    font-size: 20px;
  }

  svg {
    max-width: 100px;
    width: 100%;
    height: auto;
  }
`;

const ErrorContent: React.FunctionComponent = () => {
  return (
    <ErrorContentWrapper>
      <ErrorIcon />
      <div>날씨를 불러오는데 실패했습니다.</div>
    </ErrorContentWrapper>
  );
};

export default ErrorContent;
