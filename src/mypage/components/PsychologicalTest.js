'use client';
import React from 'react';
import psychologicalTestType from '@/psychologicalTest/constants/psycologicalTestType';
import { useTranslation } from 'react-i18next';

const PsychologicalTest = ({ items }) => {
  const { t } = useTranslation();

  // 스타일 객체 정의
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#333',
    },
    item: {
      marginBottom: '15px',
      padding: '10px',
      backgroundColor: '#ffffff',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
    },
    label: {
      fontWeight: 'bold',
    },
    result: {
      color: '#2c3e50',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t('심리 검사 결과')}</h1> {/* 타이틀을 i18n으로 감싸기 */}
      <ul>
        {items.map((item, index) => {
          console.log(item);
          return (
            <li key={index} style={styles.item}>
              <p style={styles.label}>{t('심리검사 유형')} : {psychologicalTestType[item.testType]}</p>
              <p style={styles.label}>{t('검사 일자')} : {item.testDate}</p>
              <p style={styles.label}>{t('점수 범위')} : {item.result.range}</p>
              <p style={styles.label}>{t('결과')} : {item.result.title}</p>
              <p style={styles.label}>{t('설명')} : {item.result.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(PsychologicalTest);
