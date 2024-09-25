import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Image from 'next/image';
import group from '../../../././../public/group.jpg';

const ListItem = styled.li`
  width: 300px
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
  margin: 20px 0; 
  padding: 10px;
  }

  .div.title{

  }
`;


const StyledImage = styled(Image)`
  border-radius: 5px; /* 이미지 둥글게 */
  margin-bottom: 10px; /* 이미지와 텍스트 간의 여백 */
`;

const Program = ({ item }) => {
  return (
    <ListItem>
      <StyledImage src={group} alt="그룹이미지" width={250} height={250} />
      <div> {item.editorImages}</div>
      <div classNames="title">{item.counselingName} </div>
      <div>
        신청 : {item.reservationSdate} ~ {item.reservationEdate}
      </div>
      <div> 참여 : {item.counselingDate} </div>
    </ListItem>
  );
};
const StyledProgram = styled(Program)`
  display: list-item;
  margin: 100px 100px;
  width: 100px;
  height: 100px;
`;

const ProgramList = ({ items }) => {
  return (
    items &&
    items.length > 0 &&
    items.map((item) => (
      <StyledProgram key={`counseling_${item.cno}`} item={item} />
    ))
  );
};

export default React.memo(ProgramList);
