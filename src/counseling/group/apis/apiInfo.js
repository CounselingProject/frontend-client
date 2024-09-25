import requestData from "@/commons/libs/requestData";

// 집단상담 프로그램 목록 
export const apiList = (search) => {

    search = search ?? {};
    
  const qs = [];

  for (const [k, v] of Object.entries(search)) {
    qs.push(`${k}=${v}`);
  }

  let url = '/counseling/counseling';
  if (qs.length > 0) url += `?${qs.join('&')}`; //검색 조건이 있을 때

  return requestData(url);
};
