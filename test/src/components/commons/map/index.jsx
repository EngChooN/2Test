import Script from "next/script";
import Head from "next/head";
import { useEffect } from "react";

// declare const window: typeof globalThis & {
//   kakao: any;
// };

export default function KakaoMap(props) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=2e8eb448bd2a43242dc0f5cf2c26c852&autoload=false&libraries=services";
    document.head.appendChild(script);

    // 상세보기 지도
    if (props.lat) {
      script.onload = () => {
        window.kakao.maps.load(function () {
          const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
          const options = {
            // 지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(props.lat, props.lng), // 지도의 중심좌표.
            level: 3, // 지도의 레벨(확대, 축소 정도)
          };

          const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

          // 마커가 표시될 위치입니다
          var markerPosition = new window.kakao.maps.LatLng(
            props.lat,
            props.lng
          );

          // 마커를 생성합니다
          var marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });

          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);
        });
      };

      // 등록, 수정 지도
    } else {
      script.onload = () => {
        window.kakao.maps.load(function () {
          const mapContainer = document.getElementById("map"), // 지도를 표시할 div
            mapOption = {
              center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
              level: 3, // 지도의 확대 레벨
            };

          // 지도를 생성합니다
          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          // 주소-좌표 변환 객체를 생성합니다
          const geocoder = new window.kakao.maps.services.Geocoder();

          // 주소로 좌표를 검색합니다
          geocoder.addressSearch(props.address, function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );

              // 결과값으로 받은 위치를 마커로 표시합니다
              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });

              // 인포윈도우로 장소에 대한 설명을 표시합니다
              const infowindow = new window.kakao.maps.InfoWindow({
                content:
                  '<div style="width:150px;text-align:center;padding:6px 0;">거래 할 장소</div>',
              });
              infowindow.open(map, marker);

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);

              // + 뮤테이션에 담을 위도 경도를 propsSet함수로 세팅
              props.setLat(result[0].y);
              props.setLng(result[0].x);
            }
          });
        });
      };
    }
  });

  return (
    <div>
      <div>
        <div id="map" style={{ width: 900, height: 448 }}></div>
      </div>
    </div>
  );
}
