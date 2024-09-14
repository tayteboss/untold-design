import styled from 'styled-components';
import { ProjectType } from '../../../shared/types/types';
import ConceptContentBlock from '../ConceptContentBlock';
import ConceptCarousel from '../ConceptCarousel';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	title: ProjectType['concepts'][0]['title'];
	description: ProjectType['concepts'][0]['description'];
	pdf: ProjectType['concepts'][0]['pdf'];
	images: ProjectType['concepts'][0]['images'];
};

const ConceptSlideWrapper = styled.section`
	padding: ${pxToRem(20)} 0;
	border-bottom: 1px solid var(--colour-black);

	&:first-child {
		border-top: 1px solid var(--colour-black);
	}
`;

const Inner = styled.div`
	position: relative;
`;

const ConceptSlide = (props: Props) => {
	const { title, description, pdf, images } = props;

	return (
		<ConceptSlideWrapper>
			<Inner>
				<ConceptContentBlock
					title={title}
					description={description}
					pdf={pdf}
				/>
				<ConceptCarousel images={images} />
			</Inner>
		</ConceptSlideWrapper>
	);
};

export default ConceptSlide;
