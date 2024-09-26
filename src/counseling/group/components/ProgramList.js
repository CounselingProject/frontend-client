'use client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Image from 'next/image';
import group from '../../../././../public/group.jpg';
import Modal from '@/commons/components/Modal';
import ProgramInfo from './ProgramInfo';

const ListItem = styled.div`
  width: 23%;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledImage = styled(Image)`
  border-radius: 10px 10px 0 0;
  margin-bottom: 10px;
`;

const Program = ({ item, onChange }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  return (
    <>
      {visible && (
        <Modal visible={visible}>
          <ProgramInfo item={item} />
        </Modal>
      )}
      <ListItem onClick={() => setVisible(true)}>
        <StyledImage src={group} alt="그룹이미지" width={250} height={250} />
        <div> {item.editorImages}</div>
        <div classNames="title">{item.counselingName} </div>
        <div>
          신청일 : {item.reservationSdate} ~ {item.reservationEdate}
        </div>
        <div> 참여일 : {item.counselingDate} </div>
      </ListItem>
    </>
  );
};
const StyledProgram = styled(Program)`
  display: list-item;
  margin: 100px 100px;
  width: 50px;
  height: 100px;
`;

const ProgramList = ({ items = [] }) => {
  return (
    items &&
    items.length > 0 &&
    items.map((item) => (
      <StyledProgram key={`counseling_${item.cno}`} item={item} />
    ))
  );
};

export default React.memo(ProgramList);
