import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  position: fixed;
  top: 220px;
  right: 80px;
  width: 155px;
  height: 373px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #000000;
  background-color: white;
`;
const Title = styled.div`
  margin-bottom: 12px;
`;
const Img = styled.img`
  width: 85px;
  height: 85px;
  margin-top: 10px;
`;
export default function Sidebar() {
  const [sawProduct, setSawProduct] = useState([]);
  const [sawProduct2, setSawProduct2] = useState([]);
  const [sawProduct3, setSawProduct3] = useState([]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("sawProduct"))) {
      const Arr = JSON.parse(localStorage.getItem("sawProduct"));
      // 배열의 마지막 인덱스
      setSawProduct(Arr[Arr.length - 1].images[0]);
      if (Arr.length >= 2) {
        setSawProduct2(Arr[Arr.length - 2].images[0]);
      }
      if (Arr.length >= 3) {
        setSawProduct3(Arr[Arr.length - 3].images[0]);
      }
    } else {
      const Arr = "[]";
    }
  });

  return (
    <Wrapper>
      <Title>최근 본 상품</Title>
      <Img src={"https://storage.googleapis.com/" + sawProduct} />
      <Img src={"https://storage.googleapis.com/" + sawProduct2} />
      <Img src={"https://storage.googleapis.com/" + sawProduct3} />
    </Wrapper>
  );
}
