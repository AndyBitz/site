import styles from './prosemirror.module.css';

type Content = {
	type: 'doc' | 'paragraph' | 'blockquote';
	content: Content[];
} | {
	type: 'text';
	text: string;
	marks: {
		type: 'italic';
	}[];
};

export function Prosemirror({ data }: { data: Content | Content[]; }) {
	const items = Array.isArray(data) ? data : [data];

	return items.map((item) => {
		if (item.type === 'text') {
			if (item.marks?.some(mark => mark.type === 'italic')) {
				return <i>{item.text}</i>
			}

			return item.text;
		}

		let Element: 'span' | 'div' | 'p' | 'blockquote' = 'span';

		switch (item.type) {
			case 'doc':
				Element = 'div';
				break;
			case 'paragraph':
				Element = 'p';
				break;
			case 'blockquote':
				Element = 'blockquote';
				break;
			default:
				Element = 'span';
				break;
		}

		return (
			<Element className={item.type === 'doc' ? styles.document : undefined}>
				<Prosemirror data={item.content} />
			</Element>
		);
	});
}
