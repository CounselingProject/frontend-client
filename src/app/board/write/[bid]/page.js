import FormContainer from '@/board/containers/FormContainer';
import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';

const WritePage = ({ params }) => {
  return (
    <MemberOnlyContainer>
      <FormContainer params={params} />
    </MemberOnlyContainer>
  );
};

export default WritePage;
