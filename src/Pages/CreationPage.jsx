import React, { useEffect, useState } from 'react';
import AvatarFile from '../components/AvatarFile';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import addBtn from "../assets/images/add.svg";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import backBtn from '../assets/images/back.svg'
import Tooltip from '../components/UI/tooltip/Tooltip';

const CreationPage = ({post, setPost, allPosts, setAllPosts}) => {

	const navigate = useNavigate();

	const [tooltip, setTooltip] = useState(false)
	const [titleDirty, setTitleDirty] = useState(false)
	const [bodyDirty, setBodyDirty] = useState(false)
	const [titleError, setTitleError] = useState('The title cannot be empty')
	const [bodyError, setBodyError] = useState('The description cannot be empty')
	const [formValid, setFormValid] = useState(false)

	useEffect(() => {
		if (titleError || bodyError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [titleError, bodyError])

	const blurHandler = (e) => {
		switch (e.target.name) {
			case 'title':
				setTitleDirty(true)
				break
			case 'body':
				setBodyDirty(true)
				break
		}
	}

	const titleHandler = (e) => {
		setPost({ ...post, title: e.target.value })
		if (e.target.value.length < 3) {
			setTitleError('The title must be longer than 3 characters!')
			if (!e.target.value) {
				setTitleError('The title cannot be empty')
			}
		} else {
			setTitleError('')
		}
	}

	const bodyHandler = (e) => {
		setPost({ ...post, body: e.target.value })
		if (e.target.value.length < 10) {
			setBodyError('The description must be longer than 10 characters!')
			if (!e.target.value) {
				setBodyError('The description cannot be empty')
			}
		} else {
			setBodyError('')
		}
	}


	const postAvatar = post.avatar === '#' ? 'https://img3.akspic.ru/crops/1/9/1/0/5/150191/150191-igri-elektrik-pressa-sina_korp-gadzhet-1920x1080.jpg' : post.avatar

	const addNewPost = (e) => {
		e.preventDefault();
    axios.post('http://localhost:3000/posts', {
			title: post.title[0].toUpperCase() + post.title.slice(1),
			body: post.body,
			date: Date.now(),
			avatar: postAvatar
		});
		setAllPosts([...allPosts, {
			id: allPosts[allPosts.length - 1].id + 1,
			title: post.title[0].toUpperCase() + post.title.slice(1),
			body: post.body,
			date: Date.now(),
			avatar: postAvatar,
		}])
		setPost({
			title: '',
			body: '',
		})
		setTooltip(true)
		setTimeout(() => {
			navigate('/main')
			setTooltip(false)
		}, 1500)
  };

	return (
		<form style={{minWidth: '1200px'}}>
		<MyInput
			name = 'title'
			value={post.title}
			onChange={(e) => titleHandler(e)}
			type="text"
			placeholder="Entry name"
			onBlur = {e => blurHandler(e)}
		></MyInput>
		{(titleDirty && titleError) && <div className='validate__error'>{titleError}</div>}
		<MyInput
			name = 'body'
			value={post.body}
			onChange={(e) => bodyHandler(e)}
			type="text"
			placeholder="Description"
			onBlur = {e => blurHandler(e)}
		></MyInput>
		{(bodyDirty && bodyError) && <div className='validate__error'>{bodyError}</div>}
		<AvatarFile post={post} setPost={setPost}/>
		<div className='button__holder'>
		<MyButton disabled = {!formValid} src={addBtn} onClick={addNewPost} style = {{fontSize: '1.5rem'}}>
			Create entry
		</MyButton>
		<Link to = '/main'>
			<MyButton src = {backBtn} style = {{fontSize: '1.5rem'}}> 
				Back to entries
			</MyButton>
		</Link>
		</div>
		<Tooltip visible = {tooltip} setVisible = {setTooltip}>The entry has been successfully added to the diary!</Tooltip>
	</form>
	);
}

export default CreationPage;