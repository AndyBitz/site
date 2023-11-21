import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.css';

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button className={`${styles.button} ${className}`.trim()} {...props} />
	);
}
