'use client'
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Image from 'next/image';
import group from '../../../././../public/group.jpg';
import ProgramListContainer from '@/counseling/group/containers/ProgramListContainer';
import { FiClipboard } from 'react-icons/fi';
import ProgramList from './ProgramList';

const GroupDes = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;

  h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #333;
  }

  h3 {
    font-size: 1.5em;
    color: #555;
    margin: 10px 0;
    display: flex;
    align-items: center;
  }

  h3 svg {
    margin-right: 10px;
    color: skyblue;
  }

  h4 {
    font-size: 1.1em;
    color: #666;
    margin-bottom: 20px;
  }

  .des_list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .cs1 {
    background: #e0f7fa;
    color: #333;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: background 0.3s;
    width: 500px;
  }

  .cs1:hover {
    background: #b2ebf2;
  }

  .cs1 span {
    font-size: 0.9em;
    color: #777;
  }

  .des_list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Program = () => {
  return (
    <GroupDes>
      <div>
        <h1>집단상담 프로그램</h1>
        <h3>
          <FiClipboard /> 집단상담 프로그램이란?
        </h3>
        <h4>
          집단상담은 비슷한 관심을 갖고 있는 학생들과 전문상담원이 함께 만나
          진솔하고 역동적인 상호교류를 통해서 자신과 타인을 보다 잘 이해하고
          공감하며 서로의 성장을 돕는 프로그램입니다. 프로그램마다 차이는 있으나
          보통 12명으로 구성되며 자신감 향상, 대인관계 증진, 사회성 향상 등
          학기마다 다양한 주제로 모집할 예정이며 주 1회 2시간씩 진행됩니다.
        </h4>
      </div>

      <h3>
        <FiClipboard /> 집단상담 프로그램 진행 절차
      </h3>

      <div>
        <ul className="des_list">
          <li className="cs1">
            집단상담 프로그램 공고 게시판
            <span>매월초(홈페이지 게시판)</span>
          </li>
          <li className="cs1">
            집단상담 프로그램 신청 및 확정
            <span>신청기간에 맞춰 온라인 신청</span>
          </li>
          <li className="cs1">집단상담 프로그램 진행</li>
        </ul>

        <h3>
          <FiClipboard /> 집단상담프로그램 목록
        </h3>
       <ProgramListContainer />
      
      </div>
    </GroupDes>
  );
};



export default React.memo(Program);
