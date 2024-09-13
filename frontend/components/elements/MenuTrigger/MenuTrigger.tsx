import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

const MenuTriggerWrapper = styled.button`
	position: fixed;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	padding: ${pxToRem(20)};
	z-index: 500;
	mix-blend-mode: difference;
	color: var(--colour-white);
	font-size: ${pxToRem(16)};
	text-transform: uppercase;
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
	}
`;

type Props = {
	setMenuIsActive: (isActive: boolean) => void;
	menuIsActive: boolean;
};

const MenuTrigger = (props: Props) => {
	const { setMenuIsActive, menuIsActive } = props;

	return (
		<MenuTriggerWrapper onClick={() => setMenuIsActive(!menuIsActive)}>
			{menuIsActive ? 'Close' : 'Menu'}
		</MenuTriggerWrapper>
	);
};

export default MenuTrigger;
