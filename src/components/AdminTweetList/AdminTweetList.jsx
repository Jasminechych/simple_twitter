import { AdminTweetItem } from 'src/components/AdminTweetItem/AdminTweetItem';
import style from 'src/components/AdminTweetList/AdminTweetList.module.scss';
import { getAdminTweets, deleteAdminTweet } from 'src/apis/admin';
import { useEffect, useState } from 'react';

export const AdminTweetList = () => {
	const [tweets, setTweets] = useState([]);

	useEffect(() => {
		const getAdminTweetsAsync = async () => {
			try {
				const data = await getAdminTweets();
				if (data.length > 0) {
					setTweets(data);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getAdminTweetsAsync();
	}, []);

	const handleDelete = async (id) => {
		try {
			await deleteAdminTweet(id);
			setTweets((prev) => prev.filter((tweet) => tweet.id !== id));
		} catch (error) {
			console.error(error);
		}
	};

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
						handleDelete={handleDelete}
					/>
				);
			})}
		</div>
	);
};
