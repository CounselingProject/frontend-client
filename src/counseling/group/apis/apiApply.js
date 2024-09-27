import saveProcess from '@/commons/libs/saveProcess';

// 집단 프로그램 신청
export const applyProgram = (form) =>
  saveProcess(`/counseling/apply`, 'POST', form);
