import { List } from './list';
import { Profile } from './profile';
import './page.css';

export default function Page() {
	return (
		<main>
			<Profile />
			<List />
		</main>
	);
}
