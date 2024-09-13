import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { SiteSettingsType } from '../../../shared/types/types';
import LinkSwitchButton from '../../elements/LinkSwitchButton';

const FooterWrapper = styled.footer`
	padding: ${pxToRem(20)};
	display: flex;
	justify-content: space-between;
	width: 100%;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

type Props = Pick<SiteSettingsType, 'email' | 'phone'>;

const Footer = (props: Props) => {
	const { email, phone } = props;

	return (
		<FooterWrapper>
			<LinkSwitchButton
				initialTitle="Email"
				hoveredTitle={email}
				link={`mailto:${email}`}
			/>
			<LinkSwitchButton
				initialTitle="Phone"
				hoveredTitle={phone}
				link={`tel:${phone}`}
			/>
		</FooterWrapper>
	);
};

export default Footer;
