import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import KakaoMap from "../../src/components/commons/map";
import Dompurify from "dompurify";
import CommentComponent from "../../src/components/units/product/comment/write/ProductCommentWrite";
import { withAuth } from "../../src/commons/withAuth";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 71px;
`;
const Main = styled.div`
  display: flex;
`;
const Product = styled.div`
  display: flex;
  width: 925px;
  justify-content: center;
`;
const ProductInfo = styled.div`
  height: 1170px;
  padding-right: 30px;
  border-right: 1px solid black;
  margin-top: 70px;
`;
const User = styled.div``;
const UserInfo = styled.div``;
const Img = styled.img`
  width: 480px;
  height: 480px;
  margin-right: 70px;
`;
const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
`;
const Name = styled.div`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 50px;
`;
const Price = styled.div`
  font-weight: 500;
  font-size: 40px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid black;
`;
const Remarks = styled.div`
  width: 801px;
  height: 120px;
`;
const Tag = styled.div`
  font-weight: 400;
  font-size: 16px;
  border-bottom: 1px solid black;
  padding-bottom: 30px;
  margin-bottom: 35px;
`;
const Btns = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 21px;
`;
const Pick = styled.button`
  width: 152px;
  height: 100px;
`;
const Baskets = styled.button`
  width: 312px;
  height: 100px;
`;
const Buy = styled.button`
  width: 297px;
  height: 100px;
`;
const PrInfoTitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  margin-top: 24px;
  padding-bottom: 30px;
  border-bottom: 1px solid black;
`;

const Contents = styled.div`
  font-weight: 400;
  font-size: 20px;
  width: 916px;
  height: 130px;
  margin-top: 30px;
`;

const UsInfoTitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  width: 385px;
  margin-left: 30px;
  margin-top: 94px;
  padding-bottom: 30px;
  border-bottom: 1px solid black;
`;

const CommentTitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  margin-top: 75px;
  margin-left: 50px;
  padding-bottom: 30px;
  border-bottom: 3px solid black;
`;

const Userinfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;
  margin-top: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid black;
`;

const Profile = styled.div`
  width: 75px;
  height: 75px;
  background-color: gray;
  border-radius: 50px;
  margin-right: 35px;
`;

const UserName = styled.div`
  font-weight: 400;
  font-size: 32px;
`;

const Map = styled.div`
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 20px;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 45px;
  margin-top: 55px;
`;

const Row1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const C_Main = styled.div`
  display: flex;
  align-items: center;
`;

const C_Profile = styled.div`
  background-color: gray;
  width: 50px;
  height: 50px;
  border-radius: 40px;
  margin-right: 15px;
`;

const C_Name = styled.div`
  font-weight: 400;
  font-size: 24px;
`;

const C_Btns = styled.div`
  display: flex;
`;

const C_Edit = styled.div`
  margin-right: 10px;
`;

const C_Delete = styled.div``;

const Row2 = styled.div`
  display: flex;
  margin-top: 10px;
`;

const C_Contents = styled.div`
  font-weight: 400;
  font-size: 24px;
`;

const Edit = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FETCH_PRODUCT = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
      pickedCount
      images
      pickedCount
      seller {
        name
        email
      }
      createdAt
      soldAt
      useditemAddress {
        lat
        lng
      }
      tags
    }
  }
`;

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

const PRODUCT_COMMENTS = gql`
  query fetchUseditemQuestions($useditemId: ID!) {
    fetchUseditemQuestions(useditemId: $useditemId) {
      _id
      user {
        name
      }
      contents
    }
  }
`;

const PRODUCT_BUY = gql`
  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {
    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
      _id
    }
  }
`;

const PRODUCT_COMMENT_DELETE = gql`
  mutation deleteUseditemQuestion($useditemQuestionId: ID!) {
    deleteUseditemQuestion(useditemQuestionId: $useditemQuestionId)
  }
`;

const PRODUCT_PICK = gql`
  mutation toggleUseditemPick($useditemId: ID!) {
    toggleUseditemPick(useditemId: $useditemId)
  }
`;

function ProductDetailPage() {
  const [toggleUseditemPick] = useMutation(PRODUCT_PICK);
  const [commentEdit, setCommentEdit] = useState(false);
  const router = useRouter();
  const [createPointTransactionOfBuyingAndSelling] = useMutation(PRODUCT_BUY);
  const [deleteUseditemQuestion] = useMutation(PRODUCT_COMMENT_DELETE);
  const { data: comments } = useQuery(PRODUCT_COMMENTS, {
    variables: {
      useditemId: router.query.productId,
    },
  });
  const { data } = useQuery(FETCH_PRODUCT, {
    variables: {
      useditemId: router.query.productId,
    },
  });
  const { data: user } = useQuery(FETCH_USER_LOGGED_IN);
  console.log(data);

  const onClickEdit = () => {
    router.push("/" + router.query.productId + "/edit");
  };

  const onClickCommentDelete = (event) => {
    deleteUseditemQuestion({
      variables: {
        useditemQuestionId: event.target.id,
      },
      refetchQueries: [
        {
          query: PRODUCT_COMMENTS,
          variables: {
            useditemId: router.query.productId,
          },
        },
      ],
    });
  };

  const onClickBuy = () => {
    try {
      createPointTransactionOfBuyingAndSelling({
        variables: {
          useritemId: data?.fetchUseditem._id,
        },
      });
      alert("구매완료!");
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const [isEditComment, setIsEditComment] = useState("");
  // 댓글 수정버튼 누르면
  const onClickCommentEdit = (index) => (event) => {
    // if (commentEdit === false) {
    //   setCommentEdit(true);
    // } else {
    //   setCommentEdit(false);
    // }
    console.log(comments?.fetchUseditemQuestions);
    console.log(event.target.id);
    console.log(comments?.fetchUseditemQuestions[index]._id);
    if (event.target.id === comments?.fetchUseditemQuestions[index]._id) {
      setCommentEdit(true);
      setIsEditComment(event.target.id);
    }
  };

  const onClickBaskets = () => {};

  const onClickProductPick = () => {
    toggleUseditemPick({
      variables: {
        useditemId: router.query.productId,
      },
      refetchQueries: [
        {
          query: FETCH_PRODUCT,
          variables: {
            useditemId: router.query.productId,
          },
        },
      ],
    });
  };

  return (
    <Wrapper>
      <Main>
        <Img
          src={
            "https://storage.googleapis.com/" + data?.fetchUseditem.images[0]
          }
        />
        <MainInfo>
          <Name>{data?.fetchUseditem.name}</Name>
          <Price>{data?.fetchUseditem.price}원</Price>
          <Remarks>{data?.fetchUseditem.remarks}</Remarks>
          <Tag>{data?.fetchUseditem.tags}</Tag>
          <Btns>
            <Pick onClick={onClickProductPick}>
              찜 {data?.fetchUseditem.pickedCount}
            </Pick>
            <Baskets onClick={onClickBaskets}>장바구니</Baskets>
            <Buy onClick={onClickBuy}>바로구매</Buy>
            {data?.fetchUseditem.seller.name ===
              user?.fetchUserLoggedIn.name && (
              <Edit onClick={onClickEdit}>수정</Edit>
            )}
          </Btns>
        </MainInfo>
      </Main>
      <Product>
        <ProductInfo>
          <PrInfoTitle>상품정보</PrInfoTitle>
          {typeof window !== "undefined" && (
            <Contents
              dangerouslySetInnerHTML={{
                __html: Dompurify.sanitize(data?.fetchUseditem.contents),
              }}
            ></Contents>
          )}
          <Map>🌏 거래지역</Map>
          {data?.fetchUseditem?.useditemAddress ? (
            <KakaoMap
              lat={data?.fetchUseditem?.useditemAddress.lat}
              lng={data?.fetchUseditem?.useditemAddress.lng}
            />
          ) : (
            ""
          )}
        </ProductInfo>
        <User>
          <UserInfo>
            <UsInfoTitle>상점정보</UsInfoTitle>
            <Userinfo>
              <Profile></Profile>
              <UserName>{data?.fetchUseditem.seller.name}</UserName>
            </Userinfo>
            <CommentTitle>댓글</CommentTitle>
            {/* 댓글 작성창 */}
            <CommentComponent useditemId={router.query.productId} />
            {comments?.fetchUseditemQuestions.map((el, index) => (
              <Comment key={index}>
                <Row1>
                  <C_Main>
                    <C_Profile></C_Profile>
                    <C_Name>{el.user.name}</C_Name>
                  </C_Main>
                  <C_Btns>
                    <C_Edit onClick={onClickCommentEdit(index)} id={el._id}>
                      수정
                    </C_Edit>
                    <C_Delete onClick={onClickCommentDelete} id={el._id}>
                      삭제
                    </C_Delete>
                  </C_Btns>
                </Row1>
                <Row2>
                  <C_Contents>{el.contents}</C_Contents>
                </Row2>
                {/* 댓글 수정창 */}
                {commentEdit === true && isEditComment === el._id && (
                  <CommentComponent
                    commentEdit={commentEdit}
                    useditemId={router.query.productId}
                    commentsId={el._id}
                    editContents={
                      comments?.fetchUseditemQuestions[index].contents
                    }
                  />
                )}
              </Comment>
            ))}
          </UserInfo>
        </User>
      </Product>
    </Wrapper>
  );
}

export default withAuth(ProductDetailPage);
