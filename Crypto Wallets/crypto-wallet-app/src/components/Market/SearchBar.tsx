import { FunctionComponent } from "react";
import { Icon } from "@iconify/react";
import "./SearchBar.css";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({
	value,
	onChange,
	placeholder = "Search coins...",
}) => {
	return (
		<div className="search-bar"> 
			<Icon className="search-bar__icon" icon="ph:magnifying-glass-bold" />
			<input
				className="search-bar__input"
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
			/>
			{value && (
				<button className="search-bar__clear" onClick={() => onChange("")} type="button">
					<Icon icon="ph:x-bold" />
				</button>
			)}
		</div>
	);
};

export default SearchBar;