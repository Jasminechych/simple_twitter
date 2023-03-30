import style from 'src/components/Modal/EditModal/EditModal.module.scss';
import { AuthInput } from 'src/components/AuthInput/AuthInput';
import { AddPhoto, Close } from 'src/assets/icons';
import { ButtonS } from 'src/components/buttons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserData, putEditProfile } from 'src/apis/user';
import Swal from 'sweetalert2';

export const EditModal = () => {
	const navigate = useNavigate();
	// const current = JSON.parse(localStorage.getItem('currentUser'));
	// console.log('setting page current: ', current);

	// 	使用者取得自己的資料
	const [initialValues, setInitialValues] = useState({
		name: '',
		avatar: '',
		cover: '',
		introduction: '',
	});
	console.log('initialValues:', initialValues);

	// 取得
	useEffect(() => {
		const getUsersInfo = async () => {
			const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
			console.log('currentUserId: ', currentUserId.currentUserId);
			try {
				const data = await getUserData(currentUserId.currentUserId);
				console.log('從後台來的data:', data);
				if (data) {
					setInitialValues({
						id: data.id,
						name: data.name,
						avatar: data.avatar,
						cover: data.cover,
						introduction: data.introduction,
					});
				}
			} catch (error) {
				console.error(error);
			}
		};
		getUsersInfo();
	}, []);

	// 輸入時同步取得,可修改名稱和自我介紹
	// const [name, setName] = useState(initialValues.name);
	// const [introduction, setIntro] = useState(initialValues.introduction);

	//
	const handleSave = async () => {
		// 輸入框若有任一為空，防止表單送出，且跳出提示視窗
		if (!initialValues.name.trim().length || !initialValues.introduction.trim().length) {
			return;
		}

		try {
			const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
			console.log('currentUserId: ', currentUserId.currentUserId);

			// 帶入id，把更新的資料傳回後端
			const id = currentUserId.currentUserId;
			const response = await putEditProfile(id, {
				name: initialValues.name,
				introduction: initialValues.introduction,
			});
			console.log('Data updated successfully', response);
			// console.log('response.data:', response.data);
			const success = response.statusText;
			if (success === 'OK') {
				Swal.fire({
					title: '儲存成功',
					icon: 'success',
					showConfirmButton: false,
					position: 'top',
					timer: 1000,
				});

				navigate('/user/self');
			}
		} catch (error) {
			console.log(error);
		}

		// const handleChangeName = (e) => {
		// 	setInitialValues({
		// 		...initialValues,
		// 		name: e.target.value,
		// 	});
		// };

		// const handleChangeIntro = (e) => {
		// 	setInitialValues({
		// 		...initialValues,
		// 		introduction: e.target.value,
		// 	});
		// };
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
					<img src={initialValues.cover} className={style.backgroundPhoto} />
					<div className={style.addAndClose}>
						<AddPhoto className={style.addPhoto} />
						<Close className={style.closePhoto} />
					</div>
				</div>
				<div className={style.editModalAvatar}>
					<img src={initialValues.avatar} className={style.avatar} />
					<AddPhoto className={style.addAvatarPhoto} />
				</div>
				<div className={style.editModalInfo}>
					<AuthInput
						label='名稱'
						title='name'
						type='text'
						placeholder='請輸入使用者名稱'
						maxLength='50'
						value={initialValues.name}
						errorMessage={!initialValues.name.trim().length && '內容不可空白'}
						onChange={(nameInputValue) =>
							setInitialValues({
								...initialValues,
								name: nameInputValue,
							})
						}
					/>

					<AuthInput
						label='自我介紹'
						title='name'
						type='text'
						placeholder='自我介紹'
						maxLength='160'
						value={initialValues.introduction}
						errorMessage={!initialValues.introduction.trim().length && '內容不可空白'}
						onChange={(introInputValue) =>
							setInitialValues({
								...initialValues,
								introduction: introInputValue,
							})
						}
						style={{ height: '147px' }}
					/>
				</div>
			</div>
		</>
	);
};
