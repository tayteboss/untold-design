import styled from 'styled-components';
import { ProjectType, WorkType } from '../../../shared/types/types';
import LayoutWrapper from '../../layout/LayoutWrapper';
import LayoutGrid from '../../layout/LayoutGrid';
import IndexTabImage from '../../elements/IndexTabImage';
import pxToRem from '../../../utils/pxToRem';
import { AnimatePresence, motion } from 'framer-motion';

const IndexTabWrapper = styled(motion.div)`
	padding-top: ${pxToRem(220)};
	margin-bottom: ${pxToRem(80)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding-top: ${pxToRem(116)};
	}

	.layout-grid {
		grid-row-gap: ${pxToRem(40)};
	}
`;

const wrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.1
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.1,
			staggerChildren: 0.03,
			when: 'beforeChildren'
		}
	}
};

type Props = {
	isActive: boolean;
	work: WorkType[];
	setLightBoxData: (value: {
		images: false | ProjectType['concepts'][0]['images'] | WorkType[];
		index: number;
	}) => void;
};

const IndexTab = (props: Props) => {
	const { isActive, work, setLightBoxData } = props;

	const hasWork = work.length > 0;

	return (
		<AnimatePresence>
			{isActive && (
				<IndexTabWrapper
					variants={wrapperVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
				>
					<LayoutWrapper>
						<LayoutGrid>
							{hasWork &&
								work.map((item, i) => {
									const isImage = !!item?.image;
									return (
										<IndexTabImage
											key={i}
											index={i + 1}
											image={item.image}
											video={item.video}
											useImage={isImage}
											title={item.title}
											description={item.description}
											year={item.year}
											setLightBoxData={setLightBoxData}
											work={work}
										/>
									);
								})}
						</LayoutGrid>
					</LayoutWrapper>
				</IndexTabWrapper>
			)}
		</AnimatePresence>
	);
};

export default IndexTab;
