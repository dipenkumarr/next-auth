"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function VerifyEmailPage() {
	const [token, setToken] = useState("");
	const [verified, setVerified] = useState(false);
	const [error, setError] = useState(false);

	const verifyUserEmail = async () => {
		try {
			await axios.post("/api/users/verifyemail", { token });
			setVerified(true);
			setError(false);
		} catch (error: any) {
			setError(true);
			console.log("Verification failed", error.response.data);
		}
	};

	useEffect(() => {
		setError(false);
		const urlToken = window.location.search.split("=")[1];
		setToken(urlToken || "");
	}, []);

	useEffect(() => {
		setError(false);
		if (token.length > 0) verifyUserEmail();
	}, [token]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1 className="text-4xl">Verify Email</h1>
			<h2 className="p-2 bg-orange-500 text-black">
				{token ? `${token}` : "No token found"}
			</h2>
			{verified && (
				<div>
					<p className="text-green-500 mt-4">Email verified!</p>
					<Link href={"/login"}>Login</Link>
				</div>
			)}
			{error && (
				<div>
					<p className="text-red-500 mt-4">Error!</p>
				</div>
			)}
		</div>
	);
}

export default VerifyEmailPage;
