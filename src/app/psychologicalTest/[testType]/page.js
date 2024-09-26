import React from 'react';
import TestContainer from '@/psychologicalTest/containers/TestContainer';
import StudentOnlyContainer from '@/member/containers/StudentOnlyContainer';

const TestPage = ({ params }) => {
  return (
    <div style={{ marginBottom: '40px', marginTop: '40px' }}>
      <StudentOnlyContainer>
        <TestContainer params={params} />
      </StudentOnlyContainer>
    </div>
  );
};

export default TestPage;
