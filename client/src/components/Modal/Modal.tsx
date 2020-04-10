import React, { useState, useCallback, useEffect } from 'react';
import './modal.css';

export interface ModalType {
  children?: JSX.Element | JSX.Element[];
  buttonLabel: string | JSX.Element;
}

export default function Modal({ children, buttonLabel }: ModalType) {
  const [open, setOpen] = useState(false);

  const escClose = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escClose, false);

    return () => {
      document.removeEventListener('keydown', escClose, false);
    };
  }, [escClose]);
  return (
    <div>
      <button onClick={() => setOpen(true)} className="button-style">
        {buttonLabel}
      </button>
      <div
        className={`modal-bg ${open ? 'open' : 'close'}`}
        onClick={() => setOpen(false)}
      ></div>
      <div className={`modal-main ${open ? 'show' : 'hide'}`}>
        <div className="close" role="button" onClick={() => setOpen(false)}>
          +
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
