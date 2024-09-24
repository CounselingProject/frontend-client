'use client';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';
import PersonalCounselingContainer from '@/counseling/ps/containers/PersonalCounselingContainer';
const CounselingPage = () => {
  const { t } = useTranslation();

  return (
    <MemberOnlyContainer>
      <PersonalCounselingContainer />
    </MemberOnlyContainer>
  );
};

export default React.memo(CounselingPage);
