import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Close } from 'src/assets/icons';
import { ButtonXS } from 'src/components/buttons';
import style from 'src/components/Modal/TweetModal/TweetModal.module.scss';
import { postTweets } from 'src/apis/user';
import Swal from 'sweetalert2';

export const TweetModal = () => {
	const [inputValue, setInputValue] = useState('');
	const [hintMessage, setHintMessage] = useState('');
	const [isReadyForTweetSubmit, setIsReadyForSubmit] = useState(false);
	const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUserId;
	const navigate = useNavigate();
	const maxLength = 140;

	if (inputValue.length > maxLength) {
		setHintMessage('字數不可超過140字');
	}

	const handleInputValue = (e) => {
		setInputValue(e.target.value);
	};

	const handleTweetSubmit = () => {
		setIsReadyForSubmit(false);
		if (!inputValue.trim().length) {
			setHintMessage('內容不可空白');
			return;
		} else {
			setIsReadyForSubmit(true);
		}
	};

	// 新增推文
	useEffect(() => {
		const postTweetsAsync = async () => {
			if (isReadyForTweetSubmit) {
				try {
					await postTweets(currentUserId, inputValue);
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: '建立推文成功！',
						showConfirmButton: false,
						timer: 1500,
					});
					navigate('/main');
				} catch (error) {
					console.log(error);
				}
			}
			return;
		};
		postTweetsAsync();
	}, [isReadyForTweetSubmit]);

	return (
		<>
			<div className={style.dark}></div>
			<div className={style.tweetModalContainer}>
				<Link to='/main'>
					<Close className={style.close} />
				</Link>
				<div className={style.textContainer}>
					<div className={style.textWrapper}>
						<Avatar className={style.tweetModalAvatar} />
						<div className={style.inputSection}>
							<textarea
								name='introduction'
								placeholder='有什麼新鮮事？'
								value={inputValue}
								onChange={handleInputValue}
								rows={11}
							></textarea>
						</div>
					</div>
					<div className={style.buttonWrapper}>
						<div className={style.hintMessage}>{hintMessage}</div>
						<ButtonXS text='推文' onClick={() => handleTweetSubmit(currentUserId)} />
					</div>
				</div>
			</div>
		</>
	);
};
