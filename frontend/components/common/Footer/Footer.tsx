import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { SiteSettingsType } from '../../../shared/types/types';
import LinkSwitchButton from '../../elements/LinkSwitchButton';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const FooterWrapper = styled.footer`
	padding: ${pxToRem(20)};
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	width: 100%;
	position: relative;
	z-index: 500;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}

	.link-switch {
		min-width: 274px;

		&:last-child {
			text-align: right;
		}
	}
`;

const Aoc = styled.p`
	color: var(--colour-black);
	font-size: ${pxToRem(12)};
	line-height: ${pxToRem(12)};
	padding: 0 ${pxToRem(40)};
	text-align: center;
	flex: 3;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

type Props = Pick<
	SiteSettingsType,
	'email' | 'phone' | 'acknowledgementOfCountry'
>;

const Footer = (props: Props) => {
	const { email, phone, acknowledgementOfCountry } = props;

	const [useAoc, setUseAoc] = useState(false);

	const pathname = usePathname();

	useEffect(() => {
		if (pathname === '/about') {
			setUseAoc(true);
		} else {
			setUseAoc(false);
		}
	}, [pathname]);

	return (
		<FooterWrapper className="footer">
			<LinkSwitchButton
				initialTitle="Email"
				hoveredTitle={email}
				link={`mailto:${email}`}
			/>
			{acknowledgementOfCountry && useAoc && (
				<Aoc>{acknowledgementOfCountry}</Aoc>
			)}
			<LinkSwitchButton
				initialTitle="Phone"
				hoveredTitle={phone}
				link={`tel:${phone}`}
			/>
		</FooterWrapper>
	);
};

export default Footer;
