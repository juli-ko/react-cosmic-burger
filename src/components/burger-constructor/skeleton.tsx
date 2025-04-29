import styles from './burger-constructor.module.scss';

type SkeletonProps = {
	text: string;
	position?: string;
	borderColor?: string;
};

const Skeleton = ({
	text,
	position = '',
	borderColor = 'transparent',
}: SkeletonProps) => {
	const additionalClassName = !!position
		? `constructor-element_pos_${position}`
		: '';

	return (
		<div
			className={`constructor-element ${additionalClassName} ${styles.skeleton}`}
			style={{ border: `2px dotted ${borderColor}` }}>
			<p className='text text_type_main-default text_color_inactive'>{text}</p>
		</div>
	);
};

export default Skeleton;
