import { AdminTweetItem } from 'src/components/AdminTweetItem/AdminTweetItem';
import style from 'src/components/AdminTweetList/AdminTweetList.module.scss';
import { getAdminTweets, deleteAdminTweet } from 'src/apis/admin';
import { useEffect, useState } from 'react';
import { convertDateToHours } from 'src/utils/convertDateToHours';
import Swal from 'sweetalert2';

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
	// const handleDelete = async (id) => {
	// 	try {
	// 		await deleteAdminTweet(id);
	// 		const data = await getAdminTweets();
	// 		setTweets(data);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	const handleDelete = async (id) => {
		try {
			const result = await Swal.fire({
				title: '確定要刪除嗎？',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#FF974A',
				cancelButtonColor: '#6C757D',
				confirmButtonText: '確定刪除',
			});
			if (result.isConfirmed) {
				await deleteAdminTweet(id);
				const data = await getAdminTweets();
				setTweets(data);
				Swal.fire({
					title: '推文已刪除！',
					icon: 'success',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={style.tweetList}>
			{isDataLoaded ? (
				tweets.map(({ id, description, createdAt, User }) => {
					const hour = convertDateToHours(createdAt);
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
