import JoinContainer from '@/member/containers/JoinContainer';
import GuestOnlyContainer from '@/member/containers/GuestOnlyContainer';
const JoinPage = () => {
  return (
    <div style={{ marginBottom: '80px', marginTop: '80px', minHeight: '100px' }}>
      <GuestOnlyContainer>
        <JoinContainer />
      </GuestOnlyContainer>
    </div>
  );
};

export default JoinPage;
