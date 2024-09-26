import ViewContainer from '@/board/containers/ViewContainer';
import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';

const ViewPage = ({ params }) => {
  return (
    <MemberOnlyContainer>
      <ViewContainer params={params} />
    </MemberOnlyContainer>
  );
};

export default ViewPage;
