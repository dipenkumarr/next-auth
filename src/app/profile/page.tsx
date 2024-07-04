"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

function ProfilePage() {
	const router = useRouter();
	const [data, setData] = useState("nothing");

	const getUserDetails = async () => {
		const response = await axios.get("/api/users/me");
		console.log(response.data);
		setData(response.data.data._id);
	};

	const logout = async () => {
		try {
			axios.get("/api/users/logout");
			toast.success("Successfully logged out");
			router.push("/login");
		} catch (error: any) {
			console.log(error.message);
			toast.error(error.message);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1 className="text-4xl">Profile Page</h1> <hr />
			<h2>
				{data === "nothing" ? (
					"No data available"
				) : (
					<Link href={`/profile/${data}`}>{data}</Link>
				)}
				<hr />
				<button
					onClick={getUserDetails}
					className="py-2 px-3 text-white bg-green-500 mt-4"
				>
					Get Details
				</button>
				<button
					onClick={logout}
					className="py-2 px-3 text-white bg-blue-500 mt-4"
				>
					Logout
				</button>
			</h2>
		</div>
	);
}

export default ProfilePage;
