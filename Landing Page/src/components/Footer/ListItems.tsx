import React, { ReactElement, FunctionComponent } from "react";
import { FooterColumn, FooterListTitle, FooterList, FooterListItem } from "@/components/Footer/FooterStyles";

interface ListProps {
	items: string[];
	title: string;
}

const ListItems: FunctionComponent<ListProps> = ({ items, title }: ListProps): ReactElement => (

	<FooterColumn>
		<FooterListTitle>{title ?? "title"}</FooterListTitle>
		<FooterList>
			{items?.map((item: string): ReactElement => (
				<FooterListItem key={item}>{item ?? "item"}</FooterListItem>
			))}
		</FooterList>
	</FooterColumn>
);

export default ListItems;
