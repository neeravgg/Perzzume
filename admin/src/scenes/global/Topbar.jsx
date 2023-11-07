import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import { deleteAllCookies, getCookie } from '../../utils/cookieHelper';
import ConfirmMessage from '../../utils/confirmMessage';

const Topbar = () => {
	const theme = useTheme();
	const token = getCookie('token');
	const colorMode = useContext(ColorModeContext);

	const handleLogout = async (e) => {
		e.preventDefault();
		if (!token) {
			return;
		} else {
			const confirm = await ConfirmMessage('You want to Logout?');
			if (confirm?.isConfirmed) {
				deleteAllCookies();
				setTimeout(() => {
					window.location.href = '/';
				}, 500);
			}
		}
	};
	return (
		<Box display='flex' justifyContent='end' p={2}>
			{/* ICONS */}
			<Box display='flex'>
				<IconButton
					onClick={() => {
						colorMode.toggleColorMode();
					}}
				>
					{theme.palette.mode === 'dark' ? (
						<DarkModeOutlinedIcon />
					) : (
						<LightModeOutlinedIcon />
					)}
				</IconButton>
				<IconButton onClick={handleLogout}>
					<ExitToAppIcon />
				</IconButton>
			</Box>
		</Box>
	);
};

export default Topbar;
