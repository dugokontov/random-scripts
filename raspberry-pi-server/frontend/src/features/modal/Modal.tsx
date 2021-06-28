import React from 'react';
import ReactDOM from 'react-dom';

type Props = {
    id: string;
    title: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
};

export function Modal({ id, title, children, footer }: Props) {
    let footerElement: React.ReactNode = null;
    if (footer) {
        footerElement = <div className="modal-footer">{footer}</div>;
    }
    return ReactDOM.createPortal(
        <div className="modal" id={id}>
            <div className="modal-dialog modal-fullscreen-xl-down modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>
                    <div className="modal-body">{children}</div>
                    {footerElement}
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
}
