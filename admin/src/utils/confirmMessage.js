import Swal from 'sweetalert2';

async function ConfirmMessage(text, title = 'Are you sure', type = 'warning') {
	const confirm = await Swal.fire({
		title: title,
		text: text,
		icon: type,
		showConfirmButton: true,
		showCancelButton: true,
		confirmButtonColor: '#3B618B',
		confirmButtonText: 'Yes!',
	});
	return confirm;
}

export default ConfirmMessage;
