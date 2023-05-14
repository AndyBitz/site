import { List } from './components/list';
import { Profile } from './components/profile';
import './page.css';

export default function Page() {
	return (
		<main>
			<Profile />
			<List />
		</main>
	);
}
