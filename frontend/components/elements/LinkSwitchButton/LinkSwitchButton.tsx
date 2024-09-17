import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

const LinkSwitchButtonWrapper = styled.div`
	flex: 1;
`;

const Title = styled.div`
	font-family: var(--font-bold);
	text-transform: uppercase;
`;

type Props = {
	initialTitle: string;
	hoveredTitle: string;
	link: string;
};

const LinkSwitchButton = (props: Props) => {
	const { initialTitle, hoveredTitle, link } = props;

	const [isHovered, setIsHovered] = useState(false);

	return (
		<LinkSwitchButtonWrapper
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}
			className="link-switch"
		>
			<Link href={link}>
				{isHovered ? (
					<Title className="type-h2">{hoveredTitle || ''}</Title>
				) : (
					<Title className="type-h2">{initialTitle || ''}</Title>
				)}
			</Link>
		</LinkSwitchButtonWrapper>
	);
};

export default LinkSwitchButton;
