import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

const LinkSwitchButtonWrapper = styled.div``;

const Title = styled.div`
	font-family: var(--font-bold);
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
		>
			<Link href={link}>
				{isHovered ? (
					<Title className="type-h2 lowercase">
						{hoveredTitle || ''}
					</Title>
				) : (
					<Title className="type-h2">{initialTitle || ''}</Title>
				)}
			</Link>
		</LinkSwitchButtonWrapper>
	);
};

export default LinkSwitchButton;
