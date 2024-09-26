import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const Container = styled.div`
  max-width: 1200px; /* 최대 너비 설정 */
  margin: 20px auto; /* 중앙 정렬 */
  padding: 20px; /* 내부 여백 */
  background-color: #f9f9f9; /* 배경색 */
  border-radius: 8px; /* 모서리 둥글게 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  text-align: center; /* 전체 내용 가운데 정렬 */
`;

const Title = styled.h2`
  font-size: 1.5rem; /* 제목 크기 */
  color: #005d4f; /* 버튼 색깔과 맞추기 */
  margin-bottom: 10px; /* 아래 여백 */
`;

const Result = styled.p`
  font-size: 1rem; /* 내용 크기 */
  color: #555; /* 텍스트 색깔 */
  line-height: 1.5; /* 줄 간격 */
`;

const ImageContainer = styled.div`
  margin-bottom: 20px; /* 이미지 아래 여백 */
`;

const BackButton = styled.a`
  display: inline-block; /* 버튼 형태로 */
  margin-top: 20px; /* 위쪽 여백 */
  padding: 10px 20px; /* 내부 여백 */
  background-color: #005d4f; /* 버튼 배경색 */
  color: #fff; /* 버튼 텍스트 색 */
  border-radius: 5px; /* 모서리 둥글게 */
  text-decoration: none; /* 밑줄 제거 */
  font-weight: bold; /* 글씨 두껍게 */
  
  &:hover {
    background-color: #004d44; /* hover 시 색상 변경 */
  }
`;

const AnswerView = ({ data }) => {
  const {
    result: { title, range, content },
  } = data;

  return (
    <Container>
      <ImageContainer>
        <Image
          src="/images/psychologicalTest/result.png"
          alt="결과 이미지"
          width={400}
          height={400}
          objectFit="contain"
        />
      </ImageContainer>
      <Title>{`${range}점:  ${title}`}</Title>
      <Result>
        {content}
      </Result>
      <BackButton href="/psychologicalTest/list">심리검사 목록 페이지로 돌아가기</BackButton>
    </Container>
  );
};

export default React.memo(AnswerView);
