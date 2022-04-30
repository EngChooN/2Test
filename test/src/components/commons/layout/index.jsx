import styled from "@emotion/styled";
import Banner from "./banner";
import Header from "./header";
import Sidebar from "./sidebar";


const Body = styled.div``;

const Wrapper = styled.div``;

export default function Layout(props) {
  return (
    <Wrapper>
      <Header />
      <Banner />
      <Sidebar />
      <Body>{props.children}</Body>
    </Wrapper>
  );
}
