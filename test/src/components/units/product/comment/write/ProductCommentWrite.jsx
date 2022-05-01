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

const COMMENT_UPDATE = gql`
  mutation updateUseditemQuestion(
    $updateUseditemQuestionInput: UpdateUseditemQuestionInput!
    $useditemQuestionId: ID!
  ) {
    updateUseditemQuestion(
      updateUseditemQuestionInput: $updateUseditemQuestionInput
      useditemQuestionId: $useditemQuestionId
    ) {
      _id
    }
  }
`;

export default function CommentComponent(props) {
  const [contents, setContents] = useState("");
  const [createUseditemQuestion] = useMutation(COMMENT_CREATE);
  const { data } = useQuery(PRODUCT_COMMENTS, {
    variables: {
      useditemId: props.useditemId,
    },
  });
  const [updateUseditemQuestion] = useMutation(COMMENT_UPDATE);

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

  const onClickEdit = () => {
    const myCommentEditVariables = {
      updateUseditemQuestionInput: {},
      useditemQuestionId: props.commentsId,
    };

    if (contents !== "")
      myCommentEditVariables.updateUseditemQuestionInput.contents = contents;

    try {
      updateUseditemQuestion({
        variables: myCommentEditVariables,
        refetchQueries: [
          {
            query: PRODUCT_COMMENTS,
            variables: {
              useditemId: props.useditemId,
            },
          },
        ],
      });
      alert("댓글 수정성공!");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Wrapper>
      {/* 댓글 작성 창 => 수정창에서는 안보임 */}
      {props.commentEdit !== true && (
        <Contents type={"text"} onChange={onChangeContents} />
      )}
      {/* 댓글 수정 창 => 작성창에서는 안보임 */}
      {props.commentEdit === true && (
        <Contents
          type={"text"}
          onChange={onChangeContents}
          defaultValue={props.editContents}
        />
      )}
      {/* 댓글 작성 버튼 => 수정창에서는 안보임 */}
      {props.commentEdit !== true && (
        <Submit onClick={onClickSubmit}>작성하기</Submit>
      )}
      {/* 댓글 수정 버튼 => 작성창에서는 안보임 */}
      {props.commentEdit === true && (
        <Submit onClick={onClickEdit}>수정하기</Submit>
      )}
    </Wrapper>
  );
}
