'use client';
import React from 'react';
import styled from 'styled-components';
import StyledMessage from '@/commons/components/StyledMessage';
import { IoIosRadioButtonOn, IoIosRadioButtonOff } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import { t } from 'i18next';

const FormBox = styled.form`
  max-width: 1100px; /* 최대 너비 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  padding: 20px; /* 내부 여백 */
  background-color: #f9f9f9; /* 배경색 */
  border-radius: 8px; /* 모서리 둥글게 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between; /* 좌우 공간을 최대한 분배 */
  align-items: center; /* 수직 중앙 정렬 */
  margin-bottom: 20px; /* 질문과 다음 질문 사이의 간격 */
`;

const Option = styled.span`
  margin-right: 15px; /* 선택지 간의 간격 */
  cursor: pointer; /* 클릭 가능하게 커서 변경 */
`;

const OptionsContainer = styled.div`
  display: flex;
  margin-left: 20px; /* 질문과 답변 간의 간격 */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* 버튼을 수평 중앙 정렬 */
  margin-top: 30px; /* 버튼과 상단 요소 간의 간격 */
  margin-bottom: 10px;
`;

const ItemBox = ({ no, item, answers, className, onClick }) => {
  const { questionId, questionText, testType } = item;
  const { t } = useTranslation();

  const optionsMap = {
    COMPULSION: (
      <>
        <Option onClick={() => onClick(questionId, 1)}>
          {answers[questionId] === 1 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('아니다')}
        </Option>
        <Option onClick={() => onClick(questionId, 2)}>
          {answers[questionId] === 2 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('그렇다')}
        </Option>
      </>
    ),
    EVASION: (
      <>
        <Option onClick={() => onClick(questionId, 1)}>
          {answers[questionId] === 1 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('전혀 그렇지 않다')}
        </Option>
        <Option onClick={() => onClick(questionId, 2)}>
          {answers[questionId] === 2 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('그렇지 않다')}
        </Option>
        <Option onClick={() => onClick(questionId, 3)}>
          {answers[questionId] === 3 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('보통이다')}
        </Option>
        <Option onClick={() => onClick(questionId, 4)}>
          {answers[questionId] === 4 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('그렇다')}
        </Option>
        <Option onClick={() => onClick(questionId, 5)}>
          {answers[questionId] === 5 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('매우 그렇다')}
        </Option>
      </>
    ),
    STRESS: (
      <>
        <Option onClick={() => onClick(questionId, 1)}>
          {answers[questionId] === 1 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('전혀 그렇지 않다')}
        </Option>
        <Option onClick={() => onClick(questionId, 2)}>
          {answers[questionId] === 2 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('그렇지 않다')}
        </Option>
        <Option onClick={() => onClick(questionId, 3)}>
          {answers[questionId] === 3 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('그렇다')}
        </Option>
        <Option onClick={() => onClick(questionId, 4)}>
          {answers[questionId] === 4 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('매우 그렇다')}
        </Option>
      </>
    ),
    INTERNET_ADDICTION: (
      <>
        <Option onClick={() => onClick(questionId, 1)}>
          {answers[questionId] === 1 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('전혀 그렇지 않다')}
        </Option>
        <Option onClick={() => onClick(questionId, 2)}>
          {answers[questionId] === 2 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('그렇지 않다')}
        </Option>
        <Option onClick={() => onClick(questionId, 3)}>
          {answers[questionId] === 3 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('그렇다')}
        </Option>
        <Option onClick={() => onClick(questionId, 4)}>
          {answers[questionId] === 4 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('매우 그렇다')}
        </Option>
      </>
    ),
    EATING_DISORDER: (
      <>
        <Option onClick={() => onClick(questionId, 1)}>
          {answers[questionId] === 1 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('거의 드물다')}
        </Option>
        <Option onClick={() => onClick(questionId, 2)}>
          {answers[questionId] === 2 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('가끔 그렇다')}
        </Option>
        <Option onClick={() => onClick(questionId, 3)}>
          {answers[questionId] === 3 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('자주 그렇다')}
        </Option>
        <Option onClick={() => onClick(questionId, 4)}>
          {answers[questionId] === 4 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('매우 자주 그렇다')}
        </Option>
        <Option onClick={() => onClick(questionId, 5)}>
          {answers[questionId] === 5 ? (
            <IoIosRadioButtonOn />
          ) : (
            <IoIosRadioButtonOff />
          )}
          {t('항상 그렇다')}
        </Option>
      </>
    ),
  };

  return (
    <li className={className}>
      <ItemContainer>
        <div>{no}. {questionText}</div>
        <OptionsContainer>
          {optionsMap[testType] || null}
        </OptionsContainer>
      </ItemContainer>
    </li>
  );
};

const TestForm = ({ items, form, errors, onClick, onSubmit, title, description }) => {
  const { answers } = form;
  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      {title && <h1 style={{ textAlign: 'center', margin: '20px 0' }}>{title}</h1>}
      {description && <h3 style={{ textAlign: 'center', margin: '10px 0 50px 0' }}>{description}</h3>}
      {items && items.length > 0 && (
        <ul style={{ marginLeft: '15px'}}>
          {items.map((item, i) => (
            <ItemBox
              key={`questionId_${item.questionId}`}
              item={item}
              no={i + 1}
              onClick={onClick}
              answers={answers}
            />
          ))}
        </ul>
      )}
      <StyledMessage variant="danger">{errors?.global}</StyledMessage>
      <ButtonContainer>
        <StyledButton type="submit" variant="green">
          {t('제출하기')}
        </StyledButton>
      </ButtonContainer>
    </FormBox>
  );
};

export default React.memo(TestForm);
