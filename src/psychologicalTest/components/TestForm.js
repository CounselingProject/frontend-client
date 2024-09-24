'use client';
import React from 'react';
import styled from 'styled-components';
import StyledMessage from '@/commons/components/StyledMessage';
import { IoIosRadioButtonOn, IoIosRadioButtonOff } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

const FormBox = styled.form``;

const ItemBox = ({ no, item, className }) => {
  const { questionId, questionText, testType } = item;
  const { t } = useTranslation();

  const optionsMap = {
    COMPULSION: (
      <>
        <span>
          <IoIosRadioButtonOff />
          {t('아니다')}
        </span>
        <span>
          <IoIosRadioButtonOff />
          {t('그렇다')}
        </span>
      </>
    ),
    EVASION: (
      <>
        <span>
          <IoIosRadioButtonOff />
          {t('전혀 그렇지 않다')}
        </span>
        <span>
          <IoIosRadioButtonOff />
          {t('그렇지 않다')}
        </span>
        <span>
          <IoIosRadioButtonOff />
          {t('보통이다')}
        </span>
        <span>
          <IoIosRadioButtonOff />
          {t('그렇다')}
        </span>
        <span>
          <IoIosRadioButtonOff />
          {t('매우 그렇다')}
        </span>
      
      </>
    ),
    STRESS: (
      <>
        <span>
          <IoIosRadioButtonOff />
          {t('전혀 그렇지 않다')}
        </span>
        <span>
          <IoIosRadioButtonOff />
          {t('그렇지 않다')}
        </span>
        <span>
          <IoIosRadioButtonOff />
          {t('그렇다')}
        </span>
        <span>
          <IoIosRadioButtonOff />
          {t('매우 그렇다')}
        </span>
      </>
    ),
    INTERNET_ADDICTION: (
      <>
        <span>
          <IoIosRadioButtonOff />
          {t('전혀 그렇지 않다')}
        </span>
        <span>
          <IoIosRadioButtonOff />
          {t('그렇지 않다')}
        </span>
        <span>
          <IoIosRadioButtonOff />
          {t('그렇다')}
        </span>
        <span>
          <IoIosRadioButtonOff />
          {t('매우 그렇다')}
        </span>
      </>
    ),
    EATING_DISORDER: (
      <>
        <span>
          <IoIosRadioButtonOff />
          {t('거의 드물다')}
        </span>
        <span>
          <IoIosRadioButtonOff />
          {t('가끔 그렇다')}
        </span>
        <span>
          <IoIosRadioButtonOff />
          {t('자주 그렇다')}
        </span>
        <span>
          <IoIosRadioButtonOff />
          {t('매우 자주 그렇다')}
        </span>
        <span>
          <IoIosRadioButtonOff />
          {t('항상 그렇다')}
        </span>
      </>
    ),
  };

  return (
    <li className={className}>
      <div>
        {no}. {questionText}
        {optionsMap[testType] || null}
      </div>
    </li>
  );
};

const TestForm = ({ items, form, errors, onChange, onSubmit }) => {
  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      {items && items.length > 0 && (
        <ul>
          {items.map((item, i) => (
            <ItemBox
              key={`questionId_${item.questionId}`}
              item={item}
              no={i + 1}
            />
          ))}
        </ul>
      )}
    </FormBox>
  );
};

export default React.memo(TestForm);
