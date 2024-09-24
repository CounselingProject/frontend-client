import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';
import InfoContainer from '@/mypage/containers/InfoContainer';

const MypagePage = () => {
  return (
    <MemberOnlyContainer>
      <InfoContainer />
    </MemberOnlyContainer>
  );
};

export default MypagePage;