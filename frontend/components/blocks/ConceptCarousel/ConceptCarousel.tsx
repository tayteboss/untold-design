import styled from 'styled-components';
import { ProjectType } from '../../../shared/types/types';

import Image from 'next/image';
import pxToRem from '../../../utils/pxToRem';
import React from 'react';
import ConceptContentBlock from '../ConceptContentBlock';

const ConceptCarouselWrapper = styled.div`
	position: relative;
	z-index: 2;
	overflow: auto;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		overflow: unset;
	}

	&::-webkit-scrollbar {
		width: 0px;
		background: transparent;
		height: 0;
	}
`;

const Desktop = styled.div`
	display: flex;
	gap: ${pxToRem(20)};
	background: var(--colour-white);
	margin-right: ${pxToRem(20)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const Mobile = styled.div`
	flex-direction: column;
	gap: ${pxToRem(20)};
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: flex;
	}
`;

const ImageOuter = styled.div`
	flex: 0 0 33vw;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		flex: 0 0 50vw;
	}
`;

const ImageWrapper = styled.div`
	position: relative;
	width: 100%;
	padding-top: 75%;
`;

const ImageInner = styled.div`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	overflow: hidden;
`;

const FinalBlock = styled.div`
	flex: 0 0 ${pxToRem(1)};
`;

const Caption = styled.p`
	padding-top: ${pxToRem(10)};
`;

const MobileImageWrapper = styled.div`
	display: flex;
	gap: ${pxToRem(15)};
	background: var(--colour-white);
	padding-left: ${pxToRem(15)};
	overflow: auto;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(35)};
	}

	&::-webkit-scrollbar {
		width: 0px;
		background: transparent;
		height: 0;
	}
`;

type Props = {
	images: ProjectType['concepts'][0]['images'];
	title: ProjectType['concepts'][0]['title'];
	description: ProjectType['concepts'][0]['description'];
	pdf: ProjectType['concepts'][0]['pdf'];
	setAccordionActive: (value: number) => void;
	accordionActive: boolean;
	index: number;
};

const ConceptCarousel = (props: Props) => {
	const {
		images,
		title,
		description,
		pdf,
		setAccordionActive,
		accordionActive,
		index
	} = props;

	const hasImages = images?.length > 0;

	return (
		<ConceptCarouselWrapper>
			<Desktop>
				<ConceptContentBlock
					title={title}
					description={description}
					pdf={pdf}
				/>
				{hasImages &&
					images.map((image, i) => (
						<React.Fragment key={i}>
							<ImageOuter>
								<ImageWrapper>
									<ImageInner>
										<Image
											src={image?.image?.asset.url}
											alt={image?.caption}
											priority={i <= 2}
											fill
											style={{
												objectFit: 'cover'
											}}
											sizes="33vw"
										/>
									</ImageInner>
								</ImageWrapper>
								{image?.caption && (
									<Caption>{image?.caption}</Caption>
								)}
							</ImageOuter>
							{i === images.length - 1 && <FinalBlock />}
						</React.Fragment>
					))}
			</Desktop>
			<Mobile>
				<ConceptContentBlock
					title={title}
					description={description}
					pdf={pdf}
					setAccordionActive={setAccordionActive}
					accordionActive={accordionActive}
					index={index}
				/>
				{accordionActive && (
					<MobileImageWrapper>
						{hasImages &&
							images.map((image, i) => (
								<React.Fragment key={i}>
									<ImageOuter>
										<ImageWrapper>
											<ImageInner>
												<Image
													src={
														image?.image?.asset.url
													}
													alt={image?.caption}
													priority={i <= 2}
													fill
													style={{
														objectFit: 'cover'
													}}
													sizes="33vw"
												/>
											</ImageInner>
										</ImageWrapper>
										{image?.caption && (
											<Caption>{image?.caption}</Caption>
										)}
									</ImageOuter>
									{i === images.length - 1 && <FinalBlock />}
								</React.Fragment>
							))}
					</MobileImageWrapper>
				)}
			</Mobile>
		</ConceptCarouselWrapper>
	);
};

export default ConceptCarousel;
