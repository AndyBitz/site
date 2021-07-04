import { List } from '../components/list';
import { Layout } from '../components/layout';
import { Profile } from '../components/profile';

export default function Home() {
	return (
		<Layout>
			<Profile />
			<List />
		</Layout>
	);
}
