import styled from 'styled-components';
import { AboutPageType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';

const TeamListWrapper = styled.div<{ $isHovered: boolean }>`
	position: relative;
	z-index: 2;

	.team-title {
		opacity: ${(props) => props.$isHovered && 0};
	}

	.team-member {
		opacity: ${(props) => props.$isHovered && 0};

		&:hover {
			opacity: 1 !important;
		}
	}

	* {
		color: var(--colour-white);
	}
`;

const Title = styled.h4`
	text-align: center;
	margin-bottom: ${pxToRem(10)};
`;

const List = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${pxToRem(10)};
`;

const TeamMember = styled.li`
	&:hover {
		p:first-child {
			text-decoration: underline;
		}
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		pointer-events: none;
	}
`;

const Text = styled.p`
	text-align: center;
`;

type Props = {
	data: AboutPageType['team'];
	setIsHovered: (props: { isHovered: boolean; headshot: number }) => void;
	isHovered: { isHovered: boolean; headshot: number };
};

const TeamList = (props: Props) => {
	const { data, setIsHovered, isHovered } = props;

	const hasData = data && data.length > 0;

	return (
		<TeamListWrapper $isHovered={isHovered.isHovered}>
			<Title className="type-p team-title">Team</Title>
			<List className="team-list">
				{hasData &&
					data.map((member, i) => (
						<TeamMember
							onMouseOver={() =>
								setIsHovered({
									isHovered: !!member?.headshot?.asset?.url,
									headshot: i
								})
							}
							onMouseOut={() =>
								setIsHovered({ isHovered: false, headshot: 0 })
							}
							className="team-member"
						>
							<Text>{member?.name || ''}</Text>
							<Text>{member?.role || ''}</Text>
							<Text>({member?.year || ''})</Text>
						</TeamMember>
					))}
			</List>
		</TeamListWrapper>
	);
};

export default TeamList;
