import styled from 'styled-components';
import { AboutPageType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import Link from 'next/link';

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

const List = styled.ul`
	a {
		&:hover {
			text-decoration: underline;
		}
	}
`;

const ListItem = styled.li`
	text-align: center;
`;

type Props = {
	title: string;
	data: AboutPageType['clients'] | AboutPageType['services'];
};

const ContactList = (props: Props) => {
	const { title, data } = props;

	const hasData = data && data.length > 0;

	return (
		<ContactListWrapper>
			<Title className="type-p">{title}</Title>
			<List>
				{hasData &&
					data.map((item, i) => (
						<ListItem key={i}>
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
