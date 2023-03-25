import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Close } from 'src/assets/icons';
import { ButtonXS } from 'src/components/buttons';
import style from 'src/components/Modal/TweetModal/TweetModal.module.scss';

export const TweetModal = () => {
	const [inputValue, setInputValue] = useState('');
	const inputLength = inputValue.length;
	let maxLength = 140;
	let hintMessage = '';

	if (inputLength > maxLength) {
		hintMessage = `字數不可超過140字`;
	}

	const handleInputValue = (e) => {
		setInputValue(e.target.value);
	};

	return (
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
					<ButtonXS text='推文' />
				</div>
			</div>
		</div>
	);
};
