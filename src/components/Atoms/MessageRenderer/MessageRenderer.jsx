import Quill from 'quill';
import { useEffect, useRef, useState } from 'react';

export const MessageRenderer = ({ value }) => {
  console.log('Value: ', value);

  const rendererRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!rendererRef.current) return;

    const quill = new Quill(document.createElement('div'), {
      theme: 'snow',
    });

    quill.disable();

    const content = JSON.parse(value);
    quill.setContents(content);

    console.log('HTML Output:', quill.root.innerHTML);

    const isContentEmpty = quill.getText().trim().length === 0;

    setTimeout(() => {
      setIsEmpty(isContentEmpty);
    }, 0);

    rendererRef.current.innerHTML = '';
    rendererRef.current.innerHTML = quill.root.innerHTML;
  }, [value]);

  if (isEmpty) return null;

  return (
    <div className="ql-container ql-snow">
      <div ref={rendererRef} className="ql-editor" />
    </div>
  );
};
