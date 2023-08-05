import styled from "@emotion/styled";
const Badge = (props) => {

    const BadgeHolder = styled.img`
    height:30px;
    width: auto;
    margin: 1px;
    `

    const url = props.url;
    return (
        <BadgeHolder src={url}/>
    );
}

export default Badge;