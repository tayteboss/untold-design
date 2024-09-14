import styled from 'styled-components';
import { AboutPageType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ContactListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${pxToRem(10)};
	flex: 1;

	* {
		color: var(--colour-white);
	}
`;

const Title = styled.h4``;

const List = styled(motion.ul)`
	a {
		&:hover {
			text-decoration: underline;
		}
	}
`;

const ListItem = styled(motion.li)`
	text-align: center;
`;

type Props = {
	title: string;
	data: AboutPageType['clients'] | AboutPageType['services'];
};

const wrapperVariants = {
	hidden: {
		opacity: 0,
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
			staggerChildren: 0.07,
			delayChildren: 0.1
		}
	}
};

const childVariants = {
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
	}
};

const ContactList = (props: Props) => {
	const { title, data } = props;

	const hasData = data && data.length > 0;

	return (
		<ContactListWrapper>
			<Title className="type-p">{title}</Title>
			<List variants={wrapperVariants} initial="hidden" animate="visible">
				{hasData &&
					data.map((item, i) => (
						<ListItem key={i} variants={childVariants}>
							{typeof item?.link === 'string' ? (
								<Link href={item?.link} className="p">
									{item?.name || ''}
								</Link>
							) : (
								item?.name || item || ''
							)}
						</ListItem>
					))}
			</List>
		</ContactListWrapper>
	);
};

export default ContactList;
