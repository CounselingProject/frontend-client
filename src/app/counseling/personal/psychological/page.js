'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';
import PersonalCounselingContainer from '@/counseling/ps/containers/PersonalCounselingContainer';
import { OuterBox } from '@/commons/components/LayoutBox';

const CounselingPage = () => {
  const { t } = useTranslation();

  return (
    <OuterBox>
      <MemberOnlyContainer>
        <PersonalCounselingContainer />
      </MemberOnlyContainer>
    </OuterBox>
  );
};

export default React.memo(CounselingPage);
