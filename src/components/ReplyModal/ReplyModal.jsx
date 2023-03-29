// import { useState } from 'react';
import style from 'src/components/ReplyModal/ReplyModal.module.scss';
import { Close } from 'src/assets/icons';
import { ButtonS } from 'src/components/buttons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { postTweetReplies } from 'src/apis/user';

export const ReplyModal = (id) => {
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState('');
	console.log('inputValue', inputValue);

	console.log('有街道id嗎', id);

	// 回到上一頁
	function handleClick() {
		navigate(-1);
	}

	const handleSubmit = () => {
		console.log('submit');
	};

	useEffect(() => {
		const postTweetRepliesAsync = async () => {
			try {
				const res = await postTweetReplies(id);
				console.log('res', res);
			} catch (error) {
				console.log(error);
			}
		};
		postTweetRepliesAsync();
	}, [handleSubmit]);

	return (
		<>
			<div className={style.modalBackground}></div>
			<div className={style.modalContainer}>
				<div className={style.modalHeader}>
					<Close onClick={handleClick} />
				</div>
				<div className={style.modalBody}>
					<div className={style.bodySection}>
						<div className={style.avatarSection}>
							<img
								className={style.modalAvatar}
								src='https://loremflickr.com/320/240/people,casual/?random=7.451016840043523'
								alt='avatar'
							/>
							<span className={style.connector}></span>
						</div>

						<div>
							<div className={style.nameAndAccountWrapper}>
								<p className={style.name}>Apple</p>
								<p className={style.account}>@apple・3 小時</p>
							</div>
							<p className={style.description}>
								Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.
								Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
							</p>
							<div className={style.replyToGroup}>
								<p className={style.replyToText}>回覆給</p>
								<p className={style.replyToAccount}>@sdjfiosjf</p>
							</div>
						</div>
					</div>

					<div className={style.bodySection}>
						<img
							className={style.modalAvatar}
							src='https://loremflickr.com/320/240/people,casual/?random=7.451016840043523'
							alt='avatar'
						/>
						<textarea
							className={style.replyHint}
							name='reply'
							placeholder='推你的回覆'
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							rows={11}
						></textarea>
					</div>
				</div>
				<div className={style.modalFooter}>
					<ButtonS text='回覆' onClick={handleSubmit} />
				</div>
			</div>
		</>
	);
};
