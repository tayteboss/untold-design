import styled from 'styled-components';
import { SiteSettingsType } from '../../../shared/types/types';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const LoadingScreenWrapper = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: var(--colour-black);
	z-index: 1000;
	pointer-events: none;
`;

const Line = styled(motion.h4)`
	text-align: center;
	color: var(--colour-white);
	font-family: var(--font-bold);
	text-decoration: none !important;
	font-weight: 400;
`;

const wrapperVariants = {
	hidden: {
		opacity: 1,
		transition: {
			duration: 0.1,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.1,
			ease: 'easeInOut',
			staggerChildren: 0.05,
			delayChildren: 0.5
		}
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.1,
			ease: 'easeInOut',
			when: 'afterChildren',
			staggerChildren: 0.05,
			delayChildren: 0.5,
			staggerDirection: -1,
			delay: 0.2
		},
		transitionEnd: {
			display: 'none'
		}
	}
};

const firstLineVariants = {
	hidden: {
		y: 30,
		transition: {
			duration: 0.01,
			ease: 'easeInOut'
		}
	},
	visible: {
		y: 0,
		transition: {
			duration: 0.01,
			ease: 'easeInOut'
		}
	},
	exit: {
		y: 0,
		opacity: 0,
		transition: {
			duration: 0.01,
			ease: 'easeInOut'
		}
	}
};

const lineVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.01,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.01,
			ease: 'easeInOut'
		}
	},
	exit: {
		y: 0,
		opacity: 0,
		transition: {
			duration: 0.01,
			ease: 'easeInOut'
		}
	}
};

// const loadingLineVariants = {
// 	hidden: {
// 		width: 0,
// 		opacity: 1,
// 		transition: {
// 			duration: 0.3,
// 			ease: 'easeInOut'
// 		}
// 	},
// 	visible: {
// 		width: '100%',
// 		opacity: 1,
// 		transition: {
// 			duration: 1,
// 			ease: 'easeInOut'
// 		}
// 	},
// 	exit: {
// 		width: '100%',
// 		opacity: 1,
// 		transition: {
// 			duration: 0.01, // Match this with the width animation if needed
// 			ease: 'easeInOut'
// 		},
// 		transitionEnd: {
// 			display: 'none' // Apply display: none once opacity reaches 0
// 		}
// 	}
// };

type Props = {
	line1: string;
	line2: string;
	line3: string;
	line4: string;
	setLoadingAnimationComplete?: (loadingAnimationComplete: boolean) => void;
};

const LoadingScreen = (props: Props) => {
	const { line1, line2, line3, line4, setLoadingAnimationComplete } = props;

	const [animationState, setAnimationState] = useState<
		'hidden' | 'visible' | 'exit'
	>('visible');

	useEffect(() => {
		const timer = setTimeout(() => {
			setAnimationState('exit');
		}, 1500);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{/* <LoadingLine
				variants={loadingLineVariants}
				initial="hidden"
				animate={animationState}
				exit="exit"
			/> */}
			<LoadingScreenWrapper
				variants={wrapperVariants}
				initial="hidden"
				animate={animationState}
				exit="exit"
				onAnimationComplete={() => setLoadingAnimationComplete?.(true)}
			>
				<Line variants={firstLineVariants}>{line1 || ''}</Line>
				<Line variants={lineVariants}>{line2 || ''}</Line>
				<Line variants={lineVariants}>{line3 || ''}</Line>
				<Line variants={lineVariants}>{line4 || ''}</Line>
			</LoadingScreenWrapper>
		</>
	);
};

export default LoadingScreen;
