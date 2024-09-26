import React from 'react';
import TestContainer from '@/psychologicalTest/containers/TestContainer';
import StudentOnlyContainer from '@/member/containers/StudentOnlyContainer';

const TestPage = ({ params }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <StudentOnlyContainer>
        <TestContainer params={params} />
      </StudentOnlyContainer>
    </div>
  );
};

export default TestPage;
