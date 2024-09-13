import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import {
	HomePageType,
	SiteSettingsType,
	TransitionsType,
	WorkType
} from '../shared/types/types';
import { motion } from 'framer-motion';
import client from '../client';
import {
	homePageQueryString,
	siteSettingsQueryString,
	workQueryString
} from '../lib/sanityQueries';
import WorkTab from '../components/blocks/WorkTab';

const PageWrapper = styled(motion.div)`
	min-height: 50vh;
`;

type Props = {
	data: HomePageType;
	siteSettings: SiteSettingsType;
	work: WorkType[];
	pageTransitionVariants: TransitionsType;
	homePageTab: 'work' | 'index';
};

const Page = (props: Props) => {
	const { data, siteSettings, work, pageTransitionVariants, homePageTab } =
		props;

	console.log('data', data);
	console.log('siteSettings', siteSettings);
	console.log('work', work);

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
			<WorkTab isActive={homePageTab === 'work'} work={work} />
		</PageWrapper>
	);
};

export async function getStaticProps() {
	const siteSettings = await client.fetch(siteSettingsQueryString);
	const data = await client.fetch(homePageQueryString);
	const work = await client.fetch(workQueryString);

	return {
		props: {
			data,
			siteSettings,
			work
		}
	};
}

export default Page;
