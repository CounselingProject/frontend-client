import FormContainer from '@/board/containers/FormContainer';
import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';
import { OuterBox } from '@/commons/components/LayoutBox';

const UpdatePage = ({ params }) => {
  return (
    <OuterBox>
      <MemberOnlyContainer>
        <FormContainer params={params} />
      </MemberOnlyContainer>
    </OuterBox>
  );
};

export default UpdatePage;
