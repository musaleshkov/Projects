import { FunctionComponent } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

interface ModalProps {
	show: boolean;
	closeModal: () => void;
	children: JSX.Element;
}

const Modal: FunctionComponent<ModalProps> = ({ show, closeModal, children }) => {
	if (!show) return null;

	const getPortalId: any = document.getElementById("portal");
	return createPortal(
		<>
			<div className="modal-overlay-style" onClick={() => closeModal()} />
			<div className="modal-style">{children}</div>
		</>,
		getPortalId,
	);
};

export default Modal;
