'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
