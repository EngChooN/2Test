import dynamic from "next/dynamic";
import { useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import KakaoMap from "../../../commons/map";
import {
  Wrapper,
  NewOrEdit,
  Name,
  Price,
  Remarks,
  Edit,
  New,
  Img,
  HashTag,
  Title,
  SubTitle,
  InputWrapper,
  TagWrapper,
  TagResult,
  AdderssInput,
  MapAndAddress,
  Line,
  Btns,
  Cancle,
  Images,
  ImagesBtn,
} from "./ProductWrite.styles";
import { Modal, Button } from "antd";
import DaumPostcode from "react-daum-postcode";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function ProductWritePresenter(props) {
  useEffect(() => {
    props.reset({ contents: props.data?.fetchUseditem.contents });
  }, [props.data]);

  return (
    <Wrapper>
      {props.isOpen && (
        <Modal
          visible={true}
          onOk={props.onToggleModal}
          onCancel={props.onToggleModal}
        >
          <DaumPostcode onComplete={props.handleComplete} />
        </Modal>
      )}
      <NewOrEdit onSubmit={props.handleSubmit(props.onClickProductWrite)}>
        <Title>상품등록</Title>

        <InputWrapper>
          <SubTitle>상품 이름</SubTitle>
          <Name
            type="text"
            placeholder="상품명"
            {...props.register("name")}
            defaultValue={props.data?.fetchUseditem.name}
          />
        </InputWrapper>
        <span>{props.formState.errors.name?.message}</span>

        <InputWrapper>
          <SubTitle>상품 요약</SubTitle>
          <Remarks
            type="text"
            placeholder="간단명"
            {...props.register("remarks")}
            defaultValue={props.data?.fetchUseditem.remarks}
          />
        </InputWrapper>
        <span>{props.formState.errors.remarks?.message}</span>

        <InputWrapper>
          <SubTitle>상품 내용</SubTitle>
          <ReactQuill
            onChange={props.onChangeContents}
            value={props.getValues("contents") || ""}
            style={{
              width: "1117px",
              height: "431px",
            }}
            placeholder="상품설명"
          />
        </InputWrapper>
        <InputWrapper>
          <SubTitle>판매 가격</SubTitle>
          <Price
            type="text"
            placeholder="상품가격"
            {...props.register("price")}
            defaultValue={props.data?.fetchUseditem.price}
          />
        </InputWrapper>
        <span>{props.formState.errors.price?.message}</span>

        <InputWrapper>
          <SubTitle>태그 입력</SubTitle>
          <TagWrapper>
            <TagResult>
              {props.data?.fetchUseditem.tags}
              {props.hashArr.map((el, index) => (
                <span key={index}>{el}</span>
              ))}
            </TagResult>
            <HashTag
              type={"text"}
              onKeyUp={props.onKeyUpHashTag}
              placeholder="태그를 입력 후 스페이스바를 눌러주세요"
            />
          </TagWrapper>
        </InputWrapper>
        <MapAndAddress>
          <SubTitle>거래 위치</SubTitle>
          <KakaoMap
            setLat={props.setLat}
            setLng={props.setLng}
            address={
              props.address ||
              props.data?.fetchUseditem.useditemAddress.address ||
              ""
            }
          />
          <Button
            style={{
              color: "white",
              width: "124px",
              height: "51px",
              left: "778px",
              top: "1357px",
              background: "#000000",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            onClick={props.onToggleModal}
          >
            주소검색
          </Button>
          <AdderssInput
            value={
              props.address ||
              props.data?.fetchUseditem.useditemAddress.address ||
              ""
            }
          />
        </MapAndAddress>
        <Images>
          이미지
          <ImagesBtn onClick={props.onClickImg}>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={props.onChangeImg}
              ref={props.myImgRef}
            />
            <Img src={"https://storage.googleapis.com/" + props.imgUrl} />
          </ImagesBtn>
        </Images>
        <Line></Line>
        <Btns>
          <Cancle onClick={props.onClickCancleButton}>취소</Cancle>
          {props.isEdit === true ? <New>상품수정</New> : <New>상품등록</New>}
        </Btns>
      </NewOrEdit>
    </Wrapper>
  );
}
