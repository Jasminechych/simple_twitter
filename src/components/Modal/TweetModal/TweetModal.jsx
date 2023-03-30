import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Close } from 'src/assets/icons';
import { ButtonXS } from 'src/components/buttons';
import style from 'src/components/Modal/TweetModal/TweetModal.module.scss';
import { useUserData } from 'src/context/UserContext';
import { postTweets } from 'src/apis/user';

export const TweetModal = () => {
	const [inputValue, setInputValue] = useState('');
	const [hintMessage, setHintMessage] = useState('');
	const [isReadyForTweetSubmit, setIsReadyForSubmit] = useState(false);
	const { currentUserInfo } = useUserData();
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
					await postTweets(currentUserInfo.id, inputValue);
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
						<ButtonXS text='推文' onClick={() => handleTweetSubmit(currentUserInfo.id)} />
					</div>
				</div>
			</div>
		</>
	);
};
