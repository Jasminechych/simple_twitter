import { AdminTweetItem } from 'src/components/AdminTweetItem/AdminTweetItem';
import style from 'src/components/AdminTweetList/AdminTweetList.module.scss';
import { getAdminTweets, deleteAdminTweet } from 'src/apis/admin';
import { useEffect, useState } from 'react';

export const AdminTweetList = () => {
	const [tweets, setTweets] = useState([]);
	const [isDataLoaded, setIsDataLoaded] = useState(false);

	// 從資料庫撈所有推文資料
	useEffect(() => {
		const getAdminTweetsAsync = async () => {
			try {
				const data = await getAdminTweets();
				setTweets(data);
				setIsDataLoaded(true);
			} catch (error) {
				console.error(error);
			}
		};
		getAdminTweetsAsync();
	}, []);

	// 刪除推文
	const handleDelete = async (id) => {
		try {
			await deleteAdminTweet(id);
			const data = await getAdminTweets();
			setTweets(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={style.tweetList}>
			{isDataLoaded ? (
				tweets.map(({ id, description, createdAt, User }) => {
					const createdAtDate = new Date(createdAt);
					const hour = createdAtDate.getHours();
					return (
						<AdminTweetItem
							key={id}
							id={id}
							description={description}
							avatar={User.avatar}
							name={User.name}
							account={User.account}
							createdAt={hour}
							handleDelete={handleDelete}
						/>
					);
				})
			) : (
				<h5>{'loading....'}</h5>
			)}
		</div>
	);
};
