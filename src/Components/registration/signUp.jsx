import React, { useRef, useState, useEffect } from "react";
import "./signUp.css";
//import { auth } from "../../firebase";

const SignUp = ({ email }) => {
	const emailRef = useRef("");
	const passwordRef = useRef("");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (email) {
			passwordRef.current.focus();
		} else {
			emailRef.current.focus();
		}
	}, []);

	// To register new users
	const register = (e) => {
		e.preventDefault();

		auth
			.createUserWithEmailAndPassword(
				emailRef.current.value,
				passwordRef.current.value
			)
			.then((authUser) => {
				console.log(authUser);
				setErrorMessage("");
			})
			.catch((error) => {
				setErrorMessage(error.message);
			});
	};

	// To login to the app
	const signIn = (e) => {
		e.preventDefault();

		/*auth
			.signInWithEmailAndPassword(
				emailRef.current.value,
				passwordRef.current.value
			)
			.then((authUser) => {
				console.log(authUser);
			})
			.catch((error) => {
				setErrorMessage(error.message);
			});*/

			const user = true;
	};
	return (
		<div className="signup">
			<form>
				<h1>Sign In</h1>
				{errorMessage && (
					<p className="signup__error">
						{errorMessage.substring(9, errorMessage.length)}
					</p>
				)}
				<input
					placeholder={`${email}` || `Email`}
					type="email"
					ref={emailRef}
					defaultValue={email}
				/>
				<input placeholder="Password" type="password" ref={passwordRef} />
				<button type="submit" onClick={signIn}>
					Sign In
				</button>

				<h4>
					<span className="signup__gray">New to Netflix? </span>
					<span className="signup__link" onClick={register}>
						Sign Up Now
					</span>
				</h4>
			</form>
		</div>
	);
};

export default SignUp;
