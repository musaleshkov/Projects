import { type ReactElement, type FC } from "react";

interface ListProps {
	items: string[];
	title: string;
}

const ListItems: FC<ListProps> = ({ items, title }: ListProps): ReactElement => (
	<div className="text-left">
		<h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
			{title}
		</h4>
		<ul className="list-none space-y-3">
			{items.map((item: string): ReactElement => (
				<li key={item}>
					<a
						href="#"
						className="text-secondary-400 hover:text-white transition-colors duration-200 text-sm"
					>
						{item}
					</a>
				</li>
			))}
		</ul>
	</div>
);

export default ListItems;