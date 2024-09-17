import styled from 'styled-components';
import { ProjectType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';

const ConceptContentBlockWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex-grow: 1;
	flex: 0 0 33vw;
	padding-left: ${pxToRem(20)};
	gap: ${pxToRem(40)};
	margin-right: ${pxToRem(20)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		flex: 0 0 50vw;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		flex: unset;
		padding: 0 ${pxToRem(15)};
		gap: ${pxToRem(15)};
		margin-right: 0;
	}
`;

const TitleWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Title = styled.h2`
	font-size: ${pxToRem(32)};
	line-height: ${pxToRem(32)};
	font-weight: 400;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		font-size: ${pxToRem(20)};
		line-height: ${pxToRem(20)};
	}
`;

const Bottom = styled.div<{ $isActive: boolean }>`
	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: ${(props) => (props.$isActive ? 'block' : 'none')};
	}
`;

const Description = styled.p`
	text-transform: unset !important;
	margin-bottom: ${pxToRem(20)};
`;

const Pdf = styled.a`
	text-transform: unset !important;
	text-decoration: underline;

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		opacity: 0.2;
	}
`;

const Trigger = styled.div<{ $isActive: boolean }>`
	height: ${pxToRem(15)};
	width: ${pxToRem(15)};
	border-radius: 50%;
	border: 1px solid var(--colour-black);
	position: relative;
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
	}

	&::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: ${pxToRem(11)};
		width: ${pxToRem(11)};
		border-radius: 50%;
		background: var(--colour-black);
		opacity: ${(props) => (props.$isActive ? 1 : 0)};
	}
`;

type Props = {
	title: ProjectType['concepts'][0]['title'];
	description: ProjectType['concepts'][0]['description'];
	pdf: ProjectType['concepts'][0]['pdf'];
	setAccordionActive?: (value: number) => void;
	accordionActive?: boolean;
	index?: number;
};

const ConceptContentBlock = (props: Props) => {
	const {
		title,
		description,
		pdf,
		setAccordionActive,
		accordionActive,
		index
	} = props;

	return (
		<ConceptContentBlockWrapper>
			<TitleWrapper onClick={() => setAccordionActive?.(index ?? 0)}>
				{title && <Title>{title}</Title>}
				<Trigger $isActive={accordionActive || false} />
			</TitleWrapper>
			<Bottom $isActive={accordionActive || false}>
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
