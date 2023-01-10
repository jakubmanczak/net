const dob = "2004-08-28";

function getCurrentAge(): number {
	let today = new Date();
	let bdate = new Date(dob);
	let age = today.getFullYear() - bdate.getFullYear();
	let m = today.getMonth() - bdate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < bdate.getDate())) {
		age--;
	}
	return age;
}

export { getCurrentAge };
