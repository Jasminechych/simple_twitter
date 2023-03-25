import style from 'src/components/ReplyList/ReplyList.module.scss';
import { ReplyItem } from 'src/components/ReplyItem/ReplyItem';

const dummyData = [
	{
		id: 304,
		description: 'maiores ut veniam',
		UserId: 104,
		createdAt: '2023-03-24T15:55:02.000Z',
		updatedAt: '2023-03-24T15:55:02.000Z',
		Author: {
			id: 104,
			account: 'user10',
			name: 'user10',
			avatar: 'https://loremflickr.com/320/240/people,casual/?random=67.5374761605713',
		},
	},
	{
		id: 104,
		description: 'rerum qui asperiores',
		UserId: 104,
		createdAt: '2023-03-24T15:55:02.000Z',
		updatedAt: '2023-03-24T15:55:02.000Z',
		Author: {
			id: 104,
			account: 'user10',
			name: 'user10',
			avatar: 'https://loremflickr.com/320/240/people,casual/?random=67.5374761605713',
		},
	},
	{
		id: 904,
		description: 'nesciunt sed nihil',
		UserId: 104,
		createdAt: '2023-03-24T15:55:02.000Z',
		updatedAt: '2023-03-24T15:55:02.000Z',
		Author: {
			id: 104,
			account: 'user10',
			name: 'user10',
			avatar: 'https://loremflickr.com/320/240/people,casual/?random=67.5374761605713',
		},
	},
	{
		id: 704,
		description:
			'Quos aut sint laboriosam. Est quod voluptatem pariatur vero eos aut. Ea iste porro. Minima sed qui. Nemo voluptatibus aut consectetur molestiae consequatur tempore quos. Earum consequuntur ut nostrum nulla error ducimus.\n \rExpedita deleniti voluptate velit. Qui hic rerum est consectetur. Quos alias architecto. Laboriosam unde est amet vero eligendi porro est facilis. Veniam sed quibusdam tempore at sint est. Doloribus provident illo expedita ipsum quis.\n \rIn doloribus nobis et assumenda. Et ipsam perspiciatis sit dolorum voluptates recusandae. Ratione eaque illum itaque officiis in quia et. Vel quos non. Voluptatum magni hic magnam quis modi laboriosam architecto.',
		UserId: 104,
		createdAt: '2023-03-24T15:55:02.000Z',
		updatedAt: '2023-03-24T15:55:02.000Z',
		Author: {
			id: 104,
			account: 'user10',
			name: 'user10',
			avatar: 'https://loremflickr.com/320/240/people,casual/?random=67.5374761605713',
		},
	},
	{
		id: 504,
		description: 'Numquam blanditiis perspiciatis aut itaque tempore.',
		UserId: 104,
		createdAt: '2023-03-24T15:55:02.000Z',
		updatedAt: '2023-03-24T15:55:02.000Z',
		Author: {
			id: 104,
			account: 'user10',
			name: 'user10',
			avatar: 'https://loremflickr.com/320/240/people,casual/?random=67.5374761605713',
		},
	},
];

export const ReplyList = () => {
	return (
		<div className={style.replyList}>
			<ReplyItem />
			{dummyData.map(({ id, description, createdAt, Author }) => {
				return (
					<ReplyItem
						key={id}
						description={description}
						createdAt={createdAt}
						account={Author.account}
						name={Author.name}
						avatar={Author.avatar}
					/>
				);
			})}
		</div>
	);
};
