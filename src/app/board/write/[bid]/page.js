import FormContainer from '@/board/containers/FormContainer';
import { OuterBox } from '@/commons/components/LayoutBox';
import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';

const WritePage = ({ params }) => {
  return (
    <OuterBox>
      <MemberOnlyContainer>
        <FormContainer params={params} />
      </MemberOnlyContainer>
    </OuterBox>
  );
};

export default WritePage;
