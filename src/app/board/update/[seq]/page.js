import FormContainer from '@/board/containers/FormContainer';
import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';

const UpdatePage = ({ params }) => {
  return (
    <MemberOnlyContainer>
      <FormContainer params={params} />
    </MemberOnlyContainer>
  );
};

export default UpdatePage;
