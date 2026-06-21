import { type ReactElement, type FunctionComponent } from "react";

interface ListProps {
	items: string[];
	title: string;
}

const ListItems: FunctionComponent<ListProps> = ({
	items,
	title,
}: ListProps): ReactElement => (
	<div className="text-left mx-4 my-4">
		<h4 className="text-foreground font-semibold mb-2">{title}</h4>
		<ul className="list-none p-0">
			{items.map((item: string): ReactElement => (
				<li key={item} className="my-2 text-foreground">
					{item}
				</li>
			))}
		</ul>
	</div>
);

export default ListItems;