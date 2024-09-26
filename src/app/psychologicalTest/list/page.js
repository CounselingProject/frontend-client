import TestListContainer from '@/psychologicalTest/containers/TestListContainer';

const TestListPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>심리검사 목록</h1>
      <h3 style={{ textAlign: 'center', margin: '20px 0' }}>자가진단 심리검사는 자신의 증상에 대한 정도를 간단히 이해하고, 심리적인 어려움을 점검, 예방하기 위한 차원의 검사입니다.
      보다 정확한 진단을 위해서는 전문가와의 검사와 상담이 필요함을 안내드립니다.</h3>
      <TestListContainer />
    </div>
  );
};

export default TestListPage;
