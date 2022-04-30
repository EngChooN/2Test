import { useMutation, useQuery } from "@apollo/client";
import ProductWritePresenter from "./ProductWrite.presenter";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CREATE_PRODUCT,
  FETCH_PRODUCT,
  UPDATE_PRODUCT,
  UPLOAD_FILE,
} from "./ProductWrite.queries";

export default function ProductWriteContainer(props) {
  const myImgRef = useRef(null);
  const [imgUrl, setImgUrl] = useState("");
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onClickImg = () => {
    myImgRef.current?.click();
  };

  const onChangeImg = async (event) => {
    const myImg = event.target.files?.[0];

    try {
      const result = await uploadFile({
        variables: { file: myImg },
      });
      setImgUrl(result.data?.uploadFile.url);
      alert("이미지 올리기 성공!");
      console.log(result);
    } catch (error) {
      alert(error);
    }
  };
  //

  const router = useRouter();
  const { data: fetchProduct } = useQuery(FETCH_PRODUCT, {
    variables: {
      useditemId: router.query.productId,
    },
  });
  console.log(router.query.productId);
  const [createUseditem] = useMutation(CREATE_PRODUCT);
  const [updateUseditem] = useMutation(UPDATE_PRODUCT);

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [address, setAddress] = useState("");

  const schema = yup.object().shape({
    name: yup.string().required("빈칸은 ㄴㄴ").min(2, "최소 2자리 이상"),
    price: yup.number().required("빈칸은ㄴㄴ").positive("숫자만 ㄱㄱ"),
    remarks: yup.string().required("빈칸은 ㄴㄴ"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    getValues,
    formState,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [hashArr, setHashArr] = useState([]);
  const onKeyUpHashTag = (event) => {
    if (event.keyCode === 32 && event.target.value !== " ") {
      setHashArr([...hashArr, "#" + event.target.value]);

      event.target.value = "";
    }
  };

  console.log("FETCH  " + fetchProduct?.fetchUseditem?.name);
  const onClickProductWrite = async (data) => {
    if (fetchProduct?.fetchUseditem?.name === undefined) {
      try {
        const result = await createUseditem({
          variables: {
            createUseditemInput: {
              name: data.name,
              contents: data.contents,
              price: Number(data.price),
              remarks: data.remarks,
              images: [imgUrl],
              tags: hashArr,
              useditemAddress: {
                lat: Number(lat),
                lng: Number(lng),
                address: address,
              },
            },
          },
        });
        alert("상품등록!");
        router.push("/" + result.data.createUseditem._id);
      } catch (error) {
        alert(error);
      }
    } else if (props.isEdit === true) {
      const editArr = [...fetchProduct?.fetchUseditem.tags, ...hashArr];
      const updateVariables = {
        updateUseditemInput: {
          useditemAddress: {},
        },
        useditemId: router.query.productId,
      };
      if (data.name !== "")
        updateVariables.updateUseditemInput.name = data.name;

      if (data.contents !== "")
        updateVariables.updateUseditemInput.contents = data.contents;

      if (data.price !== "")
        updateVariables.updateUseditemInput.price = Number(data.price);

      if (data.remarks !== "")
        updateVariables.updateUseditemInput.remarks = data.remarks;

      if (hashArr !== []) updateVariables.updateUseditemInput.tags = editArr;

      if (fetchProduct?.fetchUseditem.useditemAddress.address !== "") {
        updateVariables.updateUseditemInput.useditemAddress.address = address;
        updateVariables.updateUseditemInput.useditemAddress.lat = Number(lat);
        updateVariables.updateUseditemInput.useditemAddress.lng = Number(lng);
      }

      // if(fetchProduct?.fetchUseditem.images !== "") updateVariables.updateUseditemInput.images = images
      try {
        const result2 = await updateUseditem({
          variables: updateVariables,
        });
        alert("상품정보 업데이트!!!");
        router.push("/" + router.query.productId);
      } catch (error) {
        alert(error);
      }
    }
  };

  const onChangeContents = (value) => {
    setValue("contents", value === "<p><br></p>" ? "" : value);
    trigger("contents");
  };

  const [isOpen, setIsOpen] = useState(false);
  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  const handleComplete = (data) => {
    console.log(data);
    setAddress(data.address);
    onToggleModal();
  };

  const onClickCancleButton = () => {
    router.push("/");
  };

  return (
    <ProductWritePresenter
      onClickProductWrite={onClickProductWrite}
      register={register}
      handleSubmit={handleSubmit}
      onChangeContents={onChangeContents}
      data={fetchProduct}
      reset={reset}
      getValues={getValues}
      setValue={setValue}
      onKeyUpHashTag={onKeyUpHashTag}
      hashArr={hashArr}
      // 위도 경도
      setLat={setLat}
      setLng={setLng}
      // 모달과 주소
      isOpen={isOpen}
      onToggleModal={onToggleModal}
      handleComplete={handleComplete}
      // 지도에 쓸 주소
      address={address}
      // yup 에러
      formState={formState}
      onClickCancleButton={onClickCancleButton}
      onClickImg={onClickImg}
      onChangeImg={onChangeImg}
      myImgRef={myImgRef}
      imgUrl={imgUrl}
      isEdit={props.isEdit}
    />
  );
}
