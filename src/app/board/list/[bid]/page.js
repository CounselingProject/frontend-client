import ListContainer from '@/board/containers/ListContainer';
import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';

const ListPage = (props) => {
  return (
    <MemberOnlyContainer>
      <ListContainer {...props} />
    </MemberOnlyContainer>
  );
};

export default ListPage;
