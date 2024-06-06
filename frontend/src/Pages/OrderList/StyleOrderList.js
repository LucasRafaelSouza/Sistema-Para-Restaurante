import styled from 'styled-components'



export const StyledSection = styled.section`
display: grid;
grid-auto-rows: auto;
align-items: flex-start;
@media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
}
`;