import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import {
	HomePageType,
	ProjectType,
	TransitionsType,
	WorkType
} from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import { homePageQueryString, workQueryString } from '../lib/sanityQueries';
import WorkTab from '../components/blocks/WorkTab';
import IndexTab from '../components/blocks/IndexTab';
import { useState } from 'react';
import ConceptLightBox from '../components/blocks/ConceptLightBox';

const PageWrapper = styled(motion.div)`
	min-height: 50vh;
`;

type Props = {
	data: HomePageType;
	work: WorkType[];
	pageTransitionVariants: TransitionsType;
	homePageTab: 'work' | 'index';
};

const Page = (props: Props) => {
	const { data, work, pageTransitionVariants, homePageTab } = props;

	const [lightBoxData, setLightBoxData] = useState<{
		images: false | ProjectType['concepts'][0]['images'] | WorkType[];
		index: number;
	}>({ images: false, index: 0 });

	return (
		<PageWrapper
			variants={pageTransitionVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<NextSeo
				title={data?.seoTitle || ''}
				description={data?.seoDescription || ''}
			/>
			<ConceptLightBox
				isActive={!!lightBoxData.images}
				data={lightBoxData.images}
				index={lightBoxData.index}
				setLightBoxData={setLightBoxData}
			/>
			<WorkTab isActive={homePageTab === 'work'} work={work} />
			<IndexTab
				isActive={homePageTab === 'index'}
				work={work}
				setLightBoxData={setLightBoxData}
			/>
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const data = await client.fetch(homePageQueryString);
	const work = await client.fetch(workQueryString);

	return {
		props: {
			data,
			work
		}
	};
}

export default Page;
