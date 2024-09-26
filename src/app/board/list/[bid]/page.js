import ListContainer from '@/board/containers/ListContainer';
import { OuterBox } from '@/commons/components/LayoutBox';
import MemberOnlyContainer from '@/member/containers/MemberOnlyContainer';

const ListPage = (props) => {
  return (
    <OuterBox>
      <MemberOnlyContainer>
        <ListContainer {...props} />
      </MemberOnlyContainer>
    </OuterBox>
  );
};

export default ListPage;
