import style from 'src/components/Modal/EditModal/EditModal.module.scss';
import { ReactComponent as BackgroundPhoto } from 'src/assets/icons/background-photo.svg';
import { ReactComponent as AddPhoto } from 'src/assets/icons/addphoto.svg';
import { AuthInput } from 'src/components/AuthInput/AuthInput';
import { Close } from 'src/assets/icons';
import { ButtonS } from 'src/components/buttons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const EditModal = () => {
	const [nameValue, setNameValue] = useState('');
	const [introValue, setIntroValue] = useState('');

	const handleNameInput = (value) => {
		setNameValue(value);
	};
	const handleIntroInput = (value) => {
		setIntroValue(value);
	};

	return (
		<>
			<div className={style.dark}></div>
			<div className={style.editModalContainer}>
				<div className={style.editTitleContainer}>
					<div className={style.buttonTitleWrapper}>
						<Link to='/user/self'>
							<Close className={style.closeButton} />
						</Link>
						<h5 className={style.modalHeader}>編輯個人資料</h5>
					</div>
					<ButtonS text='儲存' />
				</div>
				<div className={style.editModalBackgroundPhoto}>
					<BackgroundPhoto className={style.backgroundPhoto} />
					<div className={style.addAndClose}>
						<AddPhoto className={style.addPhoto} />
						<Close className={style.closePhoto} />
					</div>
				</div>
				<div className={style.editModalAvatar}>
					<AddPhoto />
				</div>
				<div className={style.editModalInfo}>
					<AuthInput
						label='名稱'
						title='name'
						type='text'
						placeholder='請輸入使用者名稱'
						maxLength='50'
						value={nameValue}
						onChange={handleNameInput}
					/>
					<AuthInput
						label='自我介紹'
						title='name'
						type='text'
						placeholder='自我介紹'
						maxLength='160'
						value={introValue}
						onChange={handleIntroInput}
					/>
				</div>
			</div>
		</>
	);
};
