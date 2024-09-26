'use client';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const ListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  flex: 0 0 18%;
  box-sizing: border-box;
  margin: 1%;
  padding: 20px;
  min-height: 500px;
  background-color: #e2f7e2;
  border: 2px solid #e2f7e2;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;


const ItemImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  font-size: 20px;
  color: #bfc1c7;
  font-weight: bold;
`;

const Title = styled.span`
  font-size: 2em;
  margin-top: 10px;
`;

  const Button = styled(Link)`
  width: 100%;
  height: auto;
  display: inline-block;
  margin-top: 35px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.green};
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357abd;
  }
`;



const ItemList = ({ items, loading }) => {
  return loading ? (
    <ListContainer className="item-list">
    {items.map((item, i) => (
      <ListItem key={`${item[0]}_${item[1]}_${i}`}>
          <ItemImage src={`/images/psychologicalTest/${item[0]}.jpg`} alt={`${item[1]} 이미지`} />
          <Title style={{ display: 'block', marginTop: '20px' }}>{item[1]}</Title>
          <p style={{ marginTop: '35px', fontSize: '1.03em' }}>{item[2]}</p>
        <Button href={`/psychologicalTest/${item[0]}`}>{item[3]}</Button>
      </ListItem>
    ))}
  </ListContainer>
  ) : (
    <LoadingContainer>Loading...</LoadingContainer>
  );
};

export default React.memo(ItemList);
