import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Contents, Submit, Wrapper } from "./ProductCommentWrite.styles";

const COMMENT_CREATE = gql`
  mutation createUseditemQuestion(
    $createUseditemQuestionInput: CreateUseditemQuestionInput!
    $useditemId: ID!
  ) {
    createUseditemQuestion(
      createUseditemQuestionInput: $createUseditemQuestionInput
      useditemId: $useditemId
    ) {
      _id
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

export default function CommentComponent(props) {
  const [contents, setContents] = useState("");
  const [createUseditemQuestion] = useMutation(COMMENT_CREATE);

  const onChangeContents = (event) => {
    setContents(event.target.value);
  };

  const onClickSubmit = async () => {
    try {
      await createUseditemQuestion({
        variables: {
          createUseditemQuestionInput: {
            contents: contents,
          },
          useditemId: props.useditemId,
        },
        refetchQueries: [
          {
            query: PRODUCT_COMMENTS,
            variables: {
              useditemId: props.useditemId,
            },
          },
        ],
      });
      alert("작성성공");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Wrapper>
      <Contents type={"text"} onChange={onChangeContents} />
      <Submit onClick={onClickSubmit}>작성하기</Submit>
    </Wrapper>
  );
}
