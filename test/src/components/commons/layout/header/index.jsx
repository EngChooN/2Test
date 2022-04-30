import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../commons/libraries/Recoil";
// import { Modal, Button } from "antd";

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      email
      name
      userPoint {
        amount
      }
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Btns = styled.div`
  margin-right: 370px;
`;

const Login = styled.button`
  font-weight: 400;
  font-size: 14px;
  border: none;
  background-color: white;
  margin-right: 65px;
  cursor: pointer;
`;

const Join = styled.button`
  font-weight: 400;
  font-size: 14px;
  border: none;
  background-color: white;
  margin-right: 65px;
  cursor: pointer;
`;

const Baskets = styled.button`
  font-weight: 400;
  font-size: 14px;
  border: none;
  background-color: white;
  cursor: pointer;
  margin-right: 250px;
`;

const UserMenu = styled.div``;

const Logout = styled.button`
  font-weight: 400;
  font-size: 14px;
  border: none;
  background-color: white;
  cursor: pointer;
  margin-right: 30px;
  margin-left: 30px;
`;

const PointBtn = styled.button`
  font-weight: 400;
  font-size: 14px;
  border: none;
  background-color: white;
  cursor: pointer;
  margin-right: 30px;
  margin-left: 30px;
`;

export default function Header() {
  const { data } = useQuery(FETCH_USER_LOGGED_IN);

  const [accessToken] = useRecoilState(accessTokenState);
  const router = useRouter();
  const onClickMoveLogin = () => {
    router.push("/login");
  };

  const onClickMoveJoin = () => {
    router.push("/join");
  };

  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  const onClickMovePointCharge = () => {
    router.push("/pointcharge");
  };

  return (
    <Wrapper>
      {!accessToken && (
        <Btns>
          <Login onClick={onClickMoveLogin}>로그인</Login>
          <Join onClick={onClickMoveJoin}>회원가입</Join>
          <Baskets>장바구니 🛍</Baskets>
        </Btns>
      )}
      {accessToken && (
        <>
          <UserMenu>
            {data?.fetchUserLoggedIn.name}님의 포인트
            {data?.fetchUserLoggedIn.userPoint.amount} P
            <Logout>로그아웃</Logout>
            <Baskets>장바구니 🛒</Baskets>
            <PointBtn onClick={onClickMovePointCharge}>포인트충전</PointBtn>
          </UserMenu>
        </>
      )}
      {/* <Modal
        title="포인트 충전"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <select name="point" id="point-select">
          <option value="">--충전하실 포인트를 골라주세요--</option>
          <option value="100">100</option>
          <option value="1000">1000</option>
          <option value="5000">5000</option>
          <option value="10000">10000</option>
          <option value="20000">20000</option>
          <option value="50000">50000</option>
        </select>
      </Modal> */}
    </Wrapper>
  );
}
