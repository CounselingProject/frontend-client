import LoginContainer from '@/member/containers/LoginContainer';
import GuestOnlyContainer from '@/member/containers/GuestOnlyContainer';
const LoginPage = ({ searchParams }) => {
  // params - 경로변수, searchParams - 쿼리스트링
  return (
    <div style={{ marginBottom: '10px', minHeight: '100px' }}>
      <GuestOnlyContainer>
        <LoginContainer searchParams={searchParams} />
      </GuestOnlyContainer>
    </div>
  );
};

export default LoginPage;