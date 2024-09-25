import React from 'react';


const PsychologicalTest = ({ items }) => {

  return (
    <div>
      <h1>심리 검사 결과</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <p>점수 범위: {item.range}</p> {/* range 필드 출력 */}
            <p>제목: {item.title}</p>        {/* title 필드 출력 */}
            <p>내용: {item.content}</p>      {/* content 필드 출력 */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(PsychologicalTest);
