import styled from 'styled-components';
import { ProjectType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import LayoutGrid from '../../layout/LayoutGrid';

type Props = {
	title: ProjectType['concepts'][0]['title'];
	description: ProjectType['concepts'][0]['description'];
	pdf: ProjectType['concepts'][0]['pdf'];
};

const ConceptContentBlockWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	width: calc(33vw - 20px);
	position: absolute;
	top: 0;
	left: 0;
	padding-left: ${pxToRem(20)};
`;

const Title = styled.h2`
	font-size: ${pxToRem(32)};
	line-height: ${pxToRem(32)};
`;

const Bottom = styled.div`
	padding-bottom: ${pxToRem(5)};
`;

const Description = styled.p`
	text-transform: unset !important;
	margin-bottom: ${pxToRem(20)};
`;

const Pdf = styled.a`
	text-transform: unset !important;
	text-decoration: underline;

	&:hover {
		opacity: 0.2;
	}
`;

const ConceptContentBlock = (props: Props) => {
	const { title, description, pdf } = props;

	return (
		<ConceptContentBlockWrapper>
			{title && <Title>{title}</Title>}
			<Bottom>
				{description && (
					<Description className="type-h2">{description}</Description>
				)}
				{pdf && (
					<Pdf
						href={pdf.asset.url}
						target="_blank"
						className="type-h2"
					>
						Download PDF
					</Pdf>
				)}
			</Bottom>
		</ConceptContentBlockWrapper>
	);
};

export default ConceptContentBlock;
