import styled from 'styled-components';
import { WorkType } from '../../../shared/types/types';
import { useState } from 'react';
import WorkTabImage from '../../elements/WorkTabImage';
import pxToRem from '../../../utils/pxToRem';

const WorkTabWrapper = styled.section`
	margin-top: var(--header-h);
	height: calc(100vh - (var(--footer-h) + var(--header-h)));
	position: relative;
`;

const CounterWrapper = styled.div`
	position: fixed;
	top: 50%;
	left: 0;
	transform: translateY(-50%);
	width: 100%;
	padding: 0 ${pxToRem(20)};
	display: flex;
	justify-content: space-between;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		top: unset;
		bottom: ${pxToRem(20)};
		left: 50%;
		transform: translateX(-50%) translateY(0);
		width: auto;
	}
`;

const Index = styled.p``;

const Length = styled.p``;

const TriggerWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	height: 100vh;
	width: 100%;
	display: flex;
`;

const PrevTrigger = styled.button`
	height: 100%;
	flex: 1;
	cursor: w-resize;
`;

const NextTrigger = styled.button`
	height: 100%;
	flex: 1;
	cursor: e-resize;
`;

type Props = {
	isActive: boolean;
	work: WorkType[];
};

const WorkTab = (props: Props) => {
	const { isActive, work } = props;

	const [activeIndex, setActiveIndex] = useState(0);

	const hasWork = work?.length > 0;

	const handleCounter = (index: number) => {
		return index < 10 ? `0${index + 1}` : `${index + 1}`;
	};

	const handleNext = () => {
		setActiveIndex((activeIndex + 1) % work.length);
	};

	const handlePrevious = () => {
		setActiveIndex((activeIndex - 1 + work.length) % work.length);
	};

	return (
		<>
			{isActive && (
				<>
					<TriggerWrapper>
						<PrevTrigger onClick={() => handlePrevious()} />
						<NextTrigger onClick={() => handleNext()} />
					</TriggerWrapper>
					<WorkTabWrapper>
						{hasWork &&
							work.map((item, i) => (
								<WorkTabImage
									isActive={activeIndex === i}
									title={item?.title}
									description={item?.description}
									year={item?.year}
									image={item?.image}
									key={i}
									isPriority={i === 0}
								/>
							))}
					</WorkTabWrapper>
					<CounterWrapper>
						<Index className="type-small">
							{handleCounter(activeIndex)}
						</Index>
						<Length className="type-small">/{work.length}</Length>
					</CounterWrapper>
				</>
			)}
		</>
	);
};

export default WorkTab;
