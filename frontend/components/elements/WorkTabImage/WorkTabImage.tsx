import styled from 'styled-components';
import { WorkType } from '../../../shared/types/types';
import Image from 'next/image';
import pxToRem from '../../../utils/pxToRem';

const WorkTabImageWrapper = styled.div<{ $isActive: boolean }>`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: ${(props) => (props.$isActive ? 1 : 0)};
	z-index: ${(props) => (props.$isActive ? 1 : 0)};
`;

const Inner = styled.div`
	display: flex;
	flex-direction: column;
`;

const ImageWrapper = styled.div`
	position: relative;
	width: 50vw;
	max-height: 90vh;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		width: calc(100vw - 30px);
	}
`;

const DetailsWrapper = styled.div`
	display: flex;
	position: absolute;
	top: calc(100% + 10px);
	left: 0;
	width: 100%;
`;

const Text = styled.p`
	&:first-child {
		margin-right: ${pxToRem(70)};
	}

	&:last-child {
		margin-left: auto;
		flex: 1;
		text-align: right;
	}
`;

type Props = {
	isActive: boolean;
	title: WorkType['title'];
	description: WorkType['description'];
	year: WorkType['year'];
	image: WorkType['image'];
	isPriority: boolean;
};

const WorkTabImage = (props: Props) => {
	const { isActive, title, description, year, image, isPriority } = props;

	const imageUrl = image?.asset?.url;
	const blurDataURL = image?.asset?.metadata?.lqip;

	return (
		<WorkTabImageWrapper $isActive={isActive}>
			<Inner>
				{imageUrl && (
					<ImageWrapper>
						<Image
							src={imageUrl}
							alt={description || ''}
							priority={isPriority}
							blurDataURL={blurDataURL}
							width={0}
							height={0}
							sizes="50vw"
							style={{
								objectFit: 'contain',
								width: '100%',
								height: 'auto'
							}}
						/>
						<DetailsWrapper>
							{title && (
								<Text className="type-small">{title}</Text>
							)}
							{description && (
								<Text className="type-small">
									{description}
								</Text>
							)}
							{year && <Text className="type-small">{year}</Text>}
						</DetailsWrapper>
					</ImageWrapper>
				)}
			</Inner>
		</WorkTabImageWrapper>
	);
};

export default WorkTabImage;
