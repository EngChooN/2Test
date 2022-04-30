import styled from "@emotion/styled"
import { useRouter } from "next/router"

const Wrapper = styled.div`
    width: 100%;
    height: 157px;
    border: 1px solid #555555;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const Title = styled.div`
font-size: 30px;
cursor: pointer;
`

const Sell = styled.button`
font-weight: 500;
font-size: 24px;
border: none;
background-color: white;
cursor: pointer;
`

export default function Banner() {
    const router = useRouter()
    const onClickMoveHome = () => {
        router.push("/")
    }

    const onClickMoveNew = () => {
        router.push('/product/new')
    }


    return (
        <Wrapper>
            <Title onClick={onClickMoveHome}>Test Page</Title>
            <Sell onClick={onClickMoveNew}>💰 판매하기</Sell>
        </Wrapper>
    )
}