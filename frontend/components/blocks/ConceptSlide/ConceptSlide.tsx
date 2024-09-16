import styled from 'styled-components';
import { ProjectType } from '../../../shared/types/types';
import ConceptCarousel from '../ConceptCarousel';
import pxToRem from '../../../utils/pxToRem';

const ConceptSlideWrapper = styled.section`
	padding: ${pxToRem(20)} 0;
	position: relative;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(15)} 0;
	}

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 20px;
		height: 1px;
		width: calc(100% - 40px);
		background: var(--colour-black);

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			width: calc(100% - 30px);
			left: 15px;
		}
	}

	&:first-child {
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 20px;
			height: 1px;
			width: calc(100% - 40px);
			background: var(--colour-black);

			@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
				width: calc(100% - 30px);
				left: 15px;
			}
		}
	}
`;

const Inner = styled.div`
	position: relative;
`;

type Props = {
	title: ProjectType['concepts'][0]['title'];
	description: ProjectType['concepts'][0]['description'];
	pdf: ProjectType['concepts'][0]['pdf'];
	images: ProjectType['concepts'][0]['images'];
	setAccordionActive: (value: number) => void;
	setLightBoxData: (value: {
		images: false | ProjectType['concepts'][0]['images'];
		index: number;
	}) => void;
	accordionActive: boolean;
	index: number;
};

const ConceptSlide = (props: Props) => {
	const {
		title,
		description,
		pdf,
		images,
		setAccordionActive,
		setLightBoxData,
		accordionActive,
		index
	} = props;

	return (
		<ConceptSlideWrapper>
			<Inner>
				<ConceptCarousel
					images={images}
					title={title}
					description={description}
					pdf={pdf}
					setAccordionActive={setAccordionActive}
					setLightBoxData={setLightBoxData}
					accordionActive={accordionActive}
					index={index}
				/>
			</Inner>
		</ConceptSlideWrapper>
	);
};

export default ConceptSlide;
