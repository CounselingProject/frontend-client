import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';

const StyledView = styled.div`
  max-width: 800px; /* 최대 너비 설정 */
  margin: 20px auto; /* 중앙 정렬 */
  padding: 30px; /* 여백 추가 */
  border: 1px solid #e0e0e0; /* 테두리 */
  border-radius: 10px; /* 둥근 모서리 */
  background-color: #f9f9f9; /* 배경색 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  font-family: 'Arial', sans-serif; /* 글꼴 설정 */
`;

const PostInfo = styled.div`
  display: flex; /* flexbox로 정렬 */
  justify-content: space-between; /* 양 끝 정렬 */
  font-size: 16px; /* 기본 글자 크기 */
  color: #555; /* 텍스트 색상 */
  margin-bottom: 20px; /* 아래 여백 */
`;

const Subject = styled.h2`
  font-size: 28px; /* 제목 글자 크기 */
  font-weight: bold; /* 제목 강조 */
  margin: 15px 0; /* 위 아래 여백 */
  color: #333; /* 제목 색상 */
  border-bottom: 2px solid #005d4f; /* 하단 테두리 */
  padding-bottom: 10px; /* 아래 여백 */
`;

const Content = styled.div`
  font-size: 16px; /* 내용 글자 크기 */
  line-height: 1.7; /* 줄 간격 */
  margin: 25px 0; /* 위 아래 여백 */
  color: #333; /* 내용 색상 */
`;

const Attachments = styled.div`
  margin-top: 20px; /* 첨부파일 영역 위 여백 */
  padding: 10px; /* 첨부파일 영역 여백 */
  border-top: 1px solid #e0e0e0; /* 상단 테두리 */
`;

const AttachmentItem = styled.div`
  margin: 5px 0; /* 각 첨부파일 여백 */
  font-size: 14px; /* 첨부파일 글자 크기 */
`;

const Links = styled.div`
  display: flex; /* flexbox로 정렬 */
  gap: 15px; /* 요소 간격 */
  margin-top: 30px; /* 위 여백 */
`;

const StyledButton = styled.button`
  background-color: #005d4f; /* 고정된 배경색 */
  color: white; /* 글자색 */
  border: none; /* 테두리 없음 */
  border-radius: 5px; /* 둥근 모서리 */
  padding: 12px 18px; /* 여백 */
  cursor: pointer; /* 포인터 커서 */
  font-size: 16px; /* 글자 크기 */
  transition: background-color 0.3s, transform 0.2s; /* 배경색 전환 및 변환 효과 */

  &:hover {
    background-color: #004d45; /* 호버 시 배경색 변화 */
    transform: translateY(-2px); /* 호버 시 약간 위로 이동 */
  }
`;

const DefaultView = ({ item, onDelete }) => {
  const { t } = useTranslation();
  const {
    category,
    seq,
    subject,
    content,
    poster,
    email,
    createdAt,
    viewCount,
    editorView,
    showDelete,
    showEdit,
    showList,
    board,
    attachments, // 파일 첨부 데이터
  } = item;

  return (
    <StyledView>
      <PostInfo>
        <div>
          {t('작성자')}: {poster}
          {email && ` (${email})`}
        </div>
        <div>
          <span>
            {t('조회수')}: {viewCount.toLocaleString()}
          </span>
          <span style={{ marginLeft: '15px' }}>
            {t('작성일시')}: {format(createdAt, 'yyyy.MM.dd HH:mm')}
          </span>
        </div>
      </PostInfo>
      <Subject>
        {category && `[${category}] `}
        {subject}
      </Subject>
      <Content
        dangerouslySetInnerHTML={{
          __html: editorView ? content : content.replace(/\n/g, '<br />'),
        }}
      />
      
      {/* 첨부파일 영역 추가 */}
      {attachments && attachments.length > 0 && (
        <Attachments>
          <h4>{t('첨부파일')}</h4>
          {attachments.map((attachment, index) => (
            <AttachmentItem key={index}>
              <Link href={attachment.url} target="_blank" rel="noopener noreferrer">
                {attachment.name}
              </Link>
            </AttachmentItem>
          ))}
        </Attachments>
      )}

      <Links>
        <StyledButton>
          <Link href={`/board/write/${board.bid}`}>{t('글쓰기')}</Link>
        </StyledButton>
        {showEdit && (
          <StyledButton>
            <Link href={`/board/update/${seq}`}>{t('글수정')}</Link>
          </StyledButton>
        )}
        {showDelete && (
          <StyledButton type="button" onClick={() => onDelete(seq)}>
            {t('글삭제')}
          </StyledButton>
        )}
        {showList && (
          <StyledButton>
            <Link href={`/board/list/${board.bid}`}>{t('글목록')}</Link>
          </StyledButton>
        )}
      </Links>
    </StyledView>
  );
};

export default React.memo(DefaultView);
