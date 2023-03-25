// import { useState } from 'react';
import style from 'src/components/ReplyModal/ReplyModal.module.scss';
import { Close } from 'src/assets/icons';
import { ButtonS } from 'src/components/buttons';

export const ReplyModal = () => {
	return (
		<>
			<div className={style.modalBackground}></div>
			<div className={style.modalContainer}>
				<div className={style.modalHeader}>
					<Close />
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
						<p className={style.replyHint}>推你的回覆</p>
					</div>
				</div>
				<div className={style.modalFooter}>
					<ButtonS text='回覆' />
				</div>
			</div>
		</>
	);
};
