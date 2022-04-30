import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { flow } from "lodash";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroller";

const FETCH_PRODUCTS = gql`
  query fetchUseditems($isSoldout: Boolean, $page: Int) {
    fetchUseditems(isSoldout: $isSoldout, page: $page) {
      _id
      name
      price
      seller {
        name
      }
      images
      soldAt
      pickedCount
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const ProductBox = styled.div`
  width: 250px;
  height: 320px;
  border: 1px solid #555555;
  margin-right: 35px;
  margin-bottom: 35px;
  margin-top: 80px;
`;

const Img = styled.img`
  width: 100%;
  height: 221px;
`;

const Name = styled.div``;

const Info = styled.div``;

const Price = styled.div``;

const CreatedAt = styled.div``;

export default function Home() {
  const router = useRouter();
  const { data, fetchMore } = useQuery(FETCH_PRODUCTS, {
    variables: {
      isSoldout: false,
    },
  });

  const onClickProduct = (el) => (event) => {
    const sawProduct = JSON.parse(localStorage.getItem("sawProduct") || "[]");

    const { __typename, ...newEl } = el;
    sawProduct.push(newEl);
    localStorage.setItem("sawProduct", JSON.stringify(sawProduct));

    router.push("/" + event.target.id);
  };

  const loadFunc = () => {
    if (!data) return;
    fetchMore({
      variables: { page: Math.ceil(data?.fetchUseditems.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchUseditems)
          return { fetchUseditems: [...prev.fetchUseditems] };
        return {
          fetchUseditems: [
            ...prev.fetchUseditems,
            ...fetchMoreResult.fetchUseditems,
          ],
        };
      },
    });
  };

  return (
    <Wrapper>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={true}
        style={{ display: "flex", flexFlow: "wrap", justifyContent: "center" }}
      >
        {data?.fetchUseditems.map((el, index) => (
          <ProductBox key={index}>
            <Img
              src={"https://storage.googleapis.com/" + el.images}
              id={el._id}
              onClick={onClickProduct(el)}
            />
            <Name>{el.name}</Name>
            <Info>
              <Price>{el.price}</Price>
              <CreatedAt>{el.createdAt}</CreatedAt>
            </Info>
          </ProductBox>
        )) || <div></div>}
      </InfiniteScroll>
    </Wrapper>
  );
}
