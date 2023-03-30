// import { useState } from 'react';
import style from 'src/components/ReplyModal/ReplyModal.module.scss';
import { Close } from 'src/assets/icons';
import { ButtonS } from 'src/components/buttons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { postTweetReplies } from 'src/apis/user';
// import { convertDateToHours } from 'src/utils/convertDateToHours';
import Swal from 'sweetalert2';

export const ReplyModal = () => {
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState('');
	const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
	const [hintMessage, setHintMessage] = useState('');

	// 從網址拿 tweet 資料
	const [searchParams] = useSearchParams();
	const id = searchParams.get('id');
	const name = searchParams.get('name');
	const account = searchParams.get('account');
	const createdAt = searchParams.get('createdAt');
	const avatar = searchParams.get('avatar');
	const description = decodeURIComponent(searchParams.get('description'));

	const currentUserAvatar = JSON.parse(localStorage.getItem('currentUser')).currentUserAvatar;

	// 回到上一頁
	function handleBackClick() {
		navigate(-1);
	}

	const handleSubmit = useCallback(() => {
		if (!inputValue.trim().length) {
			setHintMessage('內容不可空白');
			return;
		}
		setIsReadyToSubmit(true);
	}, [inputValue]);

	useEffect(() => {
		if (isReadyToSubmit) {
			const postTweetRepliesAsync = async () => {
				try {
					await postTweetReplies(id, inputValue);
					setIsReadyToSubmit(false);
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: '回覆推文成功！',
						showConfirmButton: false,
						timer: 1500,
					});
					navigate(-1);
				} catch (error) {
					console.log(error);
				}
			};
			postTweetRepliesAsync();
		}
	}, [isReadyToSubmit]);

	return (
		<>
			<div className={style.modalBackground}></div>
			<div className={style.modalContainer} id={id}>
				<div className={style.modalHeader}>
					<Close onClick={handleBackClick} style={{ cursor: 'pointer' }} />
				</div>
				<div className={style.modalBody}>
					<div className={style.bodySection}>
						<div className={style.avatarSection}>
							<img className={style.modalAvatar} src={avatar} alt='avatar' />
							<span className={style.connector}></span>
						</div>

						<div>
							<div className={style.nameAndAccountWrapper}>
								<p className={style.name}>{name}</p>
								<p className={style.account}>
									@{account} • {createdAt}
								</p>
							</div>
							<p className={style.description}>{description}</p>
							<div className={style.replyToGroup}>
								<p className={style.replyToText}>回覆給</p>
								<p className={style.replyToAccount}>@{account}</p>
							</div>
						</div>
					</div>

					<div className={style.bodySection}>
						<img className={style.modalAvatar} src={currentUserAvatar} alt='avatar' />
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
					<div className={style.hintMessage}>{hintMessage}</div>
					<ButtonS text='回覆' onClick={handleSubmit} />
				</div>
			</div>
		</>
	);
};
