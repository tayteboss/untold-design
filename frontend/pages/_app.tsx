import { useEffect, useState } from 'react';
import '../styles/fonts.css';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import Layout from '../components/layout';
import { theme } from '../styles/theme';
import { GlobalStyles } from '../styles/global';
import use1vh from '../hooks/use1vh';
import { TransitionsType } from '../shared/types/types';
import useHeaderHeight from '../hooks/useHeaderHeight';

const pageTransitionVariants: TransitionsType = {
	hidden: { opacity: 0, transition: { duration: 0.01 } },
	visible: { opacity: 1, transition: { duration: 0.1 } }
};

type Props = {
	Component: any;
	pageProps: {};
};

const App = (props: Props) => {
	const { Component, pageProps } = props;

	const [hasVisited, setHasVisited] = useState<boolean>(false);
	const [loadingAnimationComplete, setLoadingAnimationComplete] =
		useState<boolean>(false);
	const [homePageTab, setHomePageTab] = useState<'work' | 'index'>('work');

	const router = useRouter();
	const routerEvents = router.events;

	const handleExitComplete = (): void => {
		window.scrollTo(0, 0);
	};

	use1vh();
	useHeaderHeight();

	useEffect(() => {
		const hasCookies = Cookies.get('visited');

		if (hasCookies) {
			setHasVisited(true);
		}

		const timer = setTimeout(() => {
			Cookies.set('visited', 'true', { expires: 1, path: '' });
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<>
			<GlobalStyles />
			<ThemeProvider theme={theme}>
				<Layout
					setLoadingAnimationComplete={setLoadingAnimationComplete}
					setHomePageTab={setHomePageTab}
					homePageTab={homePageTab}
				>
					<AnimatePresence
						mode="wait"
						onExitComplete={() => handleExitComplete()}
					>
						<Component
							{...pageProps}
							key={router.asPath}
							pageTransitionVariants={pageTransitionVariants}
							loadingAnimationComplete={loadingAnimationComplete}
							homePageTab={homePageTab}
						/>
					</AnimatePresence>
				</Layout>
			</ThemeProvider>
		</>
	);
};

export default App;
