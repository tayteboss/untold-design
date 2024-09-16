import styled from 'styled-components';
import { AboutPageType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import { motion } from 'framer-motion';

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
	font-weight: 200;
`;

const List = styled(motion.ul)`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${pxToRem(10)};
`;

const TeamMember = styled(motion.li)`
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

const wrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.1,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.1,
			ease: 'easeInOut',
			staggerChildren: 0.3,
			delayChildren: 0.1
		}
	}
};

const childVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.01,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.01,
			ease: 'easeInOut'
		}
	}
};

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
			<List
				variants={wrapperVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
				className="team-list"
			>
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
							variants={childVariants}
							key={i}
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
