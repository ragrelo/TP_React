import React from "react";
import "./profile.css";
import Nav from "../homeScreen/nav";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../firebase";

function Profile() {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	return (
		<div className="profile">
			<Nav />
			<div className="profile__body">
				<h1>Editar Perfil</h1>
				<div className="profile__info">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
						alt=""
					/>
					<div className="profile__details">
						<h2>{user.email}</h2>
						<div className="profile__plans">
							<h3>Planes</h3>
							<Plans />
							<button
								onClick={() => auth.signOut()}
								className="profile__signout"
							>
								Sign Out
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
