import ViewContainer from '@/board/containers/ViewContainer';
import { OuterBox } from '@/commons/components/LayoutBox';
import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';

const ViewPage = ({ params }) => {
  return (
    <OuterBox>
      <MemberOnlyContainer>
        <ViewContainer params={params} />
      </MemberOnlyContainer>
    </OuterBox>
  );
};

export default ViewPage;
