import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Image from 'next/image';
import group from '../../../././../public/group.jpg';

const P

const Program = ({ item }) => {
  return (
    <li>
      <Image src={group} alt="그룹이미지" width={250} height={250} />
      {item.editorImages}
      {item.counselingName}
      {item.reservationSdate}
      {item.reservationEdate}
      {item.counselingDate}
    </li>
  );
};
const StyledProgram = styled(Program)`
  display: list-item;
  margin: 100px 100px;
  width: 500px;
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
