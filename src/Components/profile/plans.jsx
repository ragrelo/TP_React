import React, { useEffect, useState } from "react";
import "./plans.css";
import db from "../../firebase";
//import { prices } from "../../prices";
import { prices } from "../../store";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

const Plans = () => {
	const [products, setProducts] = useState(prices);
	const { user } = useSelector((state) => state.user);
	const [subscription, setSubscription] = useState(null);

	// to check what subscription plan the user has chosen and dates
	useEffect(() => {
		db.collection("customers")
			.doc(user.uid)
			.collection("subscriptions")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach(async (subscription) => {
					setSubscription({
						// this you add as a metaData in stripe for the subscription plans
						role: subscription.data().role,
						current_period_end: subscription.data().current_period_end.seconds,
						current_period_start:
							subscription.data().current_period_start.seconds,
					});
				});
			});
	}, [user.uid]);

	// to get the stripe pricing plans from the database
	useEffect(() => {
		db.collection("products")
			.where("active", "==", true)
			.get()
			.then((querySnapshot) => {
				const products = {};
				querySnapshot.forEach(async (productDoc) => {
					products[productDoc.id] = productDoc.data();
					const priceSnap = await productDoc.ref.collection("prices").get();
					priceSnap.docs.forEach((price) => {
						products[productDoc.id].prices = {
							priceId: price.id,
							priceData: price.data(),
						};
					});
				});
				// setProducts(products);
			});
	}, []);

	// Checkout to stripe
	const loadCheckout = async (priceId) => {
		const docRef = await db
			.collection("customers")
			.doc(user.uid)
			.collection("checkout_sessions")
			.add({
				price: priceId,
				// after successful pay the redirect page
				success_url: window.location.origin,
				cancel_url: window.location.origin,
			});

		docRef.onSnapshot(async (snap) => {
			const { error, sessionId } = snap.data();

			if (error) {
				// Show an error to your customer and
				// Inspect your cloud function logs in the firebase console

				alert(`An error occurred ${error.message}`);
			}

			if (sessionId) {
				// We have a session, lets redirect to Checkout
				// Init Stripe

				const stripe = await loadStripe("put_ur_publishable_key_from_stripe");
				stripe.redirectToCheckout({ sessionId });
			}
		});
	};

	console.log(subscription);

	return (
		<div className="plans">
			<br />
			{subscription && (
				<p>
					Renewal date:{" "}
					{new Date(
						subscription?.current_period_end * 1000
					).toLocaleDateString()}
				</p>
			)}
			{Object.entries(products).map(([productId, productData]) => {
				// TODO
				// To check which package the use has subscribed to
				const isCurrentPackage = productData.name
					?.toLowerCase()
					.includes(subscription?.role);
				return (
					<div
						key={productId}
						// className={`${
						// 	isCurrentPackage && "plans__plan--disabled"
						// } "plans__plan"`}
						className="plans__plan"
					>
						<div className="plans__info">
							<h3>{productData.name}</h3>
							<h4>{productData.description}</h4>
						</div>
						<button
							onClick={() =>
								!isCurrentPackage && loadCheckout(productData.prices.priceId)
							}
						>
							{isCurrentPackage ? "Current Package" : "Subscribe"}
						</button>
					</div>
				);
			})}
		</div>
	);
};

export default Plans;
