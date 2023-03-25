import { AdminTweetItem } from 'src/components/AdminTweetItem/AdminTweetItem';
import style from 'src/components/AdminTweetList/AdminTweetList.module.scss';
import { getAdminTweets } from 'src/apis/admin';
import { useEffect, useState } from 'react';

export const AdminTweetList = () => {
	const [tweets, setTweets] = useState([]);

	useEffect(() => {
		const getAdminTweetsAsync = async () => {
			try {
				const { success, data } = await getAdminTweets();
				console.log('data: ', data);
				if (success) {
					setTweets(data);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getAdminTweetsAsync();
	}, []);

	return (
		<div className={style.tweetList}>
			{tweets.map(({ id, description, createdAt, Author }) => {
				const createdAtDate = new Date(createdAt);
				const hour = createdAtDate.getHours();
				return (
					<AdminTweetItem
						key={id}
						id={id}
						description={description}
						avatar={Author.avatar}
						name={Author.name}
						account={Author.account}
						createdAt={hour}
					/>
				);
			})}
		</div>
	);
};
