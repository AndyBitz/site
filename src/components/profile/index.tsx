import styles from './profile.module.css';

export function Profile() {
	return (
		<section className={styles.profile}>
			<Picture />
			<Title />
		</section>
	);
}

function Picture() {
	return (
		<div className={styles.picture}>
			<img src="/profile.png" alt="" />
		</div>
	)
}

function Title() {
	return (
		<div className={styles.title}>
			<h1>
				<span>Andy</span>
			</h1>
		</div>
	);
}
