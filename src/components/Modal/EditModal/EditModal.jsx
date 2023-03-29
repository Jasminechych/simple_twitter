import style from 'src/components/Modal/EditModal/EditModal.module.scss';
import { AuthInput } from 'src/components/AuthInput/AuthInput';
import { AddPhoto, Close, Cover } from 'src/assets/icons';
import { ButtonS } from 'src/components/buttons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserData } from 'src/apis/user';

export const EditModal = () => {
	const current = JSON.parse(localStorage.getItem('currentUser'));
	// console.log('setting page current: ', current);

	// 	使用者取得自己的資料
	const [initialValues, setInitialValues] = useState({
		id: current.currentUserId,
		name: current.currentUserName,
		avatar: current.currentUserAvatar,
		cover: current.currentUserCover,
		intro: current.currentUserIntroduction,
	});
	console.log('initialValues:', initialValues);

	// 輸入時同步取得,可修改名稱和自我介紹
	const [name, setName] = useState(initialValues.name);
	const [intro, setIntro] = useState(initialValues.intro);

	// 取得
	useEffect(() => {
		const getUsersInfo = async () => {
			const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
			console.log('currentUserId: ', currentUserId.currentUserId);
			try {
				const data = await getUserData(currentUserId.currentUserId);
				setInitialValues({
					id: data.id,
					name: data.name,
					avatar: data.avatar,
					cover: data.cover,
					intro: data.intro,
				});
			} catch (error) {
				console.error(error);
			}
		};
		getUsersInfo();
	}, []);

	//
	const handleSave = () => {
		// 輸入框若有任一為空，防止表單送出，且跳出提示視窗
		if (!name.trim().length || !intro.trim().length) {
			return;
		}
		// 提交表單資料
		console.log('submit form data', { name, intro });
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
					<ButtonS text='儲存' onClick={handleSave} />
				</div>
				<div className={style.editModalBackgroundPhoto}>
					<Cover className={style.backgroundPhoto} />
					<div className={style.addAndClose}>
						<AddPhoto className={style.addPhoto} />
						<Close className={style.closePhoto} />
					</div>
				</div>
				<div className={style.editModalAvatar}>
					<img src={initialValues.avatar} className={style.avatar} />
				</div>
				<div className={style.editModalInfo}>
					<AuthInput
						label='名稱'
						title='name'
						type='text'
						placeholder='請輸入使用者名稱'
						maxLength='50'
						value={name}
						errorMessage={!name.trim().length && '內容不可空白'}
						onChange={(nameInputValue) => setName(nameInputValue)}
					/>

					<AuthInput
						label='自我介紹'
						title='name'
						type='text'
						placeholder='自我介紹'
						maxLength='160'
						value={intro}
						errorMessage={!intro.trim().length && '內容不可空白'}
						onChange={(introInputValue) => setIntro(introInputValue)}
						style={{ height: '147px !important' }}
					/>
				</div>
			</div>
		</>
	);
};
