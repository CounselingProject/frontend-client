'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import PersonalCounselingContainer from '../../../components/counseling/PersonalCounselingContainer';

const TypePage = ({ params }) => {
  const { type } = params;

  return <PersonalCounselingContainer type={type} />;
};

export default TypePage;
