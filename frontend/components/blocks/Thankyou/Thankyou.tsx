import styled, { css } from 'styled-components';
import { SiteSettingsType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import Link from 'next/link';

const ThankyouWrapper = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: ${pxToRem(180)} 0;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(100)} 0;
	}

	&:has(.thankyou-hover:hover) {
		.thankyou-fadeout {
			opacity: 0.2;
		}
		.thankyou-hover {
			opacity: 1;
		}
	}
`;

const Text = styled.p`
	font-family: var(--font-bold);

	transition: all var(--transition-speed-default) var(--transition-ease);

	&.type-h1 {
		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(16)};
			line-height: ${pxToRem(14.4)};
		}
	}
`;

type Props = {
	email: SiteSettingsType['email'];
	tagline: SiteSettingsType['tagline'];
	established: SiteSettingsType['established'];
};

const Thankyou = (props: Props) => {
	const { email, tagline, established } = props;

	return (
		<ThankyouWrapper>
			<Text className="type-h1 thankyou-fadeout">Thank you</Text>
			{email && (
				<Link href={`mailto:${email}`}>
					<Text className="type-h1 thankyou-hover">{email}</Text>
				</Link>
			)}
			{tagline && (
				<Text className="type-h1 thankyou-fadeout">{tagline}</Text>
			)}
			{established && (
				<Text className="type-h1 thankyou-fadeout">
					EST.{established}
				</Text>
			)}
		</ThankyouWrapper>
	);
};

export default Thankyou;
