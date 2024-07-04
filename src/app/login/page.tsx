"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function LoginPage() {
	const router = useRouter();
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [loading, setLoading] = useState(false);

	const onLogin = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/login", user);
			console.log("Login success", response.data);

			router.push("/profile");
		} catch (error: any) {
			console.log("Login failed!");
			toast.error(error.message);
		}
	};

	useEffect(() => {
		if (user.email.length > 0 && user.password.length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1>{loading ? "Processing" : "Login"}</h1> <hr />
			<label htmlFor="email">email</label>
			<input
				className="py-2 px-2 rounded-lg text-black"
				id="email"
				value={user.email}
				onChange={(e) => setUser({ ...user, email: e.target.value })}
				placeholder="email"
				type="text"
			/>
			<label htmlFor="password">password</label>
			<input
				className="py-2 px-2 rounded-lg text-black"
				id="password"
				value={user.password}
				onChange={(e) => setUser({ ...user, password: e.target.value })}
				placeholder="password"
				type="text"
			/>
			<button
				onClick={onLogin}
				className="py-3 px-4 mt-4 bg-white rounded-xl text-black text-base"
			>
				{buttonDisabled ? "Fill the form" : "Login"}
			</button>
			<Link href={"/login"} className="mt-4 underline">
				Visit Profile Page
			</Link>
		</div>
	);
}

export default LoginPage;
